import '@testing-library/cypress/add-commands';
import { getIfExists } from '../helpers';
import { ploneAuth } from './constants';

const HOSTNAME = Cypress.env('BACKEND_HOST') || 'localhost';
const GUILLOTINA_API_URL = `http://${HOSTNAME}:8081/db/web`;
const PLONE_SITE_ID = Cypress.env('SITE_ID') || 'plone';
const PLONE_API_URL =
  Cypress.env('API_PATH') || `http://${HOSTNAME}:55001/${PLONE_SITE_ID}`;

const SLATE_SELECTOR = '.content-area .slate-editor [contenteditable=true]';
const SLATE_TITLE_SELECTOR = '.block.inner.title [contenteditable="true"]';

const ploneAuthObj = {
  user: ploneAuth[0],
  pass: ploneAuth[1],
};

// --- AUTOLOGIN -------------------------------------------------------------
Cypress.Commands.add('autologin', (usr, pass) => {
  let api_url, user, password;
  if (Cypress.env('API') === 'guillotina') {
    api_url = GUILLOTINA_API_URL;
    user = usr || 'admin';
    password = pass || 'admin';
  } else {
    api_url = PLONE_API_URL;
    user = usr || ploneAuth[0];
    password = pass || ploneAuth[1];
  }

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
    contentDescription,
    path = '',
    allow_discussion = false,
    transition = '',
    bodyModifier = (body) => body,
    image = false,
  }) => {
    let api_url, auth;
    if (Cypress.env('API') === 'guillotina') {
      api_url = GUILLOTINA_API_URL;
      auth = {
        user: 'root',
        pass: 'root',
      };
    } else {
      api_url = PLONE_API_URL;
      auth = ploneAuthObj;
    }

    const defaultParams = {
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
        description: contentDescription,
        allow_discussion: allow_discussion,
      },
    };

    if (contentType === 'File') {
      const params = {
        ...defaultParams,
        body: bodyModifier({
          ...defaultParams.body,
          file: {
            data: 'dGVzdGZpbGUK',
            encoding: 'base64',
            filename: 'lorem.txt',
            'content-type': 'text/plain',
          },
        }),
      };

      return cy.request(params);
    }
    if (contentType === 'Image') {
      const params = {
        ...defaultParams,
        body: bodyModifier({
          ...defaultParams.body,
          image: {
            data:
              'iVBORw0KGgoAAAANSUhEUgAAANcAAAA4CAMAAABZsZ3QAAAAM1BMVEX29fK42OU+oMvn7u9drtIPisHI4OhstdWZyt4fkcXX5+sAg74umMhNp86p0eJ7vNiKw9v/UV4wAAAAAXRSTlMAQObYZgAABBxJREFUeF7tmuty4yAMhZG4X2zn/Z92J5tsBJwWXG/i3XR6frW2Y/SBLIRAfaQUDNt8E5tLUt9BycfcKfq3R6Mlfyimtx4rzp+K3dtibXkor99zsEqLYZltblTecciogoh+TXfY1Ve4dn07rCDGG9dHSEEOg/GmXl0U1XDxTKxNK5De7BxsyyBr6gGm2/vPxKJ8F6f7BXKfRMp1xIWK9A+5ks25alSb353dWnDJN1k35EL5f8dVGifTf/4tjUuuFq7u4srmXC60yAmldLXIWbg65RKU87lcGxJCFqUPv0IacW0PmSivOZFLE908inPToMmii/roG+MRV/O8FU88i8tFsxV3a06MFUw0Qu7RmAtdV5/HVVaOVMTWNOWSwMljLhzhcB6XIS7OK5V6AvRDNN7t5VJWQs1J40UmalbK56usBG/CuCHSYuc+rkUGeMCViNRARPrzW52N3oQLe6WifNliSuuGaH3czbVNudI9s7ZLUCLHVwWlyES522o1t14uvmbblmVTKqFjaZYJFSTPP4dLL1kU1z7p0lzdbRulmEWLxoQX+z9ce7A8GqEEucllLxePuZwdJl1Lezu0hoswvTPt61DrFcRuujV/2cmlxaGBC7Aw6cpovGANwRiSdOAWJ5AGy4gLL64dl0QhUEAuEUNws+XxV+OKGPdw/hESGYF9XEGaFC7sNLMSXWJjHsnanYi87VK428N2uxpOjOFANcagLM5l+7mSycM8KknZpKLcGi6jmzWGr/vLurZ/0g4u9AZuAoeb5r1ceQhyiTPY1E4wUR6u/F3H2ojSpXMMriBPT9cezTto8Cx+MsglHL4fv1Rxrb1LVw9yvyQpJ3AhFnLZfuRLH2QsOG3FGGD20X/th/u5bFAt16Bt308KjF+MNOXgl/SquIEySX3GhaZvc67KZbDxcCDORz2N8yCWPaY5lyQZO7lQ29fnZbt3Xu6qoge4+DjXl/MocySPOp9rlvdyznahRyHEYd77v3LhugOXDv4J65QXfl803BDAdaWBEDhfVx7nKofjoVCgxnUAqw/UAUDPn788BDvQuG4TDtdtUPvzjSlXAB8DvaDOhhrmhwbywylXAm8CvaouikJTL93gs3y7Yy4VYbIxOHrcMizPqWOjqO9l3Uz52kibQy4xxOgqhJvD+w5rvokOcAlGvNCfeqCv1ste1stzLm0f71Iq3ZfTrPfuE5nhPtF+LvQE2lffQC7pYtQy3tdzdrKvd5TLVVzDetScS3nEKmmwDyt1Cev1kX3YfbvzNK4fzrlw+cB6vm+uiUgf2zdXI62241LawCb7Pi5FXFPF8KpzDoF/Sw2lg+GrHNbno1mhPu+VCF/vfMnw06PnUl6j48dVHD3jHNHPua+fc3o/5yp/zsGi0vYtzi3Pz5mHd4T6BWMIlewacd63AAAAAElFTkSuQmCC',
            encoding: 'base64',
            filename: 'image.png',
            'content-type': 'image/png',
          },
        }),
      };

      return cy.request(params);
    }
    if (
      ['Document', 'News Item', 'Folder', 'CMSFolder'].includes(contentType)
    ) {
      const params = {
        ...defaultParams,
        body: {
          ...defaultParams.body,
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
        },
      };

      if (image) {
        let sourceFilename = 'cypress/fixtures/halfdome2022.jpg';
        let imageObject = {
          encoding: 'base64',
          filename: 'image.jpg',
          'content-type': 'image/jpg',
        };
        if (typeof image === 'object') {
          sourceFilename = image.sourceFilename;
          imageObject = {
            ...imageObject,
            ...image,
          };
        }
        cy.readFile(sourceFilename, 'base64').then((encodedImage) => {
          const withImageParams = {
            ...params,
            body: bodyModifier({
              ...params.body,
              preview_image: {
                ...imageObject,
                data: encodedImage,
              },
            }),
          };

          return cy.request(withImageParams).then(() => {
            if (transition) {
              cy.setWorkflow({
                path: path || contentId,
                review_state: transition,
              });
            }
            console.log(`${contentType} created`);
          });
        });
      } else {
        const documentParams = {
          ...params,
          body: bodyModifier({
            ...params.body,
          }),
        };
        return cy.request(documentParams).then(() => {
          if (transition) {
            cy.setWorkflow({
              path: path || contentId,
              review_state: transition,
            });
          }
          console.log(`${contentType} created`);
        });
      }
    } else {
      return cy
        .request({
          method: 'POST',
          url: `${api_url}/${path}`,
          headers: {
            Accept: 'application/json',
          },
          auth: auth,
          body: bodyModifier({
            '@type': contentType,
            id: contentId,
            title: contentTitle,
            allow_discussion: allow_discussion,
          }),
        })
        .then(() => {
          if (transition) {
            cy.setWorkflow({
              path: path || contentId,
              review_state: transition,
            });
          }
          console.log(`${contentType} created`);
        });
    }
  },
);

// Remove content
Cypress.Commands.add('removeContent', ({ path = '' }) => {
  let api_url, auth;
  if (Cypress.env('API') === 'guillotina') {
    api_url = GUILLOTINA_API_URL;
    auth = {
      user: 'root',
      pass: 'root',
    };
  } else {
    api_url = PLONE_API_URL;
    auth = ploneAuthObj;
  }

  return cy.request({
    method: 'DELETE',
    url: `${api_url}/${path}`,
    headers: {
      Accept: 'application/json',
    },
    auth: auth,
  });
});

// Get content
Cypress.Commands.add('getContent', ({ path = '' }) => {
  let api_url, auth;
  if (Cypress.env('API') === 'guillotina') {
    api_url = GUILLOTINA_API_URL;
    auth = {
      user: 'root',
      pass: 'root',
    };
  } else {
    api_url = PLONE_API_URL;
    auth = ploneAuthObj;
  }

  return cy.request({
    method: 'get',
    url: `${api_url}/${path}`,
    headers: {
      Accept: 'application/json',
    },
    auth: auth,
  });
});

// --- Add DX Content-Type ----------------------------------------------------------
Cypress.Commands.add('addContentType', (name) => {
  let api_url, auth;
  api_url = Cypress.env('API_PATH') || 'http://localhost:8080/Plone';
  auth = ploneAuthObj;

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
  auth = ploneAuthObj;

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
  auth = ploneAuthObj;

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
  auth = ploneAuthObj;

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

// --- CREATE USER --------------------------------------------------------
Cypress.Commands.add(
  'createUser',
  ({
    username = 'editor',
    fullname = 'editor',
    email = 'editor@local.dev',
    password = 'password',
    roles = ['Member', 'Reader', 'Editor'],
    groups = {
      '@id': 'http://localhost:3000/@users',
      items: [
        {
          id: 'AuthenticatedUsers',
          title: 'AuthenticatedUsers',
        },
      ],
      items_total: 1,
    },
  }) => {
    let api_url, auth, path;
    if (Cypress.env('API') === 'guillotina') {
      api_url = GUILLOTINA_API_URL;
      auth = {
        user: 'root',
        pass: 'root',
      };
      path = 'users';
    } else {
      api_url = PLONE_API_URL;
      auth = ploneAuthObj;
      path = '@users';
    }

    return cy
      .request({
        method: 'POST',
        url: `${api_url}/${path}`,
        headers: {
          Accept: 'application/json',
        },
        auth: auth,
        body: {
          '@type': 'User',
          username: username,
          fullname: fullname,
          email: email,
          password: password,
          roles: roles,
          groups: groups,
        },
      })
      .then(() => console.log(`User ${username} created`));
  },
);

// Remove user
Cypress.Commands.add('removeUser', (username = 'editor') => {
  let api_url, auth, path;
  if (Cypress.env('API') === 'guillotina') {
    api_url = GUILLOTINA_API_URL;
    auth = {
      user: 'root',
      pass: 'root',
    };
    path = 'users';
  } else {
    api_url = PLONE_API_URL;
    auth = ploneAuthObj;
    path = '@users';
  }

  return cy
    .request({
      method: 'DELETE',
      url: `${api_url}/${path}/${username}`,
      headers: {
        Accept: 'application/json',
      },
      auth: auth,
    })
    .then(() => console.log(`User ${username} removed`));
});

// --- GROUP -----------------------------------------------------------------

Cypress.Commands.add(
  'createGroup',
  ({
    groupname = 'teachers',
    email = 'teachers@local.dev',
    password = ploneAuth[1],
    roles = ['Member', 'Reader'],
    users = {
      '@id': 'http://localhost:3000/@groups',
      items: [],
      items_total: 0,
    },
  }) => {
    let api_url, auth, path;
    if (Cypress.env('API') === 'guillotina') {
      api_url = GUILLOTINA_API_URL;
      auth = {
        user: 'root',
        pass: 'root',
      };
      path = 'groups';
    } else {
      api_url = PLONE_API_URL;
      auth = ploneAuthObj;
      path = '@groups';
    }

    return cy
      .request({
        method: 'POST',
        url: `${api_url}/${path}`,
        headers: {
          Accept: 'application/json',
        },
        auth: auth,
        body: {
          '@type': 'Group',
          groupname: groupname,
          email: email,
          password: password,
          roles: roles,
          users: users,
        },
      })
      .then(() => console.log(`Group ${groupname} created`));
  },
);

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
    api_url = PLONE_API_URL;
    auth = ploneAuthObj;
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

Cypress.Commands.add('waitForResourceToLoad', (fileName, type) => {
  const resourceCheckInterval = 40;
  const maxChecks = 50;
  const count = [0];

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

      count[0] += 1;
      const tid = setTimeout(
        checkIfResourceHasBeenLoaded,
        resourceCheckInterval,
      );

      if (count[0] > maxChecks) {
        clearTimeout(tid);
        throw new Error(
          `Timeout resolving resource: ${fileName} (type ${type})`,
        );
      }
    };

    checkIfResourceHasBeenLoaded();
  });
});

// --- CREATE CONTENT --------------------------------------------------------
Cypress.Commands.add('setRegistry', (record, value) => {
  let api_url, auth;
  api_url = PLONE_API_URL;
  auth = ploneAuthObj;

  return cy.request({
    method: 'PATCH',
    url: `${api_url}/@registry/`,
    headers: {
      Accept: 'application/json',
    },
    auth: auth,
    body: {
      [record]: value,
    },
  });
});

// Low level command reused by `setSelection` and low level command `setCursor`
Cypress.Commands.add('selection', { prevSubject: true }, (subject, fn) => {
  cy.wrap(subject)
    .trigger('mousedown')
    .wait(1000) //multiple waits between selecting the text to ensure toolbar is visible.
    .then(fn)
    .wait(1000)
    .trigger('mouseup');

  cy.document().trigger('selectionchange');
  return cy.wrap(subject);
});

Cypress.Commands.add(
  'setSelection',
  { prevSubject: true },
  (subject, query, endQuery) => {
    return cy.wrap(subject).selection(($el) => {
      if (typeof query === 'string') {
        const anchorNode = getTextNode($el[0], query);
        const focusNode = endQuery ? getTextNode($el[0], endQuery) : anchorNode;
        const anchorOffset = anchorNode.wholeText.indexOf(query);
        const focusOffset = endQuery
          ? focusNode.wholeText.indexOf(endQuery) + endQuery.length
          : anchorOffset + query.length;
        setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
      } else if (typeof query === 'object') {
        const el = $el[0];
        const anchorNode = getTextNode(el.querySelector(query.anchorQuery));
        const anchorOffset = query.anchorOffset || 0;
        const focusNode = query.focusQuery
          ? getTextNode(el.querySelector(query.focusQuery))
          : anchorNode;
        const focusOffset = query.focusOffset || 0;
        setBaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset);
      }
    });
  },
);

// Low level command reused by `setCursorBefore` and `setCursorAfter`, equal to `setCursorAfter`
Cypress.Commands.add(
  'setCursor',
  { prevSubject: true },
  (subject, query, atStart) => {
    return cy.wrap(subject).selection(($el) => {
      const node = getTextNode($el[0], query);
      const offset =
        node.wholeText.indexOf(query) + (atStart ? 0 : query.length);
      const document = node.ownerDocument;
      document.getSelection().removeAllRanges();
      document.getSelection().collapse(node, offset);
    });
    // Depending on what you're testing, you may need to chain a `.click()` here to ensure
    // further commands are picked up by whatever you're testing (this was required for Slate, for example).
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

Cypress.Commands.add(
  'pasteClipboard',
  { prevSubject: true },
  (query, htmlContent) => {
    return cy
      .wrap(query)
      .type(' {backspace}')
      .trigger('paste', createHtmlPasteEvent(htmlContent));
  },
);

Cypress.Commands.add('toolbarSave', () => {
  // Save
  cy.get('#toolbar-save', { timeout: 10000 }).click();
  cy.waitForResourceToLoad('@navigation');
  cy.waitForResourceToLoad('@breadcrumbs');
  cy.waitForResourceToLoad('@actions');
  cy.waitForResourceToLoad('@types');
});

Cypress.Commands.add('clearSlate', (selector) => {
  return cy
    .get(selector)
    .focus()
    .click()
    .wait(1000)
    .type('{selectAll}')
    .wait(1000)
    .type('{backspace}');
});

Cypress.Commands.add('getSlate', (createNewSlate = false) => {
  let slate;
  if (createNewSlate) {
    cy.get('.block.inner').last().type('{moveToEnd}{enter}');
  }
  cy.getIfExists(
    SLATE_SELECTOR,
    () => {
      slate = cy.get(SLATE_SELECTOR).last();
    },
    () => {
      slate = cy.get(SLATE_SELECTOR, { timeout: 10000 }).last();
    },
  );
  return slate;
});

Cypress.Commands.add('getSlateTitle', () => {
  return cy.get(SLATE_TITLE_SELECTOR, {
    timeout: 10000,
  });
});

Cypress.Commands.add('clearSlateTitle', () => {
  return cy.clearSlate(SLATE_TITLE_SELECTOR);
});

// Slate commands
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

Cypress.Commands.add('setSlateSelection', (subject, query, endQuery) => {
  cy.get('.slate-editor.selected [contenteditable=true]')
    .focus()
    // .click()
    .setSelection(subject, query, endQuery)
    .wait(1000); // this wait is needed for the selection change to be detected after
});

Cypress.Commands.add('getSlateEditorAndType', (type) => {
  cy.getSlate().focus().click().type(type);
});

Cypress.Commands.add('setSlateCursor', (subject, query, endQuery) => {
  cy.get('.slate-editor.selected [contenteditable=true]')
    .focus()
    .click()
    .setCursor(subject, query, endQuery)
    .wait(1000); // this wait is needed for the selection change to be detected after
});

Cypress.Commands.add('clickSlateButton', (button) => {
  cy.get(`.slate-inline-toolbar .button-wrapper a[title="${button}"]`, {
    timeout: 1000,
  }).click({ force: true }); // force click is needed to ensure the button in visible in view.
});

// Helper functions
function getTextNode(el, match) {
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

function setBaseAndExtent(...args) {
  const document = args[0].ownerDocument;
  document.getSelection().removeAllRanges();
  document.getSelection().setBaseAndExtent(...args);
}

function createHtmlPasteEvent(htmlContent) {
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

Cypress.Commands.add('addNewBlock', (blockName, createNewSlate = false) => {
  let block;
  block = cy.getSlate(createNewSlate).type(`/${blockName}{enter}`);
  return block;
});

Cypress.Commands.add('navigate', (route = '') => {
  return cy.window().its('appHistory').invoke('push', route);
});

Cypress.Commands.add('store', () => {
  return cy.window().its('store').invoke('getStore', '');
});

Cypress.Commands.add('settings', (key, value) => {
  return cy.window().its('settings');
});
Cypress.Commands.add('getIfExists', getIfExists);
