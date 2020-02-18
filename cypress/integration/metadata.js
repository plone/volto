if (Cypress.env('API') === 'plone') {
  describe('Content Metadata Tests', () => {
    beforeEach(() => {
      cy.autologin();
      cy.visit('/');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');
      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-document').click();
    });

    it('As an editor I can set the effective date of a page', function() {
      cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
        .type('My Page')
        .get('.documentFirstHeading span[data-text]')
        .contains('My Page');
      cy.get('input[name="effective"]').type('2050-12-24T12:00');
      cy.get('#toolbar-save').click();
      cy.get('body.view-viewview #page-document .documentFirstHeading').should(
        'have.text',
        'My Page',
      );
      cy.url().should('contain', '/my-page');

      cy.get('.edit').click();
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');

      cy.get('input[name="effective"]').should(
        'have.value',
        '2050-12-24T12:00:00',
      );
    });

    it('As an editor I can set the id/URL of a page', function() {
      // given: a new page form
      cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
        .type('My Page')
        .get('.documentFirstHeading span[data-text]')
        .contains('My Page');

      // when: I set the id to 'my-custom-page-id'
      cy.get('input#field-id')
        .clear()
        .type('my-custom-page-id');
      cy.get('#toolbar-save').click();

      // then: the URL of the page should have changed to 'my-custom-page-id'
      cy.url().should('include', '/my-custom-page-id');
      cy.get('body.view-viewview #page-document .documentFirstHeading').should(
        'have.text',
        'My Page',
      );
    });

    // XXX: This doesn't work yet!
    // it('As an editor I can set the id/URL of an existing page', function() {
    //   // given: a page in edit view
    //   cy.createContent('Document', 'my-page', 'My Page');
    //   cy.visit('my-page/edit');
    //   cy.url().should('contain', '/my-page/edit');
    //   cy.waitForResourceToLoad('@navigation');
    //   cy.waitForResourceToLoad('@breadcrumbs');
    //   cy.waitForResourceToLoad('@actions');
    //   cy.waitForResourceToLoad('@types');
    //   cy.waitForResourceToLoad('?fullobjects');

    //   // when: I change the id to 'my-new-page'
    //   cy.get('input#field-id')
    //     .clear()
    //     .type('my-new-page');
    //   cy.get('#toolbar-save').click();

    //   // then: the URL of the page should have changed to 'my-new-page'
    //   cy.url().should('include', '/my-new-page');
    //   cy.get('body.view-viewview #page-document .documentFirstHeading').should(
    //     'have.text',
    //     'My Page',
    //   );
    });
  });
}
