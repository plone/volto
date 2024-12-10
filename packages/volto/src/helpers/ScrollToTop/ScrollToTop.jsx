import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '@plone/volto/registry';

class ScrollToTop extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.isInitialLoad = true; // Add a flag for the initial load
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const noInitialBlocksFocus =
      config.blocks?.initialBlocksFocus === null
        ? this.props.location?.pathname.slice(-5) !== '/edit'
        : true;

    const isHash = location?.hash || location?.pathname.hash;

    // Scroll only if it's not the initial load and other conditions are met
    if (
      !this.isInitialLoad && // Prevent scrolling on the initial load
      !isHash &&
      noInitialBlocksFocus &&
      location?.pathname !== prevProps.location?.pathname
    ) {
      window.scrollTo(0, 0);
    }

    // Reset the initial load flag after the first render
    this.isInitialLoad = false;
  }

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
