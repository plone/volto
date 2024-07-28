import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { EditorReference, SlateEditor } from '@plone/volto-slate/editor';
import { ReactEditor } from 'slate-react';
import config from '@plone/volto/registry';

const Cell = ({
  onSelectCell,
  row,
  cell,
  value,
  selected,
  onChange,
  isTableBlockSelected,
  selectedCell,
}) => {
  const [editor, setEditor] = useState(null);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    if (
      isTableBlockSelected &&
      cell === 0 &&
      row === 0 &&
      (!selectedCell || (selectedCell.row === 0 && selectedCell.cell === 0))
    ) {
      if (selectedCell?.row !== row || selectedCell?.cell !== cell) {
        onSelectCell(row, cell);
      }
    }
  }, [isTableBlockSelected, cell, row, selectedCell, onSelectCell]);

  useEffect(() => {
    if (editor && isTableBlockSelected && !isUnmounted) {
      setTimeout(() => {
        if (!isUnmounted) {
          ReactEditor.focus(editor);
        }
      }, 0);
    }
  }, [editor, isTableBlockSelected, isUnmounted]);

  useEffect(() => {
    return () => {
      setIsUnmounted(true);
    };
  }, []);

  const handleChange = useCallback(
    (val) => {
      onChange(row, cell, [...val]);
    },
    [onChange, row, cell],
  );

  const handleContainerFocus = useCallback(() => {
    onSelectCell(row, cell);
  }, [onSelectCell, row, cell]);

  return (
    __CLIENT__ && (
      <SlateEditor
        tabIndex={0}
        onChange={handleChange}
        extensions={config.settings.slate.tableblockExtensions}
        value={value}
        selected={selected}
        onFocus={handleContainerFocus}
        onClick={handleContainerFocus}
        debug={false}
      >
        <EditorReference
          onHasEditor={(editor) => !editor && setEditor(editor)}
        />
      </SlateEditor>
    )
  );
};

Cell.propTypes = {
  onSelectCell: PropTypes.func.isRequired,
  row: PropTypes.number,
  cell: PropTypes.number,
  value: PropTypes.array,
  selected: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  isTableBlockSelected: PropTypes.bool,
  selectedCell: PropTypes.shape({
    row: PropTypes.number,
    cell: PropTypes.number,
  }),
};

Cell.defaultProps = {};

export default Cell;
