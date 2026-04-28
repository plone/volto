import {
  createTSlatePlugin,
  ElementApi,
  getAt,
  KEYS,
  nanoid,
  PathApi,
  PointApi,
  TextApi,
} from 'platejs';
import { toPlatePlugin } from 'platejs/react';

const getCurrentUserId = (editor: any): string | null => {
  return editor.getOption(SuggestionPlugin, 'currentUserId') ?? null;
};

const getSuggestionKeyId = (node: any) => {
  const ids = Object.keys(node).filter((key) => {
    return key.startsWith(`${KEYS.suggestion}_`);
  });

  return ids.at(-1);
};

const getInlineSuggestionData = (node: any) => {
  const keyId = getSuggestionKeyId(node);

  if (!keyId) return;

  return node[keyId];
};

export const getSuggestionKey = (id = '0'): string =>
  `${KEYS.suggestion}_${id}`;

const isSuggestionKey = (key: string) => key.startsWith(`${KEYS.suggestion}_`);

const getSuggestionKeys = (node: any) => {
  const keys: string[] = [];

  Object.keys(node).forEach((key) => {
    if (isSuggestionKey(key)) keys.push(key);
  });

  return keys;
};

const isCurrentUserSuggestion = (editor: any, node: any) => {
  return getInlineSuggestionData(node)?.userId === getCurrentUserId(editor);
};

const getTransientSuggestionKey = () => `${KEYS.suggestion}Transient`;

const findSuggestionProps = (editor: any, { at, type }: any) => {
  const defaultProps = {
    id: nanoid(),
    createdAt: Date.now(),
  };

  const api = editor.getApi(BaseSuggestionPlugin);
  let entry = api.suggestion.node({
    at,
    isText: true,
  });

  if (!entry) {
    let start;
    let end;

    try {
      [start, end] = editor.api.edges(at);
    } catch {
      return defaultProps;
    }

    const nextPoint = editor.api.after(end);

    if (nextPoint) {
      entry = api.suggestion.node({
        at: nextPoint,
        isText: true,
      });

      if (!entry) {
        const prevPoint = editor.api.before(start);

        if (prevPoint) {
          entry = api.suggestion.node({
            at: prevPoint,
            isText: true,
          });
        }

        if (!entry && editor.api.isStart(start, at)) {
          const fallbackAt = prevPoint ?? at;
          const lineBreak = editor.api.above({ at: fallbackAt });
          const lineBreakData = lineBreak?.[0].suggestion;

          if (lineBreakData?.isLineBreak) {
            return {
              createdAt: lineBreakData.createdAt ?? Date.now(),
              id: lineBreakData.id ?? nanoid(),
            };
          }
        }
      }
    }
  }

  if (
    entry &&
    getInlineSuggestionData(entry[0])?.type === type &&
    isCurrentUserSuggestion(editor, entry[0])
  ) {
    return {
      createdAt: getInlineSuggestionData(entry[0])?.createdAt ?? Date.now(),
      id: api.suggestion.nodeId(entry[0]) ?? nanoid(),
    };
  }

  return defaultProps;
};

const setSuggestionNodes = (editor: any, options?: any) => {
  const at = getAt(editor, options?.at) ?? editor.selection;

  if (!at) return;

  const { suggestionId = nanoid() } = options ?? {};
  const nodeEntries = [
    ...editor.api.nodes({
      match: (node: any) =>
        ElementApi.isElement(node) && editor.api.isInline(node),
      ...options,
    }),
  ];

  editor.tf.withoutNormalizing(() => {
    const data = {
      createdAt: options?.createdAt ?? Date.now(),
      id: suggestionId,
      type: 'remove',
      userId: getCurrentUserId(editor),
    };
    const props = {
      [getSuggestionKey(suggestionId)]: data,
      [KEYS.suggestion]: true,
    };

    editor.tf.setNodes(props, {
      at,
      marks: true,
    });

    nodeEntries.forEach(([, path]: any) => {
      editor.tf.setNodes(props, {
        at: path,
        match: (node: any) =>
          ElementApi.isElement(node) && editor.api.isInline(node),
        ...options,
      });
    });
  });
};

const deleteSuggestion = (editor: any, at: any, { reverse }: any = {}) => {
  let resultId;

  editor.tf.withoutNormalizing(() => {
    const { anchor: from, focus: to } = at;
    const { createdAt, id } = findSuggestionProps(editor, {
      at: from,
      type: 'remove',
    });

    resultId = id;

    const toRef = editor.api.pointRef(to);
    let pointCurrent;

    while (true) {
      pointCurrent = editor.selection?.anchor;

      if (!pointCurrent) break;

      const pointTarget = toRef.current;

      if (!pointTarget) break;

      if (
        !editor.api.isAt({
          at: { anchor: pointCurrent, focus: pointTarget },
          blocks: true,
        })
      ) {
        const text = editor.api.string(
          reverse
            ? { anchor: pointTarget, focus: pointCurrent }
            : { anchor: pointCurrent, focus: pointTarget },
        );

        if (text.length === 0) break;
      }

      const getPoint = reverse ? editor.api.before : editor.api.after;
      const pointNext = getPoint(pointCurrent, { unit: 'character' });

      if (!pointNext) break;

      let range = reverse
        ? { anchor: pointNext, focus: pointCurrent }
        : { anchor: pointCurrent, focus: pointNext };

      range = editor.api.unhangRange(range, { character: true });

      const entryBlock = editor.api.node({
        at: pointCurrent,
        block: true,
        match: (node: any) =>
          node[KEYS.suggestion] &&
          TextApi.isText(node) &&
          getInlineSuggestionData(node)?.type === 'insert' &&
          isCurrentUserSuggestion(editor, node),
      });

      if (
        entryBlock &&
        editor.api.isStart(pointCurrent, entryBlock[1]) &&
        editor.api.isEmpty(entryBlock[0])
      ) {
        editor.tf.removeNodes({
          at: entryBlock[1],
        });

        continue;
      }

      if (editor.api.isAt({ at: range, blocks: true })) {
        const previousAboveNode = editor.api.above({ at: range.anchor });

        if (previousAboveNode && ElementApi.isElement(previousAboveNode[0])) {
          const isBlockSuggestion = editor
            .getApi(BaseSuggestionPlugin)
            .suggestion.isBlockSuggestion(previousAboveNode[0]);

          if (isBlockSuggestion) {
            const node = previousAboveNode[0] as any;

            if (node.suggestion.type === 'insert') {
              editor
                .getApi(BaseSuggestionPlugin)
                .suggestion.withoutSuggestions(() => {
                  editor.tf.unsetNodes([KEYS.suggestion], {
                    at: previousAboveNode[1],
                  });
                  editor.tf.mergeNodes({
                    at: PathApi.next(previousAboveNode[1]),
                  });
                });
            }

            if (node.suggestion.type === 'remove') {
              editor.tf.move({
                reverse,
                unit: 'character',
              });
            }

            break;
          }

          editor.tf.setNodes(
            {
              [KEYS.suggestion]: {
                createdAt,
                id,
                type: 'remove',
                userId: getCurrentUserId(editor),
              },
            },
            { at: previousAboveNode[1] },
          );
          editor.tf.move({
            reverse,
            unit: 'character',
          });

          break;
        }

        break;
      }

      if (PointApi.equals(pointCurrent, editor.selection.anchor)) {
        editor.tf.move({
          reverse,
          unit: 'character',
        });
      }

      const entryText = editor.getApi(BaseSuggestionPlugin).suggestion.node({
        at: range,
        isText: true,
        match: (node: any) =>
          TextApi.isText(node) &&
          getInlineSuggestionData(node)?.type === 'insert' &&
          isCurrentUserSuggestion(editor, node),
      });

      if (entryText) {
        editor.tf.delete({ at: range, unit: 'character' });
        continue;
      }

      setSuggestionNodes(editor, {
        at: range,
        createdAt,
        suggestionDeletion: true,
        suggestionId: id,
      });
    }
  });

  return resultId;
};

const deleteFragmentSuggestion = (editor: any, { reverse }: any = {}) => {
  let resultId;

  editor.tf.withoutNormalizing(() => {
    const selection = editor.selection;
    const [start, end] = editor.api.edges(selection);

    if (reverse) {
      editor.tf.collapse({ edge: 'end' });
      resultId = deleteSuggestion(
        editor,
        { anchor: end, focus: start },
        { reverse: true },
      );
    } else {
      editor.tf.collapse({ edge: 'start' });
      resultId = deleteSuggestion(editor, { anchor: start, focus: end });
    }
  });

  return resultId;
};

const insertFragmentSuggestion = (
  editor: any,
  fragment: any[],
  { insertFragment = editor.tf.insertFragment }: any = {},
) => {
  editor.tf.withoutNormalizing(() => {
    deleteFragmentSuggestion(editor);

    const { createdAt, id } = findSuggestionProps(editor, {
      at: editor.selection,
      type: 'insert',
    });

    fragment.forEach((node) => {
      if (TextApi.isText(node)) {
        if (!node[KEYS.suggestion]) {
          node[KEYS.suggestion] = true;
        }

        getSuggestionKeys(node).forEach((key) => {
          delete node[key];
        });

        node[getSuggestionKey(id)] = {
          createdAt,
          id,
          type: 'insert',
          userId: getCurrentUserId(editor),
        };
      } else {
        node[KEYS.suggestion] = {
          createdAt,
          id,
          type: 'insert',
          userId: getCurrentUserId(editor),
        };
      }
    });

    editor.getApi(BaseSuggestionPlugin).suggestion.withoutSuggestions(() => {
      insertFragment(fragment);
    });
  });
};

const insertTextSuggestion = (editor: any, text: string) => {
  editor.tf.withoutNormalizing(() => {
    let resultId;

    const { createdAt, id } = findSuggestionProps(editor, {
      at: editor.selection,
      type: 'insert',
    });

    if (editor.api.isExpanded()) {
      resultId = deleteFragmentSuggestion(editor);
    }

    editor.getApi(BaseSuggestionPlugin).suggestion.withoutSuggestions(() => {
      editor.tf.insertNodes(
        {
          [getSuggestionKey(resultId ?? id)]: {
            createdAt,
            id: resultId ?? id,
            type: 'insert',
            userId: getCurrentUserId(editor),
          },
          suggestion: true,
          text,
        },
        {
          at: editor.selection,
          select: true,
        },
      );
    });
  });
};

const removeMarkSuggestion = (editor: any, key: string) => {
  editor.getApi(BaseSuggestionPlugin).suggestion.withoutSuggestions(() => {
    const createdAt = Date.now();
    const id = nanoid();
    const match = (node: any) => {
      if (!TextApi.isText(node)) return false;

      if (node[KEYS.suggestion]) {
        return getInlineSuggestionData(node)?.type === 'update';
      }

      return true;
    };

    editor.tf.unsetNodes(key, { match });
    editor.tf.setNodes(
      {
        [getSuggestionKey(id)]: {
          createdAt,
          id,
          properties: {
            [key]: undefined,
          },
          type: 'update',
          userId: getCurrentUserId(editor),
        },
        [KEYS.suggestion]: true,
      },
      {
        match,
      },
    );
  });
};

const removeNodesSuggestion = (editor: any, nodes: any[]) => {
  if (nodes.length === 0) return;

  const { createdAt, id } = findSuggestionProps(editor, {
    at: editor.selection,
    type: 'remove',
  });

  nodes.forEach(([, blockPath]) => {
    editor.tf.setNodes(
      {
        [KEYS.suggestion]: {
          createdAt,
          id,
          type: 'remove',
          userId: getCurrentUserId(editor),
        },
      },
      { at: blockPath },
    );
  });
};

const addMarkSuggestion = (editor: any, key: string, value: any) => {
  editor.getApi(BaseSuggestionPlugin).suggestion.withoutSuggestions(() => {
    const createdAt = Date.now();
    const id = nanoid();
    const match = (node: any) => {
      if (!TextApi.isText(node)) return false;

      if (node[KEYS.suggestion]) {
        return getInlineSuggestionData(node)?.type === 'update';
      }

      return true;
    };

    editor.tf.setNodes(
      {
        [key]: value,
        [getSuggestionKey(id)]: {
          createdAt,
          id,
          newProperties: {
            [key]: value,
          },
          type: 'update',
          userId: getCurrentUserId(editor),
        },
        [KEYS.suggestion]: true,
      },
      {
        match,
        split: true,
      },
    );
  });
};

const withSuggestion = ({
  api,
  editor,
  getOptions,
  tf: {
    addMark,
    apply,
    deleteBackward,
    deleteForward,
    deleteFragment,
    insertBreak,
    insertFragment,
    insertNodes,
    insertText,
    normalizeNode,
    removeMark,
    removeNodes,
  },
}: any) => ({
  transforms: {
    addMark(key: string, value: any) {
      if (getOptions().isSuggesting && api.isExpanded()) {
        return addMarkSuggestion(editor, key, value);
      }

      return addMark(key, value);
    },
    apply(operation: any) {
      return apply(operation);
    },
    deleteBackward(unit: any) {
      const selection = editor.selection;
      const pointTarget = editor.api.before(selection, { unit });

      if (getOptions().isSuggesting) {
        const node = editor.api.above();

        if (node?.[0][KEYS.suggestion] && !node?.[0].suggestion.isLineBreak) {
          return deleteBackward(unit);
        }

        if (!pointTarget) return;

        deleteSuggestion(
          editor,
          { anchor: selection.anchor, focus: pointTarget },
          { reverse: true },
        );

        return;
      }

      if (pointTarget) {
        const isCrossBlock = editor.api.isAt({
          at: { anchor: selection.anchor, focus: pointTarget },
          blocks: true,
        });

        if (isCrossBlock) {
          editor.tf.unsetNodes([KEYS.suggestion], {
            at: pointTarget,
          });
        }
      }

      deleteBackward(unit);
    },
    deleteForward(unit: any) {
      if (getOptions().isSuggesting) {
        const selection = editor.selection;
        const pointTarget = editor.api.after(selection, { unit });

        if (!pointTarget) return;

        deleteSuggestion(editor, {
          anchor: selection.anchor,
          focus: pointTarget,
        });

        return;
      }

      deleteForward(unit);
    },
    deleteFragment(direction: any) {
      if (getOptions().isSuggesting) {
        deleteFragmentSuggestion(editor, { reverse: true });
        return;
      }

      deleteFragment(direction);
    },
    insertBreak() {
      if (getOptions().isSuggesting) {
        const [node, path] = editor.api.above();

        if (path.length > 1 || node.type !== editor.getType(KEYS.p)) {
          return insertTextSuggestion(editor, '\n');
        }

        const { createdAt, id } = findSuggestionProps(editor, {
          at: editor.selection,
          type: 'insert',
        });

        insertBreak();
        editor.tf.withoutMerging(() => {
          editor.tf.setNodes(
            {
              [KEYS.suggestion]: {
                createdAt,
                id,
                isLineBreak: true,
                type: 'insert',
                userId: getCurrentUserId(editor),
              },
            },
            { at: path },
          );
        });

        return;
      }

      insertBreak();
    },
    insertFragment(fragment: any) {
      if (getOptions().isSuggesting) {
        insertFragmentSuggestion(editor, fragment, { insertFragment });
        return;
      }

      insertFragment(fragment);
    },
    insertNodes(nodes: any, options: any) {
      if (getOptions().isSuggesting) {
        const nodesArray = Array.isArray(nodes) ? nodes : [nodes];

        if (nodesArray.some((node) => node.type === 'slash_input')) {
          api.suggestion.withoutSuggestions(() => {
            insertNodes(nodes, options);
          });
          return;
        }

        const suggestionNodes = nodesArray.map((node) => ({
          ...node,
          [KEYS.suggestion]: {
            createdAt: Date.now(),
            id: nanoid(),
            type: 'insert',
            userId: getCurrentUserId(editor),
          },
        }));

        return insertNodes(suggestionNodes, options);
      }

      return insertNodes(nodes, options);
    },
    insertText(text: string, options: any) {
      if (getOptions().isSuggesting) {
        const node = editor.api.above();

        if (node?.[0][KEYS.suggestion] && !node?.[0].suggestion.isLineBreak) {
          return insertText(text, options);
        }

        insertTextSuggestion(editor, text);
        return;
      }

      insertText(text, options);
    },
    normalizeNode(entry: any) {
      api.suggestion.withoutSuggestions(() => {
        const [node, path] = entry;
        const inlineSuggestion =
          (ElementApi.isElement(node) && editor.api.isInline(node)) ||
          TextApi.isText(node);

        if (
          node[KEYS.suggestion] &&
          inlineSuggestion &&
          !getSuggestionKeyId(node)
        ) {
          editor.tf.unsetNodes([KEYS.suggestion, 'suggestionData'], {
            at: path,
          });
          return;
        }

        if (
          node[KEYS.suggestion] &&
          inlineSuggestion &&
          !getInlineSuggestionData(node)?.userId
        ) {
          if (getInlineSuggestionData(node)?.type === 'remove') {
            editor.tf.unsetNodes([KEYS.suggestion, getSuggestionKeyId(node)], {
              at: path,
            });
          } else {
            editor.tf.removeNodes({ at: path });
          }

          return;
        }

        normalizeNode(entry);
      });
    },
    removeMark(key: string) {
      if (getOptions().isSuggesting && api.isExpanded()) {
        return removeMarkSuggestion(editor, key);
      }

      return removeMark(key);
    },
    removeNodes(options: any) {
      if (getOptions().isSuggesting) {
        const nodes = [...editor.api.nodes(options)];

        if (nodes.some(([node]) => node.type === 'slash_input')) {
          api.suggestion.withoutSuggestions(() => {
            removeNodes(options);
          });
          return;
        }

        return removeNodesSuggestion(editor, nodes);
      }

      return removeNodes(options);
    },
  },
});

export const BaseSuggestionPlugin = createTSlatePlugin<any>({
  key: KEYS.suggestion,
  node: { isLeaf: true },
  options: {
    currentUserId: null,
    isSuggesting: false,
  },
  rules: { selection: { affinity: 'outward' } },
})
  .overrideEditor(withSuggestion)
  .extendApi(({ api, editor, getOption, setOption, type }: any) => ({
    dataList: (node: any) =>
      Object.keys(node)
        .filter((key) => key.startsWith(`${KEYS.suggestion}_`))
        .map((key) => node[key]),
    isBlockSuggestion: (node: any) =>
      ElementApi.isElement(node) &&
      !editor.api.isInline(node) &&
      'suggestion' in node,
    node: (options: any = {}) => {
      const { id, isText, ...rest } = options;

      return editor.api.node({
        match: (node: any) => {
          if (!node[type]) return false;
          if (isText && !TextApi.isText(node)) return false;

          if (id) {
            if (TextApi.isText(node)) {
              return !!node[getSuggestionKey(id)];
            }

            if (
              ElementApi.isElement(node) &&
              api.suggestion.isBlockSuggestion(node)
            ) {
              return (node as any).suggestion.id === id;
            }
          }

          return true;
        },
        ...rest,
      });
    },
    nodeId: (node: any) => {
      if (
        TextApi.isText(node) ||
        (ElementApi.isElement(node) && editor.api.isInline(node))
      ) {
        const keyId = getSuggestionKeyId(node);

        if (!keyId) return;

        return keyId.replace(`${type}_`, '');
      }

      if (api.suggestion.isBlockSuggestion(node)) {
        return node.suggestion.id;
      }
    },
    nodes: (options: any = {}) => {
      const { transient } = options;
      const at = getAt(editor, options.at) ?? [];

      return [
        ...editor.api.nodes({
          ...options,
          at,
          mode: 'all',
          match: (node: any) =>
            node[type] &&
            (transient ? node[getTransientSuggestionKey()] : true),
        }),
      ];
    },
    suggestionData: (node: any) => {
      if (
        TextApi.isText(node) ||
        (ElementApi.isElement(node) && editor.api.isInline(node))
      ) {
        const keyId = getSuggestionKeyId(node);

        if (!keyId) return;

        return node[keyId];
      }

      if (api.suggestion.isBlockSuggestion(node)) {
        return node.suggestion;
      }
    },
    withoutSuggestions: (fn: () => void) => {
      const previous = getOption('isSuggesting');
      setOption('isSuggesting', false);
      fn();
      setOption('isSuggesting', previous);
    },
  }));

export const SuggestionPlugin = toPlatePlugin(BaseSuggestionPlugin);
