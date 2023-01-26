/* eslint no-console: 0 */
import fs from 'fs';
import fse from 'fs-extra';
import { execSync } from 'child_process';
import { develop } from 'mrs-developer';
import chalk from 'chalk';
import { getGitAddonInfo, getLocalAddonInfo } from './getAddonInfo.js';
import {
  amendPackageJSON,
  createLocalMrsDeveloperConfig,
  createMrsDeveloperConfig,
} from './utils.js';

export async function runGitGenerator({
  source,
  destination = 'addon-testing-project',
  isPrivate = false,
  branch = 'main',
  isCanary = false,
}) {
  if (isPrivate) {
    console.log(
      chalk.green(
        `Retrieving private package info from branch ${chalk.yellow(
          branch,
        )} repo ${chalk.yellow(source)}`,
      ),
    );
  } else {
    console.log(
      chalk.blue(
        `Retrieving package info from branch ${chalk.yellow(
          branch,
        )} repo ${chalk.yellow(source)}`,
      ),
    );
  }

  const { fullname, name, version } = await getGitAddonInfo({
    source,
    branch,
    isPrivate,
  });

  console.log(
    chalk.green(
      `The package name is ${chalk.yellow(
        fullname || name,
      )} pulling version ${chalk.yellow(version)}`,
    ),
  );

  const GENERATOR_CLI = `yo --force --no-insight @plone/volto ${destination} --no-interactive --skip-install --workspace src/addons/${name} --addon ${
    fullname || name
  } ${isCanary ? '--canary' : ''}`;

  execSync(GENERATOR_CLI, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
  });

  createMrsDeveloperConfig({
    fullname,
    name,
    version,
    source,
    destination,
    branch,
  });

  await develop({
    root: destination,
    configFile: 'jsconfig.json',
    output: 'addons',
  });

  execSync(
    `cd ${destination} && yarn config set enableImmutableInstalls false && yarn install`,
    { stdio: 'inherit' },
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
    },
  );

  console.log(
    chalk.green(
      `Preparing and amending testing project ${chalk.yellow('package.json')}`,
    ),
  );
  amendPackageJSON(name, destination, isCanary);
}

export async function runLocalGenerator({
  source,
  destination = 'addon-testing-project',
  isCanary = false,
}) {
  const { fullname, name, version } = await getLocalAddonInfo({
    source,
  });

  console.log(
    chalk.green(
      `The package name is ${chalk.yellow(
        fullname || name,
      )} pulling version ${chalk.yellow(version)}`,
    ),
  );

  const GENERATOR_CLI = `yo --force --no-insight @plone/volto ${destination} --no-interactive --skip-install --workspace src/addons/${name} --addon ${
    fullname || name
  } ${isCanary ? '--canary' : ''}`;

  execSync(GENERATOR_CLI, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
  });

  try {
    const filterFunc = (filenames) => {
      const IGNORE_FILES = ['node_modules', '.git', destination];
      return filenames.filter((item) => !IGNORE_FILES.includes(item));
    };
    const filenames = filterFunc(fs.readdirSync(source));

    filenames.forEach((filename) => {
      fse.copySync(
        `${source}/${filename}`,
        `${destination}/src/addons/${name}/${filename}`,
        {
          overwrite: false,
        },
      );
    });
  } catch (err) {
    console.error(err);
  }

  createLocalMrsDeveloperConfig({
    fullname,
    name,
    version,
    source,
    destination,
  });

  await develop({
    root: destination,
    configFile: 'jsconfig.json',
    output: 'addons',
  });

  execSync(
    `cd ${destination} && yarn config set enableImmutableInstalls false && yarn install`,
    { stdio: 'inherit' },
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
    },
  );

  console.log(
    chalk.green(
      `Preparing and amending testing project ${chalk.yellow('package.json')}`,
    ),
  );
  amendPackageJSON(name, destination, isCanary);
}
