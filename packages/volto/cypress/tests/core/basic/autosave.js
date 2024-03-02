describe('createContent Tests', () => {
  beforeEach(() => {
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'comments-page',
      contentTitle: 'Comments Page',
      allow_discussion: true,
    });
    cy.setRegistry(
      'plone.app.discussion.interfaces.IDiscussionSettings.globally_enabled',
      true,
    );
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-first-page',
      contentTitle: 'My First Page',
    });
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-second-page',
      contentTitle: 'My Second Page',
    });
  });

  it('As editor I can autosave when editing a content item', () => {
    cy.visit('/my-first-page');

    cy.log('adding a text block on the first page');

    cy.navigate('/my-first-page/edit');
    cy.getSlateEditorAndType('My first text').contains('My first text');
    cy.wait(1000);

    cy.visit('/my-second-page');

    cy.log('adding a text block on the second page');
    cy.navigate('/my-second-page/edit');

    cy.getSlateEditorAndType('My second text').contains('My second text');
    cy.wait(1000);

    cy.log('visit first page and start editing');

    cy.visit('/my-first-page');
    cy.navigate('/my-first-page/edit');
    cy.wait(1000);

    cy.findByRole('alert')
      .get('.toast-inner-content')
      .contains('Autosaved content found')
      .get('button.ui.icon.button.save.toast-box')
      .eq(0)
      .click();

    cy.wait(1000);

    cy.getSlate().contains('My first text');

    cy.log('visit second page and start editing');

    cy.visit('/my-second-page');
    cy.navigate('/my-second-page/edit');
    cy.wait(1000);

    cy.findByRole('alert')
      .get('.toast-inner-content')
      .contains('Autosaved content found')
      .get('button.ui.icon.button.save.toast-box')
      .eq(0)
      .click();

    cy.wait(1000);

    cy.getSlate().contains('My second text');
    cy.reload();

    cy.log(
      'test is cancel load data will delete from storage (toast does not show)',
    );
    cy.findByRole('alert')
      .get('.toast-inner-content')
      .contains('Autosaved content found')
      .get('button.ui.icon.button.save.toast-box')
      .eq(1)
      .click();

    cy.wait(1000);
    cy.reload();

    cy.wait(1000);

    cy.contains('Autosaved content found').should('not.exist');
  });

  it('As editor I can autosave when adding a content item', function () {
    cy.visit('/');

    cy.log(
      'adding a Document content type and refresh to verify if content is autosaved and retrieved',
    );
    cy.get('#toolbar-add').click().get('#toolbar-add-document').click();
    cy.getSlateTitle().type('Page 1 title');
    cy.getSlateEditorAndType('Page 1 content').contains('Page 1 content');
    cy.wait(1000);
    cy.reload();

    cy.log('test if autosaved toast shows retrieved data and click OK to load');
    cy.findByRole('alert')
      .get('.toast-inner-content')
      .contains('Autosaved content found')
      .get('button.ui.icon.button.save.toast-box')
      .eq(0)
      .click();

    cy.wait(1000);

    cy.log('test if autosaved data is loaded');
    cy.getSlateTitle().contains('Page 1 title');
    cy.getSlate().contains('Page 1 content');

    cy.log(
      'test if draft is autosaved after I cancel adding a new page content type',
    );

    cy.get('button.button.cancel').click();

    cy.wait(1000);

    cy.get('#toolbar-add').click().get('#toolbar-add-document').click();

    cy.findByRole('alert')
      .get('.toast-inner-content')
      .contains('Autosaved content found')
      .get('button.ui.icon.button.save.toast-box')
      .eq(0)
      .click();

    cy.wait(1000);
    cy.getSlateTitle().contains('Page 1 title');
    cy.getSlate().contains('Page 1 content');

    cy.wait(1000);

    cy.log('test if page content type is added as new page after Toolbar Save');

    cy.get('#toolbar-save').focus().click();
    cy.wait(2000);
    cy.contains('Page 1 title');
    cy.wait(1000);

    cy.log('test draft is deleted from local storage after save');

    cy.visit('/');
    cy.get('#toolbar-add').click().get('#toolbar-add-document').click();

    cy.wait(1000);

    cy.contains('Autosaved content found').should('not.exist');
  });

  it('As editor I can autosave comments', function () {
    cy.log('adding a comment and refresh,');
    cy.visit('/comments-page');
    cy.get('textarea[id="field-comment"]').clear().type('This is a comment');
    cy.wait(1000);
    cy.reload();

    cy.log('test if comment is retrieved from local storage');

    cy.findByRole('alert')
      .get('.toast-inner-content')
      .contains('Autosaved content found')
      .get('button.ui.icon.button.save.toast-box')
      .eq(0)
      .click();

    cy.get('#field-comment').contains('This is a comment');

    cy.wait(1000);
    cy.reload();

    cy.log(
      'test if comment is deleted from local storage after selecting Cancel in the Autosave toast',
    );

    cy.findByRole('alert')
      .get('.toast-inner-content')
      .contains('Autosaved content found')
      .get('button.ui.icon.button.save.toast-box')
      .eq(1)
      .click();

    cy.wait(1000);
    cy.reload();
    cy.contains('Autosaved content found').should('not.exist');

    cy.log('adding another comment and save it');

    cy.get('textarea[id="field-comment"]')
      .clear()
      .type('This is a another comment');
    cy.wait(1000);
    cy.reload();

    cy.findByRole('alert')
      .get('.toast-inner-content')
      .contains('Autosaved content found')
      .get('button.ui.icon.button.save.toast-box')
      .eq(0)
      .click();

    cy.wait(1000);

    cy.get('button[type="submit"').click();

    cy.get('.comment').contains('This is a another comment');

    cy.log('test if the local storage comment was deleted after submit');

    cy.wait(1000);
    cy.reload();
    cy.contains('Autosaved content found').should('not.exist');
  });
});
