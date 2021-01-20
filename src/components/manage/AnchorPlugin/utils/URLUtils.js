import prependHttp from 'prepend-http';
import urlRegex from './urlRegex';
import mailRegex from './mailRegex';
import telRegex from './telRegex';

export default {
  isUrl(text) {
    return urlRegex().test(text);
  },

  isMail(text) {
    return mailRegex().test(text);
  },

  isTelephone(text) {
    return telRegex().test(text);
  },

  normaliseMail(email) {
    if (email.toLowerCase().startsWith('mailto:')) {
      return email;
    }
    return `mailto:${email}`;
  },

  normalizeTelephone(tel) {
    if (tel.toLowerCase().startsWith('tel:')) {
      return tel;
    }
    return `tel:${tel}`;
  },

  normalizeUrl(url) {
    return prependHttp(url);
  },
};
