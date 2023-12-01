import { Plugin } from 'release-it';

class PrePublishReleaseItPlugin extends Plugin {
  constructor(...args) {
    super(...args);
    this.registerPrompts({
      prePublishPrompt: {
        type: 'confirm',
        message: () => 'Are you sure?',
      },
    });
  }

  async release() {
    await this.step({
      enabled: true,
      task: () =>
        this.exec('pnpm publish --dry-run', { options: { write: false } }),
      label: 'Doing task',
      prompt: 'prePublishPrompt',
    });
  }
}

export default PrePublishReleaseItPlugin;
