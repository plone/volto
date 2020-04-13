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
      cy.get('input#effective-date').click();
      cy.get('input#effective-date').type('{selectall}12/24/2050{esc}');
      cy.get('input#effective-time').type('{downarrow}');
      cy.get('.rc-time-picker-panel-input').type('{selectall}10:00 AM{esc}');
      cy.get('#toolbar-save').click();
      cy.get('body.view-viewview #page-document .documentFirstHeading').should(
        'have.text',
        'My Page',
      );
      cy.url().should('contain', '/my-page');

      cy.get('.edit').click();
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('my-page?fullobjects');

      cy.get('input#effective-date').should('have.value', '12/24/2050');
      cy.get('input#effective-time').should('have.value', '10:00 AM');
    });
  });
}
