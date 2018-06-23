/**
 * Edit text tile.
 * @module components/manage/Tiles/Title/Edit
 */

import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
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
  HeadlineOneButton,
  HeadlineTwoButton,
  BlockquoteButton,
  UnorderedListButton,
  OrderedListButton,
} from 'draft-js-buttons';
import createBlockStyleButton from 'draft-js-buttons/lib/utils/createBlockStyleButton';
import createLinkPlugin from 'draft-js-anchor-plugin';

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
const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    linkPlugin.LinkButton,
    Separator,
    HeadlineOneButton,
    HeadlineTwoButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CalloutButton,
  ],
});
const { InlineToolbar } = inlineToolbarPlugin;

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
    onChangeTile: PropTypes.func.isRequired,
    onSelectTile: PropTypes.func.isRequired,
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
      this.state = { editorState };
    }

    this.onChange = this.onChange.bind(this);
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
        className={`tile${this.props.selected ? ' selected' : ''}`}
      >
        <Editor
          onChange={this.onChange}
          editorState={this.state.editorState}
          plugins={[inlineToolbarPlugin, linkPlugin]}
          blockRenderMap={extendedBlockRenderMap}
          blockStyleFn={contentBlock => {
            const type = contentBlock.getType();
            if (type === 'callout') {
              return 'callout';
            }
            return null;
          }}
        />
        <InlineToolbar />
      </div>
    );
  }
}
