#!/usr/bin/env node
/* eslint no-console: 0 */
import fs from 'fs';
import https from 'https';

// if (process.argv.length < 3) {
//   console.log(process.argv.length);
//   process.exit(1);
// }

const pkg = process.argv[2];
const version = process.argv[3];

function loadPackageJSON(pkg = '.') {
  return JSON.parse(fs.readFileSync(`${pkg}/package.json`, 'utf8'));
}

async function getVoltoPackageJSON(tag) {
  const url = `https://raw.githubusercontent.com/plone/volto/${tag}/package.json`;
  const requestContent = await new Promise((resolve, reject) => {
    https
      .get(url, {}, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {
          resolve(data);
        });
      })
      .on('error', (err) => {
        reject(err);
      });
  });
  return JSON.parse(requestContent);
}

function updatePackageJSON(path = '.', packageJSON) {
  fs.writeFileSync(
    `${path}/package.json`,
    `${JSON.stringify(packageJSON, null, 2)}`,
  );
}

async function main() {
  const packageJSON = loadPackageJSON();
  const currentVoltoVersion = packageJSON.dependencies['@plone/volto'];
  const VoltoDependencies = (await getVoltoPackageJSON(currentVoltoVersion))
    .dependencies;

  Object.entries(VoltoDependencies).forEach(([pkg, version]) => {
    console.log(`${pkg} @ ${version}`);
    if (packageJSON.dependencies[pkg]) {
      packageJSON.dependencies[pkg] = version;
    }
  });

  updatePackageJSON(packageJSON);
}

main();
