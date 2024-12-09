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

  state = {
    isFirstClientUpdatePending: true,
  };
  /**
   * @param {*} prevProps Previous Props
   * @returns {null} Null
   * @memberof ScrollToTop
   */
  componentDidUpdate(prevProps) {
    // Skip the first client-side update that happens right after hydration
    if (this.state.isFirstClientUpdatePending) {
      this.setState({ isFirstClientUpdatePending: false });
      return;
    }

    const { location } = this.props;
    const noInitialBlocksFocus = // Do not scroll on /edit
      config.blocks?.initialBlocksFocus === null
        ? this.props.location?.pathname.slice(-5) !== '/edit'
        : true;

    const isHash = location?.hash || location?.pathname.hash;
    if (
      !isHash &&
      noInitialBlocksFocus &&
      location?.pathname !== prevProps.location?.pathname
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
