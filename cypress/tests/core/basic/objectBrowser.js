describe('Object Browser Tests', () => {
  beforeEach(() => {
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
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('my-page');
    cy.navigate('/my-page/edit');
  });

  it('As editor I can add the relative url in search box in sidebar', () => {
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('.toolbar-inner button.ui.basic.icon.button').click();
    cy.findByLabelText('Search SVG').click();
    cy.get('.ui.input.search').type('/my-page-1');
    cy.findByLabelText('Select My Image').dblclick();
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then we should see a image
    cy.get('.block img')
      .should('have.attr', 'src')
      .and('eq', '/my-page-1/my-image/@@images/image');
  });

  it('As editor I can add the full url in search box in sidebar', () => {
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('.toolbar-inner button.ui.basic.icon.button').click();
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
      .and('eq', '/my-page-1/my-image/@@images/image');
  });

  it('As editor I get focus on search box in sidebar when clicking on lens icon', () => {
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('.toolbar-inner button.ui.basic.icon.button').click();
    cy.findByLabelText('Search SVG').click();
    cy.get('.ui.input.search input').should('be.focused');
  });

  it('As editor I can search and only get a list of images but not other content types', () => {
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.image').contains('Image').click();
    cy.get('.toolbar-inner button.ui.basic.icon.button').click();
    cy.findByLabelText('Search SVG').click();
    cy.get('.ui.input.search').type('Searchable');

    // The document is not in the list
    cy.findByLabelText('Browse My Searchable Page').should('not.exist');
    // And the list has only 1 item
    cy.get('.ui.segment.object-listing li').should('have.length', 1);

    // The image can be selected as usual
    cy.findByLabelText('Select My Searchable Image').dblclick();
    cy.get('#toolbar-save').click();
    cy.wait(1000);
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then we should see a image
    cy.get('.block img')
      .should('have.attr', 'src')
      .and('eq', '/my-searchable-image/@@images/image');
  });
});
