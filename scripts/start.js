const shell = require('shelljs');

shell.exec(`cd node_modules/@plone/plone-react && yarn dev`, (code) => {
  console.log("Exited with code ", code)
});
