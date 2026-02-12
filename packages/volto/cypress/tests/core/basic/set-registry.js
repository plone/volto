describe('createContent Tests', () => {
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');
  });

  it('Set Setting in registry', function () {
    cy.setRegistry('plone.site_title', 'test-title');
    cy.navigate('/controlpanel/site');
    cy.get('input#field-site_title').should('have.value', 'test-title');
  });
});
