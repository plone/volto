/**
 * Listing tile.
 * @module components/manage/Tiles/Listing/View
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchContent, resetSearchContent } from '../../../../actions';

@connect(
  state => ({
    searchSubrequests: state.search.subrequests,
  }),
  dispatch =>
    bindActionCreators(
      {
        searchContent,
        resetSearchContent,
      },
      dispatch,
    ),
)
/**
 * Listing tile class
 * @class View
 * @extends Component
 */
export default class View extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    tile: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    searchContent: PropTypes.func.isRequired,
    resetSearchContent: PropTypes.func.isRequired,
    searchSubrequests: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    searchSubrequests: {},
  };

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { query } = this.props.data;
    if (query) {
      // Use subrequests to fetch tile data
      this.props.searchContent('', query, this.props.tile);
    }
  }

  /**
   * Component will unmount. Reset loaded content.
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    this.props.resetSearchContent(this.props.tile);
  }

  render() {
    return <div className="tile listing" />;
  }
}
