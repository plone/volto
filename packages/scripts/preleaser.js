import glob from 'glob';
import lodash from 'lodash';
const { map } = lodash;

// const voltoCorePackages = [
//   'packages/volto-slate',
//   'packages/scripts',
//   'packages/registry',
//   'packages/volto',
// ];

function main() {
  const packagesToRelease = [];
  map(
    glob.sync('**/news/*.*(breaking|feature|bugfix|documentation|internal)', {
      ignore: ['**/node_modules/**'],
    }),
    (filename) => {
      const packageDir = filename.split('/').splice(0, 2).join('/');
      if (!packagesToRelease.includes(packageDir)) {
        packagesToRelease.push(packageDir);
      }
      console.log(filename);
    },
  );
  console.log(packagesToRelease);
}

main();
