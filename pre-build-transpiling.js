// One of the problems that you can run when running builds on ancient browsers is that
// some library maintainers stopped to build their packages into ES5 before release,
// leaving them in ES6. Since ancient browsers most probably didn't support yet the
// features used, then they break (eg. arrow functions in ie11). You should detect them
// by debugging the error messages in the ancient browser. Then take all this "offending
// packages" and add them to the `offendingPackages` const. This script takes all the
// "offending packages" in the node_modules and runs babel to transpile them to ES5 and
// make them compatible for ancient browsers before the build process
// REQUIREMENTS: yarn add shelljs --dev

const { echo, exec } = require('shelljs');

const offendingPackages = [
  './node_modules/prepend-http',
  './node_modules/url-parse-lax',
  // ... other offending packages you've might find
];

echo('\nPre-build transpiling to ES5 offending packages...\n');
offendingPackages.forEach(pkg =>
  exec(
    `NODE_ENV=production babel --presets=@babel/env ${pkg} --out-dir ${pkg}`,
  ),
);
echo('\nPre-build transpiling finished.\n');
