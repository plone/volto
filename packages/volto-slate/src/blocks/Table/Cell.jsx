import React, { useEffect, useRef, useState } from 'react';
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
  const isUnmounted = useRef(false);
  const tableblockExtensions = config.settings.slate.tableblockExtensions;

  useEffect(() => {
    return () => {
      isUnmounted.current = true;
    };
  }, []);

  useEffect(() => {
    if (
      isTableBlockSelected &&
      cell === 0 &&
      row === 0 &&
      (!selectedCell || (selectedCell.row === 0 && selectedCell.cell === 0))
    ) {
      onSelectCell(row, cell);

      if (editor) {
        setTimeout(() => {
          if (!isUnmounted.current) {
            ReactEditor.focus(editor);
          }
        }, 0);
      }
    }
  }, [isTableBlockSelected, cell, row, selectedCell, onSelectCell, editor]);

  const handleChange = (val) => {
    onChange(row, cell, [...val]);
  };

  const handleContainerFocus = () => {
    onSelectCell(row, cell);
  };

  return (
    __CLIENT__ && (
      <SlateEditor
        tabIndex={0}
        onChange={handleChange}
        extensions={tableblockExtensions}
        value={value}
        selected={selected}
        onFocus={handleContainerFocus}
        onClick={handleContainerFocus}
        debug={false}
      >
        <EditorReference
          onHasEditor={(editorInstance) => !editor && setEditor(editorInstance)}
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
