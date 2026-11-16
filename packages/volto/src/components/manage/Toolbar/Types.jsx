import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import filter from 'lodash/filter';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { FormattedMessage } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import langmap from '@plone/volto/helpers/LanguageMap/LanguageMap';
import { toBackendLang } from '@plone/volto/helpers/Utils/Utils';

/**
 * Languages the content can still be translated to from the Add menu.
 * Only applies on multilingual sites: plone.restapi advertises the
 * `translations` component whenever plone.app.multilingual is installed,
 * even when it is not activated on the site.
 * @function getTranslationsLeft
 * @param {Object} args
 * @param {Object} args.content Current content.
 * @param {Array} args.availableLanguages Site available languages.
 * @param {string} args.currentLanguage Current frontend language.
 * @param {boolean} args.isMultilingual Whether the site is multilingual.
 * @returns {Array} Backend language codes still missing a translation.
 */
export function getTranslationsLeft({
  content,
  availableLanguages = [],
  currentLanguage,
  isMultilingual,
}) {
  const translations = content?.['@components']?.translations;
  if (!isMultilingual || !translations) {
    return [];
  }
  return filter(
    availableLanguages,
    (lang) =>
      !find(translations.items, { language: lang }) &&
      toBackendLang(currentLanguage) !== lang,
  );
}

/**
 * Whether the Add menu has anything to show.
 * @function hasAddMenuItems
 * @param {Object} args Same as `getTranslationsLeft`, plus `types`.
 * @returns {boolean} True if there are addable types or translations left.
 */
export function hasAddMenuItems({ types = [], ...args }) {
  return types.length > 0 || !isEmpty(getTranslationsLeft(args));
}

const Types = ({ types, pathname, content, currentLanguage }) => {
  const availableLanguages = useSelector(
    (state) => state.site?.data?.['plone.available_languages'] || [],
  );
  const isMultilingual = useSelector(
    (state) => state.site?.data?.features?.multilingual,
  );
  const translationsLeft = getTranslationsLeft({
    content,
    availableLanguages,
    currentLanguage,
    isMultilingual,
  });
  return types.length > 0 || !isEmpty(translationsLeft) ? (
    <div className="menu-more pastanaga-menu">
      {types.length > 0 && (
        <>
          <header>
            <FormattedMessage id="Add Content" defaultMessage="Add Content…" />
          </header>
          <div className="pastanaga-menu-list">
            <ul>
              {map(filter(types), (item) => {
                // Strip the type for the item we want to add
                const contentTypeToAdd = item['@id'].split('@types/')[1];
                // If we are in the root or in /contents, we need to strip the preceeding / and /contents
                const currentPath = pathname
                  .replace(/\/contents$/, '')
                  .replace(/\/$/, '');
                // Finally build the route URL
                const addContentTypeRoute = `${currentPath}/add?type=${contentTypeToAdd}`;
                return (
                  <li key={item['@id']}>
                    <Link
                      to={addContentTypeRoute}
                      id={`toolbar-add-${item['@id']
                        .split('@types/')[1]
                        .toLowerCase()
                        .replace(' ', '-')}`}
                      className="item"
                      key={item.title}
                    >
                      <FormattedMessage id={item.title} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
      {!isEmpty(translationsLeft) && (
        <>
          <header>
            <FormattedMessage
              id="Add Translation…"
              defaultMessage="Add Translation…"
            />
          </header>
          <div className="pastanaga-menu-list">
            <ul>
              {map(translationsLeft, (lang) => (
                <li key={lang}>
                  <Link
                    to={{
                      pathname: `${pathname}/create-translation`,
                      state: {
                        type: content['@type'],
                        translationOf: flattenToAppURL(content['@id']),
                        language: lang,
                      },
                    }}
                    className="item"
                  >
                    <FormattedMessage
                      id="Translate to {lang}"
                      defaultMessage="Translate to {lang}"
                      values={{
                        lang: (langmap[lang]?.nativeName || lang).toLowerCase(),
                      }}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  ) : (
    <span />
  );
};

Types.propTypes = {
  pathname: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(
    PropTypes.shape({
      '@id': PropTypes.string,
      addable: PropTypes.bool,
      title: PropTypes.string,
    }),
  ).isRequired,
};

export default connect(
  (state) => ({
    types: filter(state.types.types, 'addable'),
    currentLanguage: state.intl.locale,
  }),
  {},
)(Types);
