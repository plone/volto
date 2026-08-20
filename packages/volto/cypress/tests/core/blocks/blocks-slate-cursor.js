describe('Slate cursor position Tests', () => {
  const EDITABLE = '.content-area .slate-editor [contenteditable=true]';
  const BLOCK = '.block.slate';
  const TEXT = 'The quick brown fox jumps over the lazy dog';

  beforeEach(() => {
    cy.intercept('GET', `/**/*?expand*`).as('content');
    cy.intercept('GET', '/**/Document').as('schema');
    // given a logged in editor and a page in edit mode
    cy.autologin();
    cy.createContent({
      contentType: 'Document',
      contentId: 'my-page',
      contentTitle: 'My Page',
      bodyModifier: (body) => ({
        ...body,
        blocks: {
          'block-1': {
            '@type': 'slate',
            value: [{ type: 'p', children: [{ text: 'ab' }] }],
          },
          'block-2': {
            '@type': 'slate',
            value: [{ type: 'p', children: [{ text: 'abc' }] }],
          },
          'block-3': {
            '@type': 'slate',
            value: [{ type: 'p', children: [{ text: 'ab' }] }],
          },
          'block-4': {
            '@type': 'slate',
            value: [{ type: 'p', children: [{ text: TEXT }] }],
          },
        },
        blocks_layout: {
          items: ['block-1', 'block-2', 'block-3', 'block-4'],
        },
      }),
    });
    cy.visit('/');
    cy.wait('@content');

    cy.navigate('/my-page/edit');
    cy.wait('@schema');
  });

  const getEndOfTextCoordinates = (editable) => {
    const walker = document.createTreeWalker(editable, NodeFilter.SHOW_TEXT);
    let textNode;
    while (walker.nextNode()) {
      if (walker.currentNode.textContent === TEXT) {
        textNode = walker.currentNode;
        break;
      }
    }
    expect(
      Boolean(textNode),
      'text node of the last block to be found',
    ).to.equal(true);
    const range = document.createRange();
    range.setStart(textNode, textNode.textContent.length - 1);
    range.setEnd(textNode, textNode.textContent.length);
    const rect = range.getClientRects()[0];
    const editableRect = editable.getBoundingClientRect();
    return {
      x: rect.right - editableRect.left - 1,
      y: rect.top - editableRect.top + rect.height / 2,
    };
  };

  const interactAtEndOfLastTextBlock = (interaction) => {
    cy.get(EDITABLE)
      .last()
      .scrollIntoView({ block: 'center' })
      .then(($editable) => {
        const { x, y } = getEndOfTextCoordinates($editable[0]);
        interaction($editable, x, y);
      });
  };

  it('does not select the slate block on mouse down', () => {
    // when I press the mouse button down at the very end of the text
    interactAtEndOfLastTextBlock(($editable, x, y) =>
      cy.wrap($editable).realMouseDown({ x, y }),
    );

    // then the block should not be selected while the button is held
    cy.get(BLOCK).last().should('not.have.class', 'selected');

    // when I release the mouse button
    cy.get(EDITABLE).last().realMouseUp();

    // then the block should be selected and the cursor at the end
    cy.get(BLOCK).last().should('have.class', 'selected');
  });

  it('keeps the cursor at the click position when clicking at the end of a slate block', () => {
    // when I click at the very end of the text
    interactAtEndOfLastTextBlock(($editable, x, y) =>
      cy.wrap($editable).click(x, y),
    );

    // then the block should be selected and the cursor should stay at the end
    cy.get(BLOCK).last().should('have.class', 'selected');

    cy.window().then((win) => {
      const range = win.getSelection().getRangeAt(0);
      const anchor = range.startContainer;
      const offset =
        anchor.nodeType === Node.TEXT_NODE ? range.startOffset : -1;
      expect(offset, `cursor offset ${offset} to stay at the end`).to.equal(
        TEXT.length,
      );
    });
  });
});
