import { slateBeforeEach } from '../../../support/e2e';

describe('Block Tests: Bulleted lists', () => {
  beforeEach(slateBeforeEach);

  it('As editor I can add bulleted lists', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

    // List
    cy.setSlateSelection('green');
    cy.clickSlateButton('Bulleted list');
    cy.getSlate().should('have.descendants', 'ul li');

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
    cy.setSlateCursor('Colorless');

    cy.setSlateSelection('Colorless green ideas sleep furiously.')
      .type('{backspace}')
      .type('{enter}');

    // Save
    cy.toolbarSave();
    cy.wait(1000);

    cy.log('then the page view should contain a link');
    cy.get('#view #page-document p').its('length').should('eq', 1);
    cy.get('#view #page-document p').should('have.text', "");
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
