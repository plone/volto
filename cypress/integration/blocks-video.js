if (Cypress.env('API') !== 'guillotina') {
  describe('Blocks Tests', () => {
    beforeEach(() => {
      // Wait a bit to previous teardown to complete correctly because Heisenbug in this point
      cy.wait(2000);
      cy.visit('/');
      cy.autologin();
      cy.createContent('Document', 'my-page', 'My Page');
      cy.visit('/my-page/edit');
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');
    });

    it('Add Video Block with YouTube Video', () => {
      // given a volto page
      cy.get(`.block.title [data-contents]`)
        .clear()
        .type('My title');

      // when I create a video block with a YouTube video
      cy.get('.block.inner.text .public-DraftEditor-content').click();
      cy.get('.ui.basic.icon.button.block-add-button').click();
      cy.get('.ui.basic.icon.button.video')
        .contains('Video')
        .click();
      cy.get('.toolbar-inner > .ui > input')
        .click()
        .type('https://youtu.be/T6J3d35oIAY')
        .type('{enter}');
      cy.get('#toolbar-save').click();
      cy.waitForResourceToLoad('@navigation');
      cy.waitForResourceToLoad('@breadcrumbs');
      cy.waitForResourceToLoad('@actions');
      cy.waitForResourceToLoad('@types');
      cy.waitForResourceToLoad('?fullobjects');

      // then the page view should contain an embedded YouTube video
      cy.get('.block.video iframe')
        .should('have.attr', 'src')
        .and('match', /\/\/www.youtube.com\/embed\/T6J3d35oIAY/);
    });

    it('Add Video Block with Vimeo Video', () => {
      // given a volto page
      cy.get(`.block.title [data-contents]`)
        .clear()
        .type('My title');

      // when I create a video block with a Vimeo video
      cy.get('.block.inner.text .public-DraftEditor-content').click();
      cy.get('.ui.basic.icon.button.block-add-button').click();
      cy.get('.ui.basic.icon.button.video')
        .contains('Video')
        .click();
      cy.get('.toolbar-inner > .ui > input')
        .click()
        .type('https://vimeo.com/85804536')
        .type('{enter}');
      cy.get('#toolbar-save').click();

      // then the page view should contain an embedded Vimeo video
      cy.get('.block.video iframe')
        .should('have.attr', 'src')
        .and('match', /\/\/player.vimeo.com\/video\/85804536/);
    });

    it('Add Video Block with MP4 Video', () => {
      // given a volto page
      cy.get(`.block.title [data-contents]`)
        .clear()
        .type('My title');

      // when I create a video block with an MP4 video
      cy.get('.block.inner.text .public-DraftEditor-content').click();
      cy.get('.ui.basic.icon.button.block-add-button').click();
      cy.get('.ui.basic.icon.button.video')
        .contains('Video')
        .click();
      cy.get('.toolbar-inner > .ui > input')
        .click()
        .type('https://1.videolyser.de/videos/1714848/11745228_hd.mp4')
        .type('{enter}');
      cy.get('#toolbar-save').click();

      // then the page view should contain an embedded MP4 video
      cy.get('.block.video video').should(
        'have.attr',
        'src',
        'https://1.videolyser.de/videos/1714848/11745228_hd.mp4',
      );
    });
  });
}
