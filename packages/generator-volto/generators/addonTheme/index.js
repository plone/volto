const Generator = require('yeoman-generator');
const path = require('path');
const fs = require('fs');

const currentDir = path.basename(process.cwd());

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('addonName', {
      type: String,
      desc: 'Addon name. Example: @plone-collective/volto-custom-block',
      default: currentDir,
    });

    this.option('outputpath', {
      type: String,
      desc: 'Output path',
      default: '',
    });

    this.args = args;
    this.opts = opts;

    this.addAddonToPackageJSON = async function (pkgJson) {
      const packageJSON = JSON.parse(fs.readFileSync(pkgJson, 'utf8'));

      // const packageJSON = JSON.parse(fs.readFileSync(pkgJson, 'utf8'));
      const name = this.globals.name;

      if (!packageJSON.addons) {
        packageJSON.addons = [];
      }

      if (!packageJSON.addons.includes(name)) {
        packageJSON.addons = [...(packageJSON.addons || []), name];
      }

      packageJSON.theme = name;

      fs.writeFileSync(pkgJson, `${JSON.stringify(packageJSON, null, 2)}`);
    };

    this.globals = {
      addonName: '',
      scope: '',
      name: '',
      normalizedName: '',
      outputpath: '',
    };

    this.globals.outputpath = this.opts.outputpath;
    this.globals.addonName = this.opts.addonName;

    if (this.globals.addonName.includes('/')) {
      [this.globals.scope, this.globals.name] =
        this.globals.addonName.split('/');
      this.globals.normalizedName = `${this.globals.scope.replace(
        '@',
        '',
      )}/${this.globals.name.replace('-', '')}`;
    } else {
      this.globals.name = this.globals.addonName;
      this.globals.normalizedName = `${this.globals.name.replace('-', '')}`;
    }
  }

  async setDestination() {
    // if in a Volto project, generate addon in src/addons
    const outputPath = path.resolve(this.globals.outputpath) || process.cwd();
    this.destinationRoot(outputPath);

    const pkgJson = path.join(outputPath, 'package.json');
    let destination;

    if (fs.existsSync(pkgJson)) {
      if (pkgJson.keywords && pkgJson.keywords.includes('volto-addon')) {
        destination = outputPath;
      } else {
        destination = path.join(
          outputPath,
          `./src/addons/${this.globals.name}`,
        );
      }
      // Modifies project package.json and wires the new addon as theme
      await this.addAddonToPackageJSON(pkgJson);

      this.destinationRoot(destination);
    }
  }

  install() {
    this.fs.copyTpl(this.templatePath(), this.destinationPath(), {
      ...this.globals,
      ignore: ['**/*.tpl', '**/*~', '**/.gitignorefile'],
      dot: true,
    });
  }
};
