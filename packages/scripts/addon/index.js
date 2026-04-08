#!/usr/bin/env node
/* eslint no-console: 0 */
/**
 * addon testing setup convenience script
 * @module scripts/addon
 */
import { program } from 'commander';
import chalk from 'chalk';
import { runGitGenerator, runLocalGenerator } from './generators.js';
import { consolidateAddon } from './consolidate.js';

function cloneAddon({
  source,
  destination = 'addon-testing-project',
  branch = 'main',
  isPrivate,
  isCanary = false,
}) {
  const isLocal = source === '.';

  if (isLocal) {
    console.log(
      chalk.yellow(
        'Using local configuration, remember to run this command at the root of your add-on',
      ),
      chalk.green(
        `Copying current add-on data into the project ${chalk.yellow(
          destination,
        )}`,
      ),
    );

    runLocalGenerator({
      source,
      destination,
      branch,
      isPrivate,
      isCanary,
      isLocal,
    }).then();
  } else {
    console.log(
      chalk.green(
        `Cloning addon from ${chalk.yellow(
          source,
        )} and creating a testing environment in ${chalk.yellow(destination)}`,
      ),
    );

    runGitGenerator({
      source,
      destination,
      branch,
      isPrivate,
      isCanary,
      isLocal,
    }).then();
  }
}

program
  .command('clone <source> [destination]')
  .description('clone a repository into a newly created directory')
  .option(
    '-p, --private',
    'set if the repo is private, then GITHUB_TOKEN is used',
  )
  .option('-b, --branch <branch>', 'set the repo branch, defaults to main')
  .option('-c, --canary', 'downloads latest Volto canary (alpha) version')
  .action((source, destination, options) => {
    cloneAddon({
      source,
      destination,
      isPrivate: options.private,
      isCanary: options.canary,
      branch: options.branch,
    });
  });

program
  .command('consolidate [source]')
  .description('Consolidate a cloned project')
  .action((source = 'addon-testing-project') => {
    consolidateAddon({
      source,
    });
  });
program.parse(process.argv);
