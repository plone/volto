import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from '@plone/volto/helpers';

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
    router: PropTypes.shape({
      location: PropTypes.shape({
        pathname: PropTypes.string,
      }),
    }).isRequired,
    children: PropTypes.node.isRequired,
  };

  /**
   * @param {*} prevProps Previous Props
   * @returns {null} Null
   * @memberof ScrollToTop
   */
  componentDidUpdate(prevProps) {
    if (
      this.props.router.location.pathname !== prevProps.router.location.pathname
    ) {
      window.scrollTo(0, 0);
    }
  }

  /**
   * @returns {node} Children
   * @memberof ScrollToTop
   */
  render() {
    console.log(this.props.router);
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
