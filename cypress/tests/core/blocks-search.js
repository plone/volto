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
      contentId: 'my-page-1',
      contentTitle: 'First Page',
      path: '/',
    });

    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page-2',
      contentTitle: 'Second Page',
      path: '/',
    });

    cy.createContent({
      contentType: 'Event',
      contentId: 'my-event',
      contentTitle: 'My Event',
      path: '/',
    });

    cy.createContent({
      contentType: 'News Item',
      contentId: 'my-news',
      contentTitle: 'My News',
      path: '/',
    });

    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
  });

  it('Add Search block', () => {
    cy.visit('/');
    cy.get('#toolbar-add > .icon').click();
    cy.get('#toolbar-add-document').click();
    cy.get('.documentFirstHeading > .public-DraftStyleDefault-block')
      .click()
      .type('My Search Page');

    // Add Search listing block
    cy.get('.block.text [contenteditable]').click();
    cy.get('button.block-add-button').click();
    cy.get('.blocks-chooser .title').contains('Common').click();
    cy.get('.blocks-chooser .common').contains('Search listing').click();

    // Add search input
    cy.get('label[for="field-showSearchInput"]').click();
    cy.get('#field-searchInputPrompt').click();
    cy.get('#field-searchInputPrompt').type('Type search term:');

    // Add search query criteria
    cy.get('#blockform-fieldset-searchquery').click();
    cy.get('#default-query-0-query .react-select__value-container').click();
    cy.get('#default-query-0-query .react-select__option')
      .contains('Type')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Page')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Event')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('News')
      .click();

    // Add facet 1
    cy.get('#blockform-fieldset-facets > .title').click();
    cy.get('.add-item-button-wrapper > button').click();
    cy.get('#field-field-1-facets-0 .react-select__value-container').click();
    cy.get('.react-select__option').contains('Type').click();
    cy.get('#field-title-0-facets-0').type('Type');
    cy.get('label[for="field-multiple-2-facets-0"]').click();
    cy.get('#field-type-3-facets-0').click();
    cy.get('.react-select__option').contains('Checkbox').click();

    // Add facet 2
    cy.get('.add-item-button-wrapper > button').click();
    cy.get('#field-field-1-facets-1 .react-select__value-container').click();
    cy.get('.react-select__option').contains('Review state').click();
    cy.get('#field-title-0-facets-1').type('State');
    cy.get('label[for="field-multiple-2-facets-1"]').click();
    cy.get('#field-type-3-facets-1').click();
    cy.get('.react-select__option').contains('Checkbox').click();

    // Save the page
    cy.get('#toolbar-save > .icon').click();
    cy.get('#page-document .listing-body:first-of-type').contains('First Page');

    cy.get(
      '.searchBlock .three.column > .facet:nth-of-type(1) .entries > .entry:nth-of-type(1) label',
    ).click();
    cy.get(
      '.searchBlock .three.column > .facet:nth-of-type(1) .entries > .entry:nth-of-type(2) label',
    ).click();
    cy.get(
      '.searchBlock .three.column > .facet:nth-of-type(1) .entries > .entry:nth-of-type(1) label',
    ).click();
  });
});
