describe('ControlPanel: Dexterity Content-Types Layout', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    // given a logged in editor
    // add a new dexterity content-type for Book
    // and edit it's initial layout
    cy.visit('/');
    cy.autologin();
    cy.visit('/controlpanel/dexterity-types');
    cy.wait('@content');
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

    // Wait a bit for draftjs to load, without this the title block
    // custom placeholder is missing and cypress gives a timeout error
    cy.wait(1000);
    cy.get('input[id="field-placeholder"]').type('Book title');
    cy.get('label[for="field-required"]').click();
    cy.get('label[for="field-fixed"]').click();

    cy.getSlate().click();
    cy.get('input[id="field-placeholder"]').click().type('About this book');
    cy.get('label[for="field-fixed"]').click();
    cy.getSlateEditorAndType('{enter}');

    cy.get('.ui.basic.icon.button.block-add-button:visible').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('input[id="field-placeholder"]').click().type('Book cover image');

    cy.get('#toolbar-save').click();

    cy.visit('/');
    cy.wait('@content');

    cy.get('button[class="add"]').click();
    cy.get('#toolbar-add-book').click();
    cy.get('.block.title').contains('Book title');
    cy.get('.block.slate').contains('About this book');
    cy.get('.block.image input[type="text"]')
      .should('have.attr', 'placeholder')
      .and('match', /Book cover image/);
    cy.getSlateTitle()
      .focus()
      .click()
      .type('My first book')
      .contains('My first book');
    cy.get('#toolbar-save').click();
  });
});
