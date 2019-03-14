/**
 * Edit Hero tile.
 * @module components/manage/Tiles/Image/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { readAsDataURL } from 'promise-file-reader';
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { stateFromHTML } from 'draft-js-import-html';
import { Editor, DefaultDraftBlockRenderMap, EditorState } from 'draft-js';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

import { createContent } from '../../../../actions';
import { getBaseUrl } from '../../../../helpers';
import { Icon } from '../../../../components';

import trashSVG from '../../../../icons/delete.svg';
import clearSVG from '../../../../icons/clear.svg';
import { relative } from 'path';

const messages = defineMessages({
  title: {
    id: 'Subtitle',
    defaultMessage: 'Subtitle',
  },
  boldTitle: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Beschreibung',
    defaultMessage: 'Beschreibung',
  },
});

const blockTitleRenderMap = Map({
  unstyled: {
    element: 'h1',
  },
});

const blockDescriptionRenderMap = Map({
  unstyled: {
    element: 'p',
  },
});
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
  blockTitleRenderMap,
);
const extendedDescripBlockRenderMap = DefaultDraftBlockRenderMap.merge(
  blockDescriptionRenderMap,
);

@injectIntl
@connect(
  state => ({
    request: state.content.create,
    content: state.content.data,
  }),
  dispatch => bindActionCreators({ createContent }, dispatch),
)
/**
 * Edit image tile class.
 * @class Edit
 * @extends Component
 */
export default class EditHeroTile extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    tile: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    content: PropTypes.objectOf(PropTypes.any).isRequired,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeTile: PropTypes.func.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    onDeleteTile: PropTypes.func.isRequired,
    createContent: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    this.onUploadImage = this.onUploadImage.bind(this);
    this.state = {
      uploading: false,
    };

    if (!__SERVER__) {
      let titleEditorState;
      let boldTitleEditorState;
      let descriptionEditorState;
      if (props.data && props.data.title) {
        titleEditorState = EditorState.createWithContent(
          stateFromHTML(props.data.title),
        );
      } else {
        titleEditorState = EditorState.createEmpty();
      }
      if (props.data && props.data.boldTitle) {
        boldTitleEditorState = EditorState.createWithContent(
          stateFromHTML(props.data.boldTitle),
        );
      } else {
        boldTitleEditorState = EditorState.createEmpty();
      }
      if (props.data && props.data.description) {
        descriptionEditorState = EditorState.createWithContent(
          stateFromHTML(props.data.description),
        );
      } else {
        descriptionEditorState = EditorState.createEmpty();
      }
      this.state = {
        uploading: false,
        titleEditorState,
        boldTitleEditorState,
        descriptionEditorState,
      };
    }

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeBoldTitle = this.onChangeBoldTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (
      this.props.request.loading &&
      nextProps.request.loaded &&
      this.state.uploading
    ) {
      this.setState({
        uploading: false,
      });
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        url: nextProps.content['@id'],
      });
    }

    if (
      nextProps.data.title &&
      this.props.data.title !== nextProps.data.title &&
      !this.props.selected
    ) {
      const contentState = stateFromHTML(nextProps.data.title);
      this.setState({
        editorState: nextProps.data.title
          ? EditorState.createWithContent(contentState)
          : EditorState.createEmpty(),
      });
    }

    if (
      nextProps.data.boldTitle &&
      this.props.data.boldTitle !== nextProps.data.boldTitle &&
      !this.props.selected
    ) {
      const contentState = stateFromHTML(nextProps.data.boldTitle);
      this.setState({
        editorState: nextProps.data.boldTitle
          ? EditorState.createWithContent(contentState)
          : EditorState.createEmpty(),
      });
    }

    if (
      nextProps.data.description &&
      this.props.data.description !== nextProps.data.description &&
      !this.props.selected
    ) {
      const contentState = stateFromHTML(nextProps.data.description);
      this.setState({
        editorState: nextProps.data.description
          ? EditorState.createWithContent(contentState)
          : EditorState.createEmpty(),
      });
    }
  }

  /**
   * Change Title handler
   * @method onChangeTitle
   * @param {object} titleEditorState Editor state.
   * @returns {undefined}
   */
  onChangeTitle(titleEditorState) {
    this.setState({ titleEditorState }, () => {
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        title: titleEditorState.getCurrentContent().getPlainText(),
      });
    });
  }

  /**
   * Change BoldTitle handler
   * @method onChangeBoldTitle
   * @param {object} boldTitleEditorState Editor state.
   * @returns {undefined}
   */
  onChangeBoldTitle(boldTitleEditorState) {
    this.setState({ boldTitleEditorState }, () => {
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        boldTitle: boldTitleEditorState.getCurrentContent().getPlainText(),
      });
    });
  }

  /**
   * Change Description handler
   * @method onChangeDescription
   * @param {object} descriptionEditorState Editor state.
   * @returns {undefined}
   */
  onChangeDescription(descriptionEditorState) {
    this.setState({ descriptionEditorState }, () => {
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        description: descriptionEditorState.getCurrentContent().getPlainText(),
      });
    });
  }

  /**
   * Upload image handler
   * @method onUploadImage
   * @returns {undefined}
   */
  onUploadImage({ target }) {
    const file = target.files[0];
    this.setState({
      uploading: true,
    });
    readAsDataURL(file).then(data => {
      const fields = data.match(/^data:(.*);(.*),(.*)$/);
      this.props.createContent(getBaseUrl(this.props.pathname), {
        '@type': 'Image',
        image: {
          data: fields[3],
          encoding: fields[2],
          'content-type': fields[1],
          filename: file.name,
        },
      });
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (__SERVER__) {
      return <div />;
    }
    return (
      <div
        onClick={() => this.props.onSelectTile(this.props.tile)}
        className={['tile', 'hero', this.props.selected && 'selected']
          .filter(e => !!e)
          .join(' ')}
      >
        {this.props.selected &&
          !!this.props.data.url && (
            <div className="toolbar">
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={() =>
                    this.props.onChangeTile(this.props.tile, {
                      ...this.props.data,
                      url: '',
                    })
                  }
                >
                  <Icon name={clearSVG} size="24px" color="#e40166" />
                </Button>
              </Button.Group>
            </div>
          )}
        <div className="tile-inner-wrapper">
          {this.props.data.url ? (
            <img
              className="hero-image"
              src={`${this.props.data.url}/@@images/image`}
              alt=""
            />
          ) : (
            <div className="image-add">
              <Message className="image-message">
                {this.state.uploading && (
                  <Dimmer active>
                    <Loader indeterminate>Uploading image</Loader>
                  </Dimmer>
                )}
                <center>
                  <h4>Image</h4>
                  <p>Upload a new image</p>
                  <p>
                    <label className="ui button file">
                      Browse
                      <input
                        type="file"
                        onChange={this.onUploadImage}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </p>
                </center>
              </Message>
            </div>
          )}
          <div className="inline-tile-wrapper">
            <div className="inline-tile">
              <Editor
                onChange={this.onChangeBoldTitle}
                editorState={this.state.boldTitleEditorState}
                blockRenderMap={extendedBlockRenderMap}
                handleReturn={() => true}
                placeholder={this.props.intl.formatMessage(messages.boldTitle)}
                blockStyleFn={() => 'editor-bold-title'}
              />
              <Editor
                onChange={this.onChangeTitle}
                editorState={this.state.titleEditorState}
                blockRenderMap={extendedBlockRenderMap}
                handleReturn={() => true}
                placeholder={this.props.intl.formatMessage(messages.title)}
                blockStyleFn={() => 'editor-title'}
              />
            </div>
          </div>
        </div>
        {this.props.selected && (
          <Button
            icon
            basic
            onClick={() => this.props.onDeleteTile(this.props.tile)}
            className="tile-delete-button"
          >
            <Icon name={trashSVG} size="18px" />
          </Button>
        )}
      </div>
    );
  }
}
