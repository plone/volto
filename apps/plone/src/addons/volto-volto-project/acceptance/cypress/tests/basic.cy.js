import {
  getSlateEditorAndType,
  getSelectedSlateEditor,
} from '../support/slate';

context('Basic Acceptance Tests', () => {
  describe('Text Block Tests', () => {
    beforeEach(() => {
      cy.intercept('GET', `/**/*?expand*`).as('content');
      cy.intercept('GET', '/**/Document').as('schema');

      // given a logged in editor and a page in edit mode
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Document',
      });
      cy.visit('/');
      cy.wait('@content');
    });

    it('As editor I can add a page with a text block', function () {
      // when I add a page with a text block
      cy.get('#toolbar-add').click();
      cy.get('#toolbar-add-document').click();
      cy.get('.documentFirstHeading')
        .type('My Page')
        .get('.documentFirstHeading')
        .contains('My Page');

      getSlateEditorAndType(
        '.block .slate-editor [contenteditable=true]',
        'This is the text',
      );

      getSelectedSlateEditor().contains('This is the text');
      cy.get('#toolbar-save').click();
      cy.wait('@content');
      cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    });

    it('As editor I can add a link to a text block', function () {
      cy.navigate('/document/edit');
      cy.wait('@schema');

      cy.get('.block.inner.title .documentFirstHeading');

      cy.log('when I create a link');

      cy.getSlateEditorAndType(
        'Colorless green ideas sleep furiously.',
      ).setSlateSelection('furiously');
      cy.clickSlateButton('Add link');
      cy.get('.slate-toolbar .link-form-container input').type(
        'https://google.com{enter}',
      );

      cy.get('#toolbar-save', { timeout: 10000 }).click();
      cy.wait('@content');

      cy.log('then the page view should contain a link');

      cy.get('.container p').contains('Colorless green ideas sleep furiously.');
      cy.get('.container p a')
        .should('have.text', 'furiously')
        .and('have.attr', 'href')
        .and('include', 'https://google.com');
    });
  });
});
