if (Cypress.env('API') !== 'guillotina') {
  describe('Add-ons Control Panel Tests', () => {
    beforeEach(() => {
      cy.autologin();
    });
    it('Access add-ons control panel', function() {
      cy.visit('/controlpanel/addons');
      cy.contains('plone.restapi');
    });
  });
}
