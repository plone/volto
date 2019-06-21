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
class ObjectBrowser extends Component {
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
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.state = {
      currentFolder: this.props.data.url
        ? getParentURL(this.props.data.url)
        : '/',
      currentImageFolder: this.props.data.url
        ? getParentURL(this.props.data.url)
        : '/',
      currentLinkFolder: this.props.data.href
        ? getParentURL(this.props.data.href)
        : '/',
      parentFolder: '',
      selectedImage: this.props.data.url
        ? this.props.data.url.replace(settings.apiPath, '')
        : '',
      selectedHref: this.props.data.href
        ? this.props.data.href.replace(settings.apiPath, '')
        : '',
      showSearchInput: false,
      alt: this.props.data.alt,
      caption: this.props.data.caption,
      external: this.props.data.external,
      mode: 'image',
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
    this.initialSearch('image');
  }

  /**
   * Component will receive props
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  initialSearch = mode => {
    const currentSelected =
      mode === 'image' ? this.state.selectedImage : this.state.selectedHref;
    if (currentSelected) {
      this.props.searchContent(
        getParentURL(currentSelected),
        {
          'path.depth': 1,
          sort_on: 'getObjPositionInParent',
          metadata_fields: '_all',
        },
        `${this.props.tile}-${mode}`,
      );
    } else {
      this.props.searchContent(
        '/',
        {
          'path.depth': 1,
          sort_on: 'getObjPositionInParent',
          metadata_fields: '_all',
        },
        `${this.props.tile}-${mode}`,
      );
    }
  };

  onChangeField = (name, value) => {
    this.setState({ [name]: value });
    this.onChangeTileData(name, value);
  };

  getIcon = icon => {
    switch (icon) {
      case 'Folder':
        return <Icon name={folderSVG} size="24px" />;
      case 'Document':
        return <Icon name={pageSVG} size="24px" />;
      case 'Image':
        return <Icon name={imageSVG} size="24px" />;
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
        sort_on: 'getObjPositionInParent',
        metadata_fields: '_all',
      },
      `${this.props.tile}-${this.state.mode}`,
    );
    const parent = `${join(id.split('/').slice(0, -1), '/')}` || '/';
    this.setState(() => ({
      parentFolder: parent,
      currentFolder: id || '/',
    }));
  };

  toggleSearchInput = () =>
    this.setState(prevState => ({
      showSearchInput: !prevState.showSearchInput,
    }));

  toggleMode = () => {
    if (this.state.mode === 'image') {
      this.setState(state => ({
        mode: 'link',
        currentFolder: state.currentLinkFolder,
      }));
      this.initialSearch('link');
    } else {
      this.setState(state => ({
        mode: 'image',
        currentFolder: state.currentImageFolder,
      }));
    }
  };

  onSearch = e => {
    const text = e.target.value;
    text.length > 2
      ? this.props.searchContent(
          '/',
          {
            SearchableText: `${text}*`,
            metadata_fields: '_all',
          },
          `${this.props.tile}-${this.state.mode}`,
        )
      : this.props.searchContent(
          '/',
          {
            'path.depth': 1,
            sort_on: 'getObjPositionInParent',
            metadata_fields: '_all',
          },
          `${this.props.tile}-${this.state.mode}`,
        );
  };

  onSelectItem = url => {
    if (this.state.mode === 'image') {
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        url: `${settings.apiPath}${url}`,
      });
      this.setState({
        selectedImage: url,
        currentImageFolder: getParentURL(url),
      });
    } else {
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        href: url,
      });
      this.setState({
        selectedHref: url,
        currentLinkFolder: getParentURL(url),
      });
    }
  };

  onChangeTileData = (key, value) => {
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      [key]: value,
    });
  };

  handleClickOnItem = item => {
    if (this.state.mode === 'image') {
      if (item.is_folderish) {
        this.navigateTo(item['@id']);
      }
      if (settings.imageObjects.includes(item['@type'])) {
        this.onSelectItem(item['@id']);
      }
    } else {
      if (!this.state.external) {
        this.onSelectItem(item['@id']);
      }
    }
  };

  handleDoubleClickOnItem = item => {
    if (this.state.mode === 'image') {
      if (item.is_folderish) {
        this.navigateTo(item['@id']);
      }
      if (settings.imageObjects.includes(item['@type'])) {
        this.onSelectItem(item['@id']);
        this.props.closeBrowser();
      }
    } else {
      if (item.is_folderish && !this.state.external) {
        this.navigateTo(item['@id']);
      }
    }
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { alt, caption, external } = this.state;

    return ReactDOM.createPortal(
      <aside
        onClick={e => {
          e.stopPropagation();
        }}
        ref={this.objectBrowser}
        key="myuniquekey"
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
        className="object-browser-container"
      >
        <Segment.Group raised>
          <header className="header pulled">
            <div className="vertical divider" />
            {this.state.currentFolder === '/' ? (
              <>
                {this.state.mode === 'image' ? (
                  <Icon name={folderSVG} size="24px" />
                ) : (
                  <Icon name={linkSVG} size="24px" />
                )}
              </>
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
            ) : this.state.mode === 'image' ? (
              <h2>Add Image</h2>
            ) : (
              <h2>Add Link</h2>
            )}

            <button onClick={this.toggleSearchInput}>
              <Icon name={searchSVG} size="24px" />
            </button>
            <button onClick={this.props.closeBrowser}>
              <Icon name={clearSVG} size="24px" color="#e40166" />
            </button>
          </header>
          <Segment secondary>{this.state.currentFolder}</Segment>

          <Segment className="tabbed-actions">
            <Button.Group>
              <Button
                icon
                basic
                className={cx('', { active: this.state.mode === 'image' })}
                onClick={() => this.toggleMode('image')}
              >
                <Icon name={imageSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                className={cx('', { active: this.state.mode === 'link' })}
                onClick={() => this.toggleMode('link')}
              >
                <Icon name={linkSVG} size="24px" />
              </Button>
            </Button.Group>
          </Segment>

          <ObjectBrowserNav
            currentSearchResults={
              this.props.searchSubrequests[
                `${this.props.tile}-${this.state.mode}`
              ]
            }
            selected={
              this.state.mode === 'image'
                ? this.state.selectedImage
                : this.state.selectedHref
            }
            getIcon={this.getIcon}
            handleClickOnItem={this.handleClickOnItem}
            handleDoubleClickOnItem={this.handleDoubleClickOnItem}
            mode={this.state.mode}
            isExternalSelected={this.state.external}
          />

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
            <TextWidget
              id="external"
              title="external URL"
              required={false}
              onChange={this.onChangeField}
              value={external}
            />
          </Segment>
        </Segment.Group>
      </aside>,
      document.body,
    );
  }
}

export default ObjectBrowser;
