export function getIfExists(
  selector,
  successAction = () => {},
  failAction = () => {},
) {
  cy.get('body').then((body) => {
    if (body.find(selector).length > 0 && successAction) {
      successAction();
    } else if (failAction) {
      failAction();
    }
  });
}

export function getTextNode(el, match) {
  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  if (!match) {
    return walk.nextNode();
  }

  const nodes = [];
  let node;
  while ((node = walk.nextNode())) {
    if (node.wholeText.includes(match)) {
      return node;
    }
  }
}

export function setBaseAndExtent(...args) {
  const document = args[0].ownerDocument;
  document.getSelection().removeAllRanges();
  document.getSelection().setBaseAndExtent(...args);
}

export function createHtmlPasteEvent(htmlContent) {
  return Object.assign(
    new Event('paste', { bubbles: true, cancelable: true }),
    {
      clipboardData: {
        getData: () => htmlContent,
        types: ['text/html'],
      },
    },
  );
}
