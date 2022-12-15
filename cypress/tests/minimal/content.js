describe('Add Content Tests', () => {
  beforeEach(() => {
    // give a logged in editor and the site root
    cy.autologin();
    cy.visit('/');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('');
  });

  it('As editor I can add a file', function () {
    // when I add a file
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-file').click();

    cy.get('input[name="title"]')
      .type('My File')
      .should('have.value', 'My File');

    cy.get('input[id="field-file"]').attachFile('file.pdf', {
      subjectType: 'input',
    });

    cy.wait(2000);

    cy.get('#toolbar-save').focus().click();
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('file.pdf');

    // then a new file should have been created
    cy.url().should('eq', Cypress.config().baseUrl + '/file.pdf');
    cy.findByLabelText('Edit');
    cy.contains('My File');
  });

  it('As editor I can add a page', function () {
    // when I add a page
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.getSlateTitle().focus().click().type('My Page').contains('My Page');

    // then I a new page has been created
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    cy.get('.navigation .item.active').should('have.text', 'My Page');
  });

  it('As editor I can add a page with a text block', function () {
    // when I add a page with a text block
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();

    cy.getSlateTitle().focus().click().type('My Page').contains('My Page');
    cy.getSlateEditorAndType('This is the text').contains('This is the text');
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then a new page with a text block has been added

    cy.get('.navigation .item.active').should('have.text', 'My Page');
  });

  it('As editor I can add an image', function () {
    cy.intercept('POST', '*').as('saveImage');
    cy.intercept('GET', '/**/image.png').as('getImage');
    // when I add an image
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-image').click();

    cy.get('input[name="title"]')
      .type('My image')
      .should('have.value', 'My image');

    cy.fixture('image.png', 'base64')
      .then((fc) => {
        return Cypress.Blob.base64StringToBlob(fc);
      })
      .then((fileContent) => {
        cy.get('input#field-image').attachFile(
          { fileContent, fileName: 'image.png', mimeType: 'image/png' },
          { subjectType: 'input' },
        );
        cy.get('#field-image-image').parent().parent().contains('image.png');
      });

    cy.get('#toolbar-save').click();
    cy.wait('@saveImage');
    cy.wait('@getImage');

    cy.url().should('eq', Cypress.config().baseUrl + '/image.png');

    cy.contains('My image');
    cy.get('.view-wrapper img')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });

  it('As editor I can add a news item', function () {
    // when I add a news item
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-news-item').click();
    cy.get('input[name="title"]')
      // because of lazyloading wait for the element to reach an actionable state
      .clear()
      .type('My News Item')
      .should('have.value', 'My News Item');
    cy.get('#toolbar-save').click();

    // then a new news item should have been created
    cy.url().should('eq', Cypress.config().baseUrl + '/my-news-item');
    cy.get('.navigation .item.active').should('have.text', 'My News Item');
  });

  it('As editor I am setting the time in datetimeWidget', function () {
    // when I add a Event
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-event').click();
    cy.get('#field-title')
      // because of lazyloading wait for the element to reach an actionable state
      .clear()
      .type('datetimeWidget test');
    cy.get('#start-time').click();
    cy.get('.rc-time-picker-panel-input').click();
    cy.get('.rc-time-picker-panel-input').clear().type('6:40 AM');
    cy.get('#toolbar-save').click();

    // then
    cy.get('.documentFirstHeading:first').should(
      'have.text',
      'datetimeWidget test',
    );
  });

  it('As editor I can add a Link (with an external link)', function () {
    cy.intercept('POST', '*').as('saveLink');
    cy.intercept('GET', '/**/my-link').as('getLink');
    // When I add a link
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-link').click();

    cy.get('input[name="title"]')
      .type('My Link')
      .should('have.value', 'My Link');

    cy.get('input[name="remoteUrl"]')
      .type('https://google.com')
      .should('have.value', 'https://google.com');

    cy.get('#toolbar-save').click();
    cy.wait('@saveLink');
    cy.wait('@getLink');

    cy.url().should('eq', Cypress.config().baseUrl + '/my-link');

    // Then the link title should show up on the link view
    cy.get('main').contains('My Link');
    // and the link should show up on the link view
    cy.get('main').contains('https://google.com');
  });

  it('As editor I can add a Link (with an internal link)', function () {
    cy.intercept('POST', '*').as('saveLink');
    cy.intercept('GET', '/**/my-link').as('getLink');
    // Given a Document "Link Target"
    cy.createContent({
      contentType: 'Document',
      contentId: 'link-target',
      contentTitle: 'Link Target',
    });

    // When I add a Link with an internal link to "link-target"
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-link').click();

    cy.get('input[name="title"]')
      .type('My Link')
      .should('have.value', 'My Link');

    cy.get('input[name="remoteUrl"]')
      .type('/link-target')
      .should('have.value', '/link-target');

    cy.get('#toolbar-save').click();
    cy.wait('@saveLink');
    cy.wait('@getLink');
    cy.url().should('eq', Cypress.config().baseUrl + '/my-link');

    // Then the link title should show up on the link view
    cy.contains('My Link');
    // and the link should show up on the link view
    cy.contains('/link-target');
    // and the link redirects to the link target
    cy.addBaseUrl('/link-target').then((value) =>
      cy.get(`main a[href="${value}"]`).click(),
    );

    cy.url().should('eq', Cypress.config().baseUrl + '/link-target');
    cy.get('main').contains('Link Target');
  });
});
