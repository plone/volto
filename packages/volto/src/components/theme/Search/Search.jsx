/**
 * Search component.
 * @module components/theme/Search/Search
 */

import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { compose } from 'redux';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import { asyncConnect } from '@plone/volto/helpers/AsyncConnect';
import { FormattedMessage } from 'react-intl';
import { createPortal } from 'react-dom';
import { Container, Pagination, Button, Header } from 'semantic-ui-react';
import qs from 'query-string';
import classNames from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import config from '@plone/volto/registry';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { searchContent } from '@plone/volto/actions/search/search';
import SearchTags from '@plone/volto/components/theme/Search/SearchTags';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Icon from '@plone/volto/components/theme/Icon/Icon';

import paginationLeftSVG from '@plone/volto/icons/left-key.svg';
import paginationRightSVG from '@plone/volto/icons/right-key.svg';

const messages = defineMessages({
  Search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

/**
 * Search component.
 * @function Search
 */
function Search(props) {
  const intl = useIntl();

  const { searchableText, items, pathname } = props;

  const dispatch = useDispatch();
  const defaultPageSize = config.settings.defaultPageSize;
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState('relevance');
  const [isClient, setIsClient] = useState(false);
  const history = props.history;

  const doSearch = useCallback(() => {
    const options = qs.parse(props.history.location.search);
    setCurrentPage(1);
    options['use_site_search_settings'] = 1;
    dispatch(
      searchContent('', {
        b_size: defaultPageSize,
        ...options,
      }),
    );
  }, [dispatch, defaultPageSize, props.history]);

  useEffect(() => {
    doSearch();
    setIsClient(true);
  }, [doSearch]);

  useEffect(() => {
    if (isClient) {
      doSearch();
    }
  }, [props.location.search, isClient, doSearch]);

  /**
   * Search based on the given searchableText, subject and path.
   * @method doSearch
   * @param {string} searchableText The searchable text string
   * @param {string} subject The subject (tag)
   * @param {string} path The path to restrict the search to
   * @returns {undefined}
   */

  const handleQueryPaginationChange = (e, { activePage }) => {
    window.scrollTo(0, 0);
    let options = qs.parse(history.location.search);
    options['use_site_search_settings'] = 1;

    setCurrentPage(activePage);
    dispatch(
      searchContent('', {
        b_size: defaultPageSize,
        ...options,
        b_start: (activePage - 1) * (options.b_size || defaultPageSize),
      }),
    );
  };

  const onSortChange = (event, sort_order) => {
    let options = qs.parse(history.location.search);
    options.sort_on = event.target.name;
    options.sort_order = sort_order || 'ascending';
    if (event.target.name === 'relevance') {
      delete options.sort_on;
      delete options.sort_order;
    }
    let searchParams = qs.stringify(options);
    setCurrentPage(1);
    setActive(event.target.name);
    history.replace({
      search: searchParams,
    });
  };

  const options = qs.parse(props.history.location.search);

  return (
    <Container id="page-search">
      <Helmet title={intl.formatMessage(messages.Search)} />
      <div className="container">
        <article id="content">
          <header>
            <h1 className="documentFirstHeading">
              {searchableText ? (
                <FormattedMessage
                  id="Search results for {term}"
                  defaultMessage="Search results for {term}"
                  values={{
                    term: <q>{searchableText}</q>,
                  }}
                />
              ) : (
                <FormattedMessage
                  id="Search results"
                  defaultMessage="Search results"
                />
              )}
            </h1>

            <SearchTags />

            {props.search?.items_total > 0 ? (
              <div className="items_total">
                {props.search.items_total}{' '}
                <FormattedMessage id="results found" defaultMessage="results" />
                <Header>
                  <Header.Content className="header-content">
                    <div className="sort-by">
                      <FormattedMessage
                        id="Sort By:"
                        defaultMessage="Sort by:"
                      />
                    </div>
                    <Button
                      onClick={(event) => {
                        onSortChange(event);
                      }}
                      name="relevance"
                      size="tiny"
                      className={classNames('button-sort', {
                        'button-active': active === 'relevance',
                      })}
                    >
                      <FormattedMessage
                        id="Relevance"
                        defaultMessage="Relevance"
                      />
                    </Button>
                    <Button
                      onClick={(event) => {
                        onSortChange(event);
                      }}
                      name="sortable_title"
                      size="tiny"
                      className={classNames('button-sort', {
                        'button-active': active === 'sortable_title',
                      })}
                    >
                      <FormattedMessage
                        id="Alphabetically"
                        defaultMessage="Alphabetically"
                      />
                    </Button>
                    <Button
                      onClick={(event) => {
                        onSortChange(event, 'reverse');
                      }}
                      name="effective"
                      size="tiny"
                      className={classNames('button-sort', {
                        'button-active': active === 'effective',
                      })}
                    >
                      <FormattedMessage
                        id="Date (newest first)"
                        defaultMessage="Date (newest first)"
                      />
                    </Button>
                  </Header.Content>
                </Header>
              </div>
            ) : (
              <div>
                <FormattedMessage
                  id="No results found"
                  defaultMessage="No results found"
                />
              </div>
            )}
          </header>
          <section id="content-core">
            {items.map((item) => (
              <article className="tileItem" key={item['@id']}>
                <h2 className="tileHeadline">
                  <UniversalLink
                    item={item}
                    className="summary url"
                    title={item['@type']}
                  >
                    {item.title}
                  </UniversalLink>
                </h2>
                {item.description && (
                  <div className="tileBody">
                    <span className="description">{item.description}</span>
                  </div>
                )}
                <div className="tileFooter">
                  <UniversalLink item={item}>
                    <FormattedMessage
                      id="Read More…"
                      defaultMessage="Read More…"
                    />
                  </UniversalLink>
                </div>
                <div className="visualClear" />
              </article>
            ))}

            {props.search?.batching && (
              <div className="search-footer">
                <Pagination
                  activePage={currentPage}
                  totalPages={Math.ceil(
                    props.search.items_total /
                      (options.b_size || defaultPageSize),
                  )}
                  onPageChange={handleQueryPaginationChange}
                  firstItem={null}
                  lastItem={null}
                  prevItem={{
                    content: <Icon name={paginationLeftSVG} size="18px" />,
                    icon: true,
                    'aria-disabled': !props.search.batching.prev,
                    className: !props.search.batching.prev ? 'disabled' : null,
                  }}
                  nextItem={{
                    content: <Icon name={paginationRightSVG} size="18px" />,
                    icon: true,
                    'aria-disabled': !props.search.batching.next,
                    className: !props.search.batching.next ? 'disabled' : null,
                  }}
                />
              </div>
            )}
          </section>
        </article>
      </div>
      {isClient &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={<span />}
          />,
          document.getElementById('toolbar'),
        )}
    </Container>
  );
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */

Search.propTypes = {
  searchableText: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      '@id': PropTypes.string,
      '@type': PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    }),
  ),
  pathname: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  search: PropTypes.object,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */

Search.defaultProps = {
  items: [],
  searchableText: null,
};

export const __test__ = Search;

export default compose(
  asyncConnect([
    {
      key: 'search',
      promise: ({ location, store: { dispatch } }) =>
        dispatch(
          searchContent('', {
            ...qs.parse(location.search),
            use_site_search_settings: 1,
          }),
        ),
    },
  ]),
)(Search);
