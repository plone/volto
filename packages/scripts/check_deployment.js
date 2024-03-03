import http from 'http';
import waitOn from 'wait-on';

const url = new URL('http://localhost:3000'); // replace with your service URL
const searchString = 'Welcome to Plone'; // replace with the string you want to search for

// Wait for the service to be available
waitOn({ resources: [url.href] })
  .then(() => {
    console.log('Service is available');

    // Fetch the HTML
    http
      .get(url.href, (res) => {
        let data = '';

        // A chunk of data has been received.
        res.on('data', (chunk) => {
          data += chunk;
        });

        // The whole response has been received.
        res.on('end', () => {
          // Check if the HTML contains the specific string
          if (data.includes(searchString)) {
            console.log(`Found "${searchString}" in the HTML`);
          } else {
            console.error(`Did not find "${searchString}" in the HTML`);
            process.exit(1);
          }
        });
      })
      .on('error', (err) => {
        console.error('Error: ' + err.message);
        process.exit(1);
      });
  })
  .catch((err) => {
    console.error('An error occurred:', err);
    process.exit(1);
  });
