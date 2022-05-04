/* eslint no-console: ["error", { allow: ["log"] }] */

// --- AUTOLOGIN -------------------------------------------------------------
Cypress.Commands.add('autologin', () => {
  let api_url, user, password;
  api_url = Cypress.env('API_PATH') || 'http://localhost:8080/Plone';
  user = 'admin';
  password = 'admin';

  return cy
    .request({
      method: 'POST',
      url: `${api_url}/@login`,
      headers: { Accept: 'application/json' },
      body: { login: user, password: password },
    })
    .then((response) => cy.setCookie('auth_token', response.body.token));
});

// --- CREATE CONTENT --------------------------------------------------------
Cypress.Commands.add(
  'createContent',
  ({
    contentType,
    contentId,
    contentTitle,
    path = '',
    allow_discussion = false,
  }) => {
    let api_url, auth;
    api_url = Cypress.env('API_PATH') || 'http://localhost:8080/Plone';
    auth = {
      user: 'admin',
      pass: 'admin',
    };
    if (contentType === 'File') {
      return cy.request({
        method: 'POST',
        url: `${api_url}/${path}`,
        headers: {
          Accept: 'application/json',
        },
        auth: auth,
        body: {
          '@type': contentType,
          id: contentId,
          title: contentTitle,
          file: {
            data: 'dGVzdGZpbGUK',
            encoding: 'base64',
            filename: 'lorem.txt',
            'content-type': 'text/plain',
          },
          allow_discussion: allow_discussion,
        },
      });
    }
    if (contentType === 'Image') {
      return cy.request({
        method: 'POST',
        url: `${api_url}/${path}`,
        headers: {
          Accept: 'application/json',
        },
        auth: auth,
        body: {
          '@type': contentType,
          id: contentId,
          title: contentTitle,
          image: {
            data:
              'iVBORw0KGgoAAAANSUhEUgAAANcAAAA4CAMAAABZsZ3QAAAAM1BMVEX29fK42OU+oMvn7u9drtIPisHI4OhstdWZyt4fkcXX5+sAg74umMhNp86p0eJ7vNiKw9v/UV4wAAAAAXRSTlMAQObYZgAABBxJREFUeF7tmuty4yAMhZG4X2zn/Z92J5tsBJwWXG/i3XR6frW2Y/SBLIRAfaQUDNt8E5tLUt9BycfcKfq3R6Mlfyimtx4rzp+K3dtibXkor99zsEqLYZltblTecciogoh+TXfY1Ve4dn07rCDGG9dHSEEOg/GmXl0U1XDxTKxNK5De7BxsyyBr6gGm2/vPxKJ8F6f7BXKfRMp1xIWK9A+5ks25alSb353dWnDJN1k35EL5f8dVGifTf/4tjUuuFq7u4srmXC60yAmldLXIWbg65RKU87lcGxJCFqUPv0IacW0PmSivOZFLE908inPToMmii/roG+MRV/O8FU88i8tFsxV3a06MFUw0Qu7RmAtdV5/HVVaOVMTWNOWSwMljLhzhcB6XIS7OK5V6AvRDNN7t5VJWQs1J40UmalbK56usBG/CuCHSYuc+rkUGeMCViNRARPrzW52N3oQLe6WifNliSuuGaH3czbVNudI9s7ZLUCLHVwWlyES522o1t14uvmbblmVTKqFjaZYJFSTPP4dLL1kU1z7p0lzdbRulmEWLxoQX+z9ce7A8GqEEucllLxePuZwdJl1Lezu0hoswvTPt61DrFcRuujV/2cmlxaGBC7Aw6cpovGANwRiSdOAWJ5AGy4gLL64dl0QhUEAuEUNws+XxV+OKGPdw/hESGYF9XEGaFC7sNLMSXWJjHsnanYi87VK428N2uxpOjOFANcagLM5l+7mSycM8KknZpKLcGi6jmzWGr/vLurZ/0g4u9AZuAoeb5r1ceQhyiTPY1E4wUR6u/F3H2ojSpXMMriBPT9cezTto8Cx+MsglHL4fv1Rxrb1LVw9yvyQpJ3AhFnLZfuRLH2QsOG3FGGD20X/th/u5bFAt16Bt308KjF+MNOXgl/SquIEySX3GhaZvc67KZbDxcCDORz2N8yCWPaY5lyQZO7lQ29fnZbt3Xu6qoge4+DjXl/MocySPOp9rlvdyznahRyHEYd77v3LhugOXDv4J65QXfl803BDAdaWBEDhfVx7nKofjoVCgxnUAqw/UAUDPn788BDvQuG4TDtdtUPvzjSlXAB8DvaDOhhrmhwbywylXAm8CvaouikJTL93gs3y7Yy4VYbIxOHrcMizPqWOjqO9l3Uz52kibQy4xxOgqhJvD+w5rvokOcAlGvNCfeqCv1ste1stzLm0f71Iq3ZfTrPfuE5nhPtF+LvQE2lffQC7pYtQy3tdzdrKvd5TLVVzDetScS3nEKmmwDyt1Cev1kX3YfbvzNK4fzrlw+cB6vm+uiUgf2zdXI62241LawCb7Pi5FXFPF8KpzDoF/Sw2lg+GrHNbno1mhPu+VCF/vfMnw06PnUl6j48dVHD3jHNHPua+fc3o/5yp/zsGi0vYtzi3Pz5mHd4T6BWMIlewacd63AAAAAElFTkSuQmCC',
            encoding: 'base64',
            filename: 'image.png',
            'content-type': 'image/png',
          },
        },
      });
    }
    if (['Document', 'Folder', 'CMSFolder'].includes(contentType)) {
      return cy
        .request({
          method: 'POST',
          url: `${api_url}/${path}`,
          headers: {
            Accept: 'application/json',
          },
          auth: auth,
          body: {
            '@type': contentType,
            id: contentId,
            title: contentTitle,
            blocks: {
              'd3f1c443-583f-4e8e-a682-3bf25752a300': { '@type': 'title' },
              '7624cf59-05d0-4055-8f55-5fd6597d84b0': { '@type': 'slate' },
            },
            blocks_layout: {
              items: [
                'd3f1c443-583f-4e8e-a682-3bf25752a300',
                '7624cf59-05d0-4055-8f55-5fd6597d84b0',
              ],
            },
            allow_discussion: allow_discussion,
          },
        })
        .then(() => console.log(`${contentType} created`));
    } else {
      return cy
        .request({
          method: 'POST',
          url: `${api_url}/${path}`,
          headers: {
            Accept: 'application/json',
          },
          auth: auth,
          body: {
            '@type': contentType,
            id: contentId,
            title: contentTitle,
            allow_discussion: allow_discussion,
          },
        })
        .then(() => console.log(`${contentType} created`));
    }
  },
);

// --- Add DX Content-Type ----------------------------------------------------------
Cypress.Commands.add('addContentType', (name) => {
  let api_url, auth;
  api_url = Cypress.env('API_PATH') || 'http://localhost:8080/Plone';
  auth = {
    user: 'admin',
    pass: 'admin',
  };
  return cy
    .request({
      method: 'POST',
      url: `${api_url}/@controlpanels/dexterity-types/${name}`,
      headers: {
        Accept: 'application/json',
      },
      auth: auth,
      body: {
        title: name,
      },
    })
    .then(() => console.log(`${name} content-type added.`));
});

// --- Remove DX behavior ----------------------------------------------------------
Cypress.Commands.add('removeContentType', (name) => {
  let api_url, auth;
  api_url = Cypress.env('API_PATH') || 'http://localhost:8080/Plone';
  auth = {
    user: 'admin',
    pass: 'admin',
  };
  return cy
    .request({
      method: 'DELETE',
      url: `${api_url}/@controlpanels/dexterity-types/${name}`,
      headers: {
        Accept: 'application/json',
      },
      auth: auth,
      body: {},
    })
    .then(() => console.log(`${name} content-type removed.`));
});

// --- Add DX field ----------------------------------------------------------
Cypress.Commands.add('addSlateJSONField', (type, name) => {
  let api_url, auth;
  api_url = Cypress.env('API_PATH') || 'http://localhost:8080/Plone';
  auth = {
    user: 'admin',
    pass: 'admin',
  };
  return cy
    .request({
      method: 'POST',
      url: `${api_url}/@types/${type}`,
      headers: {
        Accept: 'application/json',
      },
      auth: auth,
      body: {
        id: name,
        title: name,
        description: 'Slate JSON Field',
        factory: 'SlateJSONField',
        required: false,
      },
    })
    .then(() => console.log(`${name} SlateJSONField field added to ${type}`));
});

// --- Remove DX field ----------------------------------------------------------
Cypress.Commands.add('removeSlateJSONField', (type, name) => {
  let api_url, auth;
  api_url = Cypress.env('API_PATH') || 'http://localhost:8080/Plone';
  auth = {
    user: 'admin',
    pass: 'admin',
  };
  return cy
    .request({
      method: 'DELETE',
      url: `${api_url}/@types/${type}/${name}`,
      headers: {
        Accept: 'application/json',
      },
      auth: auth,
      body: {},
    })
    .then(() =>
      console.log(`${name} SlateJSONField field removed from ${type}`),
    );
});

// --- REMOVE CONTENT --------------------------------------------------------
Cypress.Commands.add('removeContent', (path) => {
  let api_url, auth;
  api_url = Cypress.env('API_PATH') || 'http://localhost:8080/Plone';
  auth = {
    user: 'admin',
    pass: 'admin',
  };
  return cy
    .request({
      method: 'DELETE',
      url: `${api_url}/${path}`,
      headers: {
        Accept: 'application/json',
      },
      auth: auth,
      body: {},
    })
    .then(() => console.log(`${path} removed`));
});

Cypress.Commands.add('typeInSlate', { prevSubject: true }, (subject, text) => {
  return (
    cy
      .wrap(subject)
      .then((subject) => {
        subject[0].dispatchEvent(
          new InputEvent('beforeinput', {
            inputType: 'insertText',
            data: text,
          }),
        );
        return subject;
      })
      // TODO: do this only for Electron-based browser which does not understand instantaneously
      // that the user inserted some text in the block
      .wait(1000)
  );
});

Cypress.Commands.add('lineBreakInSlate', { prevSubject: true }, (subject) => {
  return (
    cy
      .wrap(subject)
      .then((subject) => {
        subject[0].dispatchEvent(
          new InputEvent('beforeinput', { inputType: 'insertLineBreak' }),
        );
        return subject;
      })
      // TODO: do this only for Electron-based browser which does not understand instantaneously
      // that the block was split
      .wait(1000)
  );
});

// --- SET WORKFLOW ----------------------------------------------------------
Cypress.Commands.add(
  'setWorkflow',
  ({
    path = '/',
    actor = 'admin',
    review_state = 'publish',
    time = '1995-07-31T18:30:00',
    title = '',
    comment = '',
    effective = '2018-01-21T08:00:00',
    expires = '2019-01-21T08:00:00',
    include_children = true,
  }) => {
    let api_url, auth;
    api_url = Cypress.env('API_PATH') || 'http://localhost:8080/Plone';
    auth = {
      user: 'admin',
      pass: 'admin',
    };
    return cy.request({
      method: 'POST',
      url: `${api_url}/${path}/@workflow/${review_state}`,
      headers: {
        Accept: 'application/json',
      },
      auth: auth,
      body: {
        actor: actor,
        review_state: review_state,
        time: time,
        title: title,
        comment: comment,
        effective: effective,
        expires: expires,
        include_children: include_children,
      },
    });
  },
);

// --- waitForResourceToLoad ----------------------------------------------------------
Cypress.Commands.add('waitForResourceToLoad', (fileName, type) => {
  const resourceCheckInterval = 40;

  return new Cypress.Promise((resolve) => {
    const checkIfResourceHasBeenLoaded = () => {
      const resource = cy
        .state('window')
        .performance.getEntriesByType('resource')
        .filter((entry) => !type || entry.initiatorType === type)
        .find((entry) => entry.name.includes(fileName));

      if (resource) {
        resolve();

        return;
      }

      setTimeout(checkIfResourceHasBeenLoaded, resourceCheckInterval);
    };

    checkIfResourceHasBeenLoaded();
  });
});

Cypress.Commands.add(
  'setSelection',
  { prevSubject: true },
  (subject, query, endQuery) => {
    if (typeof query === 'string') {
      const anchorNode = getTextNode(subject[0], query);
      const focusNode = endQuery
        ? getTextNode(subject[0], endQuery)
        : anchorNode;
      const anchorOffset = anchorNode.wholeText.indexOf(query);
      const focusOffset = endQuery
        ? focusNode.wholeText.indexOf(endQuery) + endQuery.length
        : anchorOffset + query.length;
      setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
    } else if (typeof query === 'object') {
      const el = subject[0];
      const anchorNode = getTextNode(el.querySelector(query.anchorQuery));
      const anchorOffset = query.anchorOffset || 0;
      const focusNode = query.focusQuery
        ? getTextNode(el.querySelector(query.focusQuery))
        : anchorNode;
      const focusOffset = query.focusOffset || 0;
      setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
    }
    return subject;
  },
);

Cypress.Commands.add('getSlateEditorAndType', (type) => {
  cy.get('.content-area .slate-editor [contenteditable=true]').focus();

  // without this, the first character of `type` is sometimes omitted
  cy.get('.content-area .slate-editor [contenteditable=true]').click();

  cy.get('.content-area .slate-editor [contenteditable=true]').type(type);
});

Cypress.Commands.add('setSlateSelection', (subject, query, endQuery) => {
  cy.get('.slate-editor.selected [contenteditable=true]')
    .focus()
    .click()
    .setSelection(subject, query, endQuery)
    .wait(1000); // this wait is needed for the selection change to be detected after
});

Cypress.Commands.add('setSlateCursor', (subject, query, endQuery) => {
  cy.get('.slate-editor.selected [contenteditable=true]')
    .focus()
    .click()
    .setCursor(subject, query, endQuery)
    .wait(1000); // this wait is needed for the selection change to be detected after
});

Cypress.Commands.add('clickSlateButton', (button) => {
  cy.get(`.slate-inline-toolbar .button-wrapper a[title="${button}"]`).click();
});

Cypress.Commands.add('toolbarSave', () => {
  // Save
  cy.get('#toolbar-save').click();
  cy.waitForResourceToLoad('@navigation');
  cy.waitForResourceToLoad('@breadcrumbs');
  cy.waitForResourceToLoad('@actions');
  cy.waitForResourceToLoad('@types');
  cy.waitForResourceToLoad('my-page');

  // sometimes, not frequently, the URL is not updated to be the final view page
  // but it is the URL of the edit-page form
  cy.wait(1000);

  cy.url().should('eq', Cypress.config().baseUrl + '/cypress/my-page');
});

// Low level command reused by `setCursorBefore` and `setCursorAfter`, equal to `setCursorAfter`
Cypress.Commands.add(
  'setCursor',
  { prevSubject: true },
  (subject, query, atStart) => {
    const node = getTextNode(subject[0], query);
    const offset = node.wholeText.indexOf(query) + (atStart ? 0 : query.length);
    const document = node.ownerDocument;
    document.getSelection().removeAllRanges();
    document.getSelection().collapse(node, offset);

    // Depending on what you're testing, you may need to chain a `.click()` here to ensure
    // further commands are picked up by whatever you're testing (this was required for Slate, for example).

    return subject;
  },
);

Cypress.Commands.add(
  'pasteClipboard',
  { prevSubject: true },
  (query, htmlContent) => {
    return cy
      .wrap(query)
      .type(' ')
      .trigger('paste', createHtmlPasteEvent(htmlContent));
  },
);

Cypress.Commands.add(
  'setCursorBefore',
  { prevSubject: true },
  (subject, query) => {
    cy.wrap(subject).setCursor(query, true);
  },
);

Cypress.Commands.add(
  'setCursorAfter',
  { prevSubject: true },
  (subject, query) => {
    cy.wrap(subject).setCursor(query);
  },
);

// Helper functions
function getTextNode(el, match) {
  // console.log('get text node:', el, match);

  const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
  if (!match) {
    return walk.nextNode();
  }

  let node;
  while ((node = walk.nextNode())) {
    // console.log('taking into consideration:', node.wholeText, '->', match);
    if (node.wholeText.includes(match)) {
      return node;
    }
  }
}
const createHtmlPasteEvent = (htmlContent) =>
  Object.assign(new Event('paste', { bubbles: true, cancelable: true }), {
    clipboardData: {
      getData: (type = 'text/html') => htmlContent,
      types: ['text/html'],
    },
  });

function setBaseAndExtent(...args) {
  const document = args[0].ownerDocument;
  document.getSelection().removeAllRanges();
  document.getSelection().setBaseAndExtent(...args);
}

Cypress.Commands.add('navigate', (route = '') => {
  return cy.window().its('appHistory').invoke('push', route);
});

Cypress.Commands.add('store', () => {
  return cy.window().its('store').invoke('getStore', '');
});

Cypress.Commands.add('settings', (key, value) => {
  return cy.window().its('settings');
});

Cypress.Commands.add('selectSlateRange', (range) => {
  return cy.window().then((win) => {
    var event = new CustomEvent('Test_SelectRange', {
      detail: range,
    });
    win.document.dispatchEvent(event);
  });
});
