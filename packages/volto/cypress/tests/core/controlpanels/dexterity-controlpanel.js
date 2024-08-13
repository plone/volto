describe('Folder Contents Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    // given a logged in editor
    // and a folder that contains a document
    // and the folder contents view
    cy.visit('/');
    cy.autologin();
    cy.visit('/controlpanel/dexterity-types');
    cy.wait('@content');
  });

  it('Changing name of the Page content type', () => {
    cy.get('a[href="/controlpanel/dexterity-types/Document"]').click();
    cy.get('input[id="field-title"]').clear().type('Page1{enter}');
    cy.get('textarea[id="field-description"]').type(
      'This is Page Content Type{enter}',
    );
    cy.get('#field-filter_content_types').click().type('all{enter}');
    cy.get('button[id="toolbar-save"]').click();
    cy.visit('/controlpanel/dexterity-types');

    cy.get('a[href="/controlpanel/dexterity-types/Document"]').should(
      'have.text',
      'Page1',
    );
  });
});
