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

    cy.visit('/document-linked/links-to-item');
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

    cy.visit('/news-item-linked/links-to-item');
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

    cy.visit('/event-linked/links-to-item');
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

    cy.visit('/file-linked/links-to-item');
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

    cy.visit('/image-linked/links-to-item');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').contains(
      'Document that is linking an Image',
    );
  });

  it('As editor I can see on what content items a Link is referenced in the richtext', () => {
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

    cy.visit('/link-linked/links-to-item');
    cy.get('tbody > :nth-child(2) > :nth-child(1)').contains(
      'Document that is linking a Link',
    );
  });
});
