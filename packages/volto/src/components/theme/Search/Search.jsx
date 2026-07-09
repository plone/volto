import { useEffect, useState, useCallback, useRef } from 'react';
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
import {
  getControlpanelSchemas,
  listControlpanels,
} from '@plone/volto/actions/controlpanels/controlpanels';
import { searchSettings } from '@plone/volto/components/manage/Controlpanels/utils';
import SearchTags from '@plone/volto/components/theme/Search/SearchTags';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import last from 'lodash/last';
import debounce from 'lodash/debounce';

import paginationLeftSVG from '@plone/volto/icons/left-key.svg';
import paginationRightSVG from '@plone/volto/icons/right-key.svg';

const messages = defineMessages({
  Search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

/**
 * Search class.
 * @class SearchComponent
 * @extends Component
 */
class Search extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    searchContent: PropTypes.func.isRequired,
    listControlpanels: PropTypes.func.isRequired,
    getControlpanelSchemas: PropTypes.func.isRequired,
    searchableText: PropTypes.string,
    subject: PropTypes.string,
    path: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        '@type': PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
    pathname: PropTypes.string.isRequired,
    controlpanels: PropTypes.array,
    schemas: PropTypes.object,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    items: [],
    searchableText: null,
    subject: null,
    path: null,
  };

  constructor(props) {
    super(props);
    this.defaultPageSize = config.settings.defaultPageSize;
    this.state = {
      currentPage: 1,
      isClient: false,
      active: 'relevance',
      settingsResults: [],
    };

    this.debouncedPerformSettingsSearch = debounce((query) => {
      this.performSettingsSearch(query);
    }, 300);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.loadControlpanelsAndSchemas();
    this.doSearch();
    this.setState({ isClient: true });
  }

  /**
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    this.debouncedPerformSettingsSearch.cancel();
  }

  /**
   * Load controlpanels and schemas for settings search
   * @method loadControlpanelsAndSchemas
   * @returns {undefined}
   */
  loadControlpanelsAndSchemas = () => {
    const { controlpanels, schemas } = this.props;

    const controlpanelsArray = Object.values(controlpanels || {});

    if (
      controlpanelsArray.length > 0 &&
      Object.keys(schemas || {}).length === 0
    ) {
      const panelIds = controlpanels.map((panel) => {
        const id = last(panel['@id']?.split('/')) || panel.id;
        return id;
      });
      this.props.getControlpanelSchemas(panelIds);
    }
  };

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (this.props.location.search !== nextProps.location.search) {
      this.doSearch();
    }

    if (
      nextProps.controlpanels &&
      nextProps.controlpanels.length > 0 &&
      Object.keys(nextProps.schemas || {}).length === 0 &&
      (!this.props.controlpanels || this.props.controlpanels.length === 0)
    ) {
      const panelIds = nextProps.controlpanels.map((panel) => {
        const id = last(panel['@id']?.split('/')) || panel.id;
        return id;
      });

      this.props.getControlpanelSchemas(panelIds);
    }
  };

  const items = useSelector((state) => state.search.items);
  const searchableText = qs.parse(location.search).SearchableText;
  const pathname = location.pathname;

  doSearch = () => {
    const options = qs.parse(this.props.history.location.search);
    const searchableText = options.SearchableText || '';
    this.setState({ currentPage: 1 });
    options['use_site_search_settings'] = 1;
    this.props.searchContent('', {
      b_size: this.defaultPageSize,
      ...options,
    });

    if (searchableText && searchableText.trim().length >= 2) {
      this.debouncedPerformSettingsSearch.cancel();
      this.debouncedPerformSettingsSearch(searchableText);
    } else {
      this.debouncedPerformSettingsSearch.cancel();
      this.setState({ settingsResults: [] });
    }
  };
  /**
   * @method performSettingsSearch
   * @param {string}
   * @returns {undefined}
   */
  performSettingsSearch = (query) => {
    const { controlpanels, schemas } = this.props;

    if (!controlpanels || !schemas || controlpanels.length === 0) {
      this.setState({ settingsResults: [] });
      return;
    }

    const settingsResults = searchSettings(controlpanels, schemas, query);

    this.setState({ settingsResults });
  };

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

  // Focus search results after they render
  const resultsRef = useRef();
  useEffect(() => {
    resultsRef.current?.focus();
  }, [items]);

  const options = qs.parse(location.search);

  return (
    <Container id="page-search">
      <Helmet title={intl.formatMessage(messages.Search)} />
      <div
        className="container"
        role="region"
        aria-live="polite"
        id="search-results"
        tabIndex={-1}
        ref={resultsRef}
      >
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
            </header>
            <section id="content-core">
              {this.state.settingsResults.length > 0 && (
                <div className="settings-search-results">
                  <h2 className="settings-results-header">
                    <FormattedMessage id="Settings" defaultMessage="Settings" />
                  </h2>
                  {this.state.settingsResults.map((panel) => (
                    <div className="settings-panel-group" key={panel.panelId}>
                      <h3 className="settings-panel-title">
                        <UniversalLink
                          href={panel.url}
                          className="summary url"
                          title={panel.group}
                        >
                          {panel.title}
                        </UniversalLink>
                      </h3>
                      <ul className="settings-matches-list">
                        {panel.matches.map((match, index) => (
                          <li
                            key={`${panel.panelId}-${index}`}
                            className="settings-match-item"
                          >
                            <UniversalLink
                              href={match.url}
                              className="settings-match-link"
                              style={{ display: 'block', width: '100%' }}
                            >
                              <div className="settings-match-row mb-10 ">
                                <h3 className="settings-match-key">
                                  {match.title}:
                                </h3>
                                <div className="settings-match-value">
                                  {match.value}
                                </div>
                              </div>
                            </UniversalLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              {this.props.items.map((item) => (
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

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      items: state.search.items,
      searchableText: qs.parse(props.history.location.search).SearchableText,
      pathname: props.location.pathname,
      controlpanels: state.controlpanels?.controlpanels || [],
      schemas: state.controlpanels?.schemas || {},
    }),
    {
      searchContent,
      listControlpanels,
      getControlpanelSchemas,
    },
  ),
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
