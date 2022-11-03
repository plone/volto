import { slateBeforeEach } from '../../../support/e2e';

describe('Block Tests: Links', () => {
  beforeEach(slateBeforeEach);

  it('As editor I can add links', function () {
    // Complete chained commands
    cy.intercept('GET', '/**/my-page').as('content');
    cy.intercept('PATCH', '*').as('save');

    cy.get('#toolbar').click();
    cy.getSlate().click().type('Colorless green ideas sleep furiously.');

    // Create Link
    cy.setSlateSelection('ideas', 'furiously');
    cy.clickSlateButton('Add link');

    cy.get('.slate-toolbar .link-form-container input').type(
      'https://google.com{enter}',
    );
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    cy.wait('@save');
    cy.wait('@content');

    // then the page view should contain a link
    cy.get('.ui.container p').contains(
      'Colorless green ideas sleep furiously.',
    );
    cy.get('.ui.container p a')
      .should('have.text', 'ideas sleep furiously')
      .and('have.attr', 'href')
      .and('include', 'https://google.com');

    // Remove link by partial selection
    cy.get('#toolbar .toolbar-actions .edit').click();
    cy.wait('@content');

    cy.getSlate().click();
    cy.setSlateSelection('sleep');
    cy.clickSlateButton('Edit link');
    cy.get('.slate-inline-toolbar .cancel').click();

    cy.get('h1.documentFirstHeading').click();

    cy.getSlate().should('not.contain', 'slate-editor-link');

    // lshould('have.text', 'Colorless green ideas sleep furiously.').and('not.exist';

    // // Re-add link
    // cy.setSlateSelection('green', 'sleep');
    // cy.clickSlateButton('Link');
    //
    // cy.get('.sidebar-container a.item:nth-child(3)').click();
    // cy.get('input[name="external_link-0-external"]')
    //   .click()
    //   .type('https://google.com{enter}');
    // cy.get('.sidebar-container .form .header button:first-of-type').click();
    //
    // // Save
    // cy.toolbarSave();
    //
    // // then the page view should contain a link
    // cy.contains('Colorless green ideas sleep furiously.');
    // cy.get('[id="page-document"] p a')
    //   .should('have.attr', 'href')
    //   .and('include', 'https://google.com');
  });

  // it('As editor I can add multiple lines and add links', function () {
  //   // Complete chained commands
  //   cy.getSlateEditorAndType(
  //     'Colorless green ideas{shift}{enter} {shift}{enter}sleep furiously.',
  //   );

  //   // Link
  //   cy.setSlateSelection('green', 'furiously');
  //   cy.clickSlateButton('Link');

  //   cy.get('.sidebar-container a.item:nth-child(3)').click();
  //   cy.get('input[name="external_link-0-external"]')
  //     .click()
  //     .type('https://example.com{enter}');
  //   cy.get('.sidebar-container .form .header button:first-of-type').click();

  //   // Remove link
  //   cy.setSlateSelection('ideas');
  //   cy.clickSlateButton('Remove link');

  //   // Re-add link
  //   cy.setSlateSelection('Colorless', 'furiously');
  //   cy.clickSlateButton('Link');

  //   cy.get('.sidebar-container a.item:nth-child(3)').click();
  //   cy.get('input[name="external_link-0-external"]')
  //     .click()
  //     .type('https://google.com{enter}');
  //   cy.get('.sidebar-container .form .header button:first-of-type').click();

  //   // Save
  //   cy.toolbarSave();

  //   // then the page view should contain a link
  //   cy.get('[id="page-document"] p a')
  //     .should('have.attr', 'href')
  //     .and('include', 'https://google.com');
  //   cy.get('[id="page-document"] p a').contains('Colorless green ideas');
  //   cy.get('[id="page-document"] p a').contains('sleep furiously');
  // });

  // it('As editor I can select multiple paragraphs and add links', function () {
  //   // Complete chained commands
  //   cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');
  //   cy.setSlateCursor('ideas').type('{shift}{enter}').type('{shift}{enter}');

  //   // Link
  //   cy.setSlateSelection('green', 'furiously');
  //   cy.clickSlateButton('Link');

  //   cy.get('.sidebar-container a.item:nth-child(3)').click();
  //   cy.get('input[name="external_link-0-external"]')
  //     .click()
  //     .type('https://example.com{enter}');
  //   cy.get('.sidebar-container .form .header button:first-of-type').click();

  //   // Remove link
  //   cy.setSlateSelection('ideas');
  //   cy.clickSlateButton('Remove link');

  //   // Re-add link
  //   cy.setSlateSelection('Colorless', 'furiously');
  //   cy.clickSlateButton('Link');

  //   cy.get('.sidebar-container a.item:nth-child(3)').click();
  //   cy.get('input[name="external_link-0-external"]')
  //     .click()
  //     .type('https://google.com{enter}');
  //   cy.get('.sidebar-container .form .header button:first-of-type').click();

  //   // Save
  //   cy.toolbarSave();

  //   // then the page view should contain a link
  //   cy.get('[id="page-document"] p a')
  //     .should('have.attr', 'href')
  //     .and('include', 'https://google.com');
  //   cy.get('[id="page-document"] p a').contains('Colorless green ideas');
  //   cy.get('[id="page-document"] p a').contains('sleep furiously');
  // });
});
