import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { searchContent } from '@plone/volto/actions';

/**
 * ObjectBrowser container class.
 * @class ObjectBrowser
 * @extends Component
 */
@injectIntl
@connect(
  state => ({
    searchSubrequests: state.search.subrequests,
  }),
  { searchContent },
)
class ObjectBrowser extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    searchSubrequests: PropTypes.objectOf(PropTypes.any).isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Toolbar
   */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return <aside>I'm the otb</aside>;
  }
}

export default ObjectBrowser;
