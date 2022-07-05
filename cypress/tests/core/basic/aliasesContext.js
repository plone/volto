describe('Add new alias for object test', () => {
  beforeEach(() => {
    cy.autologin();
  });
  it('adds a new alias', () => {
    cy.visit('/news/aliases');
    cy.get('#alternative-url-input').type('/alturl');
    cy.get('#submit-alias').click();
    cy.wait(2000);
    cy.contains('/alturl');
  });
  it('removes the alias', () => {
    cy.visit('/news/aliases');
    cy.get('#alternative-url-input').type('/alturl');
    cy.get('#submit-alias').click();
    cy.wait(2000);
    cy.contains('/alturl');

    cy.get('#alias-check-0').click();
    cy.get('#remove-alias').click();
    cy.contains('/alturl').should('not.exist');
  });
});
