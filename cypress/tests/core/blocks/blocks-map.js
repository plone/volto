describe('Map Block Tests', () => {
  beforeEach(() => {
    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.visit('/my-page');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('my-page');
    cy.navigate('/my-page/edit');
  });

  it('Add maps block - Google Maps', () => {
    // when I add a maps block
    cy.addNewBlock('maps');

    cy.get(`.block.maps .toolbar-inner .ui.input input`)
      .type(
        '<iframe src="https://www.google.com/maps/embed?pb=" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>',
      )
      .type('{enter}');
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('my-page');

    // then the page view should contain the maps block
    cy.get('#page-document iframe')
      .should('have.attr', 'src')
      .and('match', /\/\/www.google.com\/maps\/embed\?pb=/);
  });

  it('Add maps block - OpenStreet Maps', () => {
    // when I add a maps block
    cy.addNewBlock('maps');

    cy.get(`.block.maps .toolbar-inner .ui.input input`)
      .type(
        '<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=2.0408821105957036%2C41.2938013640244%2C2.2400093078613286%2C41.49109217223111&amp;layer=mapnik" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/#map=13/41.3925/2.1404">View Larger Map</a></small>',
      )
      .type('{enter}');
    cy.get('#toolbar-save').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('my-page');
    // cy.pause();
    // then the page view should contain the maps block
    cy.get('#page-document iframe')
      .should('have.attr', 'src')
      .and('match', /\/\/www.openstreetmap.org\/export\/embed/);
  });
});
