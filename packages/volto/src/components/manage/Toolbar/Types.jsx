import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import filter from 'lodash/filter';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import map from 'lodash/map';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import langmap from '@plone/volto/helpers/LanguageMap/LanguageMap';
import { toBackendLang } from '@plone/volto/helpers/Utils/Utils';

const messages = defineMessages({
  more: {
    id: 'More',
    defaultMessage: 'More…',
  },
});

const renderTypeLink = (item, pathname) => {
  const contentTypeToAdd = item['@id'].split('@types/')[1];
  const currentPath = pathname.replace(/\/contents$/, '').replace(/\/$/, '');
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
};

const Types = ({ types, pathname, content, currentLanguage }) => {
  const intl = useIntl();
  const [moreExpanded, setMoreExpanded] = useState(false);
  const availableLanguages = useSelector(
    (state) => state.site?.data?.['plone.available_languages'] || [],
  );

  const onToggleMoreExpanded = () => setMoreExpanded((prev) => !prev);

  // Main list = immediately addable; More... = secondary (only visible when expanded)
  const mainTypes = filter(
    types,
    (t) => t.addable && t.immediately_addable !== false,
  );
  const moreTypes = filter(
    types,
    (t) => t.addable && t.immediately_addable === false,
  );
  const hasTypes = mainTypes.length > 0 || moreTypes.length > 0;

  return hasTypes || content?.['@components']?.translations ? (
    <div className="menu-more pastanaga-menu">
      {hasTypes && (
        <>
          <header>
            <FormattedMessage id="Add Content" defaultMessage="Add Content…" />
          </header>
          <div className="pastanaga-menu-list">
            <ul>
              {map(mainTypes, (item) => renderTypeLink(item, pathname))}
              {moreTypes.length > 0 && (
                <li className="menu-more-submenu">
                  <button
                    type="button"
                    className="item"
                    onClick={onToggleMoreExpanded}
                    aria-expanded={moreExpanded}
                    aria-haspopup="true"
                    aria-label={intl.formatMessage(messages.more)}
                    id="toolbar-add-more"
                  >
                    <FormattedMessage id="More" defaultMessage="More…" />
                  </button>
                  {moreExpanded && (
                    <ul className="pastanaga-menu-list pastanaga-menu-submenu">
                      {map(moreTypes, (item) => renderTypeLink(item, pathname))}
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </div>
        </>
      )}
      {content?.['@components']?.translations &&
        (() => {
          const translationsLeft = filter(
            availableLanguages,
            (lang) =>
              !Boolean(
                content?.['@components']?.translations &&
                  find(content?.['@components']?.translations?.items, {
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
                              lang: (
                                langmap[lang]?.nativeName || lang
                              ).toLowerCase(),
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
      immediately_addable: PropTypes.bool,
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
