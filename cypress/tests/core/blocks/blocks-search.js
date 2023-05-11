describe('Search Block Tests', () => {
  beforeEach(() => {
    // Wait a bit to previous teardown to complete correctly because Heisenbug in this point
    cy.wait(2000);
    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.removeContent({ path: 'news' });
    cy.removeContent({ path: 'events' });
    cy.removeContent({ path: 'Members' });
    cy.visit('/');

    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My page',
      path: '/',
    });

    cy.createContent({
      contentType: 'Document',
      contentId: 'my-folder',
      contentTitle: 'My Folder',
      path: '/',
    });

    cy.createContent({
      contentType: 'Event',
      contentId: 'my-event',
      contentTitle: 'My Event',
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
    cy.getSlateTitle().focus().click().type('My Search Page');

    // Add Search listing block
    cy.addNewBlock('search');

    // Add search query criteria
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
      .contains('Folder')
      .click();

    cy.get('#default-query-0-query .fields:first-of-type > .field').click();
    cy.get(
      '#default-query-0-query .fields:first-of-type > .field .react-select__option',
    )
      .contains('Event')
      .click();

    //  Add checkbox facet
    cy.get('.add-item-button-wrapper > button').click();
    cy.get('#field-field-1-facets-0 .react-select__value-container').click();
    cy.get('.react-select__option').contains('Type').click();
    cy.get('#field-title-0-facets-0').type('Type');
    cy.get('#field-type-2-facets-0').click();
    cy.get('.react-select__option').contains('Checkbox').click();
    cy.get('label[for="field-multiple-3-facets-0"]').click();

    //  Add data range facet
    cy.get('.add-item-button-wrapper > button').click();
    cy.get('#field-field-1-facets-1 .react-select__value-container').click();
    cy.get('.react-select__option').contains('Effective date').click();
    cy.get('#field-title-0-facets-1').type('Effective date');
    cy.get('#field-type-2-facets-1').click();
    cy.get('.react-select__option').contains('Date Range').click();

    // Save the page
    cy.get('#toolbar-save > .icon').click();

    cy.wait(500);
    cy.get(
      '.block.search .facets > .facet .entries > .entry:nth-of-type(1) label',
    ).click();
    cy.get('.block.search .filter-list-header .ui.button').click();
  });
});
