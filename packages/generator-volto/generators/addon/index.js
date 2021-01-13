const path = require('path');
const Generator = require('yeoman-generator');

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

    this.globals = {
      addonName: '',
      name: '',
      scope: '',
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
  }

  writing() {
    const base =
      currentDir === this.globals.name
        ? '.'
        : './src/addons/' + this.globals.name;
    this.fs.copyTpl(
      this.templatePath('package.json.tpl'),
      this.destinationPath(base, 'package.json'),
      this.globals,
    );

    this.fs.copy(this.templatePath(), this.destinationPath(base), {
      globOptions: {
        ignore: ['**/*.tpl', '**/*~'],
        dot: true,
      },
    });

    this.fs.delete(this.destinationPath(base, 'package.json.tpl'));
  }

  install() {}

  end() {
    this.log("Done. Now run 'yarn' to install dependencies");
  }
};
