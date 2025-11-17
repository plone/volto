describe('Slate Delete key behavior', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');

    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.wait('@content');
    cy.navigate('/my-page/edit');
    cy.wait('@schema');
  });

  it('Delete at end of A merges B text block into A and removes B', () => {
    cy.getSlateEditorAndType('First block text');

    cy.addNewBlock('slate');
    cy.getSlateEditorAndType('Second block text');

    cy.get(
      '.content-area .block-editor-slate .slate-editor [contenteditable=true]',
      { timeout: 8000 },
    ).should('have.length', 2);

    cy.get(
      '.content-area .block-editor-slate .slate-editor [contenteditable=true]',
    )
      .first()
      .type('{moveToEnd}{del}');

    cy.get(
      '.content-area .block-editor-slate .slate-editor [contenteditable=true]',
      { timeout: 8000 },
    )
      .should('have.length', 1)
      .first()
      .should('contain', 'First block text')
      .and('contain', 'Second block text');
  });

  it('Delete at end of A removes empty next slate block', () => {
    cy.getSlateEditorAndType('Keep me');

    cy.addNewBlock('slate');

    cy.get(
      '.content-area .block-editor-slate .slate-editor [contenteditable=true]',
      { timeout: 8000 },
    ).should('have.length', 2);

    cy.get(
      '.content-area .block-editor-slate .slate-editor [contenteditable=true]',
    )
      .first()
      .type('{moveToEnd}{del}');

    cy.get(
      '.content-area .block-editor-slate .slate-editor [contenteditable=true]',
      { timeout: 8000 },
    )
      .should('have.length', 1)
      .first()
      .should('contain', 'Keep me');
  });

  it('Delete at end of A does nothing when next block is non-text (Description)', () => {
    cy.getSlateEditorAndType('Alpha text');

    cy.getSlateSelector(
      '.content-area .slate-editor [contenteditable=true]',
    ).click();
    cy.get('button.block-add-button').click();
    cy.get("[aria-label='Unfold Text blocks']").click();
    cy.get('button.ui.basic.icon.button.description').click();

    cy.get('.block-editor-description, .block.description', {
      timeout: 10000,
    }).should('exist');
    cy.getSlateEditorSelectorAndType(
      '.block.description [contenteditable="true"]',
      'Meta info',
    );

    cy.get(
      '.content-area .block-editor-slate .slate-editor [contenteditable=true]',
    ).should('have.length', 1);
    cy.get('.block-editor-description, .block.description').should('exist');

    cy.get(
      '.content-area .block-editor-slate .slate-editor [contenteditable=true]',
    )
      .first()
      .type('{moveToEnd}{del}');

    cy.get(
      '.content-area .block-editor-slate .slate-editor [contenteditable=true]',
    )
      .first()
      .should('contain', 'Alpha text');
    cy.get('.block-editor-description, .block.description').should('exist');
    cy.get('.block.description [contenteditable="true"]').should(
      'contain',
      'Meta info',
    );
  });
});
