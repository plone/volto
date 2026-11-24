describe('createContent Tests', () => {
  const subpathPrefix = Cypress.env('subpathPrefix') || '';
  const simpleSlateLink = (target) => {
    return {
      '@type': 'slate',
      plaintext: ' My Link ',
      value: [
        {
          children: [
            {
              text: '',
            },
            {
              children: [
                {
                  text: 'My Link',
                },
              ],
              data: {
                url: target,
              },
              type: 'link',
            },
            {
              text: '',
            },
          ],
          type: 'p',
        },
      ],
    };
  };

  beforeEach(() => {
    cy.autologin();
  });

  it('Create document', function () {
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.get('.documentFirstHeading').should('have.text', 'My Page');
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
  });

  it('Create document with path', function () {
    cy.createContent({
      contentType: 'Document',
      contentId: 'container',
      contentTitle: 'My Container',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'child',
      contentTitle: 'My Child',
      path: '/container',
    });
    cy.visit('/container/child');
    cy.get('.documentFirstHeading').should('have.text', 'My Child');
  });

  it('Create document with custom id', function () {
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-custom-id',
      contentTitle: 'My Page',
    });
    cy.visit('/my-custom-id');
    cy.get('.documentFirstHeading').should('have.text', 'My Page');
  });

  it('Create News Item', function () {
    cy.createContent({
      contentType: 'News Item',
      contentId: 'my-news-item',
      contentTitle: 'My News Item',
    });
    cy.visit('/my-news-item');
    cy.get('.documentFirstHeading').should('have.text', 'My News Item');
  });

  it('Create File', function () {
    cy.createContent({
      contentType: 'File',
      contentId: 'my-file',
      contentTitle: 'My File',
    });
    cy.visit('/my-file');
    cy.get('.documentFirstHeading').should('have.text', 'My File');
    cy.get('.view-wrapper a').should(
      'have.attr',
      'href',
      `${subpathPrefix}/my-file/@@download/file`,
    );
    // cy.get('.view-wrapper a').click();
  });

  it('Create a document with a link to a File download', function () {
    cy.createContent({
      contentType: 'File',
      contentId: 'my-file',
      contentTitle: 'My File',
      transition: 'publish',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-document',
      contentTitle: 'My Document',
      transition: 'publish',
      bodyModifier(body) {
        body.blocks['abc'] = simpleSlateLink('/my-file/@@download/file');
        body.blocks_layout.items.push('abc');
        return body;
      },
    });

    // Anonymous users get the direct download link
    cy.clearCookies();
    cy.visit('/my-document');
    cy.get('#page-document a').should(
      'have.attr',
      'href',
      `${subpathPrefix}/my-file/@@download/file`,
    );
  });

  it('Create Image', function () {
    cy.createContent({
      contentType: 'Image',
      contentId: 'my-image',
      contentTitle: 'My Image',
    });

    cy.visit('/my-image');
    cy.get('.documentFirstHeading').should('have.text', 'My Image');
    cy.get('.view-wrapper img')
      .should('have.attr', 'src')
      .and('include', '/my-image/@@images/');
    cy.get('.view-wrapper img').should('have.attr', 'alt', 'My Image');
    cy.get('.view-wrapper a')
      .should('have.attr', 'href')
      .and('include', `${subpathPrefix}/my-image/@@images/`);
    // cy.get('.view-wrapper a').click();
  });
});
