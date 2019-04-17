import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { join } from 'lodash';
import { searchContent } from '@plone/volto/actions';
import { Icon } from '@plone/volto/components';

import { settings } from '~/config';
import backSVG from '@plone/volto/icons/back.svg';
import pageSVG from '@plone/volto/icons/page.svg';
import folderSVG from '@plone/volto/icons/folder.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import rightArrowSVG from '@plone/volto/icons/right-key.svg';
import navSVG from '@plone/volto/icons/nav.svg';

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
    tile: PropTypes.string.isRequired,
    searchSubrequests: PropTypes.objectOf(PropTypes.any).isRequired,
    searchContent: PropTypes.func.isRequired,
    closeBrowser: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  state = {
    currentFolder: '/',
    parentFolder: '',
  };

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.searchContent(
      '/',
      {
        'path.depth': 1,
        // fullobjects: 1,
        sort_on: 'getObjPositionInParent',
        metadata_fields: '_all',
      },
      this.props.tile,
    );
  }

  getIcon = icon => {
    switch (icon) {
      case 'Folder':
        return <Icon name={folderSVG} size="24px" />;
      case 'Document':
        return <Icon name={pageSVG} size="24px" />;
      case 'Image':
        return <Icon name={pageSVG} size="24px" />;
      case 'File':
        return <Icon name={pageSVG} size="24px" />;
      default:
        return <Icon name={pageSVG} size="24px" />;
    }
  };

  navigateTo = id => {
    this.props.searchContent(
      id,
      {
        'path.depth': 1,
        // fullobjects: 1,
        sort_on: 'getObjPositionInParent',
        metadata_fields: '_all',
      },
      this.props.tile,
    );
    const parent = `/${join(id.split('/').slice(0, -1), '/')}`;
    this.setState(() => ({
      parentFolder: parent,
      currentFolder: id,
    }));
  };

  selectItem = id => {
    this.props.onSelectItem(`${settings.apiPath}${id}`);
    this.props.closeBrowser();
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <aside>
        <header className="header pulled">
          <div className="vertical divider" />
          {this.state.currentFolder === '/' ? (
            <Icon name={navSVG} size="24px" />
          ) : (
            <Icon
              name={backSVG}
              size="24px"
              onClick={() => this.navigateTo(this.state.parentFolder)}
            />
          )}
          <h2>Browser</h2>
          <button onClick={this.props.closeBrowser}>
            <Icon name={clearSVG} size="32px" color="#e40166" />
          </button>
        </header>
        <ul>
          {this.props.searchSubrequests[this.props.tile] &&
            this.props.searchSubrequests[this.props.tile].items.map(item => (
              <li
                key={item.id}
                onClick={() =>
                  item.is_folderish
                    ? this.navigateTo(item['@id'])
                    : this.selectItem(item['@id'])
                }
              >
                <span>
                  {this.getIcon(item['@type'])}
                  {item.id}
                </span>
                {item.is_folderish && <Icon name={rightArrowSVG} size="24px" />}
              </li>
            ))}
        </ul>
      </aside>
    );
  }
}

export default ObjectBrowser;
