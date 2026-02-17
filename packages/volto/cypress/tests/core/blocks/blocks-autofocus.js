describe('New Block Auto Focus Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/**/my-page').as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    cy.intercept('PATCH', '*').as('save');

    // given a logged in editor and a page in edit mode
    cy.visit('/');
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.wait('@content');

    cy.wait(500);

    cy.navigate('/my-page/edit');
    cy.wait('@schema');
  });

  it('Press Enter on a description block adds new autofocused default block', () => {
    cy.addNewBlock('description');
    cy.get('.documentDescription').first().click().type('{enter}');
    cy.get('.block-editor-description + .block-editor-slate');
    cy.wait(500);
    cy.get('*[class^="block-editor"]')
      .eq(2)
      .within(() => {
        return cy.get('.selected');
      });
  });

  it('Press Enter on a text block adds new autofocused default block', () => {
    cy.getSlate().click();
    cy.get('button.block-add-button').click();
    cy.get('.blocks-chooser .title').contains('Text').click({ force: true });
    cy.get('.blocks-chooser .text').contains('Text').click({ force: true });
    cy.get('.text-slate-editor-inner').first().click().type('{enter}');
    cy.wait(500);
    cy.get('.block-editor-slate + .block-editor-slate');
    cy.get('*[class^="block-editor"]')
      .eq(2)
      .within(() => {
        return cy.get('.selected');
      });
  });

  it('Press Enter on a image block adds new autofocused default block', () => {
    cy.addNewBlock('image');
    // Timing issues ahead :(
    cy.get('.block-editor-image img')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
    cy.get('.block-editor-image').wait(500).click('topLeft').type('{enter}');
    cy.wait(500);
    cy.get('*[class^="block-editor"]')
      .eq(2)
      .within(() => {
        return cy.get('.selected');
      });
  });

  it('Press Enter on a video block adds new autofocused default block', () => {
    cy.addNewBlock('video');
    cy.get('.block-editor-video .message img')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
    cy.get('.block-editor-video').first().click().type('{enter}');
    cy.get('.block-editor-slate + .block-editor-slate');
    cy.wait(500);
    cy.get('*[class^="block-editor"]')
      .eq(2)
      .within(() => {
        return cy.get('.selected');
      });
  });

  it('Press Enter on a listing block adds new autofocused default block', () => {
    cy.addNewBlock('listing');
    cy.get('.block-editor-listing').first().click().type('{enter}');
    cy.wait(500);
    cy.get('*[class^="block-editor"]')
      .eq(2)
      .within(() => {
        return cy.get('.selected');
      });
  });

  it('Press Enter on a table of contents block adds new autofocused default block', () => {
    cy.addNewBlock('contents');
    cy.get('.block-editor-toc').first().click().type('{enter}');
    cy.wait(500);
    cy.get('*[class^="block-editor"]')
      .eq(2)
      .within(() => {
        return cy.get('.selected');
      });
  });

  it('Press Enter on a maps block adds new autofocused default block', () => {
    cy.addNewBlock('maps');
    cy.get('.block-editor-maps .message img')
      .should('be.visible')
      .and(($img) => {
        // "naturalWidth" and "naturalHeight" are set when the image loads
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
    cy.get('.block-editor-maps').first().click().type('{enter}');
    cy.wait(500);
    cy.get('*[class^="block-editor"]')
      .eq(2)
      .within(() => {
        return cy.get('.selected');
      });
  });

  it('Press Enter on a html block adds new autofocused default block', () => {
    cy.addNewBlock('html');
    cy.get('.block-editor-html').first().click().type('{enter}');
    cy.wait(500);
    cy.get('*[class^="block-editor"]')
      .eq(2)
      .within(() => {
        return cy.get('.selected');
      });
  });

  it('Press Enter on a search block adds new autofocused default block', () => {
    cy.addNewBlock('search');
    cy.get('.block-editor-search').first().click().type('{enter}');
    cy.wait(500);
    cy.get('*[class^="block-editor"]')
      .eq(2)
      .within(() => {
        return cy.get('.selected');
      });
  });
});
