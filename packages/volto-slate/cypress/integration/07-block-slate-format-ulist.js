import { slateBeforeEach, slateAfterEach } from '../support';

describe('Block Tests: Bulleted lists', () => {
  beforeEach(slateBeforeEach);
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
    cy.get('[id="page-document"] ul li').should('have.length', 2);
    cy.get('[id="page-document"] ul li:nth-child(1)').contains(
      'Colorless green ideas',
    );
    cy.get('[id="page-document"] ul li:nth-child(2)').contains(
      'sleep furiously.',
    );
  });
  it('should transform to new text block on press Enter in empty lists', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

    // List
    cy.setSlateSelection('green');
    cy.clickSlateButton('Bulleted list');

    cy.setSlateSelection('Colorless green ideas sleep furiously.')
      .type('{backspace}')
      .type('{enter}');

    // Save
    cy.toolbarSave();
    cy.wait(1000);

    // then the page view should contain a link
    cy.get('[id="page-document"] p').its('length').should('eq', 1);
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
    cy.get('[id="page-document"] p:first-of-type').contains(
      'Colorless green ideas',
    );
    cy.get('[id="page-document"] p:last-of-type').contains('sleep furiously.');
  });
});
