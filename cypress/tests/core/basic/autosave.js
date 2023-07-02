describe('createContent Tests', () => {
  beforeEach(() => {
    cy.autologin();
    //   cy.setRegistry(
    //     'plone.app.discussion.interfaces.IDiscussionSettings.globally_enabled',
    //     true,
    //   );
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-first-page',
      contentTitle: 'My First Page',
      allow_discussion: true,
    });
    cy.createContent({
        contentType: 'Document',
        contentId: 'my-second-page',
        contentTitle: 'My Second Page',
      });
  });

  it('As editor I can add a text block', () => {
    cy.visit('/my-first-page');
    cy.waitForResourceToLoad('@navigation');
    cy.waitForResourceToLoad('@breadcrumbs');
    cy.waitForResourceToLoad('@actions');
    cy.waitForResourceToLoad('@types');
    cy.waitForResourceToLoad('my-first-page');
    cy.navigate('/my-first-page/edit');

    cy.log('when I add a text block on the first page');
    cy.getSlateEditorAndType('My first text').contains('My first text');


    cy.visit('/my-second-page');
    // cy.waitForResourceToLoad('@navigation');
    // cy.waitForResourceToLoad('@breadcrumbs');
    // cy.waitForResourceToLoad('@actions');
    // cy.waitForResourceToLoad('@types');
    // cy.waitForResourceToLoad('my-second-page');
    // cy.navigate('/my-second-page/edit');
    
    // cy.log('when I add a text block on the second page');
    // cy.getSlateEditorAndType('My second text').contains('My second text');

    cy.visit('/my-first-page');
    cy.navigate('/my-first-page/edit');
    cy.wait('@content');
    
    cy.findByRole('alert')
    .get('.toast-inner-content')
    .contains('Autosave found');
  });


//   it('As editor I can add a text block', function () {
//     cy.log('when I add a text block');
//     cy.getSlateEditorAndType('My text').contains('My text');
//     cy.toolbarSave();
//     cy.get('#page-document p').contains('My text');


    // //add listing block
    // cy.addNewBlock('listing');

    // cy.configureListingWith('News Item');


    //   cy.get('textarea[id="field-comment"]').clear().type('This is a comment!!!!');
    //   cy.get('button[type="submit"').click();
    //   cy.get('a[aria-label="Delete"]').should('have.text', 'Delete');
    //   cy.contains('This is a comment');
    //   cy.get('a[aria-label="Reply"]').click();
    //   cy.get('[id^="reply-place-"] textarea[id="field-comment"]')
    //     .clear()
    //     .type('This is a reply');
    //   cy.get('[id^="reply-place-"] button[type="submit"').click();
    //   cy.contains('This is a reply');
//   });
});
