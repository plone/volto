import { slateBeforeEach, slateAfterEach, createSlateBlock } from '../support';

describe('Block Tests: external text containing html contents/tags ', () => {
  beforeEach(slateBeforeEach);
  afterEach(slateAfterEach);
  it('should paste external text containing html', function () {
    cy.getSlateEditorAndType('Let"s paste external html texts');
    cy.setSlateCursor('texts').type('{enter}');
    createSlateBlock().pasteClipboard(
      '<p>For simplicity, emissions arising (CRF 3B) were presented for all livestock type h CH<sub>4</sub> and N<sub>2</sub>O), e CO<sub>2</sub>e value.single CO<sub>2</sub>e figure.</p>',
    );

    // Save
    cy.toolbarSave();

    cy.get('[id="page-document"] p:nth-child(3)').should('have.length', 1);
  });
  it('should paste external formatted text and does not split the blocks', function () {
    cy.getSlateEditorAndType('Let"s paste external html texts');
    cy.wait(1000);
    cy.setSlateCursor('texts').type('{enter}');
    // The idea is pasteClipboard should only apply on its attached slate block
    // by not splitting them into blocks.
    createSlateBlock().pasteClipboard(
      `<p><strong>Lorem Ipsum</strong> 
       is simply dummy text of the printing and typesetting industry.
      </p>
      `,
    );

    // Save
    cy.toolbarSave();

    cy.get('[id="page-document"] > p:nth-of-type(2)')
      .children()
      .its('length')
      .should('be.gte', 1);
    cy.get('[id="page-document"] > p:nth-of-type(3)')
      .children()
      .should('have.length', 0);
  });
  it('should paste external text containing empty anchor links', function () {
    cy.getSlateEditorAndType(
      'Let"s paste external html texts with empty anchor links',
    );
    cy.setSlateCursor('links').type('{enter}');
    cy.wait(1000);
    createSlateBlock().pasteClipboard(
      `<a href="/ims/greenhouse-gas-emissions-from-agriculture#_msocom_1"></a>
      `,
    );

    // Save
    cy.toolbarSave();

    cy.get('[id="page-document"] p:nth-child(3)').should('have.length', 1);
  });
});
