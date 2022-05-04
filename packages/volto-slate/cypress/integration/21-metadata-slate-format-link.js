import { slateBeforeEach, slateAfterEach, selectSlateRange } from '../support';

describe('RichText Tests: Add links', () => {
  beforeEach(() => slateBeforeEach('kitkat'));
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
    cy.get('[id="view"] p a')
      .should('have.attr', 'href')
      .and('include', 'https://google.com');
    cy.get('[id="view"] p a').contains('green ideas sleep');
  });

  it('As editor I can add multiple lines and add links', function () {
    // Complete chained commands
    cy.getSlateEditorAndType(
      'Colorless green ideas{enter}{enter}sleep furiously.',
    );

    // TODO: check to see if these cy.wait calls are really needed

    cy.wait(1000);

    cy.setSlateSelection('green', 'furiously');

    cy.clickSlateButton('Link');

    // this is necessary to wait till the sidebar is visible before clicking on it
    cy.wait(1000);

    cy.get('.sidebar-container a.item:nth-child(3)').click();
    cy.get('input[name="external_link-0-external"]')
      .click()
      .type('https://example.com{enter}');
    cy.get('.sidebar-container .form .header button:first-of-type').click();

    // Remove link
    cy.setSlateSelection('ideas');
    cy.clickSlateButton('Remove link');

    cy.setSlateSelection('sleep');
    cy.clickSlateButton('Remove link');

    cy.wait(1000);

    // Re-add link
    cy.setSlateSelection('Colorless', 'furiously');

    cy.wait(1000);

    cy.clickSlateButton('Link');

    cy.get('.sidebar-container a.item:nth-child(3)').click();
    cy.get('input[name="external_link-0-external"]')
      .click()
      .type('https://google.com{enter}');
    cy.get('.sidebar-container .form .header button:first-of-type').click();

    // Save
    cy.toolbarSave();

    // then the page view should contain a link
    cy.get('#view p:first-of-type a')
      .should('have.attr', 'href')
      .and('include', 'https://google.com');

    cy.get('#view p:first-of-type a').contains('Colorless green ideas');

    cy.get('#view p:last-of-type a')
      .should('have.attr', 'href')
      .and('include', '/');

    cy.get('#view p:last-of-type a').contains('sleep furiously');
  });

  // it('As editor I can select multiple paragraphs and add links', function () {
  //   // Complete chained commands
  //   cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');
  //   cy.setSlateCursor('ideas').type('{enter}{enter}');

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

  //   cy.setSlateSelection('sleep');
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
  //   cy.get('.slate.widget p:first-of-type a')
  //     .should('have.attr', 'href')
  //     .and('include', 'https://google.com');
  //   cy.get('.slate.widget p:first-of-type a').contains('Colorless green ideas');
  //   cy.get('.slate-widget p:last-of-type a')
  //     .should('have.attr', 'href')
  //     .and('include', 'https://google.com');
  //   cy.get('.slate-widget p:last-of-type a').contains('sleep furiously.');
  // });
});
