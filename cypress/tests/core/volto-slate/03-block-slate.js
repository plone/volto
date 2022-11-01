import { slateBeforeEach, getSlateBlockValue } from '../../../support/e2e';

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
});
