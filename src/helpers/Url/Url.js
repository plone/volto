/**
 * Url helper.
 * @module helpers/Url
 */

/**
 * Get base url.
 * @function getBaseUrl
 * @param {string} url Url to be parsed.
 * @return {string} Base url of content object.
 */
export function getBaseUrl(url) {
  return url
          .replace('/add', '')
          .replace('/delete', '')
          .replace('/edit', '')
          .replace('/login', '')
          .replace('/logout', '')
          .replace('/search', '');
}
