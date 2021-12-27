#!/usr/bin/env node
/* eslint no-console: 0 */
/**
 * testing-addon script.
 * @module scripts/testing-addon
 */
const { program } = require('commander');
const { execSync } = require('child_process');
const https = require('https');
const GitUrlParse = require('git-url-parse');
const fs = require('fs');
const { develop } = require('mrs-developer');
const chalk = require('chalk');

function main() {}

function amendPackageJSON(name, destination) {
  const packageJSON = JSON.parse(
    fs.readFileSync(`${destination}/package.json`, 'utf8'),
  );
  packageJSON.scripts = {
    ...packageJSON.scripts,
    'cypress:open': `cd src/addons/${name} && NODE_ENV=test cypress open`,
  };
  console.log(packageJSON);
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

  console.log(sourceParse);
  console.log(packageJSONURL);

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
            console.log(res);
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
  const { fullname, name, version } = await getAddonInfo({ source, isPrivate });
  console.log(fullname);
  console.log(name);
  console.log(version);
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
    console.log(`stdout: ${stdout}`);
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
    console.log(`stdout: ${stdout}`);
  });

  amendPackageJSON(name, destination);
}

function cloneAddon(
  source,
  destination = 'addon-testing-project',
  branch = 'main',
) {
  console.log(
    chalk.green(
      `Cloning addon from ${source} and creating a testing environment in ${destination}`,
    ),
  );
  runGenerator(source, destination, branch).then();
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
  const options = program.opts();
  main({ addonMode: options.addon });
}
