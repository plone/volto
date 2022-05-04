import { slateBeforeEach, slateAfterEach } from '../support';

describe('Block Tests: Links', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);

  it('As editor I can add links', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

    // Link
    cy.setSlateSelection('sleep', 'furiously');
    cy.clickSlateButton('Link');

    cy.get('.sidebar-container a.item:nth-child(3)').click();
    cy.get('input[name="external_link-0-external"]')
      .click()
      .type('https://example.com{enter}');
    cy.get('.sidebar-container .form .header button:first-of-type').click();

    // Remove link
    cy.setSlateSelection('sleep');
    cy.clickSlateButton('Remove link');

    // Re-add link
    cy.setSlateSelection('green', 'sleep');
    cy.clickSlateButton('Link');

    cy.get('.sidebar-container a.item:nth-child(3)').click();
    cy.get('input[name="external_link-0-external"]')
      .click()
      .type('https://google.com{enter}');
    cy.get('.sidebar-container .form .header button:first-of-type').click();

    // Save
    cy.toolbarSave();

    // then the page view should contain a link
    cy.contains('Colorless green ideas sleep furiously.');
    cy.get('[id="page-document"] p a')
      .should('have.attr', 'href')
      .and('include', 'https://google.com');
  });

  it('As editor I can add multiple lines and add links', function () {
    // Complete chained commands
    cy.getSlateEditorAndType(
      'Colorless green ideas{shift}{enter} {shift}{enter}sleep furiously.',
    );

    // Link
    cy.setSlateSelection('green', 'furiously');
    cy.clickSlateButton('Link');

    cy.get('.sidebar-container a.item:nth-child(3)').click();
    cy.get('input[name="external_link-0-external"]')
      .click()
      .type('https://example.com{enter}');
    cy.get('.sidebar-container .form .header button:first-of-type').click();

    // Remove link
    cy.setSlateSelection('ideas');
    cy.clickSlateButton('Remove link');

    // Re-add link
    cy.setSlateSelection('Colorless', 'furiously');
    cy.clickSlateButton('Link');

    cy.get('.sidebar-container a.item:nth-child(3)').click();
    cy.get('input[name="external_link-0-external"]')
      .click()
      .type('https://google.com{enter}');
    cy.get('.sidebar-container .form .header button:first-of-type').click();

    // Save
    cy.toolbarSave();

    // then the page view should contain a link
    cy.get('[id="page-document"] p a')
      .should('have.attr', 'href')
      .and('include', 'https://google.com');
    cy.get('[id="page-document"] p a').contains('Colorless green ideas');
    cy.get('[id="page-document"] p a').contains('sleep furiously');
  });

  it('As editor I can select multiple paragraphs and add links', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');
    cy.setSlateCursor('ideas').type('{shift}{enter}').type('{shift}{enter}');

    // Link
    cy.setSlateSelection('green', 'furiously');
    cy.clickSlateButton('Link');

    cy.get('.sidebar-container a.item:nth-child(3)').click();
    cy.get('input[name="external_link-0-external"]')
      .click()
      .type('https://example.com{enter}');
    cy.get('.sidebar-container .form .header button:first-of-type').click();

    // Remove link
    cy.setSlateSelection('ideas');
    cy.clickSlateButton('Remove link');

    // Re-add link
    cy.setSlateSelection('Colorless', 'furiously');
    cy.clickSlateButton('Link');

    cy.get('.sidebar-container a.item:nth-child(3)').click();
    cy.get('input[name="external_link-0-external"]')
      .click()
      .type('https://google.com{enter}');
    cy.get('.sidebar-container .form .header button:first-of-type').click();

    // Save
    cy.toolbarSave();

    // then the page view should contain a link
    cy.get('[id="page-document"] p a')
      .should('have.attr', 'href')
      .and('include', 'https://google.com');
    cy.get('[id="page-document"] p a').contains('Colorless green ideas');
    cy.get('[id="page-document"] p a').contains('sleep furiously');
  });
});
