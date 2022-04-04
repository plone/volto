#!/usr/bin/env node
/* eslint no-console: 0 */
/**
 * addon testing setup convenience script
 * @module scripts/addon
 */
const { program } = require('commander');
const { execSync } = require('child_process');
const https = require('https');
const GitUrlParse = require('git-url-parse');
const fs = require('fs');
const { develop } = require('mrs-developer');
const chalk = require('chalk');

function amendPackageJSON(name, destination) {
  const packageJSON = JSON.parse(
    fs.readFileSync(`${destination}/package.json`, 'utf8'),
  );
  packageJSON.scripts = {
    ...packageJSON.scripts,
    'cypress:open': `cd src/addons/${name} && NODE_ENV=test cypress open`,
    test: `RAZZLE_JEST_CONFIG=src/addons/${name}/jest-addon.config.js razzle test --env=jest-environment-jsdom-sixteen --passWithNoTests`,
    'cypress:run': `cd src/addons/${name} && NODE_ENV=test cypress run`,
  };
  fs.writeFileSync(
    `${destination}/package.json`,
    `${JSON.stringify(packageJSON, null, 4)}`,
  );
}

function createMrsDeveloperConfig(config) {
  const template = { [config.name]: {} };
  const packageName = config.fullname || config.name;
  template[config.name].package = packageName;
  template[config.name].url = config.source;
  template[config.name].path = 'src';
  template[config.name].branch = config.branch || 'main';

  fs.writeFileSync(
    `${config.destination}/mrs.developer.json`,
    `${JSON.stringify(template, null, 4)}`,
  );
}

/*
 * Retrieves latest Volto released version from NPM registry
 */
async function getAddonInfo({ source, branch = 'main', isPrivate }) {
  const sourceParse = GitUrlParse(source);
  const packageJSONURL = isPrivate
    ? `https://api.github.com/repos/${sourceParse.full_name}/contents/package.json`
    : `https://raw.githubusercontent.com/${sourceParse.full_name}/${branch}/package.json`;

  return new Promise((resolve, reject) => {
    https
      .get(
        packageJSONURL,
        {
          headers: {
            ...(isPrivate
              ? {
                  Authorization: `token ${process.env.GITHUB_TOKEN}`,
                  'User-Agent': 'node.js',
                  Accept: 'application/vnd.github.VERSION.raw',
                }
              : {}),
          },
        },
        (resp) => {
          let data = [];
          resp.on('data', (chunk) => {
            data.push(chunk);
          });
          resp.on('end', () => {
            const res = JSON.parse(data.join(''));
            resolve({
              name: res.name,
              version: res.version,
              ...(res.name.includes('@')
                ? { fullname: res.name, name: res.name.split('/')[1] }
                : {}),
            });
          });
        },
      )
      .on('error', (err) => {
        reject(err.message);
      });
  });
}

async function runGenerator({
  source,
  destination = 'addon-testing-project',
  isPrivate = false,
  branch = 'main',
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

  const { fullname, name, version } = await getAddonInfo({
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
  }`;

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

function cloneAddon({
  source,
  destination = 'addon-testing-project',
  branch = 'main',
  isPrivate,
}) {
  console.log(
    chalk.green(
      `Cloning addon from ${chalk.yellow(
        source,
      )} and creating a testing environment in ${chalk.yellow(destination)}`,
    ),
  );
  runGenerator({ source, destination, branch, isPrivate }).then();
}

// This is the equivalent of `if __name__ == '__main__'` in Python :)
if (require.main === module) {
  program
    .command('clone <source> [destination]')
    .description('clone a repository into a newly created directory')
    .option(
      '-p, --private',
      'set if the repo is private, then GITHUB_TOKEN is used',
    )
    .option('-b, --branch <branch>', 'set the repo branch, defaults to main')
    .action((source, destination, options) => {
      cloneAddon({
        source,
        destination,
        isPrivate: options.private,
        branch: options.branch,
      });
    });
  program.parse(process.argv);
}
