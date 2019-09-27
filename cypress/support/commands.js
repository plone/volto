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
        tiles: {
          '74ef03c8-c47e-49f2-be11-d06d9c0b9f7f': {
            '@type': 'title',
          },
          'bc1860da-666e-475f-af6e-eac858700924': {
            '@type': 'text',
          },
        },
        tiles_layout: {
          items: [
            '74ef03c8-c47e-49f2-be11-d06d9c0b9f7f',
            'bc1860da-666e-475f-af6e-eac858700924',
          ],
        },
        image: {
          data:
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwIAMCbHYQAAAABJRU5ErkJggg==',
          encoding: 'base64',
          'content-type': 'image/png',
          filename: '1x1-0000ffff.png',
        },
        title: 'My Image',
        '@static_behaviors': null,
        '@type': 'Image',

        // tiles: {
        //   'd3f1c443-583f-4e8e-a682-3bf25752a300': { '@type': 'title' },
        //   '7624cf59-05d0-4055-8f55-5fd6597d84b0': { '@type': 'text' },
        // },
        // tiles_layout: {
        //   items: [
        //     'd3f1c443-583f-4e8e-a682-3bf25752a300',
        //     '7624cf59-05d0-4055-8f55-5fd6597d84b0',
        //   ],
        // },
      },
    });
  },
);
