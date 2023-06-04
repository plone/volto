describe('Header Test', () => {
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');
  });
  it('Header is rendered', function () {
    cy.get('#footer').should('be.visible');
  });
});
