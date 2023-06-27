describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');
    cy.viewport(1536, 960);
    cy.injectAxe(); // make sure axe is available on the page
  });

  //(News Item)
  it('As an user can edit, for the first time, a text block inside a new contentType using keyboard', () => {
    cy.createContent({
      contentType: 'News Item',
      contentId: 'test-news-item',
      contentTitle: 'Automatic title',
    });
    cy.visit('/test-news-item/edit');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.focused()
      .clear() //cancel the contentTitle needed to create the content
      .should('have.attr', 'role', 'textbox')
      .type('Content type new Title')
      .tab()
      .should('have.class', 'handle wrapper')
      .tab()
      .should('have.class', 'inner-focus'); //drag-and-drop button -> next text block
    cy.focused().wait(1000).type('New content text');
    cy.focused().tab().should('have.class', 'handle wrapper');
    cy.focused().tab().should('have.class', 'delete-button');
    //starting the way back to the save button
    cy.focused().tab({ shift: true }).should('have.class', 'handle wrapper');
    cy.focused().tab({ shift: true }).should('have.class', 'inner-focus');
    // tab doesn't see this drag and drop button inside the cypress test, but exists.
    // cy.focused().tab({ shift: true }).should('have.class', 'handle wrapper');
    cy.focused().tab({ shift: true }).should('have.attr', 'role', 'textbox');
    cy.focused().tab({ shift: true }).should('have.class', 'section');
    cy.focused()
      .tab({ shift: true })
      .should('have.attr', 'aria-label', 'Search');
    cy.focused()
      .tab({ shift: true })
      .should('have.attr', 'name', 'SearchableText');
    //Active menu item
    cy.focused()
      .tab({ shift: true })
      .should('have.attr', 'class', 'item active');
    //Menu items - Variable
    cy.focused().tab({ shift: true }).should('have.class', 'item');
    cy.focused().tab({ shift: true }).should('have.class', 'item');
    cy.focused().tab({ shift: true }).should('have.class', 'item');
    cy.focused().tab({ shift: true }).should('have.attr', 'title', 'Site');
    cy.focused()
      .tab({ shift: true })
      .should('have.class', 'skiplink')
      .should('have.attr', 'href', '#footer');
    cy.focused()
      .tab({ shift: true })
      .should('have.class', 'skiplink')
      .should('have.attr', 'href', '#navigation');
    cy.focused()
      .tab({ shift: true })
      .should('have.class', 'skiplink')
      .should('have.attr', 'href', '#view');
    cy.focused()
      .tab({ shift: true })
      .should('have.attr', 'aria-label', 'Shrink toolbar');
    cy.focused().tab({ shift: true }).should('have.class', 'ui button undo');
    cy.focused().tab({ shift: true }).should('have.class', 'ui button cancel');
    cy.focused().tab({ shift: true }).should('have.class', 'ui button save');
    cy.focused().click();
  });

  //IMPORTANT TO DO
  /**focus when the text block is already fullfiled does not active the select class */
});
