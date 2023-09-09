import { slateBeforeEach } from '../../../support/commands';

describe('Block Tests: Numbered lists', () => {
  beforeEach(slateBeforeEach);

  it('As editor I can add numbered lists', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

    // List
    cy.setSlateSelection('green');
    cy.clickSlateButton('Numbered list');

    // Split list
    cy.setSlateCursor('ideas').type('{enter}');

    // Save
    cy.toolbarSave();

    // then the page view should contain a link
    cy.get('[id="page-document"] ol li:first-child').contains(
      'Colorless green ideas',
    );
    cy.get('[id="page-document"] ol li:last-child').contains(
      'sleep furiously.',
    );
  });

  it('As editor I can remove numbered lists', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

    // List
    cy.setSlateSelection('green');
    cy.clickSlateButton('Numbered list');

    // Split list
    cy.setSlateCursor('ideas').type('{enter}');

    // Remove list
    cy.setSlateSelection('green', 'sleep', 2000);
    cy.clickSlateButton('Numbered list', 2000);

    // Save
    cy.toolbarSave();

    // then the page view should contain a link
    cy.get('[id="page-document"] p:first-of-type').contains(
      'Colorless green ideas',
    );
    cy.get('[id="page-document"] p:last-of-type').contains('sleep furiously.');
  });
});
