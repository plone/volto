/**
 * Status messages helper.
 * @module helpers/StatusMessages/StatusMessages
 */

/**
 * The cookie in which Plone puts its status messages, see
 * Products.statusmessages.
 */
export const STATUSMESSAGES_COOKIE = 'statusmessages';

// UTF-8 bytes to text, also where there is no TextDecoder (jsdom).
const utf8 = (bytes) =>
  decodeURIComponent(
    Array.from(bytes, (byte) => `%${byte.toString(16).padStart(2, '0')}`).join(
      '',
    ),
  );

/**
 * Decode the value of the statusmessages cookie, as Products.statusmessages
 * encodes it: base64 of, for each message, a 16-bit header with the length of
 * the text (11 bits) and of the type (5 bits), followed by the text and the
 * type in UTF-8. Zope URL-encodes the value, and may quote it.
 * @function decodeStatusMessages
 * @param {string} value The value of the cookie.
 * @returns {Array} The messages, as `{ message, type }`.
 */
export function decodeStatusMessages(value) {
  const messages = [];
  // A value that is not a status message gives the messages before it.
  try {
    const base64 = decodeURIComponent(value).replace(/^"|"$/g, '');
    const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));
    let index = 0;
    while (index + 2 <= bytes.length) {
      const size = (bytes[index] << 8) | bytes[index + 1];
      const messageEnd = index + 2 + (size >> 5);
      const typeEnd = messageEnd + (size & 31);
      if (typeEnd > bytes.length) {
        break;
      }
      messages.push({
        message: utf8(bytes.slice(index + 2, messageEnd)),
        type: utf8(bytes.slice(messageEnd, typeEnd)),
      });
      index = typeEnd;
    }
  } catch (error) {
    // Not base64, or not UTF-8.
  }
  return messages;
}

/**
 * Take the status messages from the cookie in the browser: return them and
 * remove the cookie, as Plone Classic does when it shows them.
 * @function takeStatusMessages
 * @returns {Array} The messages, as `{ message, type }`.
 */
export function takeStatusMessages() {
  if (typeof document === 'undefined') {
    return [];
  }
  const value = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${STATUSMESSAGES_COOKIE}=`))
    ?.slice(STATUSMESSAGES_COOKIE.length + 1);
  if (!value) {
    return [];
  }
  document.cookie = `${STATUSMESSAGES_COOKIE}=; Max-Age=0; path=/`;
  return decodeStatusMessages(value);
}
