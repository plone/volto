### Cypress commands

We have a few set of developer-friendly commands helping in process of writing tests.

- `getSelectedSlateEditor`: Get the DOM element of slate editor text block.
- `createSlateBlock`: Create a new slate text block.
- `getSlateBlockValue`: Get slateJSON value from corresponding DOM element of slate editor.
- `createSlateBlockWithList`: Create a new slate block with numbers/bulleted lists.
- `selectSlateNodeOfWord`: Select slate node of word.
- `cy.addSlateJSONField()`: add a new dx field of type SlateJSONField for slate content-type.
- `cy.typeInSlate()`: Type a character to slate editor (less used).
- `cy.lineBreakInSlate()` : Insert a line break in editors.
- `cy.setSelection()`: set a selection between ranges.
- `cy.getSlateEditorAndType()` : Type a text into the slate editor (most used).
- `cy.setSlateSelection()`: Selects a given input text in slate editor.
- `cy.setSlateCursor()`: Put the cursor at a given text element.
- `cy.clickSlateButton()`: Click the provided inline toolbar button.
- `cy.toolbarSave()`: Clicking "save" button in toolbar.
- `cy.setCursor()`: Low level command reused by `setCursorBefore` and `setCursorAfter`.
- `cy.setCursorBefore()`: set the cursor before a given text.
- `cy.setCursorAfter()`: set the cursor after a given text.
- `cy.pasteClipboard()`: Mocks the system clipBoard by pasting the provided data to a target.

Note: The commmands which have `{prevSubject:true}` should be chained on a parent selector. Read about [parent selectors](https://docs.cypress.io/api/cypress-api/custom-commands#Parent-Commands)
