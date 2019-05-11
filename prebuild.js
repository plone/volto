const { echo, exec } = require('shelljs');

const packages = [
  './node_modules/prepend-http',
  './node_modules/url-parse-lax',
  // ... other dependencies
];

echo('\nPre build starts.\n');
packages.forEach(pack =>
  exec(
    `NODE_ENV=production babel --presets=@babel/env ${pack} --out-dir ${pack}`,
  ),
);
echo('\nPre build finished.\n');
