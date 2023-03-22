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
    cy.get('#view #page-document p').should('have.text', '');
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

  it.only('Handles pasted inline list in list item', function () {
    cy.getSlate().pasteClipboard(
      `<ul>
<li><strong>Smarter adaptation</strong>: Improving knowledge and manage uncertainty; including:
<ul>
<li>Pushing the frontiers of adaptation knowledge;</li>
<li>More and better climate loss data; and</li>
<li>Enhancing and expanding Climate-ADAPT as the European platform for adaptation knowledge.</li>
</ul>
</li>
<li>More <strong>systemic adaptation</strong>: Supporting policy development at all levels and all relevant policy fields; including three cross-cutting priorities to integrate adaptation into:
<ul>
<li>Macro-fiscal policy;</li>
<li>Nature-based solutions; and</li>
<li>Local adaptation actions.</li>
</ul>
</li>
<li><strong>Faster adaptation</strong>: Speed up adaptation implementation across the board.</li>
</ul>`,
    );

    cy.toolbarSave();

    cy.get('[id="page-document"] ul li+ul li:first').should(
      'have.text',
      'Pushing the frontiers of adaptation knowledge;',
    );
  });
});
