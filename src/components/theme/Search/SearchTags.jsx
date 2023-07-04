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
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
      }),
    ).isRequired,
  };

  componentDidMount() {
    this.props.getVocabulary({ vocabNameOrURL: vocabulary });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return this.props.items && this.props.items.length > 0 ? (
      <div>
        {this.props.items.map((item) => (
          <Link
            className="ui label"
            to={`/search?Subject=${item.label}`}
            key={item.label}
          >
            {item.label}
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
    items:
      state.vocabularies[vocabulary] && state.vocabularies[vocabulary].items
        ? state.vocabularies[vocabulary].items
        : [],
  }),
  { getVocabulary },
)(SearchTags);
