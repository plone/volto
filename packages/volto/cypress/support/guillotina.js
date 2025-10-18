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
  }).then(() => {
    // do nothing
  });
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
  }).then(() => {
    // do nothing
  });
}
