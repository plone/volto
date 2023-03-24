describe('Listing Block Tests', () => {
  beforeEach(() => {
    // Wait a bit to previous teardown to complete correctly because Heisenbug in this point
    // cy.wait(2000);
    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
    });
    cy.removeContent({ path: 'news' });
    cy.removeContent({ path: 'events' });
    cy.removeContent({ path: 'Members' });

    cy.visit('/');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('');
  });

  it('Add Listing block', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.intercept('GET', '/**/my-page').as('content');
    cy.intercept('GET', '/**/@types/Document').as('schema');

    // Given One Document My Page Test and One News Item MY News and One Folder My Folder
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page-test',
      contentTitle: 'My Page Test',
      path: 'my-page',
    });
    cy.createContent({
      contentType: 'News Item',
      contentId: 'my-news',
      contentTitle: 'My News',
      path: 'my-page',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-folder',
      contentTitle: 'My Folder',
      path: 'my-page',
    });

    cy.navigate('/my-page');
    cy.wait('@content');

    cy.navigate('/my-page/edit');
    cy.wait('@schema');

    cy.clearSlateTitle().type('My title');

    //add listing block
    cy.addNewBlock('listing');

    //verify before save
    cy.get(`.block.listing .listing-body:first-of-type`).contains(
      'My Page Test',
    );

    //save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    //test after save
    cy.get('#page-document .listing-body:first-of-type').contains(
      'My Page Test',
    );
    cy.get('#page-document .listing-item:first-of-type a').should(
      'have.attr',
      'href',
      '/my-page/my-page-test',
    );
  });

  it('Add Listing block - containing items', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.intercept('GET', '/**/my-page').as('content');
    cy.intercept('GET', '/**/@types/Document').as('schema');

    // Given One Document My Page Test and One News Item MY News and One Folder My Folder
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page-test',
      contentTitle: 'My Page Test',
      path: 'my-page',
    });
    cy.createContent({
      contentType: 'News Item',
      contentId: 'my-news',
      contentTitle: 'My News',
      path: 'my-page',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-folder',
      contentTitle: 'My Folder',
      path: 'my-page',
    });

    cy.navigate('/my-page');
    cy.wait('@content');

    cy.navigate('/my-page/edit');
    cy.wait('@schema');

    cy.clearSlateTitle().type('My title');

    //add listing block
    cy.addNewBlock('listing');

    //verify before save
    cy.get(`.block.listing .listing-body:first-of-type`).contains(
      'My Page Test',
    );
    cy.get('.items-preview').contains('Contained items');

    //save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    //test after save
    cy.get('#page-document .listing-body:first-of-type').contains(
      'My Page Test',
    );
  });

  it('Add Listing block - results preview', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.intercept('GET', '/**/my-page').as('content');
    cy.intercept('GET', '/**/@types/Document').as('schema');

    // Given One Document My Page Test and One News Item MY News and One Folder My Folder
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page-test',
      contentTitle: 'My Page Test',
      path: 'my-page',
    });
    cy.createContent({
      contentType: 'News Item',
      contentId: 'my-news',
      contentTitle: 'My News',
      path: 'my-page',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-folder',
      contentTitle: 'My Folder',
      path: 'my-page',
    });

    cy.navigate('/my-page');
    cy.wait('@content');

    cy.navigate('/my-page/edit');
    cy.wait('@schema');

    cy.clearSlateTitle().type('My title');

    //add listing block
    cy.addNewBlock('listing');

    cy.get('.sidebar-container .tabs-wrapper .menu .item')
      .contains('Block')
      .click();
    cy.get('.querystring-widget .fields').contains('Add criteria').click();
    cy.get(
      '.querystring-widget .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
    )
      .contains('Type')
      .click();

    //insert Page
    cy.get('.querystring-widget .fields:first-of-type > .field').click();
    cy.get(
      '.querystring-widget .fields:first-of-type > .field .react-select__menu .react-select__option',
    )
      .contains('Page')
      .click();

    //verify before save
    cy.get(`.block.listing .listing-body:first-of-type`).contains(
      'My Page Test',
    );
    cy.get('.items-preview').contains('Results preview');

    //save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    //test after save
    cy.get('#page-document .listing-body:first-of-type').contains(
      'My Page Test',
    );
    cy.get('#page-document .listing-item:first-of-type a').should(
      'have.attr',
      'href',
      '/my-page/my-page-test',
    );
  });

  it('Add Listing block - with a headline', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.intercept('GET', '/**/my-page').as('content');
    cy.intercept('GET', '/**/@types/Document').as('schema');

    // Given One Document My Page Test and One News Item MY News and One Folder My Folder
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page-test',
      contentTitle: 'My Page Test',
      path: 'my-page',
    });
    cy.createContent({
      contentType: 'News Item',
      contentId: 'my-news',
      contentTitle: 'My News',
      path: 'my-page',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-folder',
      contentTitle: 'My Folder',
      path: 'my-page',
    });

    cy.navigate('/my-page');
    cy.wait('@content');

    cy.navigate('/my-page/edit');
    cy.wait('@schema');

    cy.clearSlateTitle().type('My title');

    //add listing block
    cy.addNewBlock('listing');

    //verify before save
    cy.get(`.block.listing .listing-body:first-of-type`).contains(
      'My Page Test',
    );
    cy.get('#field-headline').type('This is a headline');

    //save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    //test after save
    cy.get('#page-document h2.headline').contains('This is a headline');
  });

  it('Add Listing Block: sort by effective date', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.intercept('GET', '/**/my-page').as('content');
    cy.intercept('GET', '/**/@types/Document').as('schema');

    // given a page with two pages
    cy.createContent({
      contentType: 'Document',
      contentId: 'page-one',
      contentTitle: 'Page One',
      path: 'my-page',
    });
    cy.setWorkflow({
      path: 'my-page/page-one',
      review_state: 'publish',
      effective: '2018-01-01T08:00:00',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'page-two',
      contentTitle: 'Page Two',
      path: 'my-page',
    });
    cy.setWorkflow({
      path: 'my-page/page-two',
      review_state: 'publish',
      effective: '2019-01-01T08:00:00',
    });

    cy.navigate('/my-page');
    cy.wait('@content');

    cy.navigate('/my-page/edit');
    cy.wait('@schema');

    cy.clearSlateTitle().type('My title');

    //add listing block
    cy.addNewBlock('listing');

    //********  add Type criteria filter
    cy.get('.querystring-widget .fields').contains('Add criteria').click();
    cy.get(
      '.querystring-widget .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
    )
      .contains('Type')
      .click();

    //insert Page
    cy.get('.querystring-widget .fields:first-of-type > .field').click();
    cy.get(
      '.querystring-widget .fields:first-of-type > .field .react-select__menu .react-select__option',
    )
      .contains('Page')
      .click();

    // set effective date (reverse order)
    cy.get('#select-listingblock-sort-on')
      .click()
      .type('Effective date {enter}');
    cy.get('input[name="field-sort_order_boolean-2-querystring"]')
      .check({ force: true })
      .should('be.checked');

    //save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    //test after save
    cy.get('#page-document .listing-body:first-of-type').contains('Page Two');
    cy.get('#page-document .listing-item:first-of-type a').should(
      'have.attr',
      'href',
      '/my-page/page-two',
    );
  });

  it('Listing block - Test Root with Criteria: Type Page', () => {
    cy.intercept('PATCH', '/**/').as('save');
    cy.intercept('GET', '/**/').as('content');
    cy.intercept('GET', '/**/@types/*').as('schema');

    cy.createContent({
      contentType: 'News Item',
      contentId: 'my-news',
      contentTitle: 'My News',
      path: 'my-page',
    });

    cy.navigate('/edit');
    cy.wait('@schema');

    cy.clearSlateTitle().type(
      'Listing block - Test Root with Criteria: Type Page',
    );

    //add listing block
    cy.scrollTo('bottom');
    cy.addNewBlock('listing', true);

    //********  add Type criteria filter
    cy.get('.sidebar-container .tabs-wrapper .menu .item')
      .contains('Block')
      .click();
    cy.get('.querystring-widget .fields').contains('Add criteria').click();
    cy.get(
      '.querystring-widget .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
    )
      .contains('Type')
      .click();

    //insert Page
    cy.get('.querystring-widget .fields:first-of-type > .field').click();
    cy.get(
      '.querystring-widget .fields:first-of-type > .field .react-select__menu .react-select__option',
    )
      .contains('Page')
      .click();

    //before save, verify if in list there's a page with id my-page-test
    cy.get(`.block.listing .listing-body:first-of-type`).contains('My Page');
    //before save, verify if in list there isn't the News with title My News
    cy.get(`.block.listing .listing-body`)
      .contains('My News')
      .should('not.exist');

    //save
    cy.get('#toolbar-save').click();

    cy.wait('@save');
    cy.wait('@content');

    cy.get('#page-document .listing-body:first-of-type').contains('My Page');
    cy.get('#page-document .listing-item:first-of-type a').should(
      'have.attr',
      'href',
      '/my-page',
    );
  });

  it('Listing block - Test Criteria: short-name', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.intercept('GET', '/**/my-page').as('content');
    cy.intercept('GET', '/**/@types/Document').as('schema');

    // Given three Document in My Page i.e My News, My Folder and My Page Test
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page-test',
      contentTitle: 'My Page Test',
      path: 'my-page',
    });
    cy.createContent({
      contentType: 'News Item',
      contentId: 'my-news',
      contentTitle: 'My News',
      path: 'my-page',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-folder',
      contentTitle: 'My Folder',
      path: 'my-page',
    });

    cy.navigate('/my-page');
    cy.wait('@content');

    cy.navigate('/my-page/edit');
    cy.wait('@schema');

    cy.clearSlateTitle().type('Listing block - Test Criteria: short-name');

    //add listing block
    cy.addNewBlock('listing');

    //********  add short-name criteria filter
    cy.get('.sidebar-container .tabs-wrapper .menu .item')
      .contains('Block')
      .click();
    cy.get('.querystring-widget .fields').contains('Add criteria').click();
    cy.get(
      '.querystring-widget .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
    )
      .contains('Short name (id)')
      .click();
    //short-name is..
    cy.get(
      '.querystring-widget .fields:first-of-type .main-fields-wrapper .field:last-of-type',
    ).click();
    cy.get(
      '.querystring-widget .fields:first-of-type .main-fields-wrapper .field:last-of-type .react-select__menu .react-select__option',
    )
      .contains('Is')
      .click();
    //insert short name
    cy.get('.querystring-widget .fields:first-of-type > .field input')
      .clear()
      .type('my-page-test');

    //before save, vrify if in list there's a page with id my-page-test
    cy.get(`.block.listing .listing-body:first-of-type`).contains(
      'My Page Test',
    );
    //before save, verify if in list there isn't the News with title My News
    cy.get(`.block.listing .listing-body`)
      .contains('My News')
      .should('not.exist');

    //save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    //test short-name criteria after save
    cy.get('#page-document .listing-body:first-of-type').contains(
      'My Page Test',
    );
    cy.get('#page-document .listing-item:first-of-type a').should(
      'have.attr',
      'href',
      '/my-page/my-page-test',
    );
  });

  it('Listing block - Test Criteria: Location relative', () => {
    cy.intercept('PATCH', '/**/my-page/my-folder').as('save');
    cy.intercept('GET', '/**/my-page/my-folder').as('content');
    cy.intercept('GET', '/**/@types/Document').as('schema');

    // Given two Document in My Page i.e Document outside Folder and My Folder
    // And One Document in My Folder i.e Document within Folder
    cy.createContent({
      contentType: 'Document',
      contentId: 'document-outside-folder',
      contentTitle: 'Document outside Folder',
      path: 'my-page',
    });

    cy.createContent({
      contentType: 'Document',
      contentId: 'my-folder',
      contentTitle: 'My Folder',
      path: 'my-page',
    });

    cy.createContent({
      contentType: 'Document',
      contentId: 'document-within-folder',
      contentTitle: 'Document within Folder',
      path: 'my-page/my-folder',
    });

    cy.navigate('/my-page/my-folder');
    cy.wait('@content');

    cy.navigate('/my-page/my-folder/edit');
    cy.wait('@schema');

    cy.clearSlateTitle().type(
      'Listing block - Test Criteria: Location relative',
    );

    //add listing block
    cy.addNewBlock('listing');

    //********  add location criteria filter
    cy.get('.sidebar-container .tabs-wrapper .menu .item')
      .contains('Block')
      .click();
    cy.get('.querystring-widget .fields').contains('Add criteria').click();
    cy.get(
      '.querystring-widget .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
    )
      .contains('Location')
      .click();
    //location relative..
    cy.get(
      '.querystring-widget .fields:first-of-type .main-fields-wrapper .field:last-of-type',
    ).click();
    cy.get(
      '.querystring-widget .fields:first-of-type .main-fields-wrapper .field:last-of-type .react-select__menu .react-select__option',
    )
      .contains('Relative path')
      .click();

    //insert relative path
    cy.get('.querystring-widget .fields:first-of-type > .field input')
      .clear()
      .type('../my-folder');

    // verify if in list there's a page with name "Document within Folder"
    cy.get(`.block.listing .listing-body:first-of-type`).contains(
      'Document within Folder',
    );
    // verify if in list there isn't page with name "Document outside Folder"
    cy.get(`.block.listing .listing-body`)
      .contains('Document outside Folder')
      .should('not.exist');

    //save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    //test location relative criteria after save
    cy.get('#page-document .listing-body:first-of-type').contains(
      'Document within Folder',
    );
    cy.get('#page-document .listing-body:first-of-type')
      .contains('Document outside Folder')
      .should('not.exist');
  });

  it('Listing block - Test Criteria: Location absolute', () => {
    cy.intercept('PATCH', '/**/my-page/my-folder').as('save');
    cy.intercept('GET', '/**/my-page/my-folder').as('content');
    cy.intercept('GET', '/**/@types/Document').as('schema');

    // Given two Document in My Page i.e Document outside Folder and My Folder
    // And One Document in My Folder i.e Document within Folder
    cy.createContent({
      contentType: 'Document',
      contentId: 'document-outside-folder',
      contentTitle: 'Document outside Folder',
      path: 'my-page',
    });

    cy.createContent({
      contentType: 'Document',
      contentId: 'my-folder',
      contentTitle: 'My Folder',
      path: 'my-page',
    });

    cy.createContent({
      contentType: 'Document',
      contentId: 'document-within-folder',
      contentTitle: 'Document within Folder',
      path: 'my-page/my-folder',
    });

    cy.navigate('/my-page/my-folder');
    cy.wait('@content');

    cy.navigate('/my-page/my-folder/edit');
    cy.wait('@schema');

    cy.clearSlateTitle().type(
      'Listing block - Test Criteria: Location absolute',
    );

    //add listing block
    cy.addNewBlock('listing');

    //********  add location criteria filter
    cy.get('.sidebar-container .tabs-wrapper .menu .item')
      .contains('Block')
      .click();
    cy.get('.querystring-widget .fields').contains('Add criteria').click();
    cy.get(
      '.querystring-widget .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
    )
      .contains('Location')
      .click();
    //location absolute..
    cy.get(
      '.querystring-widget .fields:first-of-type .main-fields-wrapper .field:last-of-type',
    ).click();
    cy.get(
      '.querystring-widget .fields:first-of-type .main-fields-wrapper .field:last-of-type .react-select__menu .react-select__option',
    )
      .contains('Absolute path')
      .click();

    //insert absolute path
    cy.get('.querystring-widget .fields:first-of-type > .field input')
      .clear()
      .type('/my-page/my-folder');

    // verify if in list there's a page with name "Document within Folder"
    cy.get(`.block.listing .listing-body:first-of-type`).contains(
      'Document within Folder',
    );
    // verify if in list there isn't page with name "Document outside Folder"
    cy.get(`.block.listing .listing-body`)
      .contains('Document outside Folder')
      .should('not.exist');

    //save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    //test location absolute criteria after save
    cy.get('#page-document .listing-body:first-of-type').contains(
      'Document within Folder',
    );
    cy.get('#page-document .listing-body:first-of-type')
      .contains('Document outside Folder')
      .should('not.exist');
  });

  it('Listing block - Test Criteria: Location relative with some outside content', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.intercept('GET', '/**/my-page').as('content');
    cy.intercept('GET', '/**/@types/Document').as('schema');

    // Given we have two document about us, contact at portal route and two document in My Page
    // i.e News Item One and News Item Two
    cy.createContent({
      contentType: 'Document',
      contentId: 'about-us',
      contentTitle: 'about us',
      path: '/',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'contact',
      contentTitle: 'contact',
      path: '/',
    });

    cy.createContent({
      contentType: 'Document',
      contentId: 'news-item-one',
      contentTitle: 'News Item One',
      path: 'my-page',
    });

    cy.createContent({
      contentType: 'Document',
      contentId: 'news-item-two',
      contentTitle: 'News Item Two',
      path: 'my-page',
    });

    cy.navigate('/my-page');
    cy.wait('@content');

    cy.navigate('/my-page/edit');
    cy.wait('@schema');

    //add listing block
    cy.addNewBlock('listing');

    //********  add location criteria filter
    cy.get('.sidebar-container .tabs-wrapper .menu .item')
      .contains('Block')
      .click();
    cy.get('.querystring-widget .fields').contains('Add criteria').click();
    cy.get(
      '.querystring-widget .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
    )
      .contains('Location')
      .click();
    //location relative..
    cy.get(
      '.querystring-widget .fields:first-of-type .main-fields-wrapper .field:last-of-type',
    ).click();
    cy.get(
      '.querystring-widget .fields:first-of-type .main-fields-wrapper .field:last-of-type .react-select__menu .react-select__option',
    )
      .contains('Relative path')
      .click();

    //insert relative path
    cy.get('.querystring-widget .fields:first-of-type > .field input')
      .clear()
      .type('.');

    // verify if in list there's a page with name "Document within Folder"
    cy.get(`.block.listing .listing-body:first-of-type`).contains(
      'News Item One',
    );
    // verify if in list there isn't page with name "Document outside Folder"
    cy.get(`.block.listing .listing-body`)
      .contains('about us')
      .should('not.exist');

    // save;
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    //test location relative criteria after save
    cy.get(`.block.listing .listing-body:first-of-type`).contains(
      'News Item One',
    );
    cy.get(`.block.listing .listing-body`)
      .contains('about us')
      .should('not.exist');
  });

  it('Listing block: respect batching and limits', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.intercept('GET', '/**/my-page').as('content');
    cy.intercept('GET', '/**/@types/Document').as('schema');

    cy.createContent({
      contentType: 'Document',
      contentId: 'my-folder',
      contentTitle: 'My Folder',
      path: 'my-page',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-folder2',
      contentTitle: 'My Folder 2',
      path: 'my-page',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-folder3',
      contentTitle: 'My Folder 3',
      path: 'my-page',
    });

    cy.navigate('/my-page');
    cy.wait('@content');

    cy.navigate('/my-page/edit');
    cy.wait('@schema');

    cy.clearSlateTitle().type('Listing block - respect batching and limits');

    //add listing block
    cy.addNewBlock('listing');

    //verify before save
    cy.get(`.block.listing .listing-body:first-of-type`).contains('My Folder');

    cy.get('.sidebar-container .tabs-wrapper .menu .item')
      .contains('Block')
      .click();
    cy.get('.querystring-widget .fields').contains('Add criteria').click();
    cy.get(
      '.querystring-widget .fields:first-of-type .field:first-of-type .react-select__menu .react-select__option',
    )
      .contains('Type')
      .click();

    //insert Page
    cy.get('.querystring-widget .fields:first-of-type > .field').click();
    cy.get(
      '.querystring-widget .fields:first-of-type > .field .react-select__menu .react-select__option',
    )
      .contains('Page')
      .click();

    cy.get('#field-limit-3-querystring').click().type('2');

    //save
    cy.get('#toolbar-save').click();
    cy.wait('@save');
    cy.wait('@content');

    //test after save
    cy.get('#page-document .listing-item:first-of-type a').should(
      'have.attr',
      'href',
      '/my-page/my-folder',
    );
    cy.get('.listing-item').should(($els) => {
      expect($els).to.have.length(2);
    });

    cy.navigate('/my-page/edit');
    cy.wait('@schema');

    cy.get('.block-editor-listing').click();
    cy.get('.sidebar-container .tabs-wrapper .menu .item')
      .contains('Block')
      .click();

    cy.get('#field-limit-3-querystring').click().clear().type('0');
    cy.get('#field-b_size-4-querystring').click().type('2');
    cy.get('.ui.pagination.menu a[value="2"]').first().click();

    cy.get('.listing-item h4').first().contains('My Folder 3');
  });

  // it('Listing block - Test Criteria: Location Navigation', () => {
  //   /*not implemented because Navigation ui is not yet developed in Listing Block sidebar*/
  // });
});
