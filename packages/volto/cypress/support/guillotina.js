export function setupGuillotina() {
  const headers = {
    Authorization: 'Basic cm9vdDpyb290',
    'Content-Type': 'application/json',
  };
  const api_url = 'http://127.0.0.1:8081/db';

  cy.request({
    method: 'POST',
    url: api_url,
    headers,
    body: { '@type': 'Site', id: 'web', title: 'Guillotina Volto Site' },
  }).then((response) => console.log('web container created'));

  cy.request({
    method: 'POST',
    url: `${api_url}/web/@addons`,
    headers,
    body: { id: 'cms' },
  }).then((response) => console.log('cms add-on installed'));

  cy.request({
    method: 'POST',
    url: `${api_url}/web/@addons`,
    headers,
    body: { id: 'dbusers' },
  }).then((response) => console.log('dbusers add-on installed'));

  // Create manager group
  cy.request({
    method: 'POST',
    url: `${api_url}/web/groups`,
    headers,
    body: {
      id: 'managers',
      '@type': 'Group',
      user_roles: [
        'guillotina.Manager',
        'guillotina.ContainerAdmin',
        'guillotina.Owner',
      ],
    },
  }).then((response) => console.log('managers group created'));

  // create admin user
  cy.request({
    method: 'POST',
    url: `${api_url}/web/users`,
    headers,
    body: {
      '@type': 'User',
      username: 'admin',
      email: 'foo@bar.com',
      password: 'admin',
      user_groups: ['managers'],
    },
  }).then((response) => console.log('default user created'));
}

export function tearDownGuillotina({ allowFail = false } = {}) {
  const headers = {
    Authorization: 'Basic cm9vdDpyb290',
    'Content-Type': 'application/json',
  };
  const api_url = 'http://127.0.0.1:8081/db';

  cy.request({
    method: 'DELETE',
    url: `${api_url}/web`,
    headers,
    ...(allowFail && { failOnStatusCode: false }),
  }).then((response) => console.log('container deleted'));
}
