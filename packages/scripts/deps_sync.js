#!/usr/bin/env node
/* eslint no-console: 0 */
import fs from 'fs';
import https from 'https';

function loadPackageJSON(path = '.') {
  return JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf8'));
}

async function getVoltoPackageJSON(tag) {
  const url = `https://raw.githubusercontent.com/plone/volto/${tag}/packages/volto/package.json`;
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
  // Sort the keys of the devDependencies object
  const orderedDevDependencies = Object.keys(packageJSON.devDependencies)
    .sort()
    .reduce((obj, key) => {
      obj[key] = packageJSON.devDependencies[key];
      return obj;
    }, {});

  // Replace the devDependencies with the ordered version
  packageJSON.devDependencies = orderedDevDependencies;

  fs.writeFileSync(
    `${path}/package.json`,
    `${JSON.stringify(packageJSON, null, 2)}`,
  );
}

async function main() {
  const path = process.argv[2];
  console.log(path);
  const packageJSON = loadPackageJSON(path);
  const currentVoltoVersion = packageJSON.dependencies['@plone/volto'];
  let voltoPackageJSON;
  if (currentVoltoVersion === 'workspace:*') {
    voltoPackageJSON = loadPackageJSON('packages/volto');
  } else {
    voltoPackageJSON = await getVoltoPackageJSON(currentVoltoVersion);
  }

  const VoltoDependencies = voltoPackageJSON.dependencies;
  const VoltoDevDependencies = voltoPackageJSON.devDependencies;

  Object.entries(VoltoDevDependencies).forEach(([pkg, version]) => {
    // console.log(`${pkg} @ ${version}`);
    if (packageJSON.devDependencies[pkg]) {
      packageJSON.devDependencies[pkg] = version;
      console.log(`Updated devDependency on ${pkg} to version ${version}`);
    } else {
      packageJSON.devDependencies[pkg] = version;
      console.log(`Added devDependency on ${pkg} to version ${version}`);
    }
  });

  Object.entries(VoltoDependencies).forEach(([pkg, version]) => {
    // console.log(`${pkg} @ ${version}`);
    if (packageJSON.dependencies[pkg]) {
      packageJSON.dependencies[pkg] = version;
      console.log(`Updated dependency on ${pkg} to version ${version}`);
    }
  });

  updatePackageJSON(path, packageJSON);
}

main();
