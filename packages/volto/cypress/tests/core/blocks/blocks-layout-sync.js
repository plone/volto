/**
 * @fileoverview Test blocks_layout synchronization when content has empty blocks fields
 * This test covers the scenario where content has empty blocks={} and blocks_layout={items:[]}
 * from migration or automatic Plone generation, and ensures that adding text properly
 * synchronizes blocks_layout with the new block IDs.
 */

describe('Blocks Layout Sync', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '**/@types/Document').as('schema');

    // Given a logged in editor
    cy.autologin();
  });

  it('Should synchronize blocks_layout when adding text to empty blocks', () => {
    // Given a new page is created (which starts with empty blocks)
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.wait('@schema');

    // Fill required title so saving triggers a PATCH with predictable id
    cy.get('input[id="field-title"]').type('Blocks layout sync');
    // intercepts will be set right before saving

    // Ensure editor is mounted, then add text to the first text block
    cy.get('.block.slate [contenteditable=true]').should('be.visible');
    cy.getSlateEditorAndType('This is test content for blocks layout sync');

    // And I save the page
    cy.intercept('POST', '**/++api++/**').as('saveContent');
    cy.intercept('PATCH', '**/++api++/**').as('saveContent');
    cy.get('#toolbar-save').click();
    cy.wait('@saveContent');

    // Then the page should save successfully
    cy.url().should('not.include', '/edit');

    // And when I visit the page again
    cy.url().then((currentUrl) => cy.visit(currentUrl));
    cy.wait('@content');

    // Then the content should be visible (blocks_layout was synchronized)
    cy.get('#page-document').should(
      'contain',
      'This is test content for blocks layout sync',
    );
  });

  it('Should handle multiple blocks when blocks_layout is empty', () => {
    // Given a new page is created
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.wait('@schema');

    // Fill required title and set specific PATCH intercept
    cy.get('input[id="field-title"]').type('Blocks layout sync');
    // intercepts will be set right before saving

    // When I add text to the first block
    cy.get('.block.slate [contenteditable=true]').should('be.visible');
    cy.getSlateEditorAndType('First block content');

    // And I press Enter to create a new block
    cy.getSlate().type('{enter}');
    cy.get('.block.slate').should('have.length.at.least', 2);

    // And I add text to the second block
    cy.getSlateEditorAndType('Second block content');

    // And I save the page
    cy.intercept('POST', '**/++api++/**').as('saveContent');
    cy.intercept('PATCH', '**/++api++/**').as('saveContent');
    cy.get('#toolbar-save').click();
    cy.wait('@saveContent');

    // Then the page should save successfully
    cy.url().should('not.include', '/edit');

    // And when I visit the page again
    cy.url().then((currentUrl) => cy.visit(currentUrl));
    cy.wait('@content');

    // Then both blocks should be visible
    cy.get('#page-document').should('contain', 'First block content');
    cy.get('#page-document').should('contain', 'Second block content');
  });

  it('Should maintain blocks_layout sync when editing existing content', () => {
    // Given a new page is created
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.wait('@schema');

    // Fill required title and set specific PATCH intercept
    cy.get('input[id="field-title"]').type('Blocks layout sync');
    // intercepts will be set right before saving

    // And I add some initial content
    cy.get('.block.slate [contenteditable=true]').should('be.visible');
    cy.getSlateEditorAndType('Existing content');

    // And I save the page
    cy.intercept('POST', '**/++api++/**').as('saveContent');
    cy.intercept('PATCH', '**/++api++/**').as('saveContent');
    cy.get('#toolbar-save').click();
    cy.wait('@saveContent');

    // When I edit the page again
    cy.url().then((currentUrl) => cy.visit(`${currentUrl}/edit`));
    cy.wait('@schema');

    // And I modify the existing block
    cy.get('.block.slate [contenteditable=true]').should('be.visible');
    cy.getSlate().clear().type('Modified content');

    // And I add a new block
    cy.getSlate().type('{enter}');
    cy.get('.block.slate').should('have.length.at.least', 2);
    cy.getSlateEditorAndType('New block content');

    // And I save the page
    cy.intercept('POST', '**/++api++/**').as('saveContent');
    cy.intercept('PATCH', '**/++api++/**').as('saveContent');
    cy.get('#toolbar-save').click();

    // Then the page should save successfully
    cy.url().should('not.include', '/edit');

    // And when I visit the page again
    cy.url().then((currentUrl) => cy.visit(currentUrl));
    cy.wait('@content');

    // Then both blocks should be visible
    cy.get('#page-document').should('contain', 'Modified content');
    cy.get('#page-document').should('contain', 'New block content');
  });
});
