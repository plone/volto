describe('Accessibility Tests Content Types', () => {
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');
    cy.injectAxe(); // make sure axe is available on the page
  });

  it('Event has no a11y violations', () => {
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-event').click();
    cy.get('.documentFirstHeading').type('Test Event Content Type');

    cy.get('#toolbar-save').click();

    cy.wait(1000);
    cy.injectAxe();
    cy.checkA11y();

    cy.get('.ics-download').contains('Download Event').focus();
  });

  it('File has no a11y violations', () => {
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-file').click();
    cy.get('#field-title').type('Test File Content Type');
    cy.get('#field-description').type(
      'A11y cypress test for File content type',
    );

    cy.get('input[id="field-file"]').attachFile('file.pdf', {
      subjectType: 'input',
    });

    cy.get('#toolbar-save').focus().click();
    cy.waitForResourceToLoad('file.pdf');

    cy.wait(2000);
    cy.injectAxe();
    cy.checkA11y();

    cy.contains('file.pdf').focus();
  });

  it('Image has no a11y violations', () => {
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-image').click();
    cy.get('#field-title').type('Test Image Content Type');
    cy.get('#field-description').type('Image description');
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

    cy.wait(1000);
    cy.injectAxe();
    cy.checkA11y();

    cy.get('#view img').should('have.attr', 'alt', 'Test Image Content Type');
  });

  it('Link has no a11y violations', () => {
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-link').click();
    cy.get('#field-title').type('Test Link Content Type');
    cy.get('#field-description').type(
      'A11y cypress test for Link content type',
    );
    cy.get('#field-remoteUrl').type('https://google.com');
    cy.get('#toolbar-save').click();

    cy.wait(1000);
    cy.injectAxe();
    cy.checkA11y();

    cy.get('a.external')
      .should('have.attr', 'href', 'https://google.com')
      .focus();
  });

  it('News Item has no a11y violations', () => {
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-news-item').click();
    cy.get('.documentFirstHeading').type('Test News Content Type');
    cy.get('#field-description').type('test summary');
    cy.get('#field-subjects').type('test');
    cy.get('#toolbar-save').click();

    cy.wait(2000);
    cy.injectAxe();
    cy.checkA11y();
  });

  it('Page has no a11y violations', () => {
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading').type('My Page');
    cy.get('#toolbar-save').click();

    cy.wait(1000);
    cy.injectAxe();
    cy.checkA11y();
  });
});
