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

  it('Adding comment on page', function () {
    cy.get('textarea[id="field-comment"]').clear().type('This is a comment');
    cy.get('button[type="submit"').click();
    cy.get('a[aria-label="Delete"]').should('have.text', 'Delete');
    cy.contains('This is a comment');
    cy.get('a[aria-label="Reply"]').click();
    cy.get('[id^="reply-place-"] textarea[id="field-comment"]')
      .clear()
      .type('This is a reply');
    cy.get('[id^="reply-place-"] button[type="submit"').click();
    cy.contains('This is a reply');
  });
});
