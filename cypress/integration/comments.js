if (Cypress.env('API') !== 'guillotina') {
  describe('createContent Tests', () => {
    beforeEach(() => {
      cy.autologin();
      cy.setRegistry(
        'plone.app.discussion.interfaces.IDiscussionSettings.globally_enabled',
        true,
      );
      cy.createContent({
        contentType: 'Document',
        contentId: 'my-page',
        contentTitle: 'My Page',
        allow_discussion: true,
      });
      cy.visit('/my-page');
    });

    it('Adding comment on page', function() {
      cy.get('textarea[id="field-comment"]')
        .clear()
        .type('This is comment');
      cy.get('button[type="submit"').click();
      cy.get('button[aria-label="Delete"]').should('have.text', 'Delete');
    });
  });
}
