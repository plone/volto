if (Cypress.env('API') === 'plone') {
  describe('Add Content Tests', () => {
    beforeEach(() => {
      cy.autologin();
      cy.visit('/');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');
      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-document').click();
    });
    it('As an editor I can set the effective date of a page', function() {
      cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
        .type('My Page')
        .get('.documentFirstHeading span[data-text]')
        .contains('My Page');
      cy.get('input[name="effective"]').type("2050-12-24T12:00");
      cy.get('#toolbar-save').click();
      cy.get('body.view-viewview #page-document .documentFirstHeading').should('have.text', 'My Page');
      cy.url().should('contain', '/my-page');

      cy.get('.edit').click()
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');

      cy.get('input[name="effective"]').should('have.value', "2050-12-24T12:00:00");
    });
  });
}
  