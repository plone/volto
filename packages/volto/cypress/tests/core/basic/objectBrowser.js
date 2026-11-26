describe('Object Browser Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    // Wait a bit to previous teardown to complete correctly because Heisenbug in this point
    cy.wait(2000);
    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page-1',
      contentTitle: 'My Second Page',
    });
    cy.createContent({
      contentType: 'Image',
      contentId: 'my-image',
      contentTitle: 'My Image',
      path: '/my-page-1',
    });
    cy.createContent({
      contentType: 'Image',
      contentId: 'my-searchable-image',
      contentTitle: 'My Searchable Image',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-searchable-page',
      contentTitle: 'My Searchable Page',
    });
    cy.visit('/my-page');
    cy.wait('@content');

    cy.navigate('/my-page/edit');
    cy.wait('@schema');
  });

  it('As editor I can add the relative url in search box in sidebar', () => {
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('.toolbar-inner button.ui.basic.icon.button').first().click();
    cy.findByLabelText('Search SVG').click();
    cy.get('.ui.input.search').type('/my-page-1');
    cy.findByLabelText('Select My Image').dblclick();
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then we should see a image
    cy.get('.block img')
      .should('have.attr', 'src')
      .and('contains', '/my-page-1/my-image/@@images/image');
  });

  it('As editor I can add the full url in search box in sidebar', () => {
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('.toolbar-inner button.ui.basic.icon.button').first().click();
    cy.findByLabelText('Search SVG').click();
    cy.window()
      .its('env.apiPath')
      .then((apiPath) => {
        cy.get('.ui.input.search').type(`${apiPath}/my-page-1`);
      });
    cy.findByLabelText('Select My Image').dblclick();
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then we should see a image
    cy.get('.block img')
      .should('have.attr', 'src')
      .and('contains', '/my-page-1/my-image/@@images/image');
  });

  it('As editor I get focus on search box in sidebar when clicking on lens icon', () => {
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('.toolbar-inner button.ui.basic.icon.button').first().click();
    cy.findByLabelText('Search SVG').click();
    cy.get('.ui.input.search input').should('be.focused');
  });

  it('As editor I can search and only get a list of images but not other content types', () => {
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('.toolbar-inner button.ui.basic.icon.button').first().click();
    cy.findByLabelText('Search SVG').click();
    cy.get('.ui.input.search').type('Searchable');

    // The document is not in the list
    cy.findByLabelText('Browse My Searchable Page').should('not.exist');
    // And the list has only 1 item
    cy.get('.ui.segment.object-listing .image-wrapper').should(
      'have.length',
      1,
    );

    // The image can be selected as usual
    cy.findByLabelText('Select My Searchable Image').dblclick();
    cy.get('#toolbar-save').click();
    cy.wait(1000);
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then we should see a image
    cy.get('.block img')
      .should('have.attr', 'src')
      .and('contains', '/my-searchable-image/@@images/image');
  });

  it('keeps the typed path as the browsed folder after selecting an image and exiting search', () => {
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.blocks-chooser .button.teaser').contains('Teaser').click();
    cy.get('input[name="field-overwrite"]').check({ force: true });
    cy.get(
      '.objectbrowser-field[aria-labelledby="fieldset-default-field-label-preview_image"] button[aria-label="Open object browser"]',
    ).click();
    cy.findByLabelText('Search SVG').click();
    cy.get('.ui.input.search input').type('/my-page-1');
    cy.findByLabelText('Select My Image').click();
    cy.findByLabelText('Close object browser').should('be.visible');
    cy.get('.object-browser header').findByLabelText('Back').click();

    cy.get('.object-browser .ui.input.search').should('not.exist');
    cy.get('.object-browser .breadcrumbs').should('contain', 'my-page-1');
    cy.get('.object-browser .object-listing').should('contain', 'My Image');
    cy.get('.object-browser .object-listing').should(
      'not.contain',
      'My Searchable Image',
    );
    cy.findByLabelText('Close object browser').should('be.visible');
  });

  it('exits search on Escape without closing the Object Browser', () => {
    cy.createContent({
      contentType: 'Image',
      contentId: 'local-image',
      contentTitle: 'Local Image',
      path: '/my-page',
    });
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('.toolbar-inner button.ui.basic.icon.button').first().click();
    cy.findByLabelText('Search SVG').click();
    cy.get('.ui.input.search input').type('Searchable');
    cy.findByLabelText('Select My Searchable Image').should('be.visible');
    cy.get('.ui.input.search input').type('{esc}');

    cy.get('.object-browser .ui.input.search').should('not.exist');
    cy.findByLabelText('Close object browser').should('be.visible');
    cy.findByLabelText('Search SVG').should('be.focused');
    cy.get('.object-browser .breadcrumbs').should('contain', 'my-page');
    cy.get('.object-browser .object-listing')
      .should('contain', 'Local Image')
      .and('not.contain', 'My Searchable Image');
  });
});
