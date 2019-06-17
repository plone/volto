/**
 * Edit image tile.
 * @module components/manage/Tiles/Image/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import { readAsDataURL } from 'promise-file-reader';
import { stateFromHTML } from 'draft-js-import-html';
import {
  Button,
  Dimmer,
  Input,
  Loader,
  Message,
  Container,
} from 'semantic-ui-react';
import { Editor, DefaultDraftBlockRenderMap, EditorState } from 'draft-js';
import { bindActionCreators } from 'redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import cx from 'classnames';
import { settings } from '~/config';

import { Icon } from '../../../../components';
import { createContent } from '../../../../actions';
import { flattenToAppURL, getBaseUrl } from '../../../../helpers';

import clearSVG from '../../../../icons/clear.svg';
import tableSVG from '../../../../icons/table.svg';
import { Table } from 'semantic-ui-react';

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Text',
    defaultMessage: 'Text',
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
export default class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    tile: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
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
    onFocusPreviousTile: PropTypes.func.isRequired,
    onFocusNextTile: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
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

    this.state = {
      currentFocused: 'description',
    };
    if (!__SERVER__) {
      let descriptionEditorState;
      if (props.data && props.data.description) {
        descriptionEditorState = EditorState.createWithContent(
          stateFromHTML(props.data.description),
        );
      } else {
        descriptionEditorState = EditorState.createEmpty();
      }
      this.state = {
        descriptionEditorState,
        currentFocused: 'title',
      };
    }
    this.onChangeTableCell = this.onChangeTableCell.bind(this);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.selected) {
      this.descriptionEditor.focus();
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.props.selected) {
      if (this.state.currentFocused === 'description') {
        this.descriptionEditor.focus();
      }
    }
    if (
      nextProps.data.description &&
      this.props.data.description !== nextProps.data.description &&
      !this.props.selected
    ) {
      const contentState = stateFromHTML(nextProps.data.description);
      this.setState({
        descriptionEditorState: nextProps.data.description
          ? EditorState.createWithContent(contentState)
          : EditorState.createEmpty(),
      });
    }
  }

  /**
   * Change Description handler
   * @method onChangeDescription
   * @param {object} descriptionEditorState Editor state.
   * @returns {undefined}
   */
  onChangeTableCell(descriptionEditorState) {
    this.setState({ descriptionEditorState }, () => {
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        description: descriptionEditorState.getCurrentContent().getPlainText(),
      });
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div
        role="presentation"
        onClick={() => this.props.onSelectTile(this.props.tile)}
        className={cx('tile', {
          selected: this.props.selected,
        })}
        tabIndex={0}
        onKeyDown={e =>
          this.props.handleKeyDown(
            e,
            this.props.index,
            this.props.tile,
            this.node,
          )
        }
        ref={node => {
          this.node = node;
        }}
      >
        {this.props.selected && (
          <div>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Editor
                      ref={node => {
                        this.descriptionEditor = node;
                      }}
                      onChange={this.onChangeTableCell}
                      editorState={this.state.descriptionEditorState}
                      blockRenderMap={extendedDescripBlockRenderMap}
                      handleReturn={() => true}
                      placeholder={this.props.intl.formatMessage(
                        messages.description,
                      )}
                      blockStyleFn={() => 'description-editor'}
                      onUpArrow={() => {
                        const selectionState = this.state.descriptionEditorState.getSelection();
                        const currentCursorPosition = selectionState.getStartOffset();

                        if (currentCursorPosition === 0) {
                          this.setState(() => ({
                            currentFocused: 'description',
                          }));
                          this.descriptionEditor.focus();
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
                          this.props.onFocusNextTile(
                            this.props.tile,
                            this.node,
                          );
                        }
                      }}
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <Editor
                      ref={node => {
                        this.descriptionEditor = node;
                      }}
                      onChange={this.onChangeTableCell}
                      editorState={this.state.descriptionEditorState}
                      blockRenderMap={extendedDescripBlockRenderMap}
                      handleReturn={() => true}
                      placeholder={this.props.intl.formatMessage(
                        messages.description,
                      )}
                      blockStyleFn={() => 'description-editor'}
                      onUpArrow={() => {
                        const selectionState = this.state.descriptionEditorState.getSelection();
                        const currentCursorPosition = selectionState.getStartOffset();

                        if (currentCursorPosition === 0) {
                          this.setState(() => ({
                            currentFocused: 'description',
                          }));
                          this.descriptionEditor.focus();
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
                          this.props.onFocusNextTile(
                            this.props.tile,
                            this.node,
                          );
                        }
                      }}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Cell</Table.Cell>
                  <Table.Cell>Cell</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        )}
      </div>
    );
  }
}
