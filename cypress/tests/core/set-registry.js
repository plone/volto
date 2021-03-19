if (Cypress.env('API') !== 'guillotina') {
  describe('createContent Tests', () => {
    beforeEach(() => {
      cy.autologin();
    });

    it('Set Setting in registry', function() {
      cy.setRegistry('plone.site_title', 'test-title');
      cy.visit('/controlpanel/site');
      cy.get('input#field-site_title').should('have.value', 'test-title');
    });
  });
}
