// --- AUTOLOGIN -------------------------------------------------------------
Cypress.Commands.add('autologin', () => {
  let api_url;
  if (Cypress.env('API') === 'guillotina') {
    api_url = 'http://localhost:8081/db/container';
  } else {
    api_url = 'http://localhost:55001/plone';
  }

  cy.request({
    method: 'POST',
    url: `${api_url}/@login`,
    headers: { Accept: 'application/json' },
    body: { login: 'admin', password: 'secret' },
  }).then(response => cy.setCookie('auth_token', response.body.token));
});

// --- CREATE CONTENT --------------------------------------------------------
Cypress.Commands.add(
  'createContent',
  (contentType, contentId, contentTitle, path = '') => {
    let api_url;
    if (Cypress.env('API') === 'guillotina') {
      api_url = 'http://localhost:8081/db/container';
    } else {
      api_url = 'http://localhost:55001/plone';
    }
    cy.request({
      method: 'POST',
      url: `${api_url}/${path}`,
      headers: {
        Accept: 'application/json',
      },
      auth: {
        user: 'admin',
        pass: 'secret',
      },
      body: {
        '@type': 'Document',
        id: contentId,
        title: contentTitle,
        tiles: {
          'd3f1c443-583f-4e8e-a682-3bf25752a300': { '@type': 'title' },
          '7624cf59-05d0-4055-8f55-5fd6597d84b0': { '@type': 'text' },
        },
        tiles_layout: {
          items: [
            'd3f1c443-583f-4e8e-a682-3bf25752a300',
            '7624cf59-05d0-4055-8f55-5fd6597d84b0',
          ],
        },
      },
    });
  },
);
