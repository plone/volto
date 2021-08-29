describe('Navigation', () => {
  beforeEach(() => {
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('');
  });
  it('Given an private page, when I logout it is not present in nav anymore', function () {
    cy.findByLabelText('Personal tools').click();
    cy.get('#toolbar-logout').click();
    cy.wait(1000);
    cy.get('#navigation a.item').contains('My Page').should('not.exist');
  });
});
