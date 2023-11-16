/* eslint-disable prettier/prettier */
describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe(); // make sure axe is available on the page
    cy.autologin();
  });

  it('Front page has not a11y violations', () => {
    cy.checkA11y(); // fail for a11y violations
  });

  it('Contact form has not a11y violations', () => {
    cy.navigate('/contact-form');
    cy.checkA11y();
  });

  // ############# Block A11Y ###########

  it('As editor I can add a Image block', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Document',
      path: '/',
    });
    // when I add a image block
    cy.visit('/document/edit');
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('.blocks-chooser .mostUsed').findByText('Image').click({ force: true });
    cy.get('.block.image .ui.input input[type="text"]').type(`https://github.com/plone/volto/blob/master/docs/source/images/volto-h-transparent.svg{enter}`);
    cy.wait(1000);
    cy.get('#toolbar-save').click();
    cy.wait(1000);
    cy.injectAxe();
    cy.checkA11y();
  });

  it('Table has no a11y violations', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Document',
      path: '/',
    });
    cy.visit('/document/edit');

    //table
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('[aria-label="Unfold Common blocks"]').click();
    cy.get('.blocks-chooser .common').findByText('Table').click({ force: true });
    cy.get('tbody > :nth-child(1) > :nth-child(1)').click().type('headline 1');
    cy.get('tbody > :nth-child(1) > :nth-child(2)').click().type('headline 2');
    //save
    cy.get('#toolbar-save').click();
    cy.wait(500);
    cy.injectAxe();
    cy.checkA11y();
  });
  it('Maps has no a11y violations', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Document',
      path: '/',
    });
    cy.visit('/document/edit');

    //Maps
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('[aria-label="Unfold Common blocks"]').click();
    cy.get('.blocks-chooser .common').findByText('Maps').click({ force: true });
    cy.get('.block.maps .toolbar-inner .ui.input input').type(`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18830.515694226197!2d19.183889096515394!3d49.56578164995968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471431d909dd2937%3A0xb40be223706bf507!2zUMWCb25lLCDFu2FibmljYSwgUG9sYW5k!5e0!3m2!1sen!2sin!4v1684408874419!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>{enter}`);
    cy.get('#sidebar #blockform-fieldset-default .field-wrapper-title #field-title').type('plone location');
    //save
    cy.get('#toolbar-save').click();
    cy.wait(1000);
    cy.injectAxe();
    cy.checkA11y();
  });

  it('Text block has no a11y violations', () => {
    cy.createContent({
      contentType: 'Document',
      contentId: 'document',
      contentTitle: 'Document',
      path: '/',
    });
    cy.visit('/document/edit');
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('[aria-label="Unfold Text blocks"]').click();
    cy.get('.blocks-chooser .slate').findByText('Text').click({ force: true });
    cy.getSlateEditorAndType('My text').contains('My text');
    //save Fold Text blocks
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
