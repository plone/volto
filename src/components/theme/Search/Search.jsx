/**
 * Search component.
 * @module components/theme/Search/Search
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import { searchContent } from '../../../actions';

@connect(
  state => ({
    loaded: state.search.loaded,
    items: state.search.items,
    searchableText: state.routing.location.query.SearchableText,
  }),
  dispatch => bindActionCreators({ searchContent }, dispatch),
)
/**
 * Search component class.
 * @class Search
 * @extends Component
 */
export default class Search extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    searchContent: PropTypes.func.isRequired,
    searchableText: PropTypes.string.isRequired,
    loaded: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      '@id': PropTypes.string,
      '@type': PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
    })),
  }

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    items: [],
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.searchContent(this.props.searchableText);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchableText !== this.props.searchableText) {
      this.props.searchContent(nextProps.searchableText);
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (!this.props.loaded) {
      return <span />;
    }

    return (
      <div id="page-search">
        <Helmet title="Search" />
        <div className="container">
          <article id="content">
            <header>
              <h1 className="documentFirstHeading">Search results for <strong>{this.props.searchableText}</strong></h1>
            </header>
            <section id="content-core">
              {this.props.items.map(item =>
                <article
                  className="tileItem"
                  key={item['@id']}
                >
                  <h2 className="tileHeadline">
                    <Link
                      to={item['@id']}
                      className="summary url"
                      title={item['@type']}
                    >
                      {item.title}
                    </Link>
                  </h2>
                  {item.description &&
                    <div className="tileBody">
                      <span className="description">{item.description}</span>
                    </div>
                  }
                  <div className="tileFooter">
                    <Link to={item['@id']}>
                      Read More…
                    </Link>
                  </div>
                  <div className="visualClear" />
                </article>,
              )}
            </section>
          </article>
        </div>
      </div>
    );
  }
}
