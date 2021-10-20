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
        this.globals.addonName = path.basename(process.cwd());
      }
    }

    if (this.globals.addonName.includes('/')) {
      [this.globals.scope, this.globals.name] = this.globals.addonName.split(
        '/',
      );
    } else {
      this.globals.name = this.globals.addonName;
    }

    // Template
    if (this.opts.template) {
      this.globals.template = this.opts.template;
    }
  }

  setDestination() {
    this._debug('namespace', this.options.namespace);
    // if in a Volto project, generate addon in src/addons

    if (this.opts.outputpath) {
      this._debug('set destination to:', this.opts.outputpath);
      this.destinationRoot(this.opts.outputpath);
      return;
    }

    const pkgJson = path.join(process.cwd(), 'package.json');

    if (fs.existsSync(pkgJson)) {
      const destination = path.join(
        process.cwd(),
        `./src/addons/${this.globals.name}`,
      );

      if (fs.existsSync(destination)) {
        return;
      }
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
    this.renderTemplate(
      `${this.templatePath()}/**/*`,
      this.destinationPath(),
      this.globals,
    );
    // copy dotfiles
    this.fs.copy(this.templatePath('.*'), this.destinationPath());
  }

  end() {
    if (this.sourceRoot().endsWith('.template')) {
      this._debug('Removing template clone');
      fs.rmdirSync(this.sourceRoot(), { recursive: true });
    }
    this.log("Done. Now run 'yarn' to install dependencies");
  }
};
