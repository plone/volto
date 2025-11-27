import type { PlateConfig } from '@plone/types';
import { BlockEditorKit } from '../../components/editor/block-editor-kit';
import { BlockBaseEditorKit } from '../../components/editor/block-editor-base-kit';
import { BlockFloatingToolbarButtons } from '../../components/ui/preset-block-floating-toolbar-buttons';
import { PlaywrightPlugin } from '@platejs/playwright';

// Include PlayWrightTestPlugin only during e2e tests with Cypress or Playwright
if (
  typeof window !== 'undefined' &&
  ((window as any).Cypress || (window as any).isPlaywright)
) {
  // @ts-ignore
  BlockEditorKit.push(PlaywrightPlugin.configure({ enabled: true }));
}

const block: PlateConfig = {
  editorConfig: {
    plugins: [...BlockEditorKit],
  },
  rendererConfig: {
    plugins: [...BlockBaseEditorKit],
  },
  floatingToolbarButtons: BlockFloatingToolbarButtons,
};

export default block;
