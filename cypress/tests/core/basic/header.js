describe('Header Test', () => {
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');
  });
  it('Header is rendered', function () {
      cy.get('div[class="header"]');
      cy.get('div[class="logo"]');
      cy.get('img[class="ui image"]').should('be.visible').click()
      });
  });

