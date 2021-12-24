#!/usr/bin/env node
/* eslint no-console: 0 */
/**
 * testing-addon script.
 * @module scripts/testing-addon
 */
const { program } = require('commander');
const { exec } = require('child_process');
const https = require('https');
const GitUrlParse = require('git-url-parse');
const fs = require('fs');
const { develop } = require('mrs-developer');

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
  const package = config.fullname || config.name;
  template[config.name].package = package;
  template[config.name].url = config.source;
  template[config.name].branch = config.branch || 'main';

  fs.writeFileSync(
    `${config.destination}/mrs.developer.json`,
    `${JSON.stringify(template, null, 4)}`,
  );
}

/*
 * Retrieves latest Volto released version from NPM registry
 */
async function getAddonInfo(source, branch = 'main') {
  const sourceParse = GitUrlParse(source);
  const httpRawURL = sourceParse
    .toString('https')
    .replace('github.com', 'raw.githubusercontent.com');
  const packageJSONURL = `${httpRawURL}/${branch}/package.json`;

  console.log(sourceParse);
  console.log(packageJSONURL);

  return new Promise((resolve, reject) => {
    https
      .get(packageJSONURL, { headers: {} }, (resp) => {
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
      })
      .on('error', (err) => {
        reject(err.message);
      });
  });
}

async function runGenerator(source, destination = 'addon-testing-project') {
  const { fullname, name, version } = await getAddonInfo(source);
  console.log(fullname);
  console.log(name);
  console.log(version);
  const GENERATOR_CLI = `yo --force --no-insight @plone/volto ${destination} --no-interactive --skip-install --workspace src/addons/${name} --addon ${
    fullname || name
  }`;

  exec(GENERATOR_CLI, (error, stdout, stderr) => {
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
  createMrsDeveloperConfig({ fullname, name, version, source, destination });

  await develop({
    root: destination,
    configFile: 'jsconfig.json',
    output: 'addons',
  });

  exec(`cd ${destination} && yarn`, (error, stdout, stderr) => {
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

function cloneAddon(source, destination) {
  console.log(`${source} : ${destination}`);
  //  exec();
  runGenerator(source, destination).then();
}

// This is the equivalent of `if __name__ == '__main__'` in Python :)
if (require.main === module) {
  program
    .command('clone <source> [destination]')
    .description('clone a repository into a newly created directory')
    .action((source, destination) => {
      cloneAddon(source, destination);
    });
  program.parse(process.argv);
  const options = program.opts();
  main({ addonMode: options.addon });
}
