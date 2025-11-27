type PlatePlaywrightAdapter = {
  EDITABLE_TO_EDITOR: WeakMap<Node, any>;
};

// Helper to access the Plate Playwright adapter injected by the PlaywrightPlugin.
const getPlateAdapter = () =>
  cy.window({ log: false }).then((win) => {
    const adapter = (win as any).platePlaywrightAdapter as
      | PlatePlaywrightAdapter
      | undefined;

    if (!adapter) {
      throw new Error(
        'platePlaywrightAdapter not found on window. Ensure PlaywrightPlugin is enabled around the editor.',
      );
    }

    return adapter;
  });

Cypress.Commands.add(
  'getPlateEditor',
  (editableSelector: string = '[data-slate-editor]') =>
    cy.get(editableSelector).then(($editable) => {
      if ($editable.length === 0) {
        throw new Error(
          `getPlateEditor: no editable matched selector "${editableSelector}".`,
        );
      }
      if ($editable.length > 1) {
        throw new Error(
          `getPlateEditor: multiple editors matched selector "${editableSelector}". Provide a more specific selector.`,
        );
      }

      const editable = $editable[0] as HTMLElement;

      return getPlateAdapter().then((adapter) => {
        const editor = adapter.EDITABLE_TO_EDITOR.get(editable);
        if (!editor) {
          throw new Error(
            'getPlateEditor: could not retrieve editor instance. Ensure PlaywrightPlugin wraps the editor.',
          );
        }
        return cy.wrap(editor, { log: false });
      });
    }),
);

Cypress.Commands.add('plateSetSelection', (at: any, options: any = {}) =>
  cy.getPlateEditor(options.editable).then((editor) => {
    const range = editor.api.range(at);
    editor.tf.setSelection(range);
  }),
);
