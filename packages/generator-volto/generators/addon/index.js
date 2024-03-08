// to debug, run: export DEBUG=yeoman:generator
// or run: export DEBUG="@plone/volto:addon"

const gitly = require('gitly');
const path = require('path');
const Generator = require('yeoman-generator');
const fs = require('fs');
// const chalk = require('chalk');

const currentDir = path.basename(process.cwd());

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('addonName', {
      type: String,
      desc: 'Addon name, e.g.: @plone-collective/volto-custom-block',
      default: currentDir,
    });

    this.option('interactive', {
      type: Boolean,
      desc: 'Enable/disable interactive prompt',
      default: true,
    });

    this.option('template', {
      type: String,
      desc: 'Use github repo template, e.g.: eea/volto-addon-template',
      default: '',
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

      if (!packageJSON.workspaces) {
        packageJSON.workspaces = [];
      }

      if (!packageJSON.workspaces.includes(`src/addons/${this.globals.name}`)) {
        packageJSON.workspaces.push(`src/addons/${this.globals.name}`);
      }

      fs.writeFileSync(pkgJson, `${JSON.stringify(packageJSON, null, 2)}`);
    };

    this.addMrsDeveloperConfig = async function (mrsDeveloperJsonFile) {
      let mrsDeveloperJson = {};
      if (fs.existsSync(mrsDeveloperJsonFile)) {
        mrsDeveloperJson = JSON.parse(
          fs.readFileSync(mrsDeveloperJsonFile, 'utf8'),
        );
      }

      const template = {
        [this.globals.name]: { local: `addons/${this.globals.name}/src` },
      };

      fs.writeFileSync(
        mrsDeveloperJsonFile,
        `${JSON.stringify({ ...mrsDeveloperJson, ...template }, null, 2)}`,
      );
    };

    this.addToIgnoreFile = async function (ignoreFile) {
      fs.appendFileSync(ignoreFile, `\n!src/addons/${this.globals.name}`);
    };
  }

  async prompting() {
    const updateNotifier = require('update-notifier');
    const pkg = require('../../package.json'); // this generator's package.json
    const updater = updateNotifier({
      pkg,
      shouldNotifyInNpmScript: true,
      updateCheckInterval: 0,
    });

    // TODO: this needs to be composeWith and refactored
    updater.notify({
      defer: false,
      message: `Update available: {currentVersion} -> {latestVersion}

It's important to have the generators updated!

Run "npm install -g @plone/generator-volto" to update.`,
    });

    this.globals = {
      addonName: '',
      name: '',
      scope: '',
      template: '',
      outputpath: '',
    };
    let props;

    this.globals.outputpath = this.opts.outputpath;
    // Add-on name
    if (this.args[0]) {
      this.globals.addonName = this.args[0];
    } else {
      if (this.opts['interactive']) {
        props = await this.prompt([
          {
            type: 'input',
            name: 'addonName',
            message: 'Addon name, e.g.: @plone-collective/volto-custom-block',
            default: path.basename(process.cwd()),
          },
        ]);
        this.globals.addonName = props.addonName;
      } else {
        this.globals.addonName =
          this.opts.addonName || path.basename(process.cwd());
      }
    }

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

    // Template
    if (this.opts.template) {
      this.globals.template = this.opts.template;
    }
  }

  async setDestination() {
    this._debug('namespace', this.options.namespace);
    // if in a Volto project, generate addon in src/addons
    const outputPath = path.resolve(this.globals.outputpath) || process.cwd();
    this.destinationRoot(outputPath);

    const pkgJson = path.join(outputPath, 'package.json');

    if (fs.existsSync(pkgJson)) {
      const gitIgnore = path.join(outputPath, '.gitignore');
      const eslintIgnore = path.join(outputPath, '.eslintignore');
      const prettierIgnore = path.join(outputPath, '.prettierignore');
      const mrsDeveloperJson = path.join(outputPath, 'mrs.developer.json');

      const destination = path.join(
        outputPath,
        `./src/addons/${this.globals.name}`,
      );

      if (fs.existsSync(destination)) {
        return;
      }

      await this.addToIgnoreFile(gitIgnore);
      await this.addToIgnoreFile(eslintIgnore);
      await this.addToIgnoreFile(prettierIgnore);
      // Modifies project package.json and wires the new addon
      await this.addAddonToPackageJSON(pkgJson);
      // Modifies project mrs.developer.json and wires the new addon localy
      await this.addMrsDeveloperConfig(mrsDeveloperJson);

      this._debug('set destination to:', destination);
      this.destinationRoot(destination);
    }
  }

  async fetchTemplate() {
    // if a Github template is provided, clone it under .template in destination

    if (this.globals.template) {
      this._debug('Cloning template in .template');
      await gitly.default(
        this.globals.template,
        this.destinationPath('.template'),
      );
      this.sourceRoot('.template');
    }
  }

  install() {
    // copy dotfiles
    this.fs.copyTpl(this.templatePath('**/.*'), this.destinationPath(), {
      ignore: ['**/*.tpl', '**/*~', '**/.gitignorefile'],
    });

    // Copy .gitignorefile to .gitignore
    this.fs.copyTpl(
      this.templatePath('.gitignorefile'),
      this.destinationPath('.gitignore'),
      this.globals,
    );
    this.fs.delete('.gitignorefile');

    // Copy and parse the rest of the template files
    this.fs.copyTpl(this.templatePath(), this.destinationPath(), {
      ...this.globals,
      ignore: ['**/*.tpl', '**/*~'],
      dot: true,
    });
  }

  end() {
    if (this.sourceRoot().endsWith('.template')) {
      this._debug('Removing template clone');
      fs.rmdirSync(this.sourceRoot(), { recursive: true });
    }
    this.log("Done. Now run 'yarn' to install dependencies");
  }
};
