import { slateBeforeEach } from '../../../support/e2e';

describe('SlashMenu Test: Shortcuts', () => {
  beforeEach(slateBeforeEach);

  it('As editor I can crate a Description block using the SlashMenu shortcut', function () {
    // Use SlashMenu shorcut to create a Description block and type some text in it
    cy.getSlateEditorAndType('/D').type('{enter}');
    cy.get('.documentDescription').type('This is a description.');
    cy.get('.documentDescription').type('{enter}');

    // Save
    cy.toolbarSave();

    // then the page view should contain a Description with the right text in it
    cy.get('.documentDescription').contains('This is a description.');
  });
});
