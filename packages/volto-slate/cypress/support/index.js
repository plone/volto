// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
// Alternatively you can use CommonJS syntax:
// require('./commands')

/* coverage-start
//Generate code-coverage
import '@cypress/code-coverage/support';
coverage-end */

export const slateBeforeEach = (contentType = 'Document') => {
  cy.autologin();
  cy.createContent({
    contentType: 'Folder',
    contentId: 'cypress',
    contentTitle: 'Cypress',
  });
  cy.createContent({
    contentType: contentType,
    contentId: 'my-page',
    contentTitle: 'My Page',
    path: 'cypress',
  });
  cy.visit('/cypress/my-page');
  cy.waitForResourceToLoad('@navigation');
  cy.waitForResourceToLoad('@breadcrumbs');
  cy.waitForResourceToLoad('@actions');
  cy.waitForResourceToLoad('@types');
  cy.waitForResourceToLoad('my-page');
  cy.navigate('/cypress/my-page/edit');
};

export const slateAfterEach = () => {
  cy.autologin();
  cy.removeContent('cypress');
};

export const slateJsonBeforeEach = (contentType = 'slate') => {
  cy.autologin();
  cy.addContentType(contentType);
  cy.addSlateJSONField(contentType, 'slate');
  slateBeforeEach(contentType);
};

export const slateJsonAfterEach = (contentType = 'slate') => {
  cy.autologin();
  cy.removeContentType(contentType);
  slateAfterEach();
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
