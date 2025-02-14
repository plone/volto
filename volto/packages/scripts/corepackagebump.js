#!/usr/bin/env node
/* eslint no-console: 0 */
import fs from 'fs';

if (process.argv.length < 3) {
  console.log(process.argv.length);
  process.exit(1);
}

const pkg = process.argv[2];
const version = process.argv[3];

const packageJSON = JSON.parse(fs.readFileSync(`${pkg}/package.json`, 'utf8'));

packageJSON.version = version;

fs.writeFileSync(
  `${pkg}/package.json`,
  `${JSON.stringify(packageJSON, null, 2)}`,
);
