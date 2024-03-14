describe('Link Integrity View for different content types', () => {
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
    cy.intercept('GET', `/**/@relations*`).as('relations');
    cy.autologin();
    cy.visit('/');
  });

  it('as editor I can access the Links and references View via the left toolbar', () => {
    cy.createContent({
      contentType: 'Document',
      contentTitle: 'My Document',
      contentId: 'my-document',
    });

    cy.visit('/my-document');
    cy.get('#toolbar-more').click();
    cy.findByText('Links and references').click();
    cy.get('.primary').contains('Content that links to or references');
  });

  it('As editor I can see on what content items my Page is referenced in the richtext', () => {
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

    //Test if link appears in links and references view
    cy.visit('/document-linked/links-to-item');
    cy.wait('@relations');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').contains(
      'Document that is linking a document',
    );
  });

  it('As editor I can see on what content items my News Item is referenced in the richtext', () => {
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
    cy.visit('/news-item-linked/links-to-item');
    cy.wait('@relations');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').contains(
      'Document that is linking a News Item',
    );
  });

  it('As editor I can see on what content items an event is referenced in the richtext', () => {
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
    cy.visit('/event-linked/links-to-item');
    cy.wait('@relations');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').contains(
      'Document that is linking an Event',
    );
  });

  it('As editor I can see on what content items a File is referenced in the richtext', () => {
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

    cy.visit('/file-linked/links-to-item');
    cy.wait('@relations');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').contains(
      'Document that is linking a File',
    );
  });

  it('As editor I can see on what content items a Image is referenced in the richtext', () => {
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

    cy.visit('/image-linked/links-to-item');
    cy.wait('@relations');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').contains(
      'Document that is linking an Image',
    );
  });

  it('As editor I can see on what content items a Link is referenced in the richtext', () => {
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
    cy.visit('/link-linked/links-to-item');
    cy.wait('@relations');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').contains(
      'Document that is linking a Link',
    );
  });
});

describe('Test if different forms of Linking content appear in links and references View', () => {
  beforeEach(() => {
    cy.intercept('GET', `/**/@relations*`).as('relations');
    cy.autologin();
    cy.visit('/');
  });

  it('As an Editor I can see if my document is linked somewhere via teaser block', () => {
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

    cy.visit('/document-linked/links-to-item');
    cy.wait('@relations');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').contains(
      'Document that is linking via teaser block',
    );
  });

  it('As an Editor I can see if my image is linked somewhere via override image in teaser block', () => {
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
              image_field: 'image',
              mime_type: 'text/plain',
              title: 'Document linked',
              // commented out as I was not able to get the image override to work from the function
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
          title: 'Document linked',
        };
        body.blocks_layout.items.push('abc');

        return body;
      },
    });
    // Manually adding the preview image override
    cy.visit('document-linking/edit');
    cy.get('.block.teaser .content').click();
    cy.get(
      '.field-wrapper-preview_image > .grid > .stretched > .eight > .objectbrowser-field > .button',
    ).click();
    cy.get('.raised > .secondary > .ui > :nth-child(1)').click();
    cy.get('[aria-label="Select Image that is linked"]').click();
    cy.get('#toolbar-save').click();

    cy.visit('/image-linked/links-to-item');
    cy.wait('@relations');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').contains(
      'Document that is linking via teaser block',
    );
  });

  it('As an Editor I can see if my image is linked somewhere via image block', () => {
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

    cy.visit('/image-linked/links-to-item');
    cy.wait('@relations');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').contains(
      'Document that is linking via image block',
    );
  });

  it('As an Editor I can see if my document is linked somewhere via link in image block', () => {
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

    cy.visit('/document-linked/links-to-item');
    cy.wait('@relations');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').contains(
      'Document that is linking via image block',
    );
  });

  it('As an Editor I can see if my document is linked somewhere via teaser block inside a grid block', () => {
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

    cy.visit('/document-linking');

    cy.visit('/document-linked/links-to-item');
    cy.wait('@relations');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').contains(
      'Document that is linking via teaser block',
    );
  });
});
