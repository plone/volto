describe('Accessibility Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe(); // make sure axe is available on the page
  });

  it('Test front page with cypress-axe', () => {
    cy.checkA11y(); // fail for a11y violations
  });

  it('Test contact form with cypress-axe', () => {
    cy.navigate('/contact-form');
    cy.get('#field-name').click().type('input');
    cy.get('#field-from').click().type('something@domain.com');
    cy.get('#field-subject').click().type('input');
    cy.get('#field-message').click().type('input');
    cy.checkA11y(); // fail for a11y violations
  });

  it('Test image block with cypress-axe', () => {
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'a11y-image-block',
      contentTitle: 'a11y image block',
    });
    cy.visit('/a11y-image-block');
    cy.wait(500);
    // Add an image block
    cy.navigate('/a11y-image-block/edit');
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
    cy.checkA11y(); // fail for a11y violations
  });

  it('Test table block with cypress-axe', () => {
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'a11y-table-block',
      contentTitle: 'a11y table block',
    });
    cy.visit('/a11y-table-block/edit');
    // Add a table block
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('[aria-label="Unfold Common blocks"]').click();
    cy.get('.blocks-chooser .common')
      .findByText('Table')
      .click({ force: true });
    cy.get('tbody > :nth-child(1) > :nth-child(1)').click().type('headline 1');
    cy.get('tbody > :nth-child(1) > :nth-child(2)').click().type('headline 2');
    cy.get('#toolbar-save').click();
    // Ensure the table exists and has correct structure
    cy.get('table').should('exist'); // Wait for the table to render
    cy.get('thead').should('exist'); // Ensure the table has a header
    // Wait for the headers to exist and contain correct content
    cy.get('thead th').should('have.length', 2);
    cy.get('thead th').first().should('exist');
    cy.get('thead th').last().should('exist');
    cy.wait(500);
    cy.injectAxe();
    cy.checkA11y(); // fail for a11y violations
  });

  it('Test maps block with cypress-axe', () => {
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'a11y-maps-block',
      contentTitle: 'a11y table block',
    });
    cy.visit('/a11y-maps-block/edit');
    // Add a maps block
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('[aria-label="Unfold Common blocks"]').click();
    cy.get('.blocks-chooser .common').findByText('Maps').click({ force: true });
    cy.get('.block.maps .toolbar-inner .ui.input input').type(
      `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.5450170616454!2d26.09630651539734!3d44.43966397910285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff21fbe45e2b%3A0x4b4116b92d4338d3!2sBucharest%2C%20Romania!5e0!3m2!1sen!2sin!4v1684408874419!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>{enter}`,
    );
    cy.get(
      '#sidebar #blockform-fieldset-default .field-wrapper-title #field-title',
    ).type('plone location');
    cy.get('#toolbar-save').click();
    cy.wait(1000);
    cy.injectAxe();
    cy.checkA11y(); // fail for a11y violations
  });

  it('Test text block with cypress-axe', () => {
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'a11y-text-block',
      contentTitle: 'a11y text block',
    });
    cy.visit('/a11y-text-block/edit');
    // Add a text block
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('[aria-label="Unfold Text blocks"]').click();
    cy.get('.blocks-chooser .slate').findByText('Text').click({ force: true });
    cy.getSlateEditorAndType('My text').contains('My text');
    cy.get('#toolbar-save').click();
    cy.wait(1000);
    cy.injectAxe();
    cy.checkA11y(); // fail for a11y violations
  });

  it('Test teaser block with cypress-axe', () => {
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'a11y-teaser-block',
      contentTitle: 'a11y teaser block',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'blue-orchids',
      contentTitle: 'Blue Orchids',
      contentDescription: 'are growing on the mountain tops',
      image: true,
      path: '/a11y-teaser-block',
    });
    cy.visit('/a11y-teaser-block/edit');
    // Add a teaser block
    cy.get('.block .slate-editor [contenteditable=true]').click();
    cy.get('.button .block-add-button').click({ force: true });
    cy.get('.blocks-chooser .mostUsed .button.teaser')
      .contains('Teaser')
      .click({ force: true });
    cy.get(
      '.objectbrowser-field[aria-labelledby="fieldset-default-field-label-href"] button[aria-label="Open object browser"]',
    ).click();
    cy.get('[aria-label="Select Blue Orchids"]').dblclick();
    cy.wait(500);
    cy.get('.align-buttons .ui.buttons button[aria-label="Center"]').click();
    cy.get('#toolbar-save').click();
    cy.wait(1000);
    cy.injectAxe();
    cy.checkA11y(); // fail for a11y violations
  });

  // TODO: Update video block
  // a11y tests are failing because placeholder image has no alt attribute.
  // Embed component from semantic-ui doesn't accept alt property.

  // it('Video block has no a11y violations', () => {
  //   cy.autologin();
  //   cy.createContent({
  //     contentType: 'Document',
  //     contentId: 'a11y-video-block',
  //     contentTitle: 'a11y video block',
  //   });
  //   cy.visit('/a11y-video-block/edit');
  //   // Add a video block
  //   cy.getSlate().click();
  //   cy.get('.ui.basic.icon.button.block-add-button').click();
  //   cy.get('.ui.basic.icon.button.video').contains('Video').click();
  //   cy.get('.toolbar-inner > .ui > input')
  //     .click()
  //     .type('https://youtu.be/T6J3d35oIAY')
  //     .type('{enter}');
  //   cy.get('#toolbar-save').click();
  //   cy.wait(1000);
  //   cy.injectAxe();
  //   cy.checkA11y();
  // });

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
