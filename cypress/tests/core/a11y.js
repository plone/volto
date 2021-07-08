describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe(); // make sure axe is available on the page
  });

  it('Front page has not a11y violations', () => {
    cy.checkA11y(); // fail for a11y violations
  });

  it('Contact form has not a11y violations', () => {
    cy.navigate('/contact-form');
    cy.get('#field-name').click().type('Input');
    cy.get('#field-from').click().type('something@domain.com');
    cy.get('#field-subject').click().type('Input');
    cy.get('#field-message').click().type('Input');
    cy.checkA11y();
  });

  /*
    it('Has no a11y violations after button click', () => {
      cy.get('button').click();
      cy.checkA11y(); // check after a rerender
    });
    */
});
