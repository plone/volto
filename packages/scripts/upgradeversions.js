#!/usr/bin/env node
/**
 * Update pnpm-lock.yaml, including transitive dependencies, to the latest
 * versions allowed by the current ranges, then bump `^`/`~` specifiers in
 * catalog.json and workspace package.json files to those resolved versions.
 *
 * Usage: node packages/scripts/upgradeversions.js [--catalog] [--packages] [--dry-run]
 * Without --catalog or --packages, both are bumped.
 * --dry-run skips the lockfile update and only reports the bumps.
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const onlyCatalog = args.includes('--catalog');
const onlyPackages = args.includes('--packages');
const doCatalog = onlyCatalog || !onlyPackages;
const doPackages = onlyPackages || !onlyCatalog;

const root = process.cwd();
const lockfilePath = path.join(root, 'pnpm-lock.yaml');
if (!fs.existsSync(lockfilePath)) {
  console.error(`pnpm-lock.yaml not found in ${root}`);
  process.exit(1);
}

const DEP_SECTIONS = [
  'dependencies',
  'devDependencies',
  'optionalDependencies',
];
// Volto must stay on a single React version, so never upgrade it here.
const EXCLUDED = ['react', 'react-dom'];
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const RANGE = /^([\^~])(\d+(?:\.\d+){0,2}(?:-[0-9A-Za-z.-]+)?)$/;

const unquote = (s) => s.trim().replace(/^'(.*)'$/, '$1');

// Minimal parser for the fixed-indentation lockfile v9 layout of the
// `catalogs.default` and `importers` sections.
function parseLockfile(content) {
  const catalog = {};
  const importers = {};
  let topSection = null;
  let catalogName = null;
  let importer = null;
  let depSection = null;
  let current = null;

  for (const line of content.split('\n')) {
    if (!line.trim()) continue;
    const indent = line.length - line.trimStart().length;
    const text = line.trim();

    if (indent === 0) {
      topSection = text.replace(/:$/, '');
      current = null;
      continue;
    }

    if (topSection === 'catalogs') {
      if (indent === 2) {
        catalogName = unquote(text.replace(/:$/, ''));
      } else if (indent === 4 && catalogName === 'default') {
        current = catalog[unquote(text.replace(/:$/, ''))] = {};
      } else if (indent === 6 && current) {
        const [key, ...rest] = text.split(':');
        current[key] = unquote(rest.join(':'));
      }
    } else if (topSection === 'importers') {
      if (indent === 2) {
        importer = importers[unquote(text.replace(/:$/, ''))] = {};
        depSection = null;
        current = null;
      } else if (indent === 4) {
        const name = text.replace(/:$/, '');
        depSection = DEP_SECTIONS.includes(name) ? name : null;
        if (depSection) importer[depSection] = {};
        current = null;
      } else if (indent === 6 && depSection) {
        current = importer[depSection][unquote(text.replace(/:$/, ''))] = {};
      } else if (indent === 8 && current) {
        const [key, ...rest] = text.split(':');
        current[key] = unquote(rest.join(':'));
      }
    }
  }
  return { catalog, importers };
}

const parts = (v) => v.split('-')[0].split('.').map(Number);

// Returns 1 if `version` is newer than `base` and within the `^`/`~` range.
function compareInRange(prefix, base, version) {
  const b = parts(base);
  const v = parts(version);
  const fixed =
    prefix === '~'
      ? Math.min(b.length, 2)
      : b.findIndex((n) => n !== 0) + 1 || b.length;
  for (let i = 0; i < fixed; i++) if (v[i] !== b[i]) return -1;
  for (let i = 0; i < 3; i++) {
    if (v[i] !== (b[i] ?? 0)) return v[i] > (b[i] ?? 0) ? 1 : -1;
  }
  return 0;
}

function bumpSpecifier(specifier, lockedVersion) {
  if (!specifier || !lockedVersion) return null;
  const version = lockedVersion.split('(')[0];
  if (!SEMVER.test(version) || version.includes('-')) return null;
  const match = specifier.match(RANGE);
  if (!match) return null;
  const [, prefix, base] = match;
  if (compareInRange(prefix, base, version) !== 1) return null;
  return `${prefix}${version}`;
}

function writeJSON(file, original, data) {
  const indent = original.match(/^[ \t]+(?=")/m)?.[0] ?? 2;
  const eol = original.endsWith('\n') ? '\n' : '';
  fs.writeFileSync(file, JSON.stringify(data, null, indent) + eol);
}

const run = (cmd) => execSync(cmd, { cwd: root, stdio: 'inherit' });

if (!dryRun) {
  // `pnpm update` rewrites pnpm-workspace.yaml (comments, catalog) and
  // package.json specifiers on its own, so only keep its lockfile changes.
  const before = parseLockfile(fs.readFileSync(lockfilePath, 'utf-8'));
  const files = [
    'pnpm-workspace.yaml',
    'catalog.json',
    ...Object.keys(before.importers).map((p) => path.join(p, 'package.json')),
  ]
    .map((f) => path.join(root, f))
    .filter((f) => fs.existsSync(f));
  const snapshot = new Map(files.map((f) => [f, fs.readFileSync(f)]));
  try {
    run(
      `pnpm update -r --lockfile-only ${EXCLUDED.map((n) => `'!${n}'`).join(' ')}`,
    );
  } finally {
    for (const [f, content] of snapshot) fs.writeFileSync(f, content);
  }
}

const { catalog, importers } = parseLockfile(
  fs.readFileSync(lockfilePath, 'utf-8'),
);
let total = 0;

if (doCatalog) {
  const catalogPath = path.join(root, 'catalog.json');
  const raw = fs.readFileSync(catalogPath, 'utf-8');
  const data = JSON.parse(raw);
  let changed = 0;
  for (const [name, specifier] of Object.entries(data)) {
    if (EXCLUDED.includes(name)) continue;
    const next = bumpSpecifier(specifier, catalog[name]?.version);
    if (!next) continue;
    console.log(`catalog.json: ${name} ${specifier} -> ${next}`);
    data[name] = next;
    changed++;
  }
  if (changed && !dryRun) writeJSON(catalogPath, raw, data);
  total += changed;
}

if (doPackages) {
  for (const [importerPath, sections] of Object.entries(importers)) {
    const pkgPath = path.join(root, importerPath, 'package.json');
    if (!fs.existsSync(pkgPath)) continue;
    const raw = fs.readFileSync(pkgPath, 'utf-8');
    const data = JSON.parse(raw);
    const relPath = path.relative(root, pkgPath);
    let changed = 0;
    for (const section of DEP_SECTIONS) {
      const deps = data[section];
      if (!deps || !sections[section]) continue;
      for (const [name, locked] of Object.entries(sections[section])) {
        if (EXCLUDED.includes(name)) continue;
        const next = bumpSpecifier(deps[name], locked.version);
        if (!next) continue;
        console.log(
          `${relPath} [${section}]: ${name} ${deps[name]} -> ${next}`,
        );
        deps[name] = next;
        changed++;
      }
    }
    if (changed && !dryRun) writeJSON(pkgPath, raw, data);
    total += changed;
  }
}

console.log(
  total
    ? `${dryRun ? 'Would update' : 'Updated'} ${total} specifier(s).`
    : 'All specifiers already match pnpm-lock.yaml.',
);

// `pnpm update` keeps stale transitive versions next to the new ones; dedupe
// drops them while also refreshing lockfile specifiers and node_modules.
if (!dryRun) run('pnpm dedupe');
