import { slateBeforeEach } from '../../../support/helpers';

describe('Block Tests: paste external images', () => {
  beforeEach(slateBeforeEach);
  it('should paste external images', function () {
    cy.getSlateEditorAndType('Let"s paste external images');
    cy.setSlateCursor('images')
      .type('{shift+enter}')
      .pasteClipboard(
        '<img alt="" src="https://dummyimage.com/600x400/000/fff" style="display: block; max-width: 100%; max-height: 20em; box-shadow: none;"></img>',
      );

    // Save
    cy.toolbarSave();

    cy.get('[id="page-document"] span img')
      .should('have.attr', 'src')
      .and('include', 'https://dummyimage.com/600x400/000/fff');
  });

  it.only('should paste external images', function () {
    cy.getSlate().focus().click().pasteImageClipboard();
    cy.pause();
    // Save
    // cy.toolbarSave();

    // cy.get('[id="page-document"] span img')
    //   .should('have.attr', 'src')
    //   .and('include', 'https://dummyimage.com/600x400/000/fff');
  });
});
