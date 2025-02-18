#!/usr/bin/env node

// @flow
import findParentDir from 'find-parent-dir';
import execa from 'execa';
import { join } from 'path';
import fs from 'fs';

// environment variables
const {
  LOCKHOOK_BYPASS = false,
  LOCKHOOK_DEBUG = false,
  LOCKHOOK_DRYRUN = false,
} = process.env;

// supported package managers and lockfile names
const lockfileSpecs = [
  {
    checkfile: 'bun.lockb',
    lockfile: 'bun.lockb',
    command: 'bun',
    version: '1',
    arguments: ['install', '--frozen-lockfile '],
  },
  {
    checkfile: '.yarnrc.yml',
    lockfile: 'yarn.lock',
    command: 'yarn',
    version: '2',
    arguments: ['install', '--immutable'],
  },
  {
    checkfile: 'yarn.lock',
    lockfile: 'yarn.lock',
    command: 'yarn',
    version: '1',
    arguments: ['install', '--prefer-offline', '--pure-lockfile'],
  },
  {
    checkfile: 'package-lock.json',
    lockfile: 'package-lock.json',
    command: 'npm',
    version: '>=5',
    arguments: ['install', '--prefer-offline', '--no-audit', '--no-save'],
  },
  {
    checkfile: 'npm-shrinkwrap.json',
    lockfile: 'npm-shrinkwrap.json',
    command: 'npm',
    version: '<5',
    arguments: ['install', '--prefer-offline', '--no-audit', '--no-save'],
  },
  {
    checkfile: 'pnpm-lock.yaml',
    lockfile: 'pnpm-lock.yaml',
    command: 'pnpm',
    version: '>=3',
    arguments: [
      'install',
      '--prefer-offline',
      '--frozen-lockfile',
      '--no-verify-store-integrity',
    ],
  },
  {
    checkfile: 'shrinkwrap.yaml',
    lockfile: 'shrinkwrap.yaml',
    command: 'pnpm',
    version: '<3',
    arguments: ['install', '--prefer-offline', '--prefer-frozen-shrinkwrap'],
  },
];

function getLockfileSpec(currentDir) {
  for (let lockfileSpec of lockfileSpecs) {
    const checkfilePath = join(currentDir, lockfileSpec.checkfile);
    if (fs.existsSync(checkfilePath)) {
      return lockfileSpec;
    }
  }

  return null;
}

if (!LOCKHOOK_BYPASS) {
  // find directories
  const currentDir = process.cwd();
  const gitDir = findParentDir.sync(currentDir, '.git');

  // check for lockfiles
  const lockfileSpec = getLockfileSpec(currentDir);

  if (LOCKHOOK_DEBUG) {
    console.log('currentDir:', currentDir);
    console.log('gitDir:', gitDir);
    console.log('lockfile:', lockfileSpec);
  }

  if (lockfileSpec !== null) {
    // get the command, arguments and lockfile path
    const { lockfile, command, arguments: commandargs } = lockfileSpec;
    const lockfilePath = join(currentDir, lockfile);

    // run a git diff on the lockfile
    const { stdout: output } = execa.sync(
      'git',
      ['diff', 'HEAD@{1}..HEAD@{0}', '--', lockfilePath],
      { cwd: gitDir },
    );

    if (LOCKHOOK_DEBUG) {
      console.log(output);
    }

    // if diff exists, update dependencies
    if (output.length > 0) {
      if (LOCKHOOK_DRYRUN) {
        console.log(
          `Changes to lockfile found, you should run \`${command} install\` if you want to have up-to-date dependencies.`,
        );
      } else {
        console.log(
          `Changes to lockfile found, running \`${command} install\``,
        );
        try {
          execa.sync(command, commandargs, { stdio: 'inherit' });
        } catch (err) {
          console.warn(`Running ${command} ${commandargs.join(' ')} failed`);
        }
      }
    }
  } else {
    const lockfiles = lockfileSpecs.map((spec) => spec.lockfile).join(', ');
    console.warn(
      `I can't find a lockfile. Currently supported lockfiles are: ${lockfiles}.`,
    );
  }
}
