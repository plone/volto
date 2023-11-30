import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { filter, find, isEmpty, map } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { flattenToAppURL, langmap, toBackendLang } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const Types = ({ types, pathname, content, currentLanguage }) => {
  const { settings } = config;
  return types.length > 0 ||
    (settings.isMultilingual && content['@components'].translations) ? (
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
      {settings.isMultilingual &&
        content['@components'].translations &&
        (() => {
          const translationsLeft = filter(
            settings.supportedLanguages,
            (lang) =>
              !Boolean(
                content['@components'].translations &&
                  find(content['@components'].translations.items, {
                    language: lang,
                  }),
              ) && toBackendLang(currentLanguage) !== lang,
          );

          return (
            !isEmpty(translationsLeft) && (
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
                              lang: langmap[lang].nativeName.toLowerCase(),
                            }}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )
          );
        })()}
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
