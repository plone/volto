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

  afterEach(() => {
    cy.removeContent({ path: 'my-page' });
    cy.removeContent({ path: 'my-folder' });
    cy.removeContent({ path: 'my-event' });
    cy.removeContent({ path: 'my-search-page' });
  });

  // it('Search block - test checkbox facet', () => {
  //   cy.visit('/');
  //   cy.get('#toolbar-add > .icon').click();
  //   cy.get('#toolbar-add-document').click();
  //   cy.getSlateTitle().focus().click().type('My Search Page');

  //   // Add Search listing block
  //   cy.addNewBlock('search');

  //   // Add search query criteria
  //   cy.get('#default-query-0-query .react-select__value-container').click();
  //   cy.get('#default-query-0-query .react-select__option')
  //     .contains('Type')
  //     .click();

  //   cy.get('#default-query-0-query .fields:first-of-type > .field').click();
  //   cy.get(
  //     '#default-query-0-query .fields:first-of-type > .field .react-select__option',
  //   )
  //     .contains('Page')
  //     .click();

  //   cy.get('#default-query-0-query .fields:first-of-type > .field').click();
  //   cy.get(
  //     '#default-query-0-query .fields:first-of-type > .field .react-select__option',
  //   )
  //     .contains('Folder')
  //     .click();

  //   cy.get('#default-query-0-query .fields:first-of-type > .field').click();
  //   cy.get(
  //     '#default-query-0-query .fields:first-of-type > .field .react-select__option',
  //   )
  //     .contains('Event')
  //     .click();

  //   //  Add checkbox facet
  //   cy.get('.add-item-button-wrapper > button').click();
  //   cy.get('#field-field-1-facets-0 .react-select__value-container').click();
  //   cy.get('.react-select__option').contains('Type').click();
  //   cy.get('#field-title-0-facets-0').type('Type');
  //   cy.get('#field-type-2-facets-0').click();
  //   cy.get('.react-select__option').contains('Checkbox').click();
  //   cy.get('label[for="field-multiple-3-facets-0"]').click();

  //   // Save the page
  //   cy.get('#toolbar-save > .icon').click();

  //   cy.wait(500);

  //   // test if type facet works
  //   cy.get('.block.search .facets > .facet .entries > .entry label')
  //     .contains('Event')
  //     .click();
  //   cy.get('#page-document .listing-item:first-of-type a').should(
  //     'have.attr',
  //     'href',
  //     '/my-event',
  //   );
  //   cy.url().should(
  //     'contain',
  //     '%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.list.contains%22%2C%22v%22%3A%5B%22Event%22%5D%7D',
  //   );
  //   // clear facets
  //   cy.get('.block.search .filter-list-header .ui.button').click();
  // });

  // it('Search block - test date range facet', () => {
  //   cy.visit('/');
  //   cy.get('#toolbar-add > .icon').click();
  //   cy.get('#toolbar-add-document').click();
  //   cy.getSlateTitle().focus().click().type('My Search Page');

  //   // Add Search listing block
  //   cy.addNewBlock('search');

  //   // Add search query criteria
  //   cy.get('#default-query-0-query .react-select__value-container').click();
  //   cy.get('#default-query-0-query .react-select__option')
  //     .contains('Type')
  //     .click();

  //   cy.get('#default-query-0-query .fields:first-of-type > .field').click();
  //   cy.get(
  //     '#default-query-0-query .fields:first-of-type > .field .react-select__option',
  //   )
  //     .contains('Page')
  //     .click();

  //   cy.get('#default-query-0-query .fields:first-of-type > .field').click();
  //   cy.get(
  //     '#default-query-0-query .fields:first-of-type > .field .react-select__option',
  //   )
  //     .contains('Folder')
  //     .click();

  //   cy.get('#default-query-0-query .fields:first-of-type > .field').click();
  //   cy.get(
  //     '#default-query-0-query .fields:first-of-type > .field .react-select__option',
  //   )
  //     .contains('Event')
  //     .click();

  //   //  Add data range facet
  //   cy.get('.add-item-button-wrapper > button').click();
  //   cy.get('#field-field-1-facets-0 .react-select__value-container').click();
  //   cy.get('.react-select__option').contains('Effective date').click();
  //   cy.get('#field-title-0-facets-0').type('Effective date');
  //   cy.get('#field-type-2-facets-0').click();
  //   cy.get('.react-select__option').contains('Date Range').click();

  //   // TODO: test if date range facet works

  //   // Save the page
  //   cy.get('#toolbar-save > .icon').click();

  //   cy.wait(500);
  // });

  // it('Search block - test live searchbox', () => {
  //   cy.visit('/');
  //   cy.get('#toolbar-add > .icon').click();
  //   cy.get('#toolbar-add-document').click();
  //   cy.getSlateTitle().focus().click().type('My Search Page');

  //   // Add Search listing block
  //   cy.addNewBlock('search');

  //   // Add search query criteria
  //   cy.get('#default-query-0-query .react-select__value-container').click();
  //   cy.get('#default-query-0-query .react-select__option')
  //     .contains('Type')
  //     .click();

  //   cy.get('#default-query-0-query .fields:first-of-type > .field').click();
  //   cy.get(
  //     '#default-query-0-query .fields:first-of-type > .field .react-select__option',
  //   )
  //     .contains('Page')
  //     .click();

  //   cy.get('#default-query-0-query .fields:first-of-type > .field').click();
  //   cy.get(
  //     '#default-query-0-query .fields:first-of-type > .field .react-select__option',
  //   )
  //     .contains('Folder')
  //     .click();

  //   cy.get('#default-query-0-query .fields:first-of-type > .field').click();
  //   cy.get(
  //     '#default-query-0-query .fields:first-of-type > .field .react-select__option',
  //   )
  //     .contains('Event')
  //     .click();

  //   // Save the page
  //   cy.get('#toolbar-save > .icon').click();

  //   cy.wait(500);
  //   // test searching for Event
  //   cy.get('.search-wrapper .search-input input').focus().type('Event');
  //   cy.get('#page-document .listing-item:first-of-type a').should(
  //     'have.attr',
  //     'href',
  //     '/my-event',
  //   );
  //   cy.get('.search-results-count-sort .search-details em').should(
  //     'contain',
  //     'Event',
  //   );
  //   cy.url().should(
  //     'contain',
  //     '%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22Event%22%7D',
  //   );

  //   // test removing one char
  //   cy.get('.search-wrapper .search-input input').focus().type('{backspace}');
  //   cy.get('.search-results-count-sort .search-details em')
  //     .should('not.contain', 'Event')
  //     .and('contain', 'Even');
  //   cy.url().should(
  //     'contain',
  //     '%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22Even%22%7D',
  //   );

  //   // test removing the text with the button
  //   cy.get(
  //     '.search-wrapper .search-input .search-input-actions button.search-input-clear-icon-button',
  //   ).click();
  //   cy.get('.search-results-count-sort .search-details').should(
  //     'not.contain',
  //     'Searched for:',
  //   );
  //   cy.url().should('not.contain', '%22SearchableText%22');

  //   // test searching for Event
  //   cy.get('.search-wrapper .search-input input').focus().type('Event');
  //   cy.get('#page-document .listing-item:first-of-type a').should(
  //     'have.attr',
  //     'href',
  //     '/my-event',
  //   );
  //   cy.get('.search-results-count-sort .search-details em').should(
  //     'contain',
  //     'Event',
  //   );
  //   cy.url().should(
  //     'contain',
  //     '%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22Event%22%7D',
  //   );

  //   // test removing one char
  //   cy.get('.search-wrapper .search-input input').focus().type('{backspace}');
  //   cy.get('.search-results-count-sort .search-details em')
  //     .should('not.contain', 'Event')
  //     .and('contain', 'Even');
  //   cy.url().should(
  //     'contain',
  //     '%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22Even%22%7D',
  //   );

  //   // test removing the whole text from the keyboard
  //   cy.get('.search-wrapper .search-input input')
  //     .focus()
  //     .type('{selectAll}{del}');
  //   cy.get('.search-results-count-sort .search-details').should(
  //     'not.contain',
  //     'Searched for:',
  //   );
  //   cy.url().should('not.contain', '%22SearchableText%22');
  // });

  it('Search block - test searchbox', () => {
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

    // uncheck showSearchButton
    cy.get('label[for=field-showSearchButton]').click();
    cy.get('.search-wrapper .ui.button').should('contain', 'Search');

    // Save the page
    cy.get('#toolbar-save > .icon').click();

    cy.wait(500);

    // test searching for Event
    cy.get('.search-wrapper .search-input input').focus().type('Event');
    cy.get('.search-wrapper > .ui.button').click();

    cy.get('#page-document .listing-item:first-of-type a').should(
      'have.attr',
      'href',
      '/my-event',
    );
    cy.get('.search-results-count-sort .search-details em').should(
      'contain',
      'Event',
    );
    cy.url().should(
      'contain',
      '%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22Event%22%7D',
    );

    // test removing one char
    cy.get('.search-wrapper .search-input input').focus().type('{backspace}');
    cy.get('.search-wrapper > .ui.button').click();
    cy.get('.search-results-count-sort .search-details em')
      .should('not.contain', 'Event')
      .and('contain', 'Even');
    cy.url().should(
      'contain',
      '%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22Even%22%7D',
    );

    // test removing the text with the button
    cy.get(
      '.search-wrapper .search-input .search-input-actions button.search-input-clear-icon-button',
    ).click();
    cy.get('.search-wrapper > .ui.button').click();
    cy.get('.search-results-count-sort .search-details').should(
      'not.contain',
      'Searched for:',
    );
    cy.url().should('not.contain', '%22SearchableText%22');

    // test searching for Event
    cy.get('.search-wrapper .search-input input').focus().type('Event');
    cy.get('.search-wrapper > .ui.button').click();
    cy.get('#page-document .listing-item:first-of-type a').should(
      'have.attr',
      'href',
      '/my-event',
    );
    cy.get('.search-results-count-sort .search-details em').should(
      'contain',
      'Event',
    );
    cy.url().should(
      'contain',
      '%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22Event%22%7D',
    );

    // test removing one char
    cy.get('.search-wrapper .search-input input').focus().type('{backspace}');
    cy.get('.search-wrapper > .ui.button').click();
    cy.get('.search-results-count-sort .search-details em')
      .should('not.contain', 'Event')
      .and('contain', 'Even');
    cy.url().should(
      'contain',
      '%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22Even%22%7D',
    );

    // test removing the whole text from the keyboard
    cy.get('.search-wrapper .search-input input')
      .focus()
      .type('{selectAll}{del}');
    cy.get('.search-wrapper > .ui.button').click();
    cy.get('.search-results-count-sort .search-details').should(
      'not.contain',
      'Searched for:',
    );
    cy.url().should('not.contain', '%22SearchableText%22');
  });
});
