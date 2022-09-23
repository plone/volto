/* eslint no-console: 0 */
import { execSync } from 'child_process';
import { develop } from 'mrs-developer';
import chalk from 'chalk';
import { getGitAddonInfo } from './getAddonInfo.js';
import { amendPackageJSON, createMrsDeveloperConfig } from './utils.js';

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
    //  console.log(`stdout: ${stdout}`);
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

  execSync(`cd ${destination} && yarn`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    //  console.log(`stdout: ${stdout}`);
  });

  console.log(
    chalk.green(
      `Preparing and amending testing project ${chalk.yellow('package.json')}`,
    ),
  );
  amendPackageJSON(name, destination);
}
