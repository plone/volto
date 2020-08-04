/**
 * Edit description block.
 * @module components/manage/Blocks/Description/Edit
 */

import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { stateFromHTML } from 'draft-js-import-html';
import { Editor, DefaultDraftBlockRenderMap, EditorState } from 'draft-js';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import { settings } from '~/config';

const messages = defineMessages({
  description: {
    id: 'Add a description…',
    defaultMessage: 'Add a description…',
  },
});

const blockRenderMap = Map({
  unstyled: {
    element: 'div',
  },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

/**
 * Edit description block class.
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
    properties: PropTypes.objectOf(PropTypes.any).isRequired,
    selected: PropTypes.bool.isRequired,
    block: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    onChangeField: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    onAddBlock: PropTypes.func.isRequired,
    onFocusPreviousBlock: PropTypes.func.isRequired,
    onFocusNextBlock: PropTypes.func.isRequired,
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
      if (props.properties && props.properties.description) {
        const contentState = stateFromHTML(props.properties.description);
        editorState = EditorState.createWithContent(contentState);
      } else {
        editorState = EditorState.createEmpty();
      }
      this.state = { editorState, focus: false };
    }

    this.onChange = this.onChange.bind(this);
  }

  /**
   * Component did mount lifecycle method
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.node) {
      this.node._onBlur = () => this.setState({ focus: false });
      this.node._onFocus = () => this.setState({ focus: true });
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.properties.description &&
      this.props.properties.description !== nextProps.properties.description &&
      !this.state.focus
    ) {
      const contentState = stateFromHTML(nextProps.properties.description);
      this.setState({
        editorState: nextProps.properties.description
          ? EditorState.createWithContent(contentState)
          : EditorState.createEmpty(),
      });
    }

    if (!this.props.selected && nextProps.selected) {
      this.node.focus();
      this.setState({ focus: true });
    }
  }

  /**
   * Change handler
   * @method onChange
   * @param {object} editorState Editor state.
   * @returns {undefined}
   */
  onChange(editorState) {
    this.setState({ editorState }, () => {
      this.props.onChangeField(
        'description',
        editorState.getCurrentContent().getPlainText(),
      );
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
        className={cx('block description', { selected: this.props.selected })}
      >
        <Editor
          onChange={this.onChange}
          editorState={this.state.editorState}
          blockRenderMap={extendedBlockRenderMap}
          handleReturn={() => {
            this.props.onSelectBlock(
              this.props.onAddBlock(
                settings.defaultBlockType,
                this.props.index + 1,
              ),
            );
            return 'handled';
          }}
          handleKeyCommand={(command, editorState) => {
            if (
              command === 'backspace' &&
              editorState.getCurrentContent().getPlainText().length === 0
            ) {
              this.props.onDeleteBlock(this.props.block, true);
            }
          }}
          placeholder={this.props.intl.formatMessage(messages.description)}
          blockStyleFn={() => 'documentDescription'}
          onUpArrow={() => {
            const selectionState = this.state.editorState.getSelection();
            const { editorState } = this.state;
            if (
              editorState.getCurrentContent().getBlockMap().first().getKey() ===
              selectionState.getFocusKey()
            ) {
              this.props.onFocusPreviousBlock(this.props.block, this.node);
            }
          }}
          onDownArrow={() => {
            const selectionState = this.state.editorState.getSelection();
            const { editorState } = this.state;
            if (
              editorState.getCurrentContent().getBlockMap().last().getKey() ===
              selectionState.getFocusKey()
            ) {
              this.props.onFocusNextBlock(this.props.block, this.node);
            }
          }}
          ref={(node) => {
            this.node = node;
          }}
        />
      </div>
    );
  }
}

export default injectIntl(Edit);
