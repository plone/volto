import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorReference, SlateEditor } from '@plone/volto-slate/editor';
import { ReactEditor } from 'slate-react';
import config from '@plone/volto/registry';

class Cell extends Component {
  static propTypes = {
    onSelectCell: PropTypes.func.isRequired,
    row: PropTypes.number,
    cell: PropTypes.number,
    value: PropTypes.array,
    selected: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    isTableBlockSelected: PropTypes.bool,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.handleContainerFocus = this.handleContainerFocus.bind(this);
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
  }

  onChange(val) {
    this.props.onChange(this.props.row, this.props.cell, [...val]);
  }

  handleContainerFocus() {
    this.props.onSelectCell(this.props.row, this.props.cell);
  }

  render() {
    return (
      !import.meta.env.SSR && (
        <SlateEditor
          tabIndex={0}
          onChange={this.onChange}
          extensions={this.tableblockExtensions}
          value={this.props.value}
          selected={this.props.selected}
          onFocus={this.handleContainerFocus}
          onClick={this.handleContainerFocus}
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
