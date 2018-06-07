const shell = require('shelljs');

shell.exec(`cd node_modules/@plone/plone-react && yarn test`, (code) => {
  console.log("Exited with code ", code)
});
