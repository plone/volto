import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from '@plone/volto/registry';

const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  // Handle scroll restoration manually
  window.history.scrollRestoration = 'manual';
}

const DefaultKey = 'init-enter';

const TIMEOUT = 10000;

const getScrollPage = () => {
  let docScrollTop = 0;
  if (document.documentElement && document.documentElement !== null) {
    docScrollTop = document.documentElement.scrollTop;
  }
  return window.pageYOffset || docScrollTop;
};

/**
 * @class ScrollToTop
 * @extends {Component}
 */
class ScrollToTop extends React.Component {
  clock;
  timer = 0;
  visitedUrl = new Map();
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
      hash: PropTypes.string,
      search: PropTypes.string,
    }).isRequired,
    history: PropTypes.object.isRequired,
    content: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.scrollTo = this.scrollTo.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.handlePopStateChange = this.handlePopStateChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopStateChange);
    this.handleRouteChange();
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopStateChange);
    clearInterval(this.clock);
  }
  /**
   * @param {*} prevProps Previous Props
   * @returns {null} Null
   * @memberof ScrollToTop
   */
  componentDidUpdate(prevProps) {
    this.handleRouteChange(prevProps);
  }
  /**
   * Scroll to top position triggered if content is loaded
   * @method scrollTo
   * @param {Number} top Top position
   * @returns {null} Null
   */
  scrollTo(top) {
    clearInterval(this.clock);
    this.timer = 0;
    this.clock = setInterval(() => {
      if (!this.props.content.get.loading || this.timer >= TIMEOUT) {
        window.requestAnimationFrame(() => {
          window.scrollTo({
            top,
            left: 0,
            behavior: config.settings.scrollBehavior,
          });
        });
        clearInterval(this.clock);
        this.timer = 0;
      }
      this.timer += 100;
    }, 100);
  }
  /**
   * Scroll to top position triggered if content is loaded
   * @method handleRouteChange
   * @param {Object} prevProps Previous Props
   * @returns {null} Null
   */
  handleRouteChange(prevProps) {
    const { location: prevLocation = {}, history = {} } = prevProps || {};
    const { location: nextLocation } = this.props;

    if (prevLocation === nextLocation) return;

    const key = prevLocation.key || DefaultKey;

    const hash =
      nextLocation.state?.volto_scroll_hash ||
      nextLocation.hash.substring(1) ||
      '';
    const offset = nextLocation.state?.volto_scroll_offset || 0;

    const locationChanged =
      nextLocation.pathname !== prevLocation.pathname && hash === '';

    const element = hash ? document.getElementById(hash) : null;

    const scroll = getScrollPage();

    if (locationChanged && history.action !== 'POP') {
      this.scrollTo(0);
      this.visitedUrl.set(key, scroll);
    } else if (element && history.action !== 'POP') {
      this.scrollTo(element.offsetTop - offset);
      this.visitedUrl.set(key, scroll);
    } else {
      this.visitedUrl.set(key, scroll);
    }
    return;
  }
  /**
   * Scroll restoration on popstate event
   * @method handlePopStateChange
   * @param {PopStateEvent} e Pop state event
   * @returns {null} Null
   */
  handlePopStateChange(e) {
    const { key = DefaultKey } = e.state || {};
    const existingRecord = this.visitedUrl.get(key);

    if (existingRecord !== undefined) {
      this.scrollTo(existingRecord);
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

export default connect((state) => ({
  content: state.content,
}))(withRouter(ScrollToTop));
