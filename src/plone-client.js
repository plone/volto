import ploneClient from '@plone/client';

/*
 * Initialize the Plone client with the API path.
 * Here we are creating a singleton to be used across the application.
 *
 * To use mutations, you would need to `await client.log(username, password)` first in
 * a useEffect hook in the main app.
 */
const client = ploneClient.initialize({
  apiPath: 'http://localhost:8080/Plone',
});

export default client;
