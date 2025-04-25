describe('Addons Control Panel Test', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    // given a logged in editor
    // and a folder that contains a document
    // and the folder contents view
    cy.visit('/');
    cy.autologin();
    cy.visit('/controlpanel/addons');
    cy.wait('@content');
  });

  it('Should intall a third party addons and uninstall it', () => {
    cy.get('.Session.refresh.support').click();
    cy.get('.content.active > div > button').click();
    cy.get('.content.active > div > button').should('have.text', 'Uninstall');
    cy.get('.content.active > div > button').click();
    cy.get('.content.active > div > button').should('have.text', 'Install');
  });
});
