/**
 * Create a function that add X-Forwarded Headers to superagent requests
 * @function addHeadersFactory
 * @param {Object} req Original request object
 * @return {function} Superagent request function
 */
export const addHeadersFactory = (orig) => {
  return (request) => {
    const x_forwarded_host = orig.headers['x-forwarded-host'] || orig['host'];
    const x_forwarded_for = orig.headers['x-forwarded-for'];
    const remote_host = orig.connection.remoteAddress;
    if (x_forwarded_for && remote_host) {
      request.set('x-forwarded-for', x_forwarded_for + ', ' + remote_host);
    } else if (remote_host) {
      request.set('x-forwarded-for', remote_host);
    } else if (x_forwarded_for) {
      request.set('x-forwarded-for', x_forwarded_for);
    }
    x_forwarded_host && request.set('x-forwarded-host', x_forwarded_host);
  };
};
