/**
 * Edit text tile.
 * @module components/manage/Tiles/Title/Edit
 */

import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import Editor from 'draft-js-plugins-editor';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { DefaultDraftBlockRenderMap, EditorState } from 'draft-js';
import createInlineToolbarPlugin, {
  Separator,
} from 'draft-js-inline-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  BlockquoteButton,
  UnorderedListButton,
  OrderedListButton,
} from 'draft-js-buttons';
import createBlockStyleButton from 'draft-js-buttons/lib/utils/createBlockStyleButton';
import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Icon } from '../../../../components';
import trashSVG from '../../../../icons/delete.svg';

import createLinkPlugin from '../../AnchorPlugin';

import addSVG from '../../../../icons/circle-plus.svg';
import textSVG from '../../../../icons/text.svg';
import cameraSVG from '../../../../icons/camera.svg';
import videoSVG from '../../../../icons/videocamera.svg';
import TemplatedTilesSVG from '../../../../icons/theme.svg';

const messages = defineMessages({
  text: {
    id: 'Type text…',
    defaultMessage: 'Type text…',
  },
});

const blockRenderMap = Map({
  callout: {
    element: 'p',
  },
  unstyled: {
    element: 'p',
  },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

const CalloutButton = createBlockStyleButton({
  blockType: 'callout',
  children: <span>!</span>,
});
const linkPlugin = createLinkPlugin();
const blockBreakoutPlugin = createBlockBreakoutPlugin();

@injectIntl
/**
 * Edit text tile class.
 * @class Edit
 * @extends Component
 */
export default class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    tile: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    intl: intlShape.isRequired,
    index: PropTypes.number.isRequired,
    onChangeTile: PropTypes.func.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    onDeleteTile: PropTypes.func.isRequired,
    onAddTile: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    if (!__SERVER__) {
      let editorState;
      if (props.data && props.data.text) {
        const contentState = stateFromHTML(props.data.text.data, {
          customBlockFn: element => {
            if (element.className === 'callout') {
              return {
                type: 'callout',
              };
            }
            return null;
          },
        });
        editorState = EditorState.createWithContent(contentState);
      } else {
        editorState = EditorState.createEmpty();
      }

      const inlineToolbarPlugin = createInlineToolbarPlugin({
        structure: [
          BoldButton,
          ItalicButton,
          linkPlugin.LinkButton,
          Separator,
          HeadlineTwoButton,
          HeadlineThreeButton,
          UnorderedListButton,
          OrderedListButton,
          BlockquoteButton,
          CalloutButton,
        ],
      });

      this.state = {
        editorState,
        inlineToolbarPlugin,
        addNewTileOpened: false,
      };
    }

    this.onChange = this.onChange.bind(this);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.selected) {
      this.node.focus();
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (!this.props.selected && nextProps.selected) {
      this.node.focus();
      this.setState({
        editorState: EditorState.moveFocusToEnd(this.state.editorState),
      });
    }
  }

  /**
   * Change handler
   * @method onChange
   * @param {object} editorState Editor state.
   * @returns {undefined}
   */
  onChange(editorState) {
    this.setState({ editorState });
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      text: {
        'content-type': 'text/html',
        data: stateToHTML(editorState.getCurrentContent(), {
          blockStyleFn: block => {
            if (block.get('type') === 'callout') {
              return {
                attributes: {
                  class: 'callout',
                },
              };
            }
            return null;
          },
        }),
        encoding: 'utf8',
      },
    });
  }

  toggleAddNewTile = () =>
    this.setState(state => ({ addNewTileOpened: !state.addNewTileOpened }));

  closeAddNewTile = () => this.setState(() => ({ addNewTileOpened: false }));

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (__SERVER__) {
      return <div />;
    }

    const { InlineToolbar } = this.state.inlineToolbarPlugin;

    return (
      <div
        onClick={() => this.props.onSelectTile(this.props.tile)}
        className={`tile text${this.props.selected ? ' selected' : ''}`}
      >
        {/* {this.props.selected && (
          <div className="toolbar">
            <Button.Group>
              <Button
                icon
                basic
                onClick={() => this.props.onDeleteTile(this.props.tile)}
              >
                <Icon name={trashSVG} size="24px" color="#e40166" />
              </Button>
            </Button.Group>
          </div>
        )} */}
        <Editor
          onChange={this.onChange}
          editorState={this.state.editorState}
          plugins={[
            this.state.inlineToolbarPlugin,
            linkPlugin,
            blockBreakoutPlugin,
          ]}
          blockRenderMap={extendedBlockRenderMap}
          blockStyleFn={contentBlock => {
            const type = contentBlock.getType();
            if (type === 'callout') {
              return 'callout';
            }
            return null;
          }}
          placeholder={this.props.intl.formatMessage(messages.text)}
          handleReturn={() => {
            const selectionState = this.state.editorState.getSelection();
            const anchorKey = selectionState.getAnchorKey();
            const currentContent = this.state.editorState.getCurrentContent();
            const currentContentBlock = currentContent.getBlockForKey(
              anchorKey,
            );
            const blockType = currentContentBlock.getType();
            if (
              blockType !== 'unordered-list-item' &&
              blockType !== 'ordered-list-item'
            ) {
              this.props.onSelectTile(
                this.props.onAddTile('text', this.props.index + 1),
              );
              return 'handled';
            }
            return 'un-handled';
          }}
          handleKeyCommand={(command, editorState) => {
            if (
              command === 'backspace' &&
              editorState.getCurrentContent().getPlainText().length === 0
            ) {
              this.props.onDeleteTile(this.props.tile, true);
            }
          }}
          ref={node => {
            this.node = node;
          }}
        />
        <InlineToolbar />

        {this.props.data.text &&
          this.props.data.text.data === '<p><br></p>' && (
            <Button
              basic
              icon
              onClick={this.toggleAddNewTile}
              className="tile-add-button"
            >
              <Icon name={addSVG} className="tile-add-button" size="24px" />
            </Button>
          )}
        {this.state.addNewTileOpened && (
          <div className="add-tile toolbar">
            <Button.Group>
              <Button
                icon
                basic
                onClick={this.props.onAddTile.bind(this, 'image')}
              >
                <Icon name={cameraSVG} size="24px" />
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                onClick={this.props.onAddTile.bind(this, 'video')}
              >
                <Icon name={videoSVG} size="24px" />
              </Button>
            </Button.Group>
            <div className="separator" />
            <Button.Group>
              <Button
                icon
                basic
                onClick={this.props.onAddTile.bind(this, 'templatedtiles')}
              >
                <Icon name={TemplatedTilesSVG} size="24px" />
              </Button>
            </Button.Group>
          </div>
        )}
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
