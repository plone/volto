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
    // Set date using react-aria date segments
    cy.get('.field-wrapper-effective [data-type="month"]').click().type('12');
    cy.get('.field-wrapper-effective [data-type="day"]').click().type('24');
    cy.get('.field-wrapper-effective [data-type="year"]').click().type('2050');
    cy.get('.field-wrapper-effective [data-type="hour"]').click().type('3');
    cy.get('.field-wrapper-effective [data-type="minute"]').click().type('30');
    cy.get('.field-wrapper-effective [data-type="dayPeriod"]')
      .click()
      .type('PM');
    cy.get('#toolbar-save').click();
    cy.get('body.view-viewview #page-document .documentFirstHeading').should(
      'have.text',
      'My Page',
    );
    cy.url().should('contain', '/my-page');

    cy.get('.edit').click();
    cy.wait('@content');

    // Verify the date segments have the correct values
    cy.get('.field-wrapper-effective [data-type="month"]').should(
      'have.text',
      '12',
    );
    cy.get('.field-wrapper-effective [data-type="day"]').should(
      'have.text',
      '24',
    );
    cy.get('.field-wrapper-effective [data-type="year"]').should(
      'have.text',
      '2050',
    );
    cy.get('.field-wrapper-effective [data-type="hour"]').should(
      'have.text',
      '3',
    );
    cy.get('.field-wrapper-effective [data-type="minute"]').should(
      'have.text',
      '30',
    );
  });

  it('As an editor, given a document with no title or a validation error when I save the sidebar tab switches to the metadata tab', function () {
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('#toolbar-save').click();

    cy.get('.Toastify')
      .findByRole('alert')
      .contains('Required input is missing');
    cy.get('.sidebar-container .tabs-wrapper .active.item').contains('Page');
  });

  it('After removing value of widget the focus should be removed from the field', () => {
    cy.wait(2000);
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
