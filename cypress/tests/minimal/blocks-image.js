describe('Blocks Tests', () => {
  beforeEach(() => {
    cy.intercept('POST', '*').as('saveImage');
    cy.intercept('GET', '/**/image.png/@@images/image').as('getImage');
    // given a logged in editor and a page in edit mode
    cy.visit('/');
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('my-page');
    cy.navigate('/my-page/edit');
  });

  afterEach(() => {
    // Wait a bit to previous teardown to complete correctly because Heisenbug in this point
    // cy.wait(2000);
  });

  it('Add image block', () => {
    // when I add an image block
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('.block.image .ui.input input[type="text"]').type(
      `https://github.com/plone/volto/raw/master/logos/volto-colorful.png{enter}`,
    );
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then the page view should contain the image block
    cy.get('#page-document img').should(
      'have.attr',
      'src',
      'https://github.com/plone/volto/raw/master/logos/volto-colorful.png',
    );

    cy.get('#page-document img')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  // ADD IMAGE VIA DRAG AND DROP
  it('Add image via drag and drop', () => {
    // when I add an image block via drag and drop
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    const imagePath = { filePath: 'image.png', mimeType: 'image/png' };
    cy.get('.ui.block.image .center img').attachFile(imagePath, {
      subjectType: 'drag-n-drop',
      force: true,
      allowEmpty: true,
      encoding: 'utf8',
    });
    cy.waitForResourceToLoad('image.png/@@images/image');

    cy.get('#toolbar-save').click();
    cy.wait(5000);
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    cy.addBaseUrl('/my-page/image.png/@@images/image').then((value) =>
      cy.get('.block img').should('have.attr', 'src').and('eq', value),
    );
  });

  it('Add image via upload', () => {
    // when I add an image block via upload
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();

    cy.get('input[type="file"]').attachFile('image.png', {
      subjectType: 'input',
      encoding: 'utf8',
    });
    cy.waitForResourceToLoad('image.png/@@images/image');
    cy.get('#toolbar-save').click();

    cy.wait('@saveImage');
    cy.wait('@getImage');

    // then image src must be equal to image name
    cy.addBaseUrl('/my-page/image.png/@@images/image').then((value) =>
      cy.get('.block img').should('have.attr', 'src').and('eq', value),
    );

    cy.get('.block img')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('Create a image block document in edit mode', () => {
    cy.visit('/');
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();

    cy.get('input[type="file"]').attachFile('image.png', {
      subjectType: 'input',
      encoding: 'utf8',
    });

    cy.wait('@saveImage');
    cy.wait('@getImage');

    cy.addBaseUrl('/image.png/@@images/image').then((value) =>
      cy.get('.block img').should('have.attr', 'src').and('eq', value),
    );

    cy.get('.block img')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('Create an image block and initially alt attr is empty', () => {
    // when I add an image block via upload
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();

    cy.get('input[type="file"]').attachFile('image.png', {
      subjectType: 'input',
      encoding: 'utf8',
    });
    cy.wait('@saveImage');
    cy.wait('@getImage');

    // then in sidebar alt attr should be empty
    cy.get('#sidebar-properties .field-wrapper-alt input#field-alt')
      .should('have.attr', 'value')
      .and('eq', '');
  });
});
