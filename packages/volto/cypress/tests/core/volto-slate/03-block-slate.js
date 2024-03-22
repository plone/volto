import { slateBeforeEach, getSlateBlockValue } from '../../../support/commands';

describe('Block Tests', () => {
  beforeEach(slateBeforeEach);
  it('should create a block with some text, move the cursor in the middle of the text, insert a line break, and then have 2 blocks with the two parts of the initial text', () => {
    cy.getSlate()
      .focus()
      .click()
      .type('hello, world')
      .type('{leftarrow}')
      .type('{leftarrow}')
      .type('{leftarrow}')
      .type('{leftarrow}')
      .type('{leftarrow}')
      .type('{enter}');

    getSlateBlockValue(cy.get('.slate-editor').first()).then((val) => {
      expect(val).to.deep.eq([
        {
          type: 'p',
          children: [{ text: 'hello, ' }],
        },
      ]);
    });
    getSlateBlockValue(cy.get('.slate-editor').eq(1)).then((val) => {
      expect(val).to.deep.eq([
        {
          type: 'p',
          children: [{ text: 'world' }],
        },
      ]);
    });

    // Save
    cy.toolbarSave();

    cy.contains('hello, ');
    cy.contains('world');
  });
  it('should show block chooser btn on adding new text block created from the previous block with the formatted content ', () => {
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously').type(
      '{command+a}{command+b}{ctrl+a}{ctrl+b}',
    );
    cy.setSlateCursor('furiously').type('{enter}');
    cy.get('.ui.basic.icon.button.block-add-button').should('have.length', 1);

    // Save
    cy.toolbarSave();

    cy.get('#page-document p strong').contains(
      'Colorless green ideas sleep furiously',
    );
  });
});
