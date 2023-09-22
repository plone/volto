/**
 * Search component.
 * @module components/theme/Search/Search
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { UniversalLink } from '@plone/volto/components';
import { asyncConnect } from '@plone/volto/helpers';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Portal } from 'react-portal';
import { Container, Pagination, Button, Header } from 'semantic-ui-react';
import qs from 'query-string';
import classNames from 'classnames';
import config from '@plone/volto/registry';
import { Helmet } from '@plone/volto/helpers';
import { searchContent } from '@plone/volto/actions';
import { SearchTags, Toolbar, Icon } from '@plone/volto/components';

import paginationLeftSVG from '@plone/volto/icons/left-key.svg';
import paginationRightSVG from '@plone/volto/icons/right-key.svg';

const Search = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const [activeSort, setActiveSort] = useState('relevance');

  useEffect(() => {
    doSearch();
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (props.location.search !== props.history.location.search) {
      doSearch();
    }
  }, [props.location.search]);

  const doSearch = () => {
    const options = qs.parse(props.history.location.search);
    setCurrentPage(1);
    options['use_site_search_settings'] = 1;
    props.searchContent('', options);
  };

  const handleQueryPaginationChange = (e, { activePage }) => {
    const { settings } = config;
    window.scrollTo(0, 0);
    let options = qs.parse(props.history.location.search);
    options['use_site_search_settings'] = 1;

    setCurrentPage(activePage);
    props.searchContent('', {
      ...options,
      b_start: (activePage - 1) * settings.defaultPageSize,
    });
  };

  const onSortChange = (event, sort_order) => {
    let options = qs.parse(props.history.location.search);
    options.sort_on = event.target.name;
    options.sort_order = sort_order || 'ascending';
    if (event.target.name === 'relevance') {
      delete options.sort_on;
      delete options.sort_order;
    }
    let searchParams = qs.stringify(options);
    setCurrentPage(1);
    setActiveSort(event.target.name);
    props.history.replace({
      search: searchParams,
    });
  };

  const { settings } = config;

  return (
    <Container id="page-search">
      <Helmet title={props.intl.formatMessage(messages.Search)} />
      <div className="container">
        <article id="content">
          <header>
            <h1 className="documentFirstHeading">
              {props.searchableText ? (
                <FormattedMessage
                  id="Search results for {term}"
                  defaultMessage="Search results for {term}"
                  values={{
                    term: <q>{props.searchableText}</q>,
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
                      <FormattedMessage id="Sort By:" defaultMessage="Sort by:" />
                    </div>
                    <Button
                      onClick={(event) => {
                        onSortChange(event);
                      }}
                      name="relevance"
                      size="tiny"
                      className={classNames('button-sort', {
                        'button-active': activeSort === 'relevance',
                      })}
                    >
                      <FormattedMessage id="Relevance" defaultMessage="Relevance" />
                    </Button>
                    <Button
                      onClick={(event) => {
                        onSortChange(event);
                      }}
                      name="sortable_title"
                      size="tiny"
                      className={classNames('button-sort', {
                        'button-active': activeSort === 'sortable_title',
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
                        'button-active': activeSort === 'effective',
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
                <FormattedMessage id="No results found" defaultMessage="No results found" />
              </div>
            )}
          </header>
          <section id="content-core">
            {props.items.map((item) => (
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
                    <FormattedMessage id="Read More…" defaultMessage="Read More…" />
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
                    props.search.items_total / settings.defaultPageSize
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
      {isClient && (
        <Portal node={document.getElementById('toolbar')}>
          <Toolbar
            pathname={props.pathname}
            hideDefaultViewButtons
            inner={<span />}
          />
        </Portal>
      )}
    </Container>
  );
};

Search.propTypes = {
  searchContent: PropTypes.func.isRequired,
  searchableText: PropTypes.string,
  subject: PropTypes.string,
  path: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      '@id': PropTypes.string,
      '@type': PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  pathname: PropTypes.string.isRequired,
};

Search.defaultProps = {
  items: [],
  searchableText: null,
  subject: null,
  path: null,
};

const mapStateToProps = (state, props) => ({
  items: state.search.items,
  searchableText: qs.parse(props.history.location.search).SearchableText,
  pathname: props.history.location.pathname,
});

export const SearchComponent = compose(
  injectIntl,
  connect(mapStateToProps, { searchContent })
)(Search);

export default compose(
  injectIntl,
  connect(mapStateToProps, { searchContent }),
  asyncConnect([
    {
      key: 'search',
      promise: ({ location, store: { dispatch } }) =>
        dispatch(
          searchContent('', {
            ...qs.parse(location.search),
            use_site_search_settings: 1,
          })
        ),
    },
  ])
)(Search);
