import { slateBeforeEach } from '../../../support/e2e';

describe('SlashMenu Test: Shortcuts', () => {
  beforeEach(slateBeforeEach);

  it('As editor I can create a Table block using the SlashMenu shortcut', function () {
    // Use SlashMenu shortcut to create a table block
    cy.getSlateEditorAndType('/t').type('{enter}');
    cy.toolbarSave();

    // then the page view should contain a table
    cy.get('#page-document table').should('be.visible');
  });
});
