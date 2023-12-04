import fs from 'fs';
import glob from 'glob';
import { execSync } from 'child_process';

// get directories in src
const directories = fs
  .readdirSync('./src/restapi', { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

/*
  For each directory, run vitest sequentially.

  This is done to make sure that the tests are isolated from which other.

  Using no-threads parameter removes the per-module isolation as well, but
  not using the no-threads parameter causes tests to fail beccause there
  is no isolation at the test DB level and different tests can interefere
  with each other's mutations.
*/

directories.forEach((dir) => {
  glob(`./src/${dir}/*/.test.tsx`, (err, matches) => {
    if (err) {
      console.error(err);
      return;
    }

    // if there are any matches, run vitest on this directory
    if (matches.length > 0) {
      console.log(`Running vitest on src/${dir}`);
      execSync(`pnpm vitest "src/${dir}/*/.test.{ts,tsx,js,jsx}"`, {
        stdio: 'inherit',
      });
    }
  });
});

directories.forEach((dir) => {
  glob(`./src/restapi/${dir}/**/*.test.tsx`, (err, matches) => {
    if (err) {
      console.error(err);
      throw Error(err);
    }

    // if there are any matches, run vitest on this directory
    if (matches.length > 0) {
      console.log(`Running vitest on src/${dir}`);
      execSync(`pnpm vitest run src/restapi/${dir} --no-threads`, {
        stdio: 'inherit',
      });
    }
  });
});
