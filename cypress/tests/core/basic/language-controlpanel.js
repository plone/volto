describe('Language control-panel', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.autologin();
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
  });

  it('Displays all valid fields in language control-panel', () => {
    cy.visit('/controlpanel/language');
    cy.get('main').within(() => {
      cy.get('.field-wrapper-default_language').should('be.visible');
      cy.get('.field-wrapper-available_languages').should('be.visible');
      cy.get('.field-wrapper-use_combined_language_codes').should('be.visible');
    });
  });

  it('Does not display unwanted fields in language control-panel', () => {
    cy.visit('/controlpanel/language');
    cy.get('main').within(() => {
      cy.get('.field-wrapper-always_show_selector').should('not.exist');
      cy.get('.field-wrapper-display_flags').should('not.exist');
    });
  });
});
