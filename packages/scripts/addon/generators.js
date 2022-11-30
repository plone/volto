/* eslint no-console: 0 */
import { execSync } from 'child_process';
import { develop } from 'mrs-developer';
import chalk from 'chalk';
import { getGitAddonInfo, getLocalAddonInfo } from './getAddonInfo.js';
import {
  amendPackageJSON,
  createLocalMrsDeveloperConfig,
  createMrsDeveloperConfig,
} from './utils.js';
import fse from 'fs-extra';

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
    fse.copySync(`${source}/src`, `${destination}/src/addons/${name}/src`, {
      overwrite: false,
    });
    fse.copySync(
      `${source}/jest-addon.config.js`,
      `${destination}/src/addons/${name}/jest-addon.config.js`,
      {
        overwrite: false,
      },
    );
    fse.copySync(
      `${source}/package.json`,
      `${destination}/src/addons/${name}/package.json`,
      {
        overwrite: false,
      },
    );
    fse.copySync(
      `${source}/yarn.lock`,
      `${destination}/src/addons/${name}/yarn.lock`,
      {
        overwrite: false,
      },
    );
    fse.copySync(
      `${source}/cypress`,
      `${destination}/src/addons/${name}/cypress`,
      {
        overwrite: false,
      },
    );
    fse.copySync(
      `${source}/cypress.config.js`,
      `${destination}/src/addons/${name}/cypress.config.js`,
      {
        overwrite: false,
      },
    );
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
