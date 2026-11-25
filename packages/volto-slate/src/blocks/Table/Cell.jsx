import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorReference, SlateEditor } from '@plone/volto-slate/editor';
import { ReactEditor } from 'slate-react';
import config from '@plone/volto/registry';
import { selectCellContent, collapseCellSelection } from './keyboard';

class Cell extends Component {
  static propTypes = {
    onSelectCell: PropTypes.func.isRequired,
    row: PropTypes.number,
    cell: PropTypes.number,
    value: PropTypes.array,
    selected: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    isTableBlockSelected: PropTypes.bool,
    onTabKey: PropTypes.func,
    selectCellContent: PropTypes.bool,
  };

  static defaultProps = {
    selectCellContent: false,
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.handleContainerFocus = this.handleContainerFocus.bind(this);
    this.handleTabKey = this.handleTabKey.bind(this);
    this.state = { editor: null };
    this.tableblockExtensions = config.settings.slate.tableblockExtensions;
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isTableBlockSelected !== this.props.isTableBlockSelected &&
      this.props.isTableBlockSelected &&
      this.props.cell === 0 &&
      this.props.row === 0 &&
      (!this.props.selectedCell ||
        (this.props.selectedCell.row === 0 &&
          this.props.selectedCell.cell === 0))
    ) {
      this.props.onSelectCell(this.props.row, this.props.cell);

      // Wait for Slate to initialize before asking it to focus
      if (this.state.editor) {
        setTimeout(
          () => !this.isUnmounted && ReactEditor.focus(this.state.editor),
          0,
        );
      }
    }

    // The cell was reached by pressing the Tab key. Focus it and select its
    // whole content, like table and spreadsheet editors do, so that the
    // existing content can be replaced by typing.
    if (
      this.props.selectCellContent &&
      (!prevProps.selectCellContent || !prevProps.selected) &&
      this.state.editor &&
      !this.isUnmounted
    ) {
      selectCellContent(this.state.editor);
      ReactEditor.focus(this.state.editor);
    }
  }

  onChange(val) {
    this.props.onChange(this.props.row, this.props.cell, [...val]);
  }

  handleContainerFocus() {
    this.props.onSelectCell(this.props.row, this.props.cell);
  }

  /**
   * Lets the parent component handle the Tab key navigation between cells.
   * Other keys are ignored. `onTabKey` calls `event.preventDefault()` when it
   * navigates, so the browser default (moving the focus out of the table) is
   * kept only when the focus is leaving through a table edge.
   */
  handleTabKey({ event }) {
    if (event.key !== 'Tab') return;

    if (event.ctrlKey || event.metaKey || event.altKey) {
      // Leave other Tab key combinations to the browser (accessibility).
      return;
    }

    if (this.state.editor?.selection) {
      // Collapse this cell's selection before the focus moves, so its content
      // does not stay visually highlighted while another cell is focused.
      // This matters especially when Tab wraps to the next row: the last
      // cell of the previous row would otherwise keep its whole content
      // selected.
      collapseCellSelection(this.state.editor, event.shiftKey);
    }

    this.props.onTabKey &&
      this.props.onTabKey({
        event,
        row: this.props.row,
        cell: this.props.cell,
      });
  }

  render() {
    return (
      __CLIENT__ && (
        <SlateEditor
          tabIndex={0}
          onChange={this.onChange}
          extensions={this.tableblockExtensions}
          value={this.props.value}
          selected={this.props.selected}
          onFocus={this.handleContainerFocus}
          onClick={this.handleContainerFocus}
          onKeyDown={this.handleTabKey}
          debug={false}
        >
          <EditorReference
            onHasEditor={(editor) =>
              !this.state.editor && this.setState({ editor })
            }
          />
        </SlateEditor>
      )
    );
  }
}

export default Cell;
