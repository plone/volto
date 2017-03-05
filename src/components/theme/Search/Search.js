/**
 * Search component.
 * @module components/theme/Search/Search
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import { searchContent } from 'actions';

@connect(
  state => ({
    loaded: state.search.loaded,
    error: state.search.error,
    items: state.search.items,
    location: state.routing.location,
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
    location: PropTypes.object,
    loaded: PropTypes.bool.isRequired,
    error: PropTypes.object,
    items: PropTypes.array,
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.searchContent(this.props.location.query.SearchableText);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.SearchableText !== this.props.location.query.SearchableText) {
      this.props.getContent(nextProps.location.query.SearchableText);
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
              <h1 className="documentFirstHeading">Search results for <strong>{this.props.location.query.SearchableText}</strong></h1>
            </header>
            <section id="content-core">
              {this.props.items.map(item =>
                <article className="tileItem"
                         key={item['@id']}>
                  <h2 className="tileHeadline">
                    <Link to={item['@id']}
                          className="summary url"
                          title={item['@type']}>
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
                  <div className="visualClear"> </div>
                </article>
              )}
            </section>
          </article>
        </div>
      </div>
    );
  }
}
