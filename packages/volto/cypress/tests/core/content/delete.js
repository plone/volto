describe('delete Tests', () => {
  beforeEach(() => {
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
      allow_discussion: true,
    });
    cy.visit('/contents');
  });
  it('delete', function () {
    cy.get('tr[aria-label="/my-page"]').within(() => {
      cy.get('button[class="ui basic icon button"]').click({ multiple: true });
    });
    cy.get('button[class="ui button icon item"]').eq(6).click();
    cy.get('button[class="ui primary button"]').findByText('Delete').click();
    cy.get('tr').should('not.contain', '/my-page');
  });
});
