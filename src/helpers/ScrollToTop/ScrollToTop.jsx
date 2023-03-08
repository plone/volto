import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '@plone/volto/registry';

/**
 *
 *
 * @class ScrollToTop
 * @extends {Component}
 */
class ScrollToTop extends React.Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    children: PropTypes.node.isRequired,
  };

  /**
   * @param {*} prevProps Previous Props
   * @returns {null} Null
   * @memberof ScrollToTop
   */
  componentDidUpdate(prevProps) {
    const noInitialBlocksFocus = // Do not scroll on /edit
      config.blocks?.initialBlocksFocus === null
        ? this.props.location?.pathname.slice(-5) !== '/edit'
        : true;
    if (
      !this.props.location?.hash &&
      !this.props.location?.pathname.hash &&
      noInitialBlocksFocus &&
      this.props.location?.pathname !== prevProps.location?.pathname
    ) {
      window.scrollTo(0, 0);
    }
  }

  /**
   * @returns {node} Children
   * @memberof ScrollToTop
   */
  render() {
    return this.props.children;
  }
}

export default connect(
  (state, props) => ({
    location: state.loadProtector.location,
  }),
  {},
)(ScrollToTop);
