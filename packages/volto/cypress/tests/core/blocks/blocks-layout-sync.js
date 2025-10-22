/**
 * @fileoverview Test blocks_layout synchronization when content has empty blocks fields
 * This test covers the scenario where content has empty blocks={} and blocks_layout={items:[]}
 * from migration or automatic Plone generation, and ensures that adding text properly
 * synchronizes blocks_layout with the new block IDs.
 */

describe('Blocks Layout Sync', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    cy.intercept('POST', '/**/@types/Document').as('createContent');
    cy.intercept('PATCH', '/**/test-blocks-layout-sync').as('saveContent');

    // Given a logged in editor
    cy.autologin();
  });

  it('Should synchronize blocks_layout when adding text to empty blocks', () => {
    // Given a new page is created (which starts with empty blocks)
    cy.visit('/');
    cy.get('button[aria-label="Add"]').click();
    cy.get('a[href*="/add/Document"]').click();
    cy.wait('@createContent');

    // When I add text to the first text block
    cy.getSlateEditorAndType('This is test content for blocks layout sync');

    // And I save the page
    cy.get('button[type="submit"]').click();
    cy.wait('@saveContent');

    // Then the page should save successfully
    cy.url().should('not.include', '/edit');

    // And when I visit the page again
    cy.visit(cy.url());
    cy.wait('@content');

    // Then the content should be visible (blocks_layout was synchronized)
    cy.get('.slate-editor').should(
      'contain',
      'This is test content for blocks layout sync',
    );
  });

  it('Should handle multiple blocks when blocks_layout is empty', () => {
    // Given a new page is created
    cy.visit('/');
    cy.get('button[aria-label="Add"]').click();
    cy.get('a[href*="/add/Document"]').click();
    cy.wait('@createContent');

    // When I add text to the first block
    cy.getSlateEditorAndType('First block content');

    // And I press Enter to create a new block
    cy.getSlate().type('{enter}');

    // And I add text to the second block
    cy.getSlateEditorAndType('Second block content');

    // And I save the page
    cy.get('button[type="submit"]').click();

    // Then the page should save successfully
    cy.url().should('not.include', '/edit');

    // And when I visit the page again
    cy.visit(cy.url());
    cy.wait('@content');

    // Then both blocks should be visible
    cy.get('.slate-editor').should('contain', 'First block content');
    cy.get('.slate-editor').should('contain', 'Second block content');
  });

  it('Should maintain blocks_layout sync when editing existing content', () => {
    // Given a new page is created
    cy.visit('/');
    cy.get('button[aria-label="Add"]').click();
    cy.get('a[href*="/add/Document"]').click();
    cy.wait('@createContent');

    // And I add some initial content
    cy.getSlateEditorAndType('Existing content');

    // And I save the page
    cy.get('button[type="submit"]').click();
    cy.wait('@saveContent');

    // When I edit the page again
    cy.visit(cy.url() + '/edit');
    cy.wait('@schema');

    // And I modify the existing block
    cy.getSlate().clear().type('Modified content');

    // And I add a new block
    cy.getSlate().type('{enter}');
    cy.getSlateEditorAndType('New block content');

    // And I save the page
    cy.get('button[type="submit"]').click();

    // Then the page should save successfully
    cy.url().should('not.include', '/edit');

    // And when I visit the page again
    cy.visit(cy.url());
    cy.wait('@content');

    // Then both blocks should be visible
    cy.get('.slate-editor').should('contain', 'Modified content');
    cy.get('.slate-editor').should('contain', 'New block content');
  });
});
