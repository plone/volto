describe('Accessibility Tests Content Types', () => {
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');
    cy.injectAxe(); // make sure axe is available on the page
  });

  it('Event tested for a11y axe violations', () => {
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-event').click();
    cy.get('.documentFirstHeading').type('Test Event Content Type');

    cy.get('#toolbar-save').click();

    cy.wait(1000);
    cy.get('.ics-download').contains('Download Event').focus();
    cy.checkA11y();
  });

  it('File tested for a11y axe violations', () => {
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

    cy.wait(1000);
    cy.contains('file.pdf').focus();
    cy.checkA11y();
  });

  it('Image tested for a11y axe violations', () => {
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
    cy.get('#view img').should('have.attr', 'alt', 'Test Image Content Type');
    cy.checkA11y();
  });

  it('Link tested for a11y axe violations', () => {
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-link').click();
    cy.get('#field-title').type('Test Link Content Type');
    cy.get('#field-description').type(
      'A11y cypress test for Link content type',
    );
    cy.get('#field-remoteUrl').type('https://google.com');
    cy.get('#toolbar-save').click();

    cy.wait(1000);
    cy.get('a.external')
      .should('have.attr', 'href', 'https://google.com')
      .focus();
    cy.checkA11y();
  });

  it('News Item tested for a11y axe violations', () => {
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-news-item').click();
    cy.get('.documentFirstHeading').type('Test News Content Type');
    cy.get('#field-description').type('test summary');
    cy.get('#field-subjects').type('test');
    cy.get('#toolbar-save').click();

    cy.wait(1000);
    cy.checkA11y();
  });

  it('Page tested for a11y axe violations', () => {
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading').type('My Page');
    cy.get('#toolbar-save').click();

    cy.wait(1000);
    cy.checkA11y();
  });
});
