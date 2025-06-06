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

const Types = ({ types, pathname, content, currentLanguage }) => {
  const availableLanguages = useSelector(
    (state) => state.site?.data?.['plone.available_languages'] || [],
  );
  return types.length > 0 || content?.['@components']?.translations ? (
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
      {content['@components'].translations &&
        (() => {
          const translationsLeft = filter(
            availableLanguages,
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
