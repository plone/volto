#!/usr/bin/env node
/* eslint no-console: 0 */
/**
 * addon testing setup convenience script
 * @module scripts/addon
 */
import { program } from 'commander';
import chalk from 'chalk';
import { runGitGenerator } from './generators.js';

function cloneAddon({
  source,
  destination = 'addon-testing-project',
  branch = 'main',
  isPrivate,
  isCanary = false,
  isLocal = false,
}) {
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

program
  .command('clone <source> [destination]')
  .description('clone a repository into a newly created directory')
  .option(
    '-p, --private',
    'set if the repo is private, then GITHUB_TOKEN is used',
  )
  .option('-b, --branch <branch>', 'set the repo branch, defaults to main')
  .option('-c, --canary', 'downloads latest Volto canary (alpha) version')
  .option('-l, --local', 'copy the current add-on source into the project')
  .action((source, destination, options) => {
    cloneAddon({
      source,
      destination,
      isPrivate: options.private,
      isCanary: options.canary,
      isLocal: options.local,
      branch: options.branch,
    });
  });
program.parse(process.argv);
