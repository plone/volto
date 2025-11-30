type plateCypressAdapter = {
  EDITABLE_TO_EDITOR: WeakMap<Node, any>;
  getNode?: (editor: any, path: number[]) => any;
};

const defaultBodyEditable = '.slate-editor[data-slate-editor]';

// Helper to access the Plate Cypress adapter injected by the CypressPlugin.
const getPlateAdapter = () =>
  cy.window({ log: false }).then((win) => {
    const adapter = (win as any).plateCypressAdapter as
      | plateCypressAdapter
      | undefined;

    if (!adapter) {
      throw new Error(
        'plateCypressAdapter not found on window. Ensure CypressPlugin is enabled around the editor.',
      );
    }

    return adapter;
  });

/**
 * Clicks/focuses the first element inside the editable and returns the Plate editor instance.
 * @param editableSelector CSS selector for the editable; defaults to the body editor.
 */
Cypress.Commands.add(
  'getPlateEditor',
  (editableSelector: string = defaultBodyEditable) =>
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

      // Focus the first element node inside the editable so typing goes to the body.
      cy.wrap(editable)
        .find('[data-slate-node="element"]')
        .first()
        .scrollIntoView()
        .click({ force: true })
        .wait(10); // Wait a tick for focus to settle.

      return getPlateAdapter().then((adapter) => {
        const editor = adapter.EDITABLE_TO_EDITOR.get(editable);
        if (!editor) {
          throw new Error(
            'getPlateEditor: could not retrieve editor instance. Ensure CypressPlugin wraps the editor.',
          );
        }
        return cy.wrap(editor, { log: false });
      });
    }),
);

/**
 * Set selection in the Plate editor using a Plate location/range object.
 * @param at Plate location/range (e.g. { anchor: { path, offset }, focus: { path, offset } }).
 * @param options.editable Optional selector for the editable element.
 */
Cypress.Commands.add(
  'plateSetSelection',
  (at: any, options: { editable?: string } = {}) =>
    cy.getPlateEditor(options.editable).then((editor) => {
      const rangeFn = editor.api?.range;
      const setSelectionFn = editor.tf?.setSelection;

      if (!rangeFn || !setSelectionFn) {
        throw new Error(
          'plateSetSelection: editor.api.range or editor.tf.setSelection not available on editor instance.',
        );
      }

      const range = rangeFn(at);
      setSelectionFn(range);
    }),
);

const getNodeAtPath = (editor: any, path: number[]) =>
  getPlateAdapter().then((adapter) => {
    const getNode = adapter.getNode;

    if (!getNode) {
      throw new Error(
        'plate helper: adapter.getNode is not available. Ensure CypressPlugin exposes getNode.',
      );
    }

    const node = getNode(editor, path);
    if (!node) {
      throw new Error(
        `plate helper: node not found at path ${JSON.stringify(path)}.`,
      );
    }
    return node;
  });

/**
 * Click a node at a given path (via adapter) and return the wrapped DOM node.
 * @param path Path array, e.g. [0, 1].
 * @param options.editable Optional selector for the editable element.
 */
Cypress.Commands.add(
  'plateClickAtPath',
  (path: number[], options: { editable?: string } = {}) =>
    cy.getPlateEditor(options.editable).then((editor) =>
      getNodeAtPath(editor, path).then((node) => {
        const toDOMNode = editor.api?.toDOMNode;

        if (!toDOMNode) {
          throw new Error(
            'plateClickAtPath: editor.api.toDOMNode is not available.',
          );
        }

        const domNode = toDOMNode(node);

        if (!domNode) {
          throw new Error(
            `plateClickAtPath: DOM node not found at path ${JSON.stringify(
              path,
            )}.`,
          );
        }

        // Return the wrapped DOM node so callers can chain .type() directly,
        // which ensures typing happens in the same focused element.
        return cy
          .wrap(domNode)
          .scrollIntoView()
          .click({ force: true, log: false });
      }),
    ),
);

/**
 * Resolve a Slate node by path via the Cypress adapter.
 * @param path Path array, e.g. [0, 1].
 * @param options.editable Optional selector for the editable element.
 */
Cypress.Commands.add(
  'plateGetNode',
  (path: number[], options: { editable?: string } = {}) =>
    cy
      .getPlateEditor(options.editable)
      .then((editor) => getNodeAtPath(editor, path)),
);

/**
 * Resolve the DOM node for a Slate node at the given path.
 * @param path Path array, e.g. [0, 1].
 * @param options.editable Optional selector for the editable element.
 */
Cypress.Commands.add(
  'plateGetDOMNode',
  (path: number[], options: { editable?: string } = {}) =>
    cy.getPlateEditor(options.editable).then((editor) =>
      getNodeAtPath(editor, path).then((node) => {
        const toDOMNode = editor.api?.toDOMNode;

        if (!toDOMNode) {
          throw new Error(
            'plateGetDOMNode: editor.api.toDOMNode is not available.',
          );
        }

        const domNode = toDOMNode(node);

        if (!domNode) {
          throw new Error(
            `plateGetDOMNode: DOM node not found at path ${JSON.stringify(
              path,
            )}.`,
          );
        }

        return cy.wrap(domNode);
      }),
    ),
);

/**
 * Click a node at a path and type text into it in one chain.
 * @param path Path array, e.g. [0, 1].
 * @param text Text to type.
 * @param options.editable Optional selector for the editable element.
 * @param options.typeOptions Options forwarded to cy.type.
 */
Cypress.Commands.add(
  'plateTypeAtPath',
  (
    path: number[],
    text: string,
    options: {
      editable?: string;
      typeOptions?: Parameters<Cypress.Chainable['type']>[1];
    } = {},
  ) =>
    cy
      .plateClickAtPath(path, { editable: options.editable })
      .type(text, options.typeOptions)
      .wait(10),
);

/**
 * Merge properties into a node at the given path via editor.api.setNodes.
 * @param path Path array, e.g. [0, 1].
 * @param newProperties Properties to merge into the node.
 * @param options.editable Optional selector for the editable element.
 */
Cypress.Commands.add(
  'plateSetNode',
  (
    path: number[],
    newProperties: Record<string, any>,
    options: { editable?: string } = {},
  ) =>
    cy.getPlateEditor(options.editable).then((editor) => {
      const setNodes = editor.api?.setNodes;

      if (!setNodes) {
        throw new Error('plateSetNode: editor.api.setNodes is not available.');
      }

      setNodes(newProperties, { at: path });
    }),
);

/**
 * Focus the editor by clicking the first element node (or provided selector).
 * @param options.editable Optional selector for the editable element.
 */
Cypress.Commands.add('plateFocus', (options: { editable?: string } = {}) =>
  cy
    .get(
      options.editable ?? `${defaultBodyEditable} [data-slate-node="element"]`,
    )
    .first()
    .click(),
);
