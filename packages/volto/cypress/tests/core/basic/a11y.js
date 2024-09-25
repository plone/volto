describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe(); // make sure axe is available on the page
  });

  it('Front page has not a11y violations', () => {
    cy.checkA11y(); // fail for a11y violations
  });

  it('Contact form has not a11y violations', () => {
    cy.navigate('/contact-form');
    cy.checkA11y();
  });

  it('Image block has not a11y violations', () => {
    cy.autologin();
    cy.visit('/');
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');

    cy.wait(500);

    cy.navigate('/my-page/edit');
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('.blocks-chooser .mostUsed')
      .findByText('Image')
      .click({ force: true });
    cy.get('.block-editor-image [tabindex="0"]').last().focus();
    cy.findByLabelText('Enter a URL to an image').click();
    cy.get('.ui.input.editor-link.input-anchorlink-theme input').type(
      `https://github.com/plone/volto/raw/main/logos/volto-colorful.png{enter}`,
    );
    cy.wait(1000);
    cy.get('#toolbar-save').click();
    cy.get('img').should('exist');
    cy.get('img').should('have.attr', 'src');
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
