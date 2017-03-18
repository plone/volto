/**
 * View container.
 * @module components/theme/View/View
 */

import React, { PropTypes, Component } from 'react';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';

import { getContent, getNavigation, getBreadcrumbs } from '../../../actions';
import { SummaryView, DocumentView } from '../../../components';
import { getBaseUrl } from '../../../helpers';

@asyncConnect(
  [
    {
      key: 'content',
      promise: ({ store: { dispatch, getState } }) =>
        dispatch(getContent(getState().routing.locationBeforeTransitions.pathname)),
    },
    {
      key: 'navigation',
      promise: ({ store: { dispatch, getState } }) =>
        dispatch(getNavigation(getBaseUrl(getState().routing.locationBeforeTransitions.pathname))),
    },
    {
      key: 'breadcrumbs',
      promise: ({ store: { dispatch, getState } }) =>
        dispatch(getBreadcrumbs(getBaseUrl(getState().routing.locationBeforeTransitions.pathname))),
    },
  ],
)
@connect(
  state => ({
    content: state.content.data,
    pathname: state.routing.locationBeforeTransitions.pathname,
  }), ({
    getContent,
  }),
)
/**
 * View container class.
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
    getContent: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    content: PropTypes.shape({
      '@type': PropTypes.string,
    }),
  }

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    content: null,
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getContent(this.props.pathname);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.getContent(nextProps.pathname);
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (!this.props.content) {
      return <span />;
    }

    switch (this.props.content['@type']) {
      case 'Folder':
        return <SummaryView content={this.props.content} />;
      case 'Document':
        return <DocumentView content={this.props.content} />;
      default:
        return <span />;
    }
  }
}

