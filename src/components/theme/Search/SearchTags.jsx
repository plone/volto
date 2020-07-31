/**
 * Search tags components.
 * @module components/theme/Search/SearchTags
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getVocabulary } from '@plone/volto/actions';

const vocabulary = 'plone.app.vocabularies.Keywords';

/**
 * Search tags container class.
 * @class SearchTags
 * @extends Component
 */
class SearchTags extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getVocabulary: PropTypes.func.isRequired,
    terms: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
      }),
    ).isRequired,
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  UNSAFE_componentWillMount() {
    this.props.getVocabulary(vocabulary);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return this.props.terms && this.props.terms.length > 0 ? (
      <div>
        {this.props.terms.map((term) => (
          <Link
            className="ui label"
            to={`/search?Subject=${term.title}`}
            key={term.title}
          >
            {term.title}
          </Link>
        ))}
      </div>
    ) : (
      <span />
    );
  }
}

export default connect(
  (state) => ({
    terms:
      state.vocabularies[vocabulary] && state.vocabularies[vocabulary].terms
        ? state.vocabularies[vocabulary].terms
        : [],
  }),
  { getVocabulary },
)(SearchTags);
