import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { useIntl, defineMessages, FormattedMessage } from 'react-intl';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import { asyncConnect } from '@plone/volto/helpers/AsyncConnect';
import { createPortal } from 'react-dom';
import { Container, Pagination, Button, Header } from 'semantic-ui-react';
import qs from 'query-string';
import classNames from 'classnames';
import config from '@plone/volto/registry';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { searchContent } from '@plone/volto/actions/search/search';
import SearchTags from '@plone/volto/components/theme/Search/SearchTags';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { useClient } from '@plone/volto/hooks/client/useClient';

import paginationLeftSVG from '@plone/volto/icons/left-key.svg';
import paginationRightSVG from '@plone/volto/icons/right-key.svg';

const messages = defineMessages({
  Search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

const Search = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const isClient = useClient();
  const { search } = props;

  const defaultPageSize = config.settings.defaultPageSize;

  const items = useSelector((state) => state.search.items);
  const searchableText = qs.parse(location.search).SearchableText;
  const pathname = location.pathname;

  const [currentPage, setCurrentPage] = useState(1);

  const handleQueryPaginationChange = useCallback(
    (e, { activePage }) => {
      window.scrollTo(0, 0);
      const options = qs.parse(location.search);
      options['use_site_search_settings'] = 1;

      setCurrentPage(activePage);
      dispatch(
        searchContent('', {
          b_size: defaultPageSize,
          ...options,
          b_start: (activePage - 1) * (options.b_size || defaultPageSize),
        }),
      );
    },
    [location.search, defaultPageSize, dispatch],
  );

  const onSortChange = useCallback(
    (event, sort_order) => {
      const options = qs.parse(location.search);
      options.sort_on = event.target.name;
      options.sort_order = sort_order || 'ascending';
      if (event.target.name === 'relevance') {
        delete options.sort_on;
        delete options.sort_order;
      }
      const searchParams = qs.stringify(options);
      history.replace({
        search: searchParams,
      });
    },
    [location.search, history],
  );

  const options = qs.parse(location.search);

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

            {search?.items_total > 0 ? (
              <div className="items_total">
                {search.items_total}{' '}
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
                        'button-active': options.sort_on === 'relevance',
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
                        'button-active': options.sort_on === 'sortable_title',
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
                        'button-active': options.sort_on === 'effective',
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

            {search?.batching && (
              <div className="search-footer">
                <Pagination
                  activePage={currentPage}
                  totalPages={Math.ceil(
                    search.items_total / (options.b_size || defaultPageSize),
                  )}
                  onPageChange={handleQueryPaginationChange}
                  firstItem={null}
                  lastItem={null}
                  prevItem={{
                    content: <Icon name={paginationLeftSVG} size="18px" />,
                    icon: true,
                    'aria-disabled': !search.batching.prev,
                    className: !search.batching.prev ? 'disabled' : null,
                  }}
                  nextItem={{
                    content: <Icon name={paginationRightSVG} size="18px" />,
                    icon: true,
                    'aria-disabled': !search.batching.next,
                    className: !search.batching.next ? 'disabled' : null,
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

export default asyncConnect([
  {
    key: 'search',
    promise: ({ location, store: { dispatch } }) =>
      dispatch(
        searchContent('', {
          b_size: config.settings.defaultPageSize,
          ...qs.parse(location.search),
          use_site_search_settings: 1,
        }),
      ),
  },
])(Search);
