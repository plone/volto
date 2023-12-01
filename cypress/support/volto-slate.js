export const slateBeforeEach = (contentType = 'Document') => {
  cy.intercept('GET', `/**/*?expand*`).as('content');
  cy.autologin();
  cy.createContent({
    contentType: contentType,
    contentId: 'my-page',
    contentTitle: 'My Page',
  });
  cy.visit('/my-page');
  cy.wait('@content');

  cy.navigate('/my-page/edit');
  cy.wait('@content');
};

export const getSelectedSlateEditor = () => {
  return cy.get('.slate-editor.selected [contenteditable=true]').click();
};

export const createSlateBlock = () => {
  cy.get('.ui.basic.icon.button.block-add-button').first().click();
  cy.get('.blocks-chooser .title').contains('Text').click();
  cy.get('.ui.basic.icon.button.slate').contains('Text').click();
  return getSelectedSlateEditor();
};

export const getSlateBlockValue = (sb) => {
  return sb.invoke('attr', 'data-slate-value').then((str) => {
    return typeof str === 'undefined' ? [] : JSON.parse(str);
  });
};

export const createSlateBlockWithList = ({
  numbered,
  firstItemText,
  secondItemText,
}) => {
  let s1 = createSlateBlock();

  s1.typeInSlate(firstItemText + secondItemText);

  // select all contents of slate block
  // - this opens hovering toolbar
  cy.contains(firstItemText + secondItemText).then((el) => {
    selectSlateNodeOfWord(el);
  });

  // TODO: do not hardcode these selectors:
  if (numbered) {
    // this is the numbered list option in the hovering toolbar
    cy.get('.slate-inline-toolbar > :nth-child(9)').click();
  } else {
    // this is the bulleted list option in the hovering toolbar
    cy.get('.slate-inline-toolbar > :nth-child(10)').click();
  }

  // move the text cursor
  const sse = getSelectedSlateEditor();
  sse.type('{leftarrow}');
  for (let i = 0; i < firstItemText.length; ++i) {
    sse.type('{rightarrow}');
  }

  // simulate pressing Enter
  getSelectedSlateEditor().lineBreakInSlate();

  return s1;
};

export const selectSlateNodeOfWord = (el) => {
  return cy.window().then((win) => {
    var event = new CustomEvent('Test_SelectWord', {
      detail: el[0],
    });
    win.document.dispatchEvent(event);
  });
};
