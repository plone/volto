import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { globSync as glob } from 'glob';

const NEWS_GLOB = '**/news/*.{breaking,feature,bugfix,documentation,internal}';
const IGNORE_GLOBS = ['**/node_modules/**', '_build/**', 'docs/**'];

const RELEASE_GROUPS = [
  {
    label: '@plone/types',
    packages: ['@plone/types'],
  },
  {
    label: 'Core packages (level 1)',
    packages: ['@plone/components', '@plone/registry'],
  },
  {
    label: 'Utils (level 2)',
    packages: [
      '@plone/babel-preset-razzle',
      '@plone/scripts',
      '@plone/razzle-dev-utils',
      '@plone/razzle',
    ],
  },
  {
    label: 'Add-on packages (level 3)',
    packages: ['@plone/volto-slate'],
  },
  {
    label: 'Application',
    packages: ['@plone/volto'],
  },
];

function readPackageJson(filename) {
  return JSON.parse(readFileSync(filename, 'utf8'));
}

function getPackageMetadata() {
  const packageFiles = [...glob('packages/*/package.json')];

  return packageFiles.reduce(
    (metadata, filename) => {
      const packageJson = readPackageJson(filename);
      const packageDir = path.dirname(filename);

      metadata.byDir.set(packageDir, {
        dir: packageDir,
        name: packageJson.name,
        hasReleaseScript: Boolean(packageJson.scripts?.release),
      });
      metadata.byName.set(packageJson.name, packageDir);

      return metadata;
    },
    {
      byDir: new Map(),
      byName: new Map(),
    },
  );
}

function collectNewsFragments(packageMetadata) {
  const fragmentsByPackage = new Map();

  glob(NEWS_GLOB, { ignore: IGNORE_GLOBS }).forEach((filename) => {
    const packageDir = filename.split('/').slice(0, 2).join('/');
    const metadata = packageMetadata.byDir.get(packageDir);

    if (!metadata) {
      return;
    }

    const packageInfo = fragmentsByPackage.get(metadata.name) ?? {
      ...metadata,
      fragments: [],
    };

    packageInfo.fragments.push(filename);
    fragmentsByPackage.set(metadata.name, packageInfo);
  });

  return fragmentsByPackage;
}

function getPlannedReleases(fragmentsByPackage) {
  const planned = [];

  RELEASE_GROUPS.forEach((group) => {
    const packages = group.packages
      .map((packageName) => fragmentsByPackage.get(packageName))
      .filter(Boolean);

    if (packages.length > 0) {
      planned.push({
        label: group.label,
        packages,
      });
    }
  });

  return planned;
}

function getUnplannedReleases(fragmentsByPackage) {
  const plannedPackageNames = new Set(
    RELEASE_GROUPS.flatMap((group) => group.packages),
  );

  return [...fragmentsByPackage.values()]
    .filter((pkg) => !plannedPackageNames.has(pkg.name))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function printPackageLine(pkg, index) {
  const prefix = index == null ? '-' : `${String(index).padStart(2, ' ')}.`;
  const fragmentLabel =
    pkg.fragments.length === 1
      ? '1 news fragment'
      : `${pkg.fragments.length} news fragments`;
  const releaseLabel = pkg.hasReleaseScript ? '' : ' - no release script';

  console.log(
    `${prefix} ${pkg.name} (${pkg.dir}) - ${fragmentLabel}${releaseLabel}`,
  );
}

function printSummary(plannedReleases, unplannedReleases) {
  if (plannedReleases.length === 0 && unplannedReleases.length === 0) {
    console.log('No releasable news fragments found.');
    return;
  }

  console.log('Release plan');
  console.log('============');

  let releaseIndex = 1;

  plannedReleases.forEach((group) => {
    console.log(`\n${group.label}`);
    group.packages.forEach((pkg) => {
      printPackageLine(pkg, releaseIndex);
      releaseIndex += 1;
    });
  });

  if (unplannedReleases.length > 0) {
    console.log('\nChanged packages outside the planned release chain');
    unplannedReleases.forEach((pkg) => {
      printPackageLine(pkg);
    });
  }
}

function runRelease(packageName) {
  const result = spawnSync('pnpm', ['--filter', packageName, 'release'], {
    stdio: 'inherit',
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    throw new Error(
      `Release failed for ${packageName} with exit code ${result.status}`,
    );
  }
}

async function promptAndRelease(plannedReleases) {
  const packages = plannedReleases.flatMap((group) => group.packages);

  if (packages.length === 0) {
    console.log('\nNothing to release.');
    return;
  }

  const rl = readline.createInterface({ input, output });

  try {
    for (const pkg of packages) {
      const answer = await rl.question(`\nRelease ${pkg.name}? [Y/n/q] `);
      const normalized = answer.trim().toLowerCase();

      if (normalized === 'q') {
        console.log('Release sequence aborted.');
        return;
      }

      if (normalized === 'n') {
        console.log(`Skipped ${pkg.name}.`);
        continue;
      }

      runRelease(pkg.name);
    }
  } finally {
    rl.close();
  }
}

function validateReleasePlan(packageMetadata) {
  const missing = [];
  const withoutReleaseScript = [];

  RELEASE_GROUPS.forEach((group) => {
    group.packages.forEach((packageName) => {
      const packageDir = packageMetadata.byName.get(packageName);

      if (!packageDir) {
        missing.push(packageName);
        return;
      }

      const metadata = packageMetadata.byDir.get(packageDir);

      if (!metadata?.hasReleaseScript) {
        withoutReleaseScript.push(packageName);
      }
    });
  });

  if (missing.length > 0) {
    throw new Error(
      `Release plan references unknown packages: ${missing.join(', ')}`,
    );
  }

  if (withoutReleaseScript.length > 0) {
    throw new Error(
      `Release plan references packages without a release script: ${withoutReleaseScript.join(', ')}`,
    );
  }
}

async function main() {
  const shouldRelease = process.argv.includes('--release');
  const packageMetadata = getPackageMetadata();

  validateReleasePlan(packageMetadata);

  const fragmentsByPackage = collectNewsFragments(packageMetadata);
  const plannedReleases = getPlannedReleases(fragmentsByPackage);
  const unplannedReleases = getUnplannedReleases(fragmentsByPackage);

  printSummary(plannedReleases, unplannedReleases);

  if (shouldRelease) {
    await promptAndRelease(plannedReleases);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
