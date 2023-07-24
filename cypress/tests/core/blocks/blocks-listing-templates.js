describe('Folder Contents Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    // given a logged in editor
    // and a folder that contains a document
    // and the folder contents view
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-folder',
      contentTitle: 'My Folder',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-document',
      contentTitle: 'My Document',
      path: 'my-folder',
    });
    cy.visit('/');
    cy.wait('@content');
    cy.navigate('/my-folder/my-document');
    cy.wait('@content');
  });

  it('Should render Summary template', () => {
    // when inserting image and selecting image gallery listing
    cy.createContent({
      contentType: 'Image',
      path: '/my-folder/my-document',
      contentId: 'my-image',
      contentTitle: 'My Image',
    });

    cy.visit('/my-folder/my-document');
    cy.get('.edit').click();
    cy.getSlate().click();
    cy.get('button.block-add-button').click();
    cy.get(
      '[style="transition: opacity 500ms ease 0ms;"] > :nth-child(2) > .ui',
    ).click();
    cy.get('#field-variation').click().type('summary{enter}');
    cy.get('#toolbar-save').click();
    cy.wait('@content');

    cy.url().should('eq', Cypress.config().baseUrl + '/my-folder/my-document');
    cy.get('.listing-item img')
      .should('have.attr', 'src')
      .and('contain', '/my-folder/my-document/my-image/@@images/image-');
    cy.get('.listing-item img')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
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
    cy.getSlate().click();
    cy.get('button.block-add-button').click();
    cy.get(
      '[style="transition: opacity 500ms ease 0ms;"] > :nth-child(2) > .ui',
    ).click();
    cy.get('#field-variation').click().type('imageGallery{enter}');
    cy.get('#toolbar-save').click();
    cy.wait('@content');

    cy.url().should('eq', Cypress.config().baseUrl + '/my-folder/my-document');

    // then we should have a slide play or pause button
    cy.get('.image-gallery-play-button')
      .should('have.attr', 'aria-label')
      .and('eq', 'Play or Pause Slideshow');

    cy.get('.image-gallery-slides img.image-gallery-image')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('Should render image gallery in edit mode', () => {
    // when inserting image and selecting image gallery listing
    cy.createContent({
      contentType: 'Image',
      path: '/my-folder/my-document',
      contentId: 'my-image',
      contentTitle: 'My Image',
    });

    cy.findByLabelText('Edit').click();
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.listing').contains('Listing').click();
    cy.get('#field-variation').click().type('imageGallery{enter}');
    // then we should have a slide play or pause button
    cy.get('.image-gallery-play-button')
      .should('have.attr', 'aria-label')
      .and('eq', 'Play or Pause Slideshow');
    cy.get('.image-gallery-slides img.image-gallery-image')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });
});
