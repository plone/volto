describe('Slate Backspace Behavior', () => {
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

  it('Backspace at start of second block deletes it and merges content into first block', () => {
    cy.getSlateEditorAndType('First block text');

    cy.getSlateEditorAndType('{enter}');
    cy.getSlateEditorAndType('Second block text');

    cy.getSlate().setCursorBefore('Second').type('{backspace}');

    cy.get('.content-area .slate-editor [contenteditable=true]')
      .should('have.length', 1)
      .should('contain', 'First block text')
      .should('contain', 'Second block text');
  });

  it('Enter after Backspace merge splits back into a new block', () => {
    cy.getSlateEditorAndType('Hello');

    cy.getSlateEditorAndType('{enter}');
    cy.getSlateEditorAndType('World');

    cy.getSlate().setCursorBefore('World').type('{backspace}');

    cy.getSlate().type('{enter}');

    cy.get('.content-area .slate-editor [contenteditable=true]')
      .should('have.length', 2)
      .eq(0)
      .should('contain', 'Hello');

    cy.get('.content-area .slate-editor [contenteditable=true]')
      .eq(1)
      .should('contain', 'World');
  });

  // Regression test for #8347: Backspace right after a styled (bold) inline
  // element must NOT be treated as "cursor at block start".
  it('Backspace right after a bold inline element does not merge blocks', () => {
    cy.getSlateEditorAndType('First block');

    cy.getSlateEditorAndType('{enter}');
    cy.getSlateEditorAndType('JavaScript programming');

    // Turn "JavaScript" into a bold inline element.
    cy.setSlateSelection('JavaScript');
    cy.clickSlateButton('Bold');

    // Place the caret at the start of the text leaf that follows the bold
    // element (offset 0 of a non-first leaf).
    cy.getSlate().setCursorBefore('programming').type('{backspace}');

    cy.get('.content-area .slate-editor [contenteditable=true]').should(
      'have.length',
      2,
    );
    cy.get('.content-area .slate-editor [contenteditable=true]')
      .eq(0)
      .should('contain', 'First block');
    cy.get('.content-area .slate-editor [contenteditable=true]')
      .eq(1)
      .should('contain', 'JavaScript');
    cy.get('.content-area .slate-editor [contenteditable=true] strong').should(
      'have.text',
      'JavaScript',
    );
  });

  // Regression test for #8347: a list item containing an inline link followed
  // by a text leaf. Backspace at the start of that trailing leaf used to crash
  // slate-react with "Cannot get the leaf node at path [1,0] ...".
  it('Backspace right after a link inside a list item does not corrupt the block', () => {
    cy.getSlateEditorAndType('First block');

    cy.getSlateEditorAndType('{enter}');
    cy.getSlateEditorAndType('Built with JavaScript programming');

    // Turn "JavaScript" into a link.
    cy.setSlateSelection('JavaScript');
    cy.clickSlateButton('Add link');
    cy.get('.slate-toolbar .link-form-container input').type(
      'https://demo.plone.org/{enter}',
    );

    // Convert the whole line into a bulleted list, so the link ends up inside
    // a list item.
    cy.setSlateSelection('Built with JavaScript programming');
    cy.clickSlateButton('Bulleted list');

    // Place the caret at the start of the text leaf that follows the link
    // inside the list item, then backspace.
    cy.getSlate().setCursorBefore('programming').type('{backspace}');

    cy.get('.content-area .slate-editor [contenteditable=true]').should(
      'have.length',
      2,
    );
    cy.get('.content-area .slate-editor [contenteditable=true]')
      .eq(0)
      .should('contain', 'First block');
    cy.get('.content-area .slate-editor [contenteditable=true]')
      .eq(1)
      .should('contain', 'JavaScript');
    cy.get('.content-area .slate-editor [contenteditable=true] a')
      .should('have.text', 'JavaScript')
      .and('have.attr', 'href')
      .and('include', 'https://demo.plone.org');
  });
});
