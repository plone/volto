describe('Folder Contents Tests', () => {
  beforeEach(() => {
    // given a logged in editor
    // and a folder that contains a document
    // and the folder contents view
    cy.visit('/');
    cy.autologin();
    cy.createContent({
      contentType: 'Folder',
      contentId: 'my-folder',
      contentTitle: 'My Folder',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-document',
      contentTitle: 'My Document',
      path: 'my-folder',
    });
    cy.visit('/my-folder/my-document');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
  });

  it('Should render Image gallery listing view', () => {
    // when inserting image and selecting image gallery listing
    cy.createContent({
      contentType: 'Image',
      path: '/my-folder/my-document',
      contentId: 'my-image',
      contentTitle: 'My Image',
    });

    cy.visit('/my-folder/my-document');
    cy.get('.edit').click();
    cy.get('.block-editor-text').first().click();
    cy.get('button.block-add-button').click();
    cy.get(
      '[style="transition: opacity 500ms ease 0ms;"] > :nth-child(2) > .ui',
    ).click();
    cy.get('#field-variation').click().type('imageGallery{enter}');
    cy.get('#toolbar-save').click();
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.url().should('eq', Cypress.config().baseUrl + '/my-folder/my-document');

    // then we should have a slide play or pause button
    cy.get('.image-gallery-play-button')
      .should('have.attr', 'aria-label')
      .and('eq', 'Play or Pause Slideshow');
  });

  it('Should render image gallery in edit mode', () => {
    // when inserting image and selecting image gallery listing
    cy.createContent({
      contentType: 'Image',
      path: '/my-folder/my-document',
      contentId: 'my-image',
      contentTitle: 'My Image',
    });

    cy.visit('/my-folder/my-document');
    cy.findByLabelText('Edit').click();
    cy.get('.block.inner.text .public-DraftEditor-content').click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.listing').contains('Listing').click();
    cy.get('#field-variation').click().type('imageGallery{enter}');
    // then we should have a slide play or pause button
    cy.get('.image-gallery-play-button')
      .should('have.attr', 'aria-label')
      .and('eq', 'Play or Pause Slideshow');
  });

  it('should only show pages if they are released and public', () => {
    cy.visit('/my-folder/my-document');
    cy.get('button.more').click();
    cy.get('.state-select .react-select-container').click();
    cy.get('div .react-select__option:contains("Public")').click();
    cy.visit('/my-folder/my-document/edit');
    cy.get('.block-editor-text').click();
    cy.get('button.block-add-button').click();
    cy.get('.mostUsed button.button.listing:first-of-type').click();
    cy.get('#toolbar-save').click();
    cy.get('.add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.block-editor-title').click().type('Page-1');
    cy.get('#effective-date').click();
    cy.get('.CalendarDay__today').click();
    cy.get('#toolbar-save').click();
    cy.get('button.more').click();
    cy.get('.state-select .react-select-container').click();
    cy.get('div .react-select__option:contains("Public")').click();
    cy.get('.add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.block-editor-title').click().type('Page-2');
    cy.get('#effective-date').click();
    cy.get('.CalendarDay__today').click();
    cy.get('#toolbar-save').click();
    cy.visit('/my-folder/my-document');
    cy.get('.add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.block-editor-title').click().type('Page-3');
    cy.get('#effective-date').click();
    cy.get('.CalendarDay__today').click();
    cy.get('#effective-time').click();
    cy.get(
      '.rc-time-picker-panel-combobox > .rc-time-picker-panel-select:first-of-type .rc-time-picker-panel-select-option-selected +li',
    ).click();
    cy.get('#toolbar-save').click();
    cy.get('button.more').click();
    cy.get('.state-select .react-select-container').click();
    cy.get('div .react-select__option:contains("Public")').click();
    cy.get('.add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.block-editor-title').click().type('Page-4');
    cy.get('#effective-date').click();
    cy.get('.CalendarDay__today').click();
    cy.get('#effective-time').click();
    cy.get(
      '.rc-time-picker-panel-combobox > .rc-time-picker-panel-select:first-of-type .rc-time-picker-panel-select-option-selected +li +li +li',
    ).click();
    cy.get('#toolbar-save').click();
    cy.get('button.more').click();
    cy.get('.state-select .react-select-container').click();
    cy.get('div .react-select__option:contains("Public")').click();
    cy.get('.user').click();
    cy.get('#toolbar-logout').click();

    cy.visit('/my-folder/my-document');
    cy.get('h4').contains('Page-1').should('exist');
    cy.get('h4').contains('Page-2').should('not.exist');
    cy.get('h4').contains('Page-3').should('not.exist');
    cy.get('h4').contains('Page-4').should('not.exist');
  });
});
