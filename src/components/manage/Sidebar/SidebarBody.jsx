import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Button, Input, Segment } from 'semantic-ui-react';
import { join } from 'lodash';
import { searchContent } from '@plone/volto/actions';
import { Icon, TextWidget } from '@plone/volto/components';
import cx from 'classnames';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';

import { settings } from '~/config';
import backSVG from '@plone/volto/icons/back.svg';
import pageSVG from '@plone/volto/icons/page.svg';
import folderSVG from '@plone/volto/icons/folder.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import searchSVG from '@plone/volto/icons/zoom.svg';
import linkSVG from '@plone/volto/icons/link.svg';
import imageSVG from '@plone/volto/icons/image.svg';

import ObjectBrowserNav from './ObjectBrowserNav';

const messages = defineMessages({
  ImageTileInputPlaceholder: {
    id: 'Browse or type URL',
    defaultMessage: 'Browse or type URL',
  },
});

function getParentURL(url) {
  return (
    `${join(url.split('/').slice(0, -1), '/')}`.replace(settings.apiPath, '') ||
    '/'
  );
}

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
class SidebarBody extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    tile: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    searchSubrequests: PropTypes.objectOf(PropTypes.any).isRequired,
    searchContent: PropTypes.func.isRequired,
    closeBrowser: PropTypes.func.isRequired,
    onChangeTile: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    image: '',
    href: '',
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return ReactDOM.createPortal(
      <aside
        onClick={e => {
          e.stopPropagation();
        }}
        ref={this.sidebar}
        key="volto-sidebar"
        style={{
          height: '100vh',
          position: 'fixed',
          top: 0,
          right: 0,
          zIndex: 100,
          width: '320px',
          backgroundColor: '#fff',
          boxShadow: '0 1px 2px 0 #c7d5d8',
        }}
        className="sidebar-container"
      >
        Hello
      </aside>,
      document.body,
    );
  }
}

export default SidebarBody;
