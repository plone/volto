/**
 * Search component.
 * @module components/theme/Search/Search
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { asyncConnect } from 'redux-connect';
import { FormattedMessage } from 'react-intl';
import { Portal } from 'react-portal';
import { Container } from 'semantic-ui-react';
import qs from 'query-string';

import { searchContent } from '../../../actions';

import { SearchTags, Toolbar } from '../../../components';

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

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.searchContent('', {
      SearchableText: this.props.searchableText,
      ...(this.props.subject && {
        Subject: this.props.subject,
      }),
      ...(this.props.path && {
        path: this.props.path,
      }),
    });
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchableText !== this.props.searchableText) {
      this.props.searchContent('', {
        SearchableText: nextProps.searchableText,
        ...(this.props.subject && {
          Subject: this.props.subject,
        }),
        ...(this.props.path && {
          path: this.props.path,
        }),
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
      <Container id="page-search">
        <Helmet title="Search" />
        <div className="container">
          <article id="content">
            <header>
              <h1 className="documentFirstHeading">
                {this.props.searchableText ? (
                  <FormattedMessage
                    id="Search results for {term}"
                    defaultMessage="Search results for {term}"
                    values={{
                      term: <q>{this.props.searchableText}</q>,
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
        <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
          <Toolbar
            pathname={this.props.pathname}
            hideDefaultViewButtons
            inner={<span />}
          />
        </Portal>
      </Container>
    );
  }
}

export const __test__ = connect(
  (state, props) => ({
    items: state.search.items,
    searchableText: qs.parse(props.location.search).SearchableText,
    subject: qs.parse(props.location.search).Subject,
    path: qs.parse(props.location.search).path,
    pathname: props.location.pathname,
  }),
  { searchContent },
)(Search);

export default compose(
  connect(
    (state, props) => ({
      items: state.search.items,
      searchableText: qs.parse(props.location.search).SearchableText,
      subject: qs.parse(props.location.search).Subject,
      path: qs.parse(props.location.search).path,
      pathname: props.location.pathname,
    }),
    { searchContent },
  ),
  asyncConnect([
    {
      key: 'search',
      promise: ({ location, store: { dispatch } }) =>
        dispatch(
          searchContent('', {
            SearchableText: qs.parse(location.search).SearchableText,
            Subject: qs.parse(location.search).Subject,
          }),
        ),
    },
  ]),
)(Search);
