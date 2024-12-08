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
  constructor(props) {
    super(props);
    this.isClientSide = false;
    this.isFirstClientUpdatePending = true;
  }

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
   * Used to indicate client-side rendering
   * @memberof ScrollToTop
   */
  componentDidMount() {
    this.isClientSide = true;
  }

  /**
   * @param {*} prevProps Previous Props
   * @returns {null} Null
   * @memberof ScrollToTop
   */
  componentDidUpdate(prevProps) {
    // avoid scrollToTop during SSR
    if (!this.isClientSide) {
      return;
    }
    // Skip the first client-side update that happens right after hydration
    if (this.isFirstClientUpdatePending) {
      this.isFirstClientUpdatePending = false;
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
