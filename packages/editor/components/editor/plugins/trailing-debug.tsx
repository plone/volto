import { type OverrideEditor, PathApi, queryNode } from '@udecode/plate';

import {
  type PluginConfig,
  type QueryNodeOptions,
  BaseParagraphPlugin,
  createTSlatePlugin,
} from '@udecode/plate';

export type TrailingBlockConfig = PluginConfig<
  'trailingBlock',
  {
    /** Level where the trailing node should be, the first level being 0. */
    level?: number;
    /** Type of the trailing block */
    type?: string;
  } & QueryNodeOptions
>;

/**
 * Add a trailing block when the last node type is not `type` and when the
 * editor has .
 */
export const withTrailingBlock: OverrideEditor<TrailingBlockConfig> = ({
  editor,
  getOptions,
  tf: { normalizeNode },
}) => ({
  transforms: {
    normalizeNode([currentNode, currentPath]) {
      const { level, type, ...query } = getOptions();

      if (currentPath.length === 0) {
        const lastChild = editor.api.last([], { level });
        const lastChildNode = lastChild?.[0];

        if (
          !lastChildNode ||
          (lastChildNode.type !== type && queryNode(lastChild, query))
        ) {
          const at = lastChild ? PathApi.next(lastChild[1]) : [0];

          editor.tf.insertNodes(editor.api.create.block({ type }, at), { at });

          return;
        }
      }

      return normalizeNode([currentNode, currentPath]);
    },
  },
});

/** @see {@link withTrailingBlock} */
export const TrailingBlockPlugin = createTSlatePlugin<TrailingBlockConfig>({
  key: 'trailingBlock',
  options: {
    level: 0,
  },
})
  .overrideEditor(withTrailingBlock)
  .extend(({ editor }) => ({
    options: {
      type: editor.getType(BaseParagraphPlugin),
    },
    handlers: {
      onClick: ({ editor, event }) => {
        console.log('onClick');
      },
    },
  }));
