import { slateBeforeEach, slateAfterEach } from '../support';

describe('RichText Tests: bulleted lists', () => {
  beforeEach(() => slateBeforeEach('kitkat'));
  afterEach(slateAfterEach);

  it('As editor I can add bulleted lists', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

    // List
    cy.setSlateSelection('green');
    cy.clickSlateButton('Bulleted list');

    // Split list
    cy.setSlateCursor('ideas').type('{enter}');

    // Save
    cy.toolbarSave();

    // then the page view should contain a link
    cy.get('[id="view"] ul li:first-child').contains('Colorless green ideas');
    cy.get('[id="view"] ul li:last-child').contains('sleep furiously.');
  });

  it('As editor I can remove bulleted lists', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

    // List
    cy.setSlateSelection('green');
    cy.clickSlateButton('Bulleted list');

    // Split list
    cy.setSlateCursor('ideas').type('{enter}');

    // Remove list
    cy.setSlateSelection('green', 'sleep');
    cy.clickSlateButton('Bulleted list');

    // Save
    cy.toolbarSave();

    // then the page view should contain a link
    cy.get('[id="view"] p:first-of-type').contains('Colorless green ideas');
    cy.get('[id="view"] p:last-of-type').contains('sleep furiously.');
  });
});
