import type { PlateConfig } from '@plone/types';
import { BlockEditorKit } from '../../components/editor/block-editor-kit';
import { BlockBaseEditorKit } from '../../components/editor/block-editor-base-kit';
import { BlockFloatingToolbarButtons } from '../../components/ui/preset-block-floating-toolbar-buttons';
import { CypressPlugin } from '../../components/editor/plugins/cypress-plugin';

// Include Cypress plugin only during e2e tests
if (typeof window !== 'undefined' && (window as any).Cypress) {
  // @ts-ignore
  BlockEditorKit.push(CypressPlugin.configure({ enabled: true }));
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
