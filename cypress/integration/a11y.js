if (Cypress.env('API') !== 'guillotina') {
  describe('Accessibility Tests', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.injectAxe(); // make sure axe is available on the page
    });

    it('Front page has not a11y violations', () => {
      cy.checkA11y(); // fail for a11y violations
    });

    /*
    it('Has no a11y violations after button click', () => {
      cy.get('button').click();
      cy.checkA11y(); // check after a rerender
    });
    */
  });
}
