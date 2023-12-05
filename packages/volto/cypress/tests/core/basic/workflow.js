describe('workflow Tests', () => {
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
  it('change workflow state recursively', function () {
    cy.get('tr[aria-label="/my-page"]').within(() => {
      cy.get('button[class="ui basic icon button"]').click({ multiple: true });
    });
    cy.get('button[class="ui button icon item"]').eq(1).click();
    cy.findByText('Select…').click();
    cy.findByText('Publish').click();
    cy.findByTitle('Save').click();
    cy.get('tr[aria-label="/my-page"]').within(() => {
      cy.get('td > div').should('contain', 'Published');
    });
  });
});
