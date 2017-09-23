/**
 * Search component.
 * @module components/theme/Search/Search
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { asyncConnect } from 'redux-connect';
import { FormattedMessage } from 'react-intl';

import { searchContent } from '../../../actions';

@connect(
  (state, props) => ({
    items: state.search.items,
    searchableText: props.location.query.SearchableText,
    path: props.location.query.path,
  }),
  dispatch => bindActionCreators({ searchContent }, dispatch),
)
/**
 * Component to display the search view.
 * @class SearchComponent
 * @extends Component
 */
export class SearchComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    /**
     * Action to search for content
     */
    searchContent: PropTypes.func.isRequired,
    /**
     * Text to search for
     */
    searchableText: PropTypes.string,
    /**
     * Path used to search for items
     */
    path: PropTypes.string,
    /**
     * Search result items
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Id of the item
         */
        '@id': PropTypes.string,
        /**
         * Type of the item
         */
        '@type': PropTypes.string,
        /**
         * Title of the item
         */
        title: PropTypes.string,
        /**
         * Description of the item
         */
        description: PropTypes.string,
      }),
    ),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    items: [],
    searchableText: null,
    path: null,
  };

  /**
   * Component will mount
   * @method componentWillMount
   */
  componentWillMount() {
    this.props.searchContent('', {
      SearchableText: this.props.searchableText,
      path: this.props.path,
    });
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchableText !== this.props.searchableText) {
      this.props.searchContent('', {
        SearchableText: nextProps.searchableText,
        path: this.props.path,
      });
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div id="page-search">
        <Helmet title="Search" />
        <div className="container">
          <article id="content">
            <header>
              <h1 className="documentFirstHeading">
                <FormattedMessage
                  id="Search results for {term}"
                  defaultMessage="Search results for {term}"
                  values={{
                    term: <q>{this.props.searchableText}</q>,
                  }}
                />
              </h1>
            </header>
            <section id="content-core">
              {this.props.items.map(item => (
                <article className="tileItem" key={item['@id']}>
                  <h2 className="tileHeadline">
                    <Link
                      to={item['@id']}
                      className="summary url"
                      title={item['@type']}
                    >
                      {item.title}
                    </Link>
                  </h2>
                  {item.description && (
                    <div className="tileBody">
                      <span className="description">{item.description}</span>
                    </div>
                  )}
                  <div className="tileFooter">
                    <Link to={item['@id']}>
                      <FormattedMessage
                        id="Read More…"
                        defaultMessage="Read More…"
                      />
                    </Link>
                  </div>
                  <div className="visualClear" />
                </article>
              ))}
            </section>
          </article>
        </div>
      </div>
    );
  }
}

export default asyncConnect([
  {
    key: 'search',
    promise: ({ location, store: { dispatch } }) =>
      dispatch(
        searchContent('', { SearchableText: location.query.SearchableText }),
      ),
  },
])(SearchComponent);
