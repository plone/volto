describe('Add new alias for object test', () => {
  beforeEach(() => {
    cy.autologin();
  });
  it('adds a new alias', () => {
    cy.visit('/news/aliases');
    cy.get('#alternative-url-input').type('/alturl');
    cy.get('#submit-alias').click();
  });
});
