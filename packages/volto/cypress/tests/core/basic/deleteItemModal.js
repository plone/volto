describe('Modal View for different content types', () => {
  let prefixPath;
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
    prefixPath = Cypress.env('prefixPath') || '';
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
    cy.get(`li > [href="${prefixPath}/document-linked"]`);
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
    cy.get(`li > [href="${prefixPath}/news-item-linked"]`);
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
    cy.get(`li > [href="${prefixPath}/event-linked"]`);
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
    cy.get(`li > [href="${prefixPath}/file-linked"]`);
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
    cy.get(`li > [href="${prefixPath}/image-linked"]`);
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
    cy.get(`li > [href="${prefixPath}/link-linked"]`);
  });
});
describe('Test if different forms of Linking content appear in Delete Modal View', () => {
  let prefixPath;
  beforeEach(() => {
    cy.autologin();
    cy.visit('/');
    prefixPath = Cypress.env('prefixPath') || '';
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
    cy.get(`li > [href="${prefixPath}/document-linked"]`);
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
    cy.get(`[aria-label="/document-linked"] > :nth-child(2)`).click();
    cy.get('[aria-label="Delete"]').click();
    cy.get('.medium > .header').should('be.visible');
    cy.get(`li > [href="${prefixPath}/document-linked"]`);
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
    cy.get(`li > [href="${prefixPath}/image-linked"]`);
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
    cy.get(`li > [href="${prefixPath}/document-linked"]`);
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
    cy.get(`li > [href="${prefixPath}/document-linked"]`);
  });
});
