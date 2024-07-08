describe('Add Content Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.autologin();
    cy.visit('/');
    cy.wait('@content');

    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
  });
  it('As an editor I can set the effective date of a page', function () {
    cy.getSlateTitle().focus().click().type('My Page').contains('My Page');
    cy.get('input#effective-date').click();
    cy.get('input#effective-date').type('{selectall}12/24/2050{esc}');
    cy.get('input#effective-time').type('{downarrow}');
    cy.get('.rc-time-picker-panel-input').type('{selectall}10:00 AM{esc}');
    cy.get('#toolbar-save').click();
    cy.get('body.view-viewview #page-document .documentFirstHeading').should(
      'have.text',
      'My Page',
    );
    cy.url().should('contain', '/my-page');

    cy.get('.edit').click();
    cy.wait('@content');

    cy.get('input#effective-date').should('have.value', '12/24/2050');
    cy.get('input#effective-time').should('have.value', '10:00 AM');
  });

  it('As an editor, given a document with no title or a validation error when I save the sidebar tab switches to the metadata tab', function () {
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('#toolbar-save').click();

    cy.findByRole('alert')
      .get('.toast-inner-content')
      .contains('Required input is missing');
    cy.get('.sidebar-container .tabs-wrapper .active.item').contains('Page');
  });

  it('After removing value of widget the focus should be removed from the field', () => {
    cy.get('#field-creators').type('aaa');
    cy.get('#field-creators')
      .type('aaa{Enter}')
      .get('.react-select__multi-value__remove')
      .click();
    cy.getSlateEditorAndType(
      'Test if all the text will be in this slate block',
    ).contains('Test if all the text will be in this slate block');
  });
});
