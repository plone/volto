import { slateBeforeEach } from '../../../support/e2e';

describe('Block Tests: external text containing html contents/tags ', () => {
  beforeEach(slateBeforeEach);

  it('should paste external text containing html', function () {
    // cy.getSlateEditorAndType('Let"s paste external html texts');
    // cy.setSlateCursor('texts').type('{enter}');
    cy.getSlate().pasteClipboard(
      '<p>For simplicity, emissions arising (CRF 3B) were presented for all livestock type h CH<sub>4</sub> and N<sub>2</sub>O), e CO<sub>2</sub>e value.single CO<sub>2</sub>e figure.</p>',
    );

    // Save
    cy.toolbarSave();

    cy.get('[id="page-document"] p').should('have.length', 1);
  });

  it('should paste external formatted text and does not split the blocks', function () {
    // The idea is pasteClipboard should only apply on its attached slate block
    // by not splitting them into blocks.
    cy.getSlate().pasteClipboard(
      `<p><strong>Lorem Ipsum</strong>
is simply dummy text of the printing and typesetting industry.
</p>`,
    );

    // Save
    cy.toolbarSave();
    cy.get('[id="page-document"] > p:nth-of-type(1)').should(
      'have.html',
      `<strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry.`,
    );
  });

  it('should paste external text containing empty anchor links', function () {
    cy.getSlate().pasteClipboard(
      `<a href="/ims/greenhouse-gas-emissions-from-agriculture#_msocom_1"></a>
      `,
    );

    // Save
    cy.toolbarSave();

    cy.get('[id="page-document"] p a').should('have.length', 1);
  });
});
