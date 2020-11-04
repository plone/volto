import prependHttp from 'prepend-http';
import urlRegex from './urlRegex';
import mailRegex from './mailRegex';
import { parse as parseUrl } from 'url';

export default {
  isUrl(text) {
    return urlRegex().test(text);
  },

  isMail(text) {
    return mailRegex().test(text);
  },

  normaliseMail(email) {
    if (email.toLowerCase().startsWith('mailto:')) {
      return email;
    }
    return `mailto:${email}`;
  },

  normalizeUrl(url) {
    if (__CLIENT__) {
      const windowURL = parseUrl(window.location.href);
      const serverURL = `${windowURL.protocol}//${windowURL.host}`;

      // If the url is internal (pasted from the browser directly) treat it as internal
      // Remove the server part (as if the user has typed '/the-path/content')
      if (url.startsWith(serverURL)) {
        return url.replace(serverURL, '');
      }
    }
    return prependHttp(url);
  },
};
