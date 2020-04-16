import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { filter, find, isEmpty, map } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';
import { settings } from '~/config';

const Types = ({ types, pathname, content, currentLanguage }) => {
  return types.length > 0 ? (
    <div className="menu-more pastanaga-menu">
      <header>
        <FormattedMessage id="Add Content" defaultMessage="Add Content..." />
      </header>
      <div className="pastanaga-menu-list">
        <ul>
          {map(filter(types), item => (
            <li key={item['@id']}>
              <Link
                to={`${pathname}/add?type=${
                  item['@id'].split('@types/')[1]
                }`.replace(/\/\//g, '/')}
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
          ))}
        </ul>
      </div>
      {settings.isMultilingual &&
        (() => {
          const translationsLeft = filter(
            settings.supportedLanguages,
            lang =>
              !Boolean(
                find(content['@components'].translations.items, {
                  language: lang,
                }),
              ) && currentLanguage !== lang,
          );

          return (
            !isEmpty(translationsLeft) && (
              <>
                <header>
                  <FormattedMessage
                    id="Add Translation..."
                    defaultMessage="Add Translation..."
                  />
                </header>
                <div className="pastanaga-menu-list">
                  <ul>
                    {map(translationsLeft, lang => (
                      <li>
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
                              lang,
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
  state => ({
    types: filter(state.types.types, 'addable'),
    currentLanguage: state.intl.locale,
  }),
  {},
)(Types);
