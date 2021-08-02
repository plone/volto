describe('Search Block Tests', () => {
  beforeEach(() => {
    // Wait a bit to previous teardown to complete correctly because Heisenbug in this point
    cy.wait(2000);
    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.removeContent({ path: '/front-page' });
    cy.removeContent({ path: '/news' });
    cy.removeContent({ path: '/events' });
    cy.removeContent({ path: '/Members' });
    cy.visit('/');

    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    // cy.visit('/my-page');
    // cy.waitForResourceToLoad('@navigation');
    // cy.waitForResourceToLoad('@breadcrumbs');
    // cy.waitForResourceToLoad('@actions');
    // cy.waitForResourceToLoad('@types');
    // cy.waitForResourceToLoad('my-page');
    // cy.navigate('/my-page/edit');
    // cy.get(`.block.title [data-contents]`);
  });

  it('Add Search block', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#toolbar-add > .icon').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .click()
      .type('{backspace}My Search Page');
    cy.get('div > .public-DraftStyleDefault-block').click();
    cy.get('.block-add-button:nth-child(1)').click();
    cy.get('.title:nth-child(7)').click();
    cy.get('.searchBlock > .icon').click();
    cy.get('.invisible').click();
    cy.get('.stackable > .row:nth-child(1) > .twelve').click();
    cy.get('.inline:nth-child(1) .twelve label').click();
    cy.get('#field-searchInputPrompt').click();
    cy.get('#field-searchInputPrompt').type('{backspace}');
    cy.get('#field-searchInputPrompt').type('Type search term:');
    cy.get('#blockform-fieldset-searchquery > .title').click();

    cy.get(
      // '.react-select__control--is-focused > .react-select__value-container',
      '.querystring-widget > #default-query-0-query > .ui #field-query-0-query > .react-select__control > .react-select__value-container',
    ).click();
    cy.get('.querystring-widget .react-select__menu .react-select__option')
      .contains('Type')
      .click();

    cy.get('.querystring-widget .fields:first-of-type > .field').click();
    cy.get(
      '.querystring-widget .fields:first-of-type > .field .react-select__menu .react-select__option',
    )
      .contains('Page')
      .click();

    cy.get('#blockform-fieldset-facets > .title').click();
    cy.get('.compact').click();
    cy.get(
      '#field-field-1-facets-0 > .react-select__control > .react-select__value-container',
    ).click();
    cy.get('.react-select__option').contains('Review state').click();

    cy.get('#field-type-3-facets-0').click();
    cy.get('.react-select__option').contains('Checkbox').click();
    cy.get('#toolbar-save > .icon').click();

    cy.get(`.listing-body:first-of-type`).contains('My Page');
  });
});
