describe('Blocks Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/**/my-page/@types/*').as('schema');

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
    cy.wait('@schema');
  });

  it('Add Video Block with YouTube Video', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.intercept('GET', '/**/my-page').as('content');

    // when I create a video block with a YouTube video
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.video').contains('Video').click();
    cy.get('.toolbar-inner > .ui > input')
      .click()
      .type('https://youtu.be/T6J3d35oIAY')
      .type('{enter}');
    cy.get('#toolbar-save').click();

    cy.wait('@save');
    cy.wait('@content');

    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then the page view should contain an embedded YouTube video
    cy.get('.block.video img.placeholder')
      .should('have.attr', 'src')
      .and('match', /\/\/img.youtube.com\/vi\/T6J3d35oIAY\/sddefault.jpg/);
  });

  it('Add Video Block with YouTube Video and Placeholder', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.intercept('GET', '/**/my-page').as('content');

    // when I create a video block with a YouTube video
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.video').contains('Video').click();
    cy.get('.toolbar-inner > .ui > input')
      .click()
      .type('https://youtu.be/T6J3d35oIAY')
      .type('{enter}');
    cy.get(' #field-preview_image')
      .last()
      .click()
      .type('https://github.com/plone/volto/raw/main/logos/volto-colorful.png');
    cy.get('#toolbar-save').click();

    cy.wait('@save');
    cy.wait('@content');

    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then the page view should contain an embedded YouTube video
    cy.get('.block.video img.placeholder')
      .should('have.attr', 'src')
      .and(
        'match',
        /https:\/\/github.com\/plone\/volto\/raw\/main\/logos\/volto-colorful.png/,
      );
  });

  it('Add Video Block with Vimeo Video', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.intercept('GET', '/**/my-page').as('content');

    // when I create a video block with a Vimeo video
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.video').contains('Video').click();
    cy.get('.toolbar-inner > .ui > input')
      .click()
      .type('https://vimeo.com/85804536')
      .type('{enter}');
    cy.get('#toolbar-save').click();

    cy.wait('@save');
    cy.wait('@content');

    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then the page view should contain an embedded Vimeo video
    cy.get('.block.video img.placeholder')
      .should('have.attr', 'src')
      .and('match', /\/\/vumbnail.com\/85804536.jpg/);
  });

  it('Add Video Block with MP4 Video', () => {
    cy.intercept('PATCH', '/**/my-page').as('save');
    cy.intercept('GET', '/**/my-page').as('content');

    // when I create a video block with an MP4 video
    cy.getSlate().click();
    cy.get('.ui.basic.icon.button.block-add-button').click();
    cy.get('.ui.basic.icon.button.video').contains('Video').click();
    cy.get('.toolbar-inner > .ui > input')
      .click()
      .type('https://1.videolyser.de/videos/1714848/11745228_hd.mp4')
      .type('{enter}');
    cy.get('#toolbar-save').click();

    cy.wait('@save');
    cy.wait('@content');

    cy.url().should('eq', Cypress.config().baseUrl + '/my-page');

    // then the page view should contain an embedded MP4 video
    cy.get('.block.video video').should(
      'have.attr',
      'src',
      'https://1.videolyser.de/videos/1714848/11745228_hd.mp4',
    );
  });
});
