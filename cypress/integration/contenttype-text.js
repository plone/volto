if (Cypress.env('API') !== 'guillotina') {
  describe('Field text in Content-Type Tests', () => {
    beforeEach(() => {
      cy.autologin();
      cy.createContent('News Item', 'my-news', 'My News');
      cy.visit('/my-news/edit');
    });

    it('As editor I can add a link to a text block', function() {
      // given
      cy.wait(2000);
      cy.get('.inline.field.wysiwyg .public-DraftStyleDefault-block');

      // when
      //type title because required
      cy.get('#field-title').type('A test link to Google inside text');
      cy.get('.inline.field.wysiwyg .public-DraftEditor-content')
        .type('Go to Google.')
        .setSelection('Google');
      cy.get(
        '#main .draftJsToolbar__buttonWrapper__1Dmqh:nth-of-type(3)',
      ).click();
      cy.get('.link-form-container input').type('https://google.com{enter}');
      cy.get('#toolbar-save').click();

      // then
      cy.get('.documentFirstHeading + div>p').contains('Go to Google.');
      cy.get('.documentFirstHeading + div>p a')
        .should('have.attr', 'href')
        .and('include', 'https://google.com');
    });
  });
}
