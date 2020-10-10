if (Cypress.env('API') !== 'guillotina') {
  describe('ControlPanel: Dexterity Content-Types Layout', () => {
    beforeEach(() => {
      // given a logged in editor
      // add a new dexterity content-type for Book
      // and edit it's initial layout
      cy.visit('/');
      cy.autologin();
      cy.visit('/controlpanel/dexterity-types');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
    });

    it('Edit Blocks Layout for Book', () => {
      cy.get('#toolbar-add').click();
      cy.get('input[id="field-title"]').clear().type('Book');
      cy.get('input[id="field-description"]').type('A book content-type');
      cy.get('[title=Save]').click();

      cy.get('a[href="/controlpanel/dexterity-types/book"]').should(
        'have.text',
        'Book',
      );

      cy.visit('/controlpanel/dexterity-types/book/layout');
      cy.get('#page-controlpanel-layout').contains(
        'Can not edit Layout for Book',
      );
      cy.get('#page-controlpanel-layout button').click();

      cy.get('input[id="field-placeholder"]').type('Book title');
      cy.get('label[for="field-required"]').click();
      cy.get('label[for="field-fixed"]').click();

      cy.get('.block.inner.text .public-DraftEditor-content').click();
      cy.get('input[id="field-placeholder"]').click().type('About this book');
      cy.get('label[for="field-fixed"]').click();
      cy.get('.block.inner.text .public-DraftEditor-content').type('{enter}');

      cy.get('.ui.basic.icon.button.block-add-button:visible').click();
      cy.get('.ui.basic.icon.button.image').contains('Image').click();
      cy.get('input[id="field-placeholder"]').click().type('Book cover image');

      cy.get('#toolbar-save').click();

      cy.visit('/');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');

      cy.get('button[class="add"]').click();
      cy.get('#toolbar-add-book').click();
      cy.get('.block.title').contains('Book title');
      cy.get('.block.text').contains('About this book');
      cy.get('.block.image input[type="text"]')
        .should('have.attr', 'placeholder')
        .and('match', /Book cover image/);
      cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
        .type('My first book')
        .get('.documentFirstHeading span[data-text]')
        .contains('My first book');
      cy.get('#toolbar-save').click();
    });
  });
}
