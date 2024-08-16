import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { UniversalLink } from '@plone/volto/components';
import { asyncConnect, usePrevious } from '@plone/volto/helpers';
import { FormattedMessage } from 'react-intl';
import { createPortal } from 'react-dom';
import { Container, Pagination, Button, Header } from 'semantic-ui-react';
import qs from 'query-string';
import { compose } from 'redux';
import classNames from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import config from '@plone/volto/registry';
import { Helmet } from '@plone/volto/helpers';
import { searchContent } from '@plone/volto/actions';
import { SearchTags, Toolbar, Icon } from '@plone/volto/components';

import paginationLeftSVG from '@plone/volto/icons/left-key.svg';
import paginationRightSVG from '@plone/volto/icons/right-key.svg';
import { useClient } from '@plone/volto/hooks';
import { useHistory } from 'react-router-dom';

const messages = defineMessages({
  Search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

const Search = (props) => {
  const intl = useIntl();
  const defaultPageSize = config.settings.defaultPageSize;
  const dispatch = useDispatch();
  const isClient = useClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState('relevance');
  const [searchParams, setSearchParams] = useState();
  const history = useHistory();
  const location = props.history;
  const { pathname, search } = location;

  const items = useSelector((state) => state.search?.items);
  const searchableText = qs.parse(search).SearchableText;
  const prevSearch = usePrevious(search);

  const doSearch = useCallback(() => {
    const options = qs.parse(search);
    setCurrentPage(1);
    options['use_site_search_settings'] = 1;
    dispatch(
      searchContent('', {
        b_size: defaultPageSize,
        ...options,
      }),
    );
  }, [defaultPageSize, dispatch, search]);

  useEffect(() => {
    doSearch();
  });

  useEffect(() => {
    if (prevSearch !== search) {
      doSearch();
    }
  }, [search, prevSearch, doSearch]);

  useEffect(() => {
    history.replace({ search: searchParams });
  }, [active, currentPage, searchParams, history]);

  const handleQueryPaginationChange = (e, { activePage }) => {
    window.scrollTo(0, 0);
    let options = qs.parse(search);
    options['use_site_search_settings'] = 1;
    setCurrentPage(activePage);
    dispatch(
      searchContent('', {
        b_size: defaultPageSize,
        ...options,
        b_start: (currentPage - 1) * (options.b_size || defaultPageSize),
      }),
    );
  };

  const onSortChange = (event, sort_order) => {
    let options = qs.parse(search);
    options.sort_on = event.target.name;
    options.sort_order = sort_order || 'ascending';
    if (event.target.name === 'relevance') {
      delete options.sort_on;
      delete options.sort_order;
    }
    let searchParams = qs.stringify(options);
    setSearchParams(searchParams);
    setCurrentPage(1);
    setActive(event.target.name);
  };

  const options = qs.parse(search);

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
            {items
              ? items.map((item) => (
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
                ))
              : ''}

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

Search.propTypes = {
  subject: PropTypes.string,
  path: PropTypes.string,
  pathname: PropTypes.string.isRequired,
};

Search.defaultProps = {
  subject: null,
  path: null,
};
