import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Input, Segment } from 'semantic-ui-react';
import { join } from 'lodash';
import { searchContent } from '@plone/volto/actions';
import { Icon, TextWidget } from '@plone/volto/components';
import cx from 'classnames';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';

import { settings } from '~/config';
import backSVG from '@plone/volto/icons/back.svg';
import checkSVG from '@plone/volto/icons/check.svg';
import pageSVG from '@plone/volto/icons/page.svg';
import folderSVG from '@plone/volto/icons/folder.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import rightArrowSVG from '@plone/volto/icons/right-key.svg';
import searchSVG from '@plone/volto/icons/zoom.svg';

const messages = defineMessages({
  ImageTileInputPlaceholder: {
    id: 'Browse or type URL',
    defaultMessage: 'Browse or type URL',
  },
});

function getParentURL(url) {
  return `${join(url.split('/').slice(0, -1), '/')}`.replace(
    settings.apiPath,
    '',
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
class ObjectBrowser extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    tile: PropTypes.string.isRequired,
    image: PropTypes.string,
    searchSubrequests: PropTypes.objectOf(PropTypes.any).isRequired,
    searchContent: PropTypes.func.isRequired,
    closeBrowser: PropTypes.func.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    image: '',
  };

  state = {
    currentFolder: this.props.image ? getParentURL(this.props.image) : '/',
    parentFolder: '',
    selectedItem: this.props.image.replace(settings.apiPath, '') || '',
    showSearchInput: false,
    alt: '',
    caption: '',
  };

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);

    if (this.state.selectedItem) {
      this.props.searchContent(
        getParentURL(this.state.selectedItem),
        {
          'path.depth': 1,
          // fullobjects: 1,
          sort_on: 'getObjPositionInParent',
          metadata_fields: '_all',
        },
        this.props.tile,
      );
    } else {
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
  }

  /**
   * Component will receive props
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  onChangeField = (name, value) => this.setState({ [name]: value });

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

  handleClickOutside = e => {
    if (
      this.objectBrowser &&
      doesNodeContainClick(this.objectBrowser.current, e)
    )
      return;
    this.props.closeBrowser();
  };

  objectBrowser = React.createRef();

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
    this.setState({ selectedItem: id });
    // this.props.closeBrowser();
  };

  toggleSearchInput = () =>
    this.setState(prevState => ({
      showSearchInput: !prevState.showSearchInput,
    }));

  onSearch = e => {
    const text = e.target.value;
    text.length > 2
      ? this.props.searchContent(
          '/',
          {
            SearchableText: `${text}*`,
            metadata_fields: '_all',
          },
          this.props.tile,
        )
      : this.props.searchContent(
          '/',
          {
            'path.depth': 1,
            // fullobjects: 1,
            sort_on: 'getObjPositionInParent',
            metadata_fields: '_all',
          },
          this.props.tile,
        );
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { alt, caption } = this.state;
    return (
      <aside ref={this.objectBrowser}>
        <Segment.Group raised>
          <header className="header pulled">
            <div className="vertical divider" />
            {this.state.currentFolder === '/' ? (
              <Icon name={folderSVG} size="24px" />
            ) : (
              <Icon
                name={backSVG}
                size="24px"
                onClick={() => this.navigateTo(this.state.parentFolder)}
              />
            )}
            {this.state.showSearchInput ? (
              <form>
                <Input
                  className="search"
                  onChange={this.onSearch}
                  placeholder={this.props.intl.formatMessage(
                    messages.ImageTileInputPlaceholder,
                  )}
                />
              </form>
            ) : (
              <React.Fragment>
                {this.state.currentFolder !== '/' ? (
                  <h2>{this.state.currentFolder}</h2>
                ) : (
                  <h2>Browser</h2>
                )}
              </React.Fragment>
            )}

            <button onClick={this.toggleSearchInput}>
              <Icon name={searchSVG} size="24px" />
            </button>
            <button onClick={this.props.closeBrowser}>
              {this.state.selectedItem ? (
                <Icon name={checkSVG} size="24px" color="#007EB1" />
              ) : (
                <Icon name={clearSVG} size="24px" color="#e40166" />
              )}
            </button>
          </header>
          <Segment secondary>{this.state.currentFolder}</Segment>
          <Segment as="ul">
            {this.props.searchSubrequests[this.props.tile] &&
              this.props.searchSubrequests[this.props.tile].items.map(item => (
                <li
                  key={item.id}
                  className={cx('', {
                    'selected-item': this.state.selectedItem === item['@id'],
                  })}
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
                  {item.is_folderish && (
                    <Icon name={rightArrowSVG} size="24px" />
                  )}
                </li>
              ))}
          </Segment>

          <Segment className="form actions">
            <TextWidget
              id="alt"
              title="alt"
              required={false}
              onChange={this.onChangeField}
              value={alt}
            />
            <TextWidget
              id="caption"
              title="caption"
              required={false}
              onChange={this.onChangeField}
              value={caption}
            />
          </Segment>
        </Segment.Group>
      </aside>
    );
  }
}

export default ObjectBrowser;
