/**
 * Edit Hero block.
 * @module components/manage/Blocks/Image/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Map } from 'immutable';
import { readAsDataURL } from 'promise-file-reader';
import { Button, Dimmer, Loader, Message } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';

import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers';
import { createContent } from '@plone/volto/actions';
import { Icon } from '@plone/volto/components';

import clearSVG from '@plone/volto/icons/clear.svg';

import loadable from '@loadable/component';
const LibDraftJs = loadable.lib(() => import('draft-js'));
const LibDraftJsImportHtml = loadable.lib(() => import('draft-js-import-html'));

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  placeholder: {
    id: 'Upload a new image',
    defaultMessage: 'Upload a new image',
  },
});

const blockTitleRenderMap = Map({
  unstyled: {
    element: 'h1',
  },
});

const blockDescriptionRenderMap = Map({
  unstyled: {
    element: 'div',
  },
});

/**
 * Edit image block class.
 * @class Edit
 * @extends Component
 */
class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    block: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    content: PropTypes.objectOf(PropTypes.any).isRequired,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    createContent: PropTypes.func.isRequired,
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
      this.state = {
        uploading: false,
        titleEditorState: null,
        descriptionEditorState: null,
        currentFocused: 'title',
      };
    }

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
  }

  extendedBlockRenderMap = null;
  extendedDescripBlockRenderMap = null;

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.request.loading &&
      nextProps.request.loaded &&
      this.state.uploading
    ) {
      this.setState({
        uploading: false,
      });
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        url: nextProps.content['@id'],
      });
    }

    if (nextProps.selected !== this.props.selected) {
      if (this.state.currentFocused === 'title') {
        this.titleEditor.focus();
      } else {
        this.descriptionEditor.focus();
      }
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
      this.props.onChangeBlock(this.props.block, {
        ...this.props.data,
        title: titleEditorState.getCurrentContent().getPlainText(),
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
      this.props.onChangeBlock(this.props.block, {
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
    readAsDataURL(file).then((data) => {
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

  firstRender = true;

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (__SERVER__) {
      return <div />;
    }
    const placeholder =
      this.props.data.placeholder ||
      this.props.intl.formatMessage(messages.placeholder);
    return (
      <LibDraftJs>
        {({ Editor, EditorState, DefaultDraftBlockRenderMap }) => {
          return (
            <LibDraftJsImportHtml>
              {({ stateFromHTML }) => {
                if (!__SERVER__ && this.firstRender) {
                  this.firstRender = false;

                  this.extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
                    blockTitleRenderMap,
                  );

                  this.extendedDescripBlockRenderMap = DefaultDraftBlockRenderMap.merge(
                    blockDescriptionRenderMap,
                  );

                  let titleEditorState;
                  let descriptionEditorState;
                  if (this.props.data && this.props.data.title) {
                    titleEditorState = EditorState.createWithContent(
                      stateFromHTML(this.props.data.title),
                    );
                  } else {
                    titleEditorState = EditorState.createEmpty();
                  }
                  if (this.props.data && this.props.data.description) {
                    descriptionEditorState = EditorState.createWithContent(
                      stateFromHTML(this.props.data.description),
                    );
                  } else {
                    descriptionEditorState = EditorState.createEmpty();
                  }

                  this.setState({
                    uploading: false,
                    titleEditorState,
                    descriptionEditorState,
                    currentFocused: 'title',
                  });
                }

                return (
                  this.state.titleEditorState &&
                  this.state.descriptionEditorState && (
                    <div
                      className={cx('block hero', {
                        selected: this.props.selected,
                      })}
                    >
                      {this.props.selected && !!this.props.data.url && (
                        <div className="toolbar">
                          <Button.Group>
                            <Button
                              icon
                              basic
                              onClick={() =>
                                this.props.onChangeBlock(this.props.block, {
                                  ...this.props.data,
                                  url: '',
                                })
                              }
                            >
                              <Icon
                                name={clearSVG}
                                size="24px"
                                color="#e40166"
                              />
                            </Button>
                          </Button.Group>
                        </div>
                      )}
                      <div className="block-inner-wrapper">
                        {this.props.data.url ? (
                          <img
                            className="hero-image"
                            src={`${flattenToAppURL(
                              this.props.data.url,
                            )}/@@images/image`}
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
                                <p>{placeholder}</p>
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
                        <div className="hero-body">
                          <Editor
                            ref={(node) => {
                              this.titleEditor = node;
                              if (this.props.selected && this.titleEditor) {
                                this.titleEditor.focus();
                              }
                            }}
                            onChange={this.onChangeTitle}
                            editorState={this.state.titleEditorState}
                            blockRenderMap={this.extendedBlockRenderMap}
                            handleReturn={() => true}
                            placeholder={this.props.intl.formatMessage(
                              messages.title,
                            )}
                            blockStyleFn={() => 'title-editor'}
                            onUpArrow={() => {
                              const selectionState = this.state.titleEditorState.getSelection();
                              const { titleEditorState } = this.state;
                              if (
                                titleEditorState
                                  .getCurrentContent()
                                  .getBlockMap()
                                  .first()
                                  .getKey() === selectionState.getFocusKey()
                              ) {
                                this.props.onFocusPreviousBlock(
                                  this.props.block,
                                  this.props.blockNode.current,
                                );
                              }
                            }}
                            onDownArrow={() => {
                              const selectionState = this.state.titleEditorState.getSelection();
                              const { titleEditorState } = this.state;
                              // if (
                              //   titleEditorState
                              //     .getCurrentContent()
                              //     .getBlockMap()
                              //     .last()
                              //     .getKey() === selectionState.getFocusKey()
                              // ) {
                              this.setState(
                                () => ({
                                  currentFocused: 'description',
                                }),
                                () => {
                                  debugger;
                                  this.descriptionEditor.focus();
                                },
                              );
                              //   }
                              // }}
                            }}
                          />
                          <Editor
                            ref={(node) => {
                              this.descriptionEditor = node;
                            }}
                            onChange={this.onChangeDescription}
                            editorState={this.state.descriptionEditorState}
                            blockRenderMap={this.extendedDescripBlockRenderMap}
                            handleReturn={() => true}
                            placeholder={this.props.intl.formatMessage(
                              messages.description,
                            )}
                            blockStyleFn={() => 'description-editor'}
                            onUpArrow={() => {
                              const selectionState = this.state.descriptionEditorState.getSelection();
                              const currentCursorPosition = selectionState.getStartOffset();

                              if (currentCursorPosition === 0) {
                                this.setState(
                                  () => ({
                                    currentFocused: 'title',
                                  }),
                                  () => {
                                    this.titleEditor.focus();
                                  },
                                );
                              }
                            }}
                            onDownArrow={() => {
                              const selectionState = this.state.descriptionEditorState.getSelection();
                              const { descriptionEditorState } = this.state;
                              const currentCursorPosition = selectionState.getStartOffset();
                              const blockLength = descriptionEditorState
                                .getCurrentContent()
                                .getFirstBlock()
                                .getLength();

                              if (currentCursorPosition === blockLength) {
                                this.props.onFocusNextBlock(
                                  this.props.block,
                                  this.props.blockNode.current,
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                );
              }}
            </LibDraftJsImportHtml>
          );
        }}
      </LibDraftJs>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      request: state.content.create,
      content: state.content.data,
    }),
    { createContent },
  ),
)(Edit);
