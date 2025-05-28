import { Plugin } from 'release-it';

const NPM_BASE_URL = 'https://www.npmjs.com';
const NPM_PUBLIC_PATH = 'package';

class PrePublishReleaseItPlugin extends Plugin {
  constructor(...args) {
    super(...args);

    this.registerPrompts({
      prePublishPrompt: {
        type: 'confirm',
        message: (context) =>
          `Are you sure you want to publish ${context.npm.name}${
            context.isPreRelease ? `@${context.preReleaseId}` : '@latest'
          } to npm?`,
        default: true,
      },
    });
  }

  disablePlugin() {
    return 'npm';
  }

  getName() {
    return 'plonePrePublish';
  }

  getPackageUrl() {
    const baseUrl = NPM_BASE_URL;
    const publicPath = NPM_PUBLIC_PATH;
    return `${baseUrl}/${publicPath}/${this.getName()}`;
  }

  async beforeRelease() {
    const context = this.config.getContext();
    const tag = context.isPreRelease ? context.preReleaseId : 'latest';
    const dryRunArg = this.config.isDryRun ? '--dry-run' : '';
    // This value could be set either on .release-it.json or passed via
    // command line with --no-plonePrePublish.publish
    const pluginOptions = this.config.options?.plonePrePublish;
    const publish = pluginOptions ? pluginOptions.publish ?? true : true;
    if (publish) {
      await this.step({
        enabled: true,
        task: () =>
          this.exec(
            `pnpm publish${tag ? ` --tag ${tag}` : ''}${dryRunArg ? ` ${dryRunArg}` : ''} --no-git-checks`,
            {
              options: { write: false },
            },
          ).then(() => {
            this.setContext({ isReleased: true });
          }),
        label: 'Publishing to npm...',
        prompt: 'prePublishPrompt',
      });
    } else {
      this.setContext({ isReleased: true });
    }
  }

  afterRelease() {
    const { isReleased } = this.getContext();
    if (isReleased) {
      this.log.log(`🔗 ${this.getPackageUrl()}`);
    }
  }
}

export default PrePublishReleaseItPlugin;
