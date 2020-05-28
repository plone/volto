/**
 * i18n script.
 * @module scripts/i18n
 */

const { find, keys, map, concat, reduce, zipObject } = require('lodash');
const glob = require('glob').sync;
const fs = require('fs');
const Pofile = require('pofile');
const babel = require('@babel/core');

/**
 * Extract messages into separate JSON files
 * @function extractMessages
 * @return {undefined}
 */
function extractMessages() {
  map(glob('src/**/*.js?(x)'), (filename) => {
    babel.transformFileSync(filename, {}, (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}

/**
 * Get messages from separate JSON files
 * @function getMessages
 * @return {Object} Object with messages
 */
function getMessages() {
  return reduce(
    concat(
      {},
      ...map(
        // We ignore the existing customized shadowed components ones, since most
        // probably we won't be overriding them
        // If so, we should do it in the config object or somewhere else
        glob('build/messages/src/**/*.json', {
          ignore: 'build/messages/src/customizations/**',
        }),
        (filename) =>
          map(JSON.parse(fs.readFileSync(filename, 'utf8')), (message) => ({
            ...message,
            filename: filename.match(/build\/messages\/src\/(.*).json$/)[1],
          })),
      ),
    ),
    (current, value) => {
      let result = current;
      if (current.id) {
        result = {
          [current.id]: {
            defaultMessage: current.defaultMessage,
            filenames: [current.filename],
          },
        };
      }

      if (result[value.id]) {
        result[value.id].filenames.push(value.filename);
      } else {
        result[value.id] = {
          defaultMessage: value.defaultMessage,
          filenames: [value.filename],
        };
      }
      return result;
    },
  );
}

/**
 * Convert messages to pot format
 * @function messagesToPot
 * @param {Object} messages Messages
 * @return {string} Formatted pot string
 */
function messagesToPot(messages) {
  return map(keys(messages).sort(), (key) =>
    [
      ...map(messages[key].filenames, (filename) => `#: ${filename}`),
      `# defaultMessage: ${messages[key].defaultMessage}`,
      `msgid "${key}"`,
      'msgstr ""',
    ].join('\n'),
  ).join('\n\n');
}

/**
 * Pot header
 * @function potHeader
 * @return {string} Formatted pot header
 */
function potHeader() {
  return `msgid ""
msgstr ""
"Project-Id-Version: Plone\\n"
"POT-Creation-Date: ${new Date().toISOString()}\\n"
"Last-Translator: Plone i18n <plone-i18n@lists.sourceforge.net>\\n"
"Language-Team: Plone i18n <plone-i18n@lists.sourceforge.net>\\n"
"MIME-Version: 1.0\\n"
"Content-Type: text/plain; charset=utf-8\\n"
"Content-Transfer-Encoding: 8bit\\n"
"Plural-Forms: nplurals=1; plural=0;\\n"
"Language-Code: en\\n"
"Language-Name: English\\n"
"Preferred-Encodings: utf-8\\n"
"Domain: volto\\n"

`;
}

/**
 * Convert po files into json
 * @function poToJson
 * @return {undefined}
 */
function poToJson() {
  map(glob('locales/**/*.po'), (filename) => {
    let { items } = Pofile.parse(fs.readFileSync(filename, 'utf8'));
    const lib = `node_modules/@plone/volto/${filename}`;
    if (fs.existsSync(lib)) {
      const libItems = Pofile.parse(fs.readFileSync(lib, 'utf8')).items;
      items = [...libItems, ...items];
    }
    const lang = filename.match(/locales\/(.*)\/LC_MESSAGES\//)[1];
    fs.writeFileSync(
      `locales/${lang}.json`,
      JSON.stringify(
        zipObject(
          map(items, (item) => item.msgid),
          map(items, (item) => item.msgstr[0]),
        ),
      ),
    );
  });
}

/**
 * Format header
 * @function formatHeader
 * @param {Array} comments Array of comments
 * @param {Object} headers Object of header items
 * @return {string} Formatted header
 */
function formatHeader(comments, headers) {
  return [
    ...map(comments, (comment) => `# ${comment}`),
    'msgid ""',
    'msgstr ""',
    ...map(keys(headers), (key) => `"${key}: ${headers[key]}\\n"`),
    '',
  ].join('\n');
}

/**
 * Sync po by the pot file
 * @function syncPoByPot
 * @return {undefined}
 */
function syncPoByPot() {
  const pot = Pofile.parse(fs.readFileSync('locales/volto.pot', 'utf8'));

  map(glob('locales/**/*.po'), (filename) => {
    const po = Pofile.parse(fs.readFileSync(filename, 'utf8'));

    fs.writeFileSync(
      filename,
      `${formatHeader(po.comments, po.headers)}
${map(pot.items, (item) => {
  const poItem = find(po.items, { msgid: item.msgid });
  return [
    `${map(item.references, (ref) => `#: ${ref}`).join('\n')}`,
    `msgid "${item.msgid}"`,
    `msgstr "${poItem ? poItem.msgstr : ''}"`,
  ].join('\n');
}).join('\n\n')}\n`,
    );
  });
}
console.log('Extracting messages from source files...');
extractMessages();
console.log('Synchronizing messages to pot file...');
// We only write the pot file if it's really different
const newPot = `${potHeader()}${messagesToPot(getMessages())}\n`.replace(
  /"POT-Creation-Date:(.*)\\n"/,
  '',
);
const oldPot = fs
  .readFileSync('locales/volto.pot', 'utf8')
  .replace(/"POT-Creation-Date:(.*)\\n"/, '');

if (newPot !== oldPot) {
  fs.writeFileSync(
    'locales/volto.pot',
    `${potHeader()}${messagesToPot(getMessages())}\n`,
  );
}
console.log('Synchronizing messages to po files...');
syncPoByPot();
console.log('Generating the json files...');
poToJson();
console.log('done!');
