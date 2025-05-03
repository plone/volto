import { globSync as glob } from 'glob';

// const voltoCorePackages = [
//   'packages/volto-slate',
//   'packages/scripts',
//   'packages/registry',
//   'packages/volto',
// ];

function main() {
  const packagesToRelease = [];

  glob('**/news/*.*(breaking|feature|bugfix|documentation|internal)', {
    ignore: ['**/node_modules/**', '_build/**', 'docs/**'],
  }).map((filename) => {
    const packageDir = filename.split('/').splice(0, 2).join('/');
    if (!packagesToRelease.includes(packageDir)) {
      packagesToRelease.push(packageDir);
    }
    console.log(filename);
  });
  console.log(packagesToRelease);
}

main();
