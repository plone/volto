context('Blocks Acceptance Tests', () => {
  describe('Text Block Tests', () => {
    beforeEach(() => {
      cy.intercept('GET', `/**/*?expand*`).as('content');
      cy.intercept('PATCH', '/**/document').as('edit');
      cy.intercept('GET', '/**/Document').as('schema');
      // given a logged in editor and a page in edit mode
      cy.autologin();
      cy.createContent({
        contentType: 'Document',
        contentId: 'document',
        contentTitle: 'Test document',
      });
      cy.createContent({
        contentType: 'Document',
        contentId: 'my-page',
        contentTitle: 'My Page',
        path: '/document',
      });
      // Adding Image for Grid Image
      cy.createContent({
        contentType: 'Image',
        contentId: 'my-image',
        contentTitle: 'My Image',
        path: '/document',
      });
      cy.visit('/');
      cy.wait('@content');
      cy.navigate('/document');
      cy.wait('@content');
      cy.navigate('/document/edit');
      cy.wait('@schema');
    });

    it('As editor I can add a Grid', function () {
      cy.getSlate().click();
      cy.addNewBlock('grid');

      cy.findByText('2 columns').click();

      cy.get('button[aria-label="Add block in position 0"]').click();
      cy.get('.blocks-chooser .mostUsed .button.image').click();
      cy.get('.block.image .toolbar-inner .buttons:first-child').click();
      cy.get('[aria-label="Select My Image"]').dblclick();
      cy.findByText('my-image');

      cy.get('button[aria-label="Add block in position 1"]').click();
      cy.get('.blocks-chooser [aria-label="Unfold Text blocks"]').click();
      cy.wait(200);
      cy.get('.blocks-chooser .text .button.slate').click();
      cy.getSlateEditorSelectorAndType(
        '.block.gridBlock.selected .slate-editor [contenteditable=true]',
        'Colorless green ideas sleep furiously.',
      );

      cy.get('#toolbar-save').click();
      cy.wait('@edit');
      cy.wait('@content');

      cy.findByText('Colorless green ideas sleep furiously.');

      cy.navigate('/document/edit');
      cy.wait('@schema');
      cy.get('.block.inner.gridBlock').click();
      cy.get('.block.inner.gridBlock .block-editor-slate').click();
      cy.get('.block.inner.gridBlock [aria-label="Reset element 1"]').click();
      cy.get('.block.inner.gridBlock [aria-label="Remove element 1"]').click();
      cy.get(
        '.block.inner.gridBlock .toolbar [aria-label="Add element to container"]',
      ).click();
      cy.get('button[aria-label="Add block in position 1"]').click();
      cy.get('.blocks-chooser .mostUsed .button.teaser').click();
      cy.get(
        '.objectbrowser-field[aria-labelledby="fieldset-default-field-label-href"] button[aria-label="Open object browser"]',
      ).click();
      cy.get('[aria-label="Select My Page"]').dblclick();
      cy.get('#toolbar-save').click();
      cy.wait('@edit');
      cy.wait('@content');

      cy.get('.block.gridBlock').findByText('My Page');
    });

    it('As editor I can add a Grid with slate block on it', function () {
      cy.getSlate().click();
      cy.addNewBlock('grid');

      cy.findByText('2 columns').click();

      cy.get('button[aria-label="Add block in position 1"]').click();
      cy.get('.blocks-chooser [aria-label="Unfold Text blocks"]').click();
      cy.wait(200);
      cy.get('.blocks-chooser .text .button.slate').click();
      cy.scrollTo('top');

      cy.getSlateEditorSelectorAndType(
        '.block.gridBlock.selected .slate-editor [contenteditable=true]',
        'Colorless green ideas sleep furiously.',
      ).setSelection('furiously');
      cy.scrollTo('top');
      cy.wait(1000);
      cy.scrollTo('top');
      cy.get(
        '.slate-inline-toolbar .ui.buttons .button-wrapper a[title="Add link"]',
      ).click();
      cy.get('.link-form-container input').type('https://google.com{enter}');

      cy.get('#toolbar-save').click();

      cy.get('.block.gridBlock.two p').contains(
        'Colorless green ideas sleep furiously.',
      );
      cy.get('.block.gridBlock.two p a')
        .should('have.attr', 'href')
        .and('include', 'https://google.com');
    });
  });
});
