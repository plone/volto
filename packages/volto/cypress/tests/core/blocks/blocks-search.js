describe('Search Block Tests', () => {
  var results_number = 3;
  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    // Wait a bit to previous teardown to complete correctly because Heisenbug in this point
    cy.wait(2000);
    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.removeContent({ path: 'news' });
    cy.removeContent({ path: 'events' });
    cy.removeContent({ path: 'Members' });

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

    cy.visit('/');
    cy.wait('@content');
  });

  afterEach(() => {
    cy.removeContent({ path: 'my-page' });
    cy.removeContent({ path: 'my-folder' });
    cy.removeContent({ path: 'my-event' });
    cy.removeContent({ path: 'my-search-page' });
  });

  it('Search block - test checkbox facet', () => {
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

    // Save the page
    cy.get('#toolbar-save > .icon').click();

    cy.wait(500);

    // test search results number
    cy.get('.search-details').should(
      'contain',
      `Search results: ${results_number}`,
    );

    // test if type facet works
    cy.get('.block.search .facets > .facet .entries > .entry label')
      .contains('Event')
      .click();

    cy.get('.searchBlock-facets').findByText('My Event').should('not.exist');
    cy.url().should(
      'contain',
      '%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.list.contains%22%2C%22v%22%3A%5B%22Document%22%2C%22Folder%22%5D%7D%5D',
    );
    // clear facets
    cy.get('.checkbox-facet').findByText('Event').click();
    cy.url().should(
      'contain',
      '%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.list.contains%22%2C%22v%22%3A%5B%22Document%22%2C%22Folder%22%2C%22Event%22%5D%7D%5D',
    );

    cy.get('.checkbox-facet').findByText('Folder').click();
    cy.get('.checkbox-facet').findByText('Page').click();

    cy.wait(2000);

    // // navigate to the searched url
    cy.visit(
      '/my-search-page?query=%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.list.contains%22%2C%22v%22%3A%5B%22Event%22%5D%7D%5D',
    );
    cy.reload();
    cy.wait(2000);
    cy.get('.search-details').should('contain', 'Search results: 1');

    //navigate to home
    cy.navigate('/');
    cy.wait(500);

    // navigate to the searched url
    cy.navigate(
      // '/my-search-page?query=%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.list.contains%22%2C%22v%22%3A%5B%22Event%22%5D%7D%5D',
      '/my-search-page?query=%5B%7B%22i%22%3A%22portal_type%22%2C%22o%22%3A%22paqo.list.contains%22%2C%22v%22%3A%5B%22Event%22%5D%7D%5D',
    );
    cy.get('.search-details').should('contain', 'Search results: 1');

    cy.reload();
    cy.get('.search-details').should('contain', 'Search results: 1');
  });

  it('Search block - test date range facet', () => {
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

    //  Add data range facet
    cy.get('.add-item-button-wrapper > button').click();
    cy.get('#field-field-1-facets-0 .react-select__value-container').click();
    cy.get('.react-select__option').contains('Effective date').click();
    cy.get('#field-title-0-facets-0').type('Effective date');
    cy.get('#field-type-2-facets-0').click();
    cy.get('.react-select__option').contains('Date Range').click();

    // TODO: test if date range facet works

    // Save the page
    cy.get('#toolbar-save > .icon').click();

    cy.wait(500);

    // test search results number
    cy.get('.search-details').should(
      'contain',
      `Search results: ${results_number}`,
    );
  });

  it('Search block - test live searchbox', () => {
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

    // Save the page
    cy.get('#toolbar-save > .icon').click();
    cy.wait('@content');

    cy.wait(500);

    // test search results number
    cy.get('.search-details').should(
      'contain',
      `Search results: ${results_number}`,
    );

    cy.queryCounter('/**/@querystring-search', [
      () => cy.get('.search-wrapper .search-input input').focus().type('Event'),
      () =>
        cy
          .get('#page-document .listing-item:first-of-type a')
          .should('have.attr', 'href', '/my-event'),
      () =>
        cy
          .get('.search-results-count-sort .search-details em')
          .should('contain', 'Event'),
      () =>
        cy
          .url()
          .should(
            'contain',
            '%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22Event%22%7D',
          ),
    ]);

    // test removing one char
    cy.queryCounter(
      '/**/@querystring-search',
      [
        () =>
          cy
            .get('.search-wrapper .search-input input')
            .focus()
            .type('{backspace}'),
        () =>
          cy
            .get('.search-results-count-sort .search-details em')
            .should('not.contain', 'Event')
            .and('contain', 'Even'),
        () =>
          cy
            .url()
            .should(
              'contain',
              '%7B%22i%22%3A%22SearchableText%22%2C%22o%22%3A%22paqo.string.contains%22%2C%22v%22%3A%22Even%22%7D',
            ),
      ],
      1,
    );

    // test removing the text with the button
    cy.get(
      '.search-wrapper .search-input .search-input-actions button.search-input-clear-icon-button',
    ).click();
    cy.get('.search-results-count-sort .search-details').should(
      'not.contain',
      'Searched for:',
    );
    cy.url().should('not.contain', '%22SearchableText%22');

    // test search results number
    cy.get('.search-details').should(
      'contain',
      `Search results: ${results_number}`,
    );

    // test searching for Event
    cy.get('.search-wrapper .search-input input').focus().type('Event');
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

    // test search results number
    cy.get('.search-details').should('contain', 'Search results: 1');

    // test removing one char
    cy.get('.search-wrapper .search-input input').focus().type('{backspace}');
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
    cy.get('.search-results-count-sort .search-details').should(
      'not.contain',
      'Searched for:',
    );
    cy.url().should('not.contain', '%22SearchableText%22');
  });

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

    // test search results number
    cy.get('.search-details').should(
      'contain',
      `Search results: ${results_number}`,
    );

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

    // test search results number
    cy.get('.search-details').should('contain', 'Search results: 1');

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

    // test search results number
    cy.get('.search-details').should(
      'contain',
      `Search results: ${results_number}`,
    );

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

    // test search results number
    cy.get('.search-details').should('contain', 'Search results: 1');

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

    // test search results number
    cy.get('.search-details').should(
      'contain',
      `Search results: ${results_number}`,
    );
  });

  it('Search block - test on edit sort on and sort order', () => {
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
    // reverse order
    cy.get('label[for=field-sort_order_boolean-2-query]').click();
    //check if the sorting order is working
    cy.get('.listing-item').first().contains('My Event');
    cy.get('#select-listingblock-sort-on').click();
    cy.get('.react-select__menu .react-select__group')
      .first()
      .children()
      .first()
      .next()
      .children()
      .first()
      .next()
      .click();
    cy.wait(5000);

    cy.get('.listing-item').first().contains('My page');
    //save page
    cy.get('#toolbar-save > .icon').click();
    cy.wait(500);
  });
  it('Search block - test on select 1 sort on in listing criteria sort on', () => {
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
    cy.get(
      '#select-listingblock-sort-on > .react-select__control > .react-select__value-container',
    ).click();
    cy.findByText('Effective date').click();
    cy.get('.field-wrapper-showSortOn .wrapper .ui label').click();
    //save page
    cy.get('#toolbar-save').click();

    // then we are able to see title and value
    cy.get('span.sorted-label').should('have.text', 'Sorted onEffective date');
    cy.get('span.sorted-label-value').should('have.text', 'Effective date');
    // Verify the presence of Ascending button
    cy.get('button[title="Ascending"]').should('be.visible');
    // Verify the presence of Descending button
    cy.get('button[title="Descending"]').should('be.visible');
  });
  it('Search block - test on only one sort on option below.', () => {
    cy.visit('/');
    cy.get('#toolbar-add > .icon').click();
    cy.get('#toolbar-add-document').click();
    cy.getSlateTitle().focus().click().type('My Search Page');

    // Add Search listing block
    cy.addNewBlock('search');
    cy.get('.field-wrapper-showSortOn .wrapper .ui label').click();
    cy.get(
      '#field-sortOnOptions > .react-select__control > .react-select__value-container ',
    ).click();
    cy.findByText('Effective date').click();
    //save page
    cy.get('#toolbar-save').click();
    // then we are able to see label and sort option
    cy.get('.sort-label').should('have.text', 'Sort on');
    cy.get('#select-search-sort-on').click();
    cy.findByText('Effective date').click({ force: true });
    cy.get(
      'div#select-search-sort-on.search-react-select-container.css-2b097c-container',
    ).contains('Effective date');
    // Verify the presence of Ascending button
    cy.get('button[title="Ascending"]').should('be.visible');
    // Verify the presence of Descending button
    cy.get('button[title="Descending"]').should('be.visible');
  });
  it('Search block - test on select both listing sort on and sort on options', () => {
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
    cy.get(
      '#select-listingblock-sort-on > .react-select__control > .react-select__value-container',
    ).click();
    cy.findByText('Order in folder').click();
    // Add one sort on options below
    cy.get('.field-wrapper-showSortOn .wrapper .ui label').click();
    cy.get('#field-sortOnOptions').click();
    cy.findByText('Effective date').click();
    // save page
    cy.get('#toolbar-save').click();
    // then we are able to see label and sort option
    cy.get('.sort-label').should('have.text', 'Sort on');
    cy.get('#select-search-sort-on').click();
    cy.findByText('Effective date').click({ force: true });
    cy.get(
      'div#select-search-sort-on.search-react-select-container.css-2b097c-container',
    ).contains('Effective date');
    cy.get('#select-search-sort-on').click();
    cy.get(
      'div#select-search-sort-on.search-react-select-container.css-2b097c-container',
    ).contains('Order in folder');
    // Verify the presence of Ascending button
    cy.get('button[title="Ascending"]').should('be.visible');
    // Verify the presence of Descending button
    cy.get('button[title="Descending"]').should('be.visible');
  });
});
