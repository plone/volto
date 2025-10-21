Cypress.Commands.add('selectAllContents', () => {
  cy.get(
    '.contents-table-wrapper > table > thead > tr > th:nth-child(2)',
  ).click();
  cy.get('.dropdown-popup > div > div ').contains('All').click();
});

describe('Modal View for different content types', () => {
  const subpathPrefix = Cypress.env('subpathPrefix') || '';
  const simpleSlateLink = (target) => {
    return {
      '@type': 'slate',
      plaintext: ' My Link ',
      value: [
        {
          children: [
            {
              text: '',
            },
            {
              children: [
                {
                  text: 'My Link',
                },
              ],
              data: {
                url: target,
              },
              type: 'link',
            },
            {
              text: '',
            },
          ],
          type: 'p',
        },
      ],
    };
  };
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');
  });
  it('As editor I get a warning on deleting my page when my page is referenced in the richtext', () => {
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Document that is linked',
      contentId: 'document-linked',
    });
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Document that is linking a document',
      contentId: 'document-linking',
      bodyModifier(body) {
        body.blocks['abc'] = simpleSlateLink('/document-linked');
        body.blocks_layout.items.push('abc');
        return body;
      },
    });
    cy.visit('/contents');
    cy.get('[aria-label="/document-linked"] > :nth-child(2)').click();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.get(`li > [href="${subpathPrefix}/document-linked"]`);
  });
  it('As editor I get a warning on deleting my page when my News-Item is referenced in the richtext', () => {
    cy.createContent({
      contentType: 'News Item',
      contentTitle: 'News Item that is linked',
      contentId: 'news-item-linked',
    });
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Document that is linking a News Item',
      contentId: 'document-linking',
      bodyModifier(body) {
        body.blocks['abc'] = simpleSlateLink('/news-item-linked');
        body.blocks_layout.items.push('abc');
        return body;
      },
    });
    //Test if link appears in links and references view
    cy.visit('/contents');
    cy.get('[aria-label="/news-item-linked"] > :nth-child(2)').click();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.get(`li > [href="${subpathPrefix}/news-item-linked"]`);
  });
  it('As editor I get a warning on deleting my page when my Event is referenced in the richtext', () => {
    cy.createContent({
      contentType: 'Event',
      contentTitle: 'Event that is linked',
      contentId: 'event-linked',
    });
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Document that is linking an Event',
      contentId: 'document-linking',
      bodyModifier(body) {
        body.blocks['abc'] = simpleSlateLink('/event-linked');
        body.blocks_layout.items.push('abc');
        return body;
      },
    });
    //Test if link appears in links and references view
    cy.visit('/contents');
    cy.get('[aria-label="/event-linked"] > :nth-child(2)').click();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.get(`li > [href="${subpathPrefix}/event-linked"]`);
  });
  it('As editor I get a warning on deleting my page when my File is referenced in the richtext', () => {
    cy.createContent({
      contentType: 'File',
      contentTitle: 'File that is linked',
      contentId: 'file-linked',
    });
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Document that is linking a File',
      contentId: 'document-linking',
      bodyModifier(body) {
        body.blocks['abc'] = simpleSlateLink('/file-linked');
        body.blocks_layout.items.push('abc');
        return body;
      },
    });
    //Test if link appears in links and references view
    cy.visit('/contents');
    cy.get('[aria-label="/file-linked"] > :nth-child(2)').click();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.get(`li > [href="${subpathPrefix}/file-linked"]`);
  });
  it('As editor I get a warning on deleting my page when my Image is referenced in the richtext', () => {
    cy.createContent({
      contentType: 'Image',
      contentTitle: 'Image that is linked',
      contentId: 'image-linked',
    });
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Document that is linking an Image',
      contentId: 'document-linking',
      bodyModifier(body) {
        body.blocks['abc'] = simpleSlateLink('/image-linked');
        body.blocks_layout.items.push('abc');
        return body;
      },
    });
    //Test if link appears in links and references view
    cy.visit('/contents');
    cy.get('[aria-label="/image-linked"] > :nth-child(2)').click();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.get(`li > [href="${subpathPrefix}/image-linked"]`);
  });
  it('As editor I get a warning on deleting my page when my Link is referenced in the richtext', () => {
    //Test Setup
    cy.createContent({
      contentType: 'Link',
      contentTitle: 'Link that is linked',
      contentId: 'link-linked',
      bodyModifier(body) {
        body.remoteUrl = 'https://plone.org';
        return body;
      },
    });
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Document that is linking a Link',
      contentId: 'document-linking',
      bodyModifier(body) {
        body.blocks['abc'] = simpleSlateLink('/link-linked');
        body.blocks_layout.items.push('abc');
        return body;
      },
    });
    //Test if link appears in links and references view
    cy.visit('/contents');
    cy.get('[aria-label="/link-linked"] > :nth-child(2)').click();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.get(`li > [href="${subpathPrefix}/link-linked"]`);
  });
});
describe('Test if different forms of Linking content appear in Delete Modal View', () => {
  const subpathPrefix = Cypress.env('subpathPrefix') || '';
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');
  });
  it('As editor I get a warning on deleting my page when my Document is referenced in the Teaser Block', () => {
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Document that is linked',
      contentId: 'document-linked',
    });
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Document that is linking via teaser block',
      contentId: 'document-linking',
      bodyModifier(body) {
        body.blocks['abc'] = {
          '@type': 'teaser',
          description: '',
          href: [
            {
              '@id': '/document-linked',
              '@type': 'Document',
              Description: '',
              Title: 'Document linked',
              effective: '2023-08-14T22:00:42+00:00',
              getObjSize: '0 KB',
              hasPreviewImage: null,
              head_title: null,
              image_field: '',
              mime_type: 'text/plain',
              title: 'Document linked',
            },
          ],
          title: 'Document linked',
        };
        body.blocks_layout.items.push('abc');
        return body;
      },
    });
    cy.visit('/contents');
    cy.get('[aria-label="/document-linked"] > :nth-child(2)').click();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.get(`li > [href="${subpathPrefix}/document-linked"]`);
  });
  it('As editor I get a warning on deleting my page when my Image is referenced in the Teaser Block', () => {
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Document that is linked',
      contentId: 'document-linked',
    });
    cy.createContent({
      contentType: 'Image',
      contentTitle: 'Image that is linked',
      contentId: 'image-linked',
    });
    // TODO: get the content creation with image override to work here
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Document that is linking via teaser block',
      contentId: 'document-linking',
      bodyModifier(body) {
        body.blocks['abc'] = {
          '@type': 'teaser',
          description: '',
          href: [
            {
              '@id': '/document-linked',
              '@type': 'Document',
              Description: '',
              Title: 'Document linked',
              effective: '2023-08-14T22:00:42+00:00',
              getObjSize: '0 KB',
              hasPreviewImage: true,
              head_title: null,
              image_field: 'image',
              mime_type: 'text/plain',
              title: 'Document linked',
              // preview_image: [
              //   {
              //     '@id': '/image-linked',
              //     '@type': 'Image',
              //     image_field: 'image',
              //     Title: 'Image linked',
              //     Type: 'Image',
              //   },
              // ],
            },
          ],
          title: 'Document linking',
        };
        body.blocks_layout.items.push('abc');
        return body;
      },
    });
    cy.visit('document-linking/edit');
    cy.get('.block.teaser .content').click();
    cy.get(
      '.field-wrapper-preview_image > .grid > .stretched > .eight > .objectbrowser-field > .button',
    ).click();
    cy.get('.raised > .secondary > .ui > :nth-child(1)').click();
    cy.get('[aria-label="Select Image that is linked"]').click();
    cy.get('#toolbar-save').click();
    cy.visit('/contents');
    cy.get('[aria-label="/document-linked"] > :nth-child(2)').click();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.get(`li > [href="${subpathPrefix}/document-linked"]`);
  });
  it('As editor I get a warning on deleting my Document when my Image is referenced via Image Block', () => {
    cy.createContent({
      contentType: 'Image',
      contentTitle: 'Image that is linked',
      contentId: 'image-linked',
    });
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Document that is linking via image block',
      contentId: 'document-linking',
      bodyModifier(body) {
        body.blocks['abc'] = {
          '@type': 'image',
          alt: 'Image that is linked',
          image_field: 'image',
          url: '/image-linked',
        };
        body.blocks_layout.items.push('abc');
        return body;
      },
    });
    cy.visit('/contents');
    cy.get('[aria-label="/image-linked"] > :nth-child(2)').click();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.get(`li > [href="${subpathPrefix}/image-linked"]`);
  });
  it('As editor I get a warning on deleting my Image when my Image is referenced in the Image Block', () => {
    cy.createContent({
      contentType: 'Image',
      contentTitle: 'Image that is linked',
      contentId: 'image-linked',
    });
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Document that is linked',
      contentId: 'document-linked',
    });
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Document that is linking via image block',
      contentId: 'document-linking',
      bodyModifier(body) {
        body.blocks['abc'] = {
          '@type': 'image',
          alt: 'Image that is linked',
          image_field: 'image',
          url: '/image-linked',
          href: [
            {
              '@id': 'document-linked',
              Title: 'Document linked in image block',
            },
          ],
        };
        body.blocks_layout.items.push('abc');
        return body;
      },
    });
    cy.visit('/contents');
    cy.get('[aria-label="/document-linked"] > :nth-child(2)').click();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.get(`li > [href="${subpathPrefix}/document-linked"]`);
  });
  it('As an Editor I get a warning on deleting my document when it is linked somewhere via teaser block inside a grid block', () => {
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Document that is linked',
      contentId: 'document-linked',
    });
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Document that is linking via teaser block in grid',
      contentId: 'document-linking',
      bodyModifier(body) {
        body.blocks['abc'] = {
          '@type': 'gridBlock',
          blocks: {
            xyz: {
              '@type': 'teaser',
              description: 'linked',
              styles: {
                align: 'left',
              },
              href: [
                {
                  '@id': '/document-linked',
                  '@type': 'Document',
                  Description: '',
                  Title: 'Document linked',
                  effective: '2023-08-14T22:00:42+00:00',
                  getObjSize: '0 KB',
                  hasPreviewImage: null,
                  head_title: null,
                  image_field: '',
                  mime_type: 'text/plain',
                  title: 'Document linked',
                },
              ],
              title: 'Document linked',
            },
          },
          blocks_layout: {
            items: ['xyz'],
          },
        };
        body.blocks_layout.items.push('abc');
        return body;
      },
    });
    cy.visit('/contents');
    cy.get('[aria-label="/document-linked"] > :nth-child(2)').click();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.get(`li > [href="${subpathPrefix}/document-linked"]`);
  });
});
describe('Contents Delete Modal - selected items info and confirmation messages', () => {
  const subpathPrefix = Cypress.env('subpathPrefix') || '';
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');
    cy.createContent({
      contentType: 'Document',
      contentTitle: `Test Delete Modal`,
      contentId: `teste-delete-modal`,
    });
  });

  it('Select all items on current page with more than one page (over 50 items), should show pagination message', () => {
    // Create 55 documents to ensure more than one page
    for (let i = 0; i < 55; i++) {
      cy.createContent({
        contentType: 'Document',
        contentTitle: `Doc ${i + 1}`,
        contentId: `doc-${i + 1}`,
        path: '/teste-delete-modal',
      });
    }
    cy.visit('/teste-delete-modal/contents');
    cy.selectAllContents();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.contains(
      'You are about to delete all items in the current pagination of this folder.',
    ).should('be.visible');
  });

  it('Select all items when there is less than one page, should show folder message', () => {
    // Create 5 documents
    for (let i = 0; i < 5; i++) {
      cy.createContent({
        contentType: 'Document',
        contentTitle: `Doc ${i + 1}`,
        contentId: `doc2-${i + 1}`,
        path: '/teste-delete-modal',
      });
    }
    cy.visit('/teste-delete-modal/contents');
    cy.selectAllContents();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.contains(
      'You are about to delete all items and all its subitems.',
    ).should('be.visible');
  });

  it('Select all items using ALL pagination, should show folder message', () => {
    // Create 60 documents
    for (let i = 0; i < 60; i++) {
      cy.createContent({
        contentType: 'Document',
        contentTitle: `Doc ${i + 1}`,
        contentId: `doc3-${i + 1}`,
        path: '/teste-delete-modal',
      });
    }
    cy.visit('/teste-delete-modal/contents');
    cy.get('.contents-pagination .right.menu a.item').contains('All').click();
    cy.selectAllContents();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.contains(
      'You are about to delete all items and all its subitems.',
    ).should('be.visible');
  });

  it('Select one item to delete, should show the item in the list with link', () => {
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Single Doc',
      contentId: 'single-doc',
      path: '/teste-delete-modal',
    });
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Second Doc',
      contentId: 'second-doc',
      path: '/teste-delete-modal',
    });
    cy.visit('/teste-delete-modal/contents');
    cy.get(
      '[aria-label="/teste-delete-modal/single-doc"] > :nth-child(2)',
    ).click();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.get(
      `li > [href="${subpathPrefix}/teste-delete-modal/single-doc"]`,
    ).should('be.visible');
  });

  it('Select 3 items to delete (with more than 3 in total), should show the selected items in the list with links', () => {
    // Create 6 documents
    for (let i = 0; i < 6; i++) {
      cy.createContent({
        contentType: 'Document',
        contentTitle: `Doc ${i + 1}`,
        contentId: `doc5-${i + 1}`,
        path: '/teste-delete-modal',
      });
    }
    cy.visit('/teste-delete-modal/contents');
    // Select 3 items
    cy.get(`[aria-label="/teste-delete-modal/doc5-1"] > :nth-child(2)`).click();
    cy.get(`[aria-label="/teste-delete-modal/doc5-2"] > :nth-child(2)`).click();
    cy.get(`[aria-label="/teste-delete-modal/doc5-3"] > :nth-child(2)`).click();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.get(`li > [href="${subpathPrefix}/teste-delete-modal/doc5-1"]`).should(
      'be.visible',
    );
    cy.get(`li > [href="${subpathPrefix}/teste-delete-modal/doc5-2"]`).should(
      'be.visible',
    );
    cy.get(`li > [href="${subpathPrefix}/teste-delete-modal/doc5-3"]`).should(
      'be.visible',
    );
  });
});

describe('Contents Delete Modal - link integrity info', () => {
  const simpleSlateLink = (target) => {
    return {
      '@type': 'slate',
      plaintext: ' My Link ',
      value: [
        {
          children: [
            {
              text: '',
            },
            {
              children: [
                {
                  text: 'My Link',
                },
              ],
              data: {
                url: target,
              },
              type: 'link',
            },
            {
              text: '',
            },
          ],
          type: 'p',
        },
      ],
    };
  };
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');
    cy.createContent({
      contentType: 'Document',
      contentTitle: `Test Delete Modal`,
      contentId: `teste-delete-modal`,
    });
  });

  it('Show link integrity check results', () => {
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'First Doc',
      contentId: 'first-doc',
      path: '/teste-delete-modal',
    });
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Second Doc',
      contentId: 'second-doc',
      path: '/teste-delete-modal',
      bodyModifier(body) {
        body.blocks['abc'] = simpleSlateLink('/teste-delete-modal/first-doc');
        body.blocks_layout.items.push('abc');
        return body;
      },
    });
    cy.visit('/teste-delete-modal/second-doc');
    cy.visit('/teste-delete-modal/contents');
    cy.get(
      '[aria-label="/teste-delete-modal/first-doc"] > :nth-child(2)',
    ).click();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.contains(/Second Doc.*refers to:.*First Doc/).should('be.visible');
  });

  it('Show message that subitems will be deleted (delete one item)', () => {
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'First Doc',
      contentId: 'first-doc',
      path: '/teste-delete-modal',
    });
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Second Doc',
      contentId: 'second-doc',
      path: '/teste-delete-modal/first-doc',
    });
    cy.visit('/teste-delete-modal/contents');
    cy.get(
      '[aria-label="/teste-delete-modal/first-doc"] > :nth-child(2)',
    ).click();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.contains(
      'This item contains subitems. Deleting it will also delete its 1 item inside.',
    ).should('be.visible');
  });

  it('Show message that subitems will be deleted (delete multiple items)', () => {
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'First Doc',
      contentId: 'first-doc',
      path: '/teste-delete-modal',
    });
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Second Doc',
      contentId: 'second-doc',
      path: '/teste-delete-modal/first-doc',
    });
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'Third Doc',
      contentId: 'third-doc',
      path: '/teste-delete-modal',
    });
    cy.visit('/teste-delete-modal/contents');
    cy.selectAllContents();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.contains(
      'Some items contain subitems. Deleting them will also delete their 1 item inside.',
    ).should('be.visible');
  });
});
