import { globSync as glob } from 'glob';
import { map } from 'es-toolkit/compat';

// const voltoCorePackages = [
//   'packages/volto-slate',
//   'packages/scripts',
//   'packages/registry',
//   'packages/volto',
// ];

function main() {
  const packagesToRelease = [];
  map(
    glob('**/news/*.*(breaking|feature|bugfix|documentation|internal)', {
      ignore: ['**/node_modules/**', 'docs/**'],
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
