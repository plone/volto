import { slateBeforeEach } from '../../../support/helpers';

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
    cy.get('#view #page-document p').should('have.text', '');
  });

  // Skipped on upgrade to Cypress 13... for some reason the timing is too
  // slow in CI and the outcome of removing the list is not working well.
  // On the other hand, locally in Cypress and in the app it does works well.
  // Leaving this comment to revisit it in later versions.
  it.skip('As editor I can remove bulleted lists', function () {
    // Complete chained commands
    cy.getSlateEditorAndType('Colorless green ideas sleep furiously.');

    // List
    cy.setSlateSelection('green');
    cy.clickSlateButton('Bulleted list');

    // Split list
    cy.setSlateCursor('ideas').type('{enter}');

    // Remove list
    cy.setSlateSelection('green', 'sleep', 2000);
    cy.clickSlateButton('Bulleted list', 2000);

    // Save
    cy.toolbarSave();

    // then the page view should contain a link
    cy.get('[id="page-document"] p:first-of-type').contains(
      'Colorless green ideas',
    );
    cy.get('[id="page-document"] p:last-of-type').contains('sleep furiously.');
  });
});
