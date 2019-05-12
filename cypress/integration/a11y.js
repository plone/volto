// Cypress/integration/a11y.spec.js
describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe(); // make sure axe is available on the page
  });

  it('Has no detectable a11y violations on load', () => {
    cy.checkA11y(); // fail for a11y violations
  });

  /*
  it('Has no a11y violations after button click', () => {
    cy.get('button').click();
    cy.checkA11y(); // check after a rerender
  });
  */
});
