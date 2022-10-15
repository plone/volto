import React from 'react';
import { withTable } from './extensions';
import TableButton from './TableButton';
import { tableElements } from './render';
import './less/public.less';

import clearSVG from '@plone/volto/icons/delete.svg';
import rowBeforeSVG from '@plone/volto/icons/row-before.svg';
import rowAfterSVG from '@plone/volto/icons/row-after.svg';
import colBeforeSVG from '@plone/volto/icons/column-before.svg';
import colAfterSVG from '@plone/volto/icons/column-after.svg';
import rowDeleteSVG from '@plone/volto/icons/row-delete.svg';
import colDeleteSVG from '@plone/volto/icons/column-delete.svg';

import { ToolbarButton } from '@plone/volto-slate/editor/ui';
import { Range, Transforms, Editor, Path } from 'slate';
import { defineMessages, useIntl } from 'react-intl';
import { TABLE, TR, P, TD, TH } from '@plone/volto-slate/constants';

const messages = defineMessages({
  deleteTable: {
    id: 'Delete table',
    defaultMessage: 'Delete table',
  },
  insertRowBefore: {
    id: 'Insert row before',
    defaultMessage: 'Insert row before',
  },
  insertRowAfter: {
    id: 'Insert row after',
    defaultMessage: 'Insert row after',
  },
  deleteRow: {
    id: 'Delete row',
    defaultMessage: 'Delete row',
  },
  insertColBefore: {
    id: 'Insert col before',
    defaultMessage: 'Insert col before',
  },
  insertColAfter: {
    id: 'Insert col after',
    defaultMessage: 'Insert col after',
  },
  deleteCol: {
    id: 'Delete col',
    defaultMessage: 'Delete col',
  },
});

const unhangRange = (editor, options = {}) => {
  const { at = editor.selection, voids, unhang = true } = options;

  if (Range.isRange(at) && unhang) {
    options.at = Editor.unhangRange(editor, at, { voids });
  }
};

const getNodes = (editor, options = {}) => {
  unhangRange(editor, options);

  return Editor.nodes(editor, options);
};

const findNode = (editor, options = {}) => {
  try {
    const nodeEntries = getNodes(editor, {
      at: editor.selection || editor.getSavedSelection() || [],
    });

    for (const [node, path] of nodeEntries) {
      return [node, path];
    }
  } catch (error) {
    return undefined;
  }
};

const someNode = (editor, options) => {
  return !!findNode(editor, options);
};

const getEmptyCellNode = (editor, { header }) => {
  return {
    type: header ? TH : TD,
    children: [{ type: P, children: [{ text: '' }] }],
  };
};

const getEmptyRowNode = (editor, { header, colCount }) => {
  return {
    type: TR,
    children: Array(colCount)
      .fill(colCount)
      .map(() => getEmptyCellNode(editor, { header })),
  };
};

const addRowBefore = (editor, { header } = {}) => {
  if (someNode(editor, { match: (n) => n.type === TABLE })) {
    const currentRowItem = Editor.above(editor, {
      match: (n) => n.type === TR,
    });
    if (currentRowItem) {
      const [currentRowElem, currentRowPath] = currentRowItem;
      Transforms.insertNodes(
        editor,
        getEmptyRowNode(editor, {
          header,
          colCount: currentRowElem.children.length,
        }),
        {
          at: currentRowPath,
          select: true, // TODO: this and similar lines in the Table plugin do nothing currently, why?
        },
      );
    }
  }
};

const addRowAfter = (editor, { header } = {}) => {
  if (someNode(editor, { match: (n) => n.type === TABLE })) {
    const currentRowItem = Editor.above(editor, {
      match: (n) => n.type === TR,
    });
    if (currentRowItem) {
      const [currentRowElem, currentRowPath] = currentRowItem;
      Transforms.insertNodes(
        editor,
        getEmptyRowNode(editor, {
          header,
          colCount: currentRowElem.children.length,
        }),
        {
          at: Path.next(currentRowPath),
          select: true,
        },
      );
    }
  }
};

const deleteRow = (editor) => {
  if (someNode(editor, { match: (n) => n.type === TABLE })) {
    const currentTableItem = Editor.above(editor, {
      match: (n) => n.type === TABLE,
    });
    const currentRowItem = Editor.above(editor, {
      match: (n) => n.type === TR,
    });
    if (
      currentRowItem &&
      currentTableItem &&
      // Cannot delete the last row
      // TODO: handle tfoot and thead Element types here:
      currentTableItem[0].children[0].children.length > 1
    ) {
      Transforms.removeNodes(editor, { at: currentRowItem[1] });
    }
  }
};

const addColBefore = (editor, { header } = {}) => {
  if (someNode(editor, { match: (n) => n.type === TABLE })) {
    const currentCellItem = Editor.above(editor, {
      match: (n) => n.type === TH || n.type === TD,
    });
    const currentTableItem = Editor.above(editor, {
      match: (n) => n.type === TABLE,
    });

    if (currentCellItem && currentTableItem) {
      const nextCellPath = currentCellItem[1];
      const newCellPath = nextCellPath.slice();
      const replacePathPos = newCellPath.length - 2;
      const currentRowIdx = nextCellPath[replacePathPos];

      // TODO: handle tfoot and thead too:
      currentTableItem[0].children[0].children.forEach((row, rowIdx) => {
        newCellPath[replacePathPos] = rowIdx;
        const isHeaderRow =
          header === undefined ? row.children[0].type === TH : header;

        Transforms.insertNodes(
          editor,
          getEmptyCellNode(editor, { header: isHeaderRow }),
          {
            at: newCellPath,
            select: rowIdx === currentRowIdx,
          },
        );
      });
    }
  }
};

const addColAfter = (editor, { header } = {}) => {
  if (someNode(editor, { match: (n) => n.type === TABLE })) {
    const currentCellItem = Editor.above(editor, {
      match: (n) => n.type === TH || n.type === TD,
    });
    const currentTableItem = Editor.above(editor, {
      match: (n) => n.type === TABLE,
    });

    if (currentCellItem && currentTableItem) {
      const nextCellPath = Path.next(currentCellItem[1]);
      const newCellPath = nextCellPath.slice();
      const replacePathPos = newCellPath.length - 2;
      const currentRowIdx = nextCellPath[replacePathPos];

      // TODO: handle tfoot and thead too:
      currentTableItem[0].children[0].children.forEach((row, rowIdx) => {
        newCellPath[replacePathPos] = rowIdx;
        const isHeaderRow =
          header === undefined ? row.children[0].type === TH : header;

        Transforms.insertNodes(
          editor,
          getEmptyCellNode(editor, { header: isHeaderRow }),
          {
            at: newCellPath,
            select: rowIdx === currentRowIdx,
          },
        );
      });
    }
  }
};

const deleteCol = (editor) => {
  if (someNode(editor, { match: (n) => n.type === TABLE })) {
    const currentCellItem = Editor.above(editor, {
      match: (n) => n.type === TD || n.type === TH,
    });
    const currentRowItem = Editor.above(editor, {
      match: (n) => n.type === TR,
    });
    const currentTableItem = Editor.above(editor, {
      match: (n) => n.type === TABLE,
    });

    if (
      currentCellItem &&
      currentRowItem &&
      currentTableItem &&
      // Cannot delete the last cell
      currentRowItem[0].children.length > 1
    ) {
      const currentCellPath = currentCellItem[1];
      const pathToDelete = currentCellPath.slice();
      const replacePathPos = pathToDelete.length - 2;

      // TODO: handle tfoot and thead too:
      currentTableItem[0].children[0].children.forEach((row, rowIdx) => {
        pathToDelete[replacePathPos] = rowIdx;

        Transforms.removeNodes(editor, {
          at: pathToDelete,
        });
      });
    }
  }
};

export default function install(config) {
  const { slate } = config.settings;

  slate.extensions = [...(slate.extensions || []), withTable];
  slate.elements = {
    ...slate.elements,
    ...tableElements,
  };
  slate.elementToolbarButtons[TABLE] = [
    ({ editor }) => {
      const intl = useIntl();

      return (
        <ToolbarButton
          title={intl.formatMessage(messages.deleteTable)}
          icon={clearSVG}
          aria-label={intl.formatMessage(messages.deleteTable)}
          onMouseDown={() => {
            Transforms.removeNodes(editor, {
              at: editor.selection || editor.getSavedSelection(),
              match: (n) => n.type === TABLE,
            });
          }}
        />
      );
    },
    ({ editor }) => {
      const intl = useIntl();

      return (
        <ToolbarButton
          title={intl.formatMessage(messages.insertRowBefore)}
          icon={rowBeforeSVG}
          aria-label={intl.formatMessage(messages.insertRowBefore)}
          onMouseDown={() => {
            addRowBefore(editor);
          }}
        />
      );
    },
    ({ editor }) => {
      const intl = useIntl();

      return (
        <ToolbarButton
          title={intl.formatMessage(messages.insertRowAfter)}
          icon={rowAfterSVG}
          aria-label={intl.formatMessage(messages.insertRowAfter)}
          onMouseDown={() => {
            addRowAfter(editor, { header: false });
          }}
        />
      );
    },
    ({ editor }) => {
      const intl = useIntl();

      return (
        <ToolbarButton
          title={intl.formatMessage(messages.deleteRow)}
          icon={rowDeleteSVG}
          aria-label={intl.formatMessage(messages.deleteRow)}
          onMouseDown={() => {
            deleteRow(editor);
          }}
        />
      );
    },
    ({ editor }) => {
      const intl = useIntl();

      return (
        <ToolbarButton
          title={intl.formatMessage(messages.insertColBefore)}
          icon={colBeforeSVG}
          aria-label={intl.formatMessage(messages.insertColBefore)}
          onMouseDown={() => {
            addColBefore(editor);
          }}
        />
      );
    },
    ({ editor }) => {
      const intl = useIntl();

      return (
        <ToolbarButton
          title={intl.formatMessage(messages.insertColAfter)}
          icon={colAfterSVG}
          aria-label={intl.formatMessage(messages.insertColAfter)}
          onMouseDown={() => {
            addColAfter(editor);
          }}
        />
      );
    },
    ({ editor }) => {
      const intl = useIntl();

      return (
        <ToolbarButton
          title={intl.formatMessage(messages.deleteCol)}
          icon={colDeleteSVG}
          aria-label={intl.formatMessage(messages.deleteCol)}
          onMouseDown={() => {
            deleteCol(editor);
          }}
        />
      );
    },
  ];

  return config;
}

export const installTableButton = (config) => {
  const { slate } = config.settings;
  slate.buttons.table = (props) => <TableButton {...props} title="Table" />;
  slate.toolbarButtons = [...(slate.toolbarButtons || []), 'table'];
  slate.expandedToolbarButtons = [
    ...(slate.expandedToolbarButtons || []),
    'table',
  ];
  return config;
};
