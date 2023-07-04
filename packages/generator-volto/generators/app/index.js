const path = require('path');
const chalk = require('chalk');
const Generator = require('yeoman-generator');
const utils = require('./utils');

const currentDir = path.basename(process.cwd());

const extractDependency = (name) => {
  const bits = name.split(':');
  const pkgName = bits[0];
  return pkgName;
};

const validateAddonName = (name) => {
  if (!name) return false;

  const pkgName = extractDependency(name);

  // FUTURE: test for some simple sanity, like no space in addon name, etc
  if (!pkgName) return false;

  return true;
};

const addonPrompt = [
  {
    type: 'input',
    name: 'addonName',
    message:
      'Addon name, plus extra loaders, like: volto-addon:loadExtra,loadAnotherExtra',
    default: '',
    validate: validateAddonName,
  },
  {
    type: 'prompt',
    name: 'useAddons',
    message: 'Would you like to add another addon?',
    default: 'false',
  },
];

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('projectName', {
      type: String,
      default: currentDir,
    });
    this.option('volto', {
      type: String,
      desc:
        'Desired Volto version, if not provided, the most recent will be used',
    });
    this.option('canary', {
      type: Boolean,
      desc: 'Desired Volto version should be a canary (alpha)',
      default: false,
    });
    this.option('interactive', {
      type: Boolean,
      desc: 'Enable/disable interactive prompt',
      default: true,
    });
    this.option('skip-addons', {
      type: Boolean,
      desc: "Don't ask for addons as part of the scaffolding",
    });
    this.option('addon', {
      type: (arr) => arr,
      desc:
        'Addon loader string, like: some-volto-addon:loadExtra,loadOtherExtra',
    });
    this.option('workspace', {
      type: (arr) => arr,
      desc: 'Yarn workspace, like: src/addons/some-volto-addon',
    });
    this.option('description', {
      type: String,
      desc: 'Project description',
    });

    this.args = args;
    this.opts = opts;
  }

  async prompting() {
    const updateNotifier = require('update-notifier');
    const pkg = require('../../package.json');
    const notifier = updateNotifier({
      pkg,
      shouldNotifyInNpmScript: true,
      updateCheckInterval: 0,
    });
    notifier.notify({
      defer: false,
      message: `Update available: {currentVersion} -> {latestVersion}

It's important to have the generators updated!

Run "npm install -g @plone/generator-volto" to update.`,
    });

    let voltoVersion;
    if (this.opts.canary) {
      this.log(chalk.red('Getting latest canary (alpha) Volto version'));
      voltoVersion = await utils.getLatestCanaryVoltoVersion();
      this.log(`Using latest canary (alpha) Volto version: ${voltoVersion}`);
    } else if (this.opts.volto === '.') {
      voltoVersion = '*';
      this.voltoYarnLock = this.fs.read('yarn.lock');
    } else if (this.opts.volto) {
      voltoVersion = this.opts.volto;
      this.log(`Using chosen Volto version: ${voltoVersion}`);
    } else {
      this.log(chalk.red('Getting latest Volto version'));
      voltoVersion = await utils.getLatestVoltoVersion();
      this.log(`Using latest released Volto version: ${voltoVersion}`);
    }

    if (!this.voltoYarnLock) {
      this.log(chalk.red("Retrieving Volto's yarn.lock"));
      this.voltoYarnLock = await utils.getVoltoYarnLock(voltoVersion);
    }

    this.globals = {
      addons: [],
      dependencies: {},
      workspaces: [],
      private: false,
    };

    let props;

    const dependencies = {
      '@plone/volto': voltoVersion,
    };

    // Project name
    if (this.args[0]) {
      this.globals.projectName = this.args[0];
    } else if (this.opts.addon) {
      this.globals.projectName = path.basename(process.cwd());
    } else {
      if (this.opts['interactive']) {
        props = await this.prompt([
          {
            type: 'input',
            name: 'projectName',
            message: 'Project name (e.g. my-volto-project)',
            default: path.basename(process.cwd()),
          },
        ]);
        this.globals.projectName = props.projectName;
      } else {
        this.globals.projectName = path.basename(process.cwd());
      }
    }

    // Description
    if (this.opts.description) {
      this.globals.projectDescription = this.opts.description;
    } else {
      this.globals.projectDescription = 'A Volto-powered Plone frontend';
    }

    // Add-ons
    if (this.opts.addon) {
      const addons =
        typeof this.opts.addon === 'string'
          ? [this.opts.addon]
          : this.opts.addon;
      this.globals.addons = JSON.stringify(addons);
      addons.forEach(function (addon) {
        const dependency = extractDependency(addon);
        if (dependency) {
          dependencies[dependency] = '*';
        }
      });
    } else {
      if (this.opts['interactive'] && !this.opts['skip-addons']) {
        const choices = ['false', 'f', 'no', 'n'];
        props = await this.prompt([
          {
            type: 'prompt',
            name: 'useAddons',
            message: 'Would you like to add addons?',
            default: 'false',
          },
        ]);
        while (choices.indexOf(props.useAddons) === -1) {
          /* eslint-disable no-await-in-loop */
          props = await this.prompt(addonPrompt);
          this.globals.addons.push(props.addonName);
          const dependency = extractDependency(props.addonName);
          if (dependency) {
            dependencies[dependency] = '*';
          }
        }

        this.globals.addons = JSON.stringify(this.globals.addons);
      } else {
        this.globals.addons = JSON.stringify([]);
      }
    }

    // Workspaces
    if (this.opts.workspace) {
      const workspaces =
        typeof this.opts.workspace === 'string'
          ? [this.opts.workspace]
          : this.opts.workspace;
      this.globals.workspaces = JSON.stringify(workspaces);
      this.globals.private = true;
    } else {
      this.globals.workspaces = JSON.stringify([]);
    }

    // Dependencies
    this.globals.dependencies = JSON.stringify(dependencies, null, 4);
  }

  writing() {
    const base =
      currentDir === this.globals.projectName ? '.' : this.globals.projectName;
    this.fs.copyTpl(
      this.templatePath('package.json.tpl'),
      this.destinationPath(base, 'package.json'),
      this.globals,
    );
    this.fs.copyTpl(
      this.templatePath('.gitignorefile'),
      this.destinationPath(base, '.gitignore'),
      this.globals,
    );
    this.fs.write(this.destinationPath(base, 'yarn.lock'), this.voltoYarnLock);

    this.fs.copy(this.templatePath(), this.destinationPath(base), {
      globOptions: {
        ignore: ['**/*.tpl', '**/*~', '**/.gitignorefile'],
        dot: true,
      },
    });
  }

  install() {
    if (!this.opts['skip-install']) {
      const base =
        currentDir === this.globals.projectName
          ? '.'
          : this.globals.projectName;
      this.yarnInstall(null, { cwd: base });
    }
  }

  end() {
    if (!this.opts['skip-install']) {
      this.log(
        `
Done.

Now go to ${this.globals.projectName} and run:

yarn start
`,
      );
    } else {
      this.log(`
Done.

Now go to ${this.globals.projectName} and run:

yarn install
yarn start
`);
    }
  }
};
