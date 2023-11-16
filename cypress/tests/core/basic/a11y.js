/* eslint-disable prettier/prettier */
describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');
    cy.injectAxe(); // make sure axe is available on the page

    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('');
  });

  it('Front page has not a11y violations', () => {
    cy.checkA11y(); // fail for a11y violations
  });

  /*
     it('Contact form has not a11y violations', () => {
    cy.navigate('/contact-form');
    */

  //  content-types

  it('File has no a11y violations', () => {
    // Creating the File content type
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-file').click();
    cy.get('#field-title').type('File');
    cy.get('#field-description').type('A11y cypress test for File content type ');

    cy.get('input[id="field-file"]').attachFile('file.pdf', {
      subjectType: 'input',
    });
    cy.wait(1000);

    cy.get('#toolbar-save').focus().click();
    cy.waitForResourceToLoad('file.pdf');
    cy.injectAxe();
    cy.checkA11y();
  });

  it('Link has no a11y violations', () => {
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-link').click();
    cy.get('#field-title').type('Link');
    cy.get('#field-description').type('A11y cypress test for Link content type');
    cy.get('#field-remoteUrl').type('https://google.com');
    cy.get('#toolbar-save').click();
    cy.wait(1000);
    cy.injectAxe();
    cy.checkA11y();
  });
  it('Image has no a11y violations', () => {
    // Creating the Image content type
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-image').click();
    cy.get('#field-title').type('Image ');
    cy.get('#field-description').type('Image content type ');
    cy.fixture('image.png', 'base64')
      .then((fc) => {
        return Cypress.Blob.base64StringToBlob(fc);
      })
      .then((fileContent) => {
        cy.get('input#field-image').attachFile({ fileContent, fileName: 'image.png', mimeType: 'image/png' }, { subjectType: 'input' });
        cy.get('#field-image-image').parent().parent().contains('image.png');
      });
    cy.get('#toolbar-save').click();
    cy.wait(1000);
    cy.injectAxe();
    cy.checkA11y();
  });

  it('Event has no a11y violations', () => {
    // Creating the Event content type
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-event').click();
    cy.get('.documentFirstHeading').type('My event');
    cy.get('#toolbar-save').click();
    cy.wait(1000);
    cy.injectAxe();
    cy.checkA11y();
  });
  it('Page has no a11y violations', () => {
    // Creating the Page content type
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading').type('My Page');
    cy.get('#toolbar-save').click();
    cy.wait(1000);
    cy.injectAxe();
    cy.checkA11y();
  });

  it('News Item has no a11y violations', () => {
    // Creating the News Item content type
    cy.visit('/');
    cy.get('#toolbar-add').click();
    cy.get('#toolbar-add-news-item').click();
    cy.get('.documentFirstHeading').type('My News Item');
    cy.get('#toolbar-save').click();
    cy.wait(1000);
    cy.injectAxe();
    cy.checkA11y();
  });

  // TODO: Adapt this to volto-slate table
  // it('Table has no a11y violations', () => {
  //   cy.createContent({
  //     contentType: 'Document',
  //     contentId: 'document',
  //     contentTitle: 'Document',
  //     path: '/',
  //   });
  //   cy.autologin();
  //   cy.visit('/document/edit');
  //   cy.getSlate().click();
  //   cy.get('.button .block-add-button').click();
  //   cy.get('[aria-label="Unfold Text blocks"]').click();
  //   cy.get('.blocks-chooser .text .button.slateTable').click();
  //   cy.get('button[title="Insert row after"]').click();
  //   cy.get('button[title="Insert row after"]').click();
  //   cy.get('button[title="Insert col after"]').click();
  //   cy.get('tbody > :nth-child(1) > :nth-child(1)').click().type('headline 1');
  //   cy.get('tbody > :nth-child(1) > :nth-child(2)').click().type('headline 2');
  //   cy.get('tbody > :nth-child(1) > :nth-child(3)').click().type('headline 3');
  //   cy.get('tbody > :nth-child(2) > :nth-child(1)').click().type('content');
  //   cy.get('tbody > :nth-child(2) > :nth-child(2)').click().type('content');
  //   cy.get('tbody > :nth-child(2) > :nth-child(3)').click().type('content');
  //   cy.get('tbody > :nth-child(3) > :nth-child(1)').click().type('content');
  //   cy.get('tbody > :nth-child(3) > :nth-child(2)').click().type('Headline 4');
  //   cy.get('input[name="field-celltype"]').click({ force: true });
  //   cy.get('tbody > :nth-child(3) > :nth-child(3)').click().type('content');
  //   cy.get('tbody > :nth-child(4) > :nth-child(1)').click().type('content');
  //   cy.get('tbody > :nth-child(4) > :nth-child(2)').click().type('content');
  //   cy.get('tbody > :nth-child(4) > :nth-child(3)').click().type('content');
  //   //save
  //   cy.get('#toolbar-save').click();
  //   //publish document
  //   //cy.url().should('eq', Cypress.config().baseUrl + '/document');
  //   cy.wait(500);
  //   cy.get('#toolbar-more').click();
  //   cy.get('.state-select .react-select-container').click();
  //   cy.findByText('Public').click();
  //   //logout
  //   cy.get('#toolbar-personal > .icon').click();
  //   cy.get('#toolbar-logout > .icon').click();
  //   //visit page and check for a11y violations
  //   cy.visit('/document');
  //   cy.injectAxe();
  //   cy.checkA11y();
  // });

  /*
    it('Has no a11y violations after button click', () => {
      cy.get('button').click();
      cy.checkA11y(); // check after a rerender
    });
    */
});
