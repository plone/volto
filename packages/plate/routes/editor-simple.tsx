import { Toaster } from 'sonner';
import type { Value } from '@udecode/plate';

import { SimplePlateEditor } from '@/components/editor/plate-editor';
import { SettingsProvider } from '@/components/editor/settings';
import { useRouteLoaderData } from 'react-router';
import type { BlocksData } from '@plone/types';
import { atom, useAtom } from 'jotai';
import { HydrateAtoms } from '@plone/helpers';
import { Provider } from 'jotai';
import { createStore } from 'jotai';

function blocksToPlate({
  blocks,
  blocks_layout,
}: {
  blocks: BlocksData['blocks'];
  blocks_layout: BlocksData['blocks_layout'];
}) {
  const plateChildren = blocks_layout.items.map((blockId) => {
    const block = blocks[blockId];

    if (block['@type'] === 'slate') {
      return {
        type: 'p',
        children: [block.value[0]],
        ...block,
      };
    } else if (block['@type'] === 'title') {
      return {
        type: 'title',
        children: [
          {
            text: 'The title',
          },
        ],
        ...block,
      };
    }
  });

  return plateChildren.filter((block) => block !== undefined);
}

const ConsoleLog = () => {
  const [editorState] = useAtom(editorAtomSimple);

  return (
    <div className="mt-4">
      <pre>{JSON.stringify(editorState, null, 2)}</pre>
    </div>
  );
};

export const editorAtomSimple = atom({} as Value);
const customStore = createStore();

export default function Page() {
  const { content } = useRouteLoaderData('root');

  return (
    <Provider store={customStore}>
      <HydrateAtoms
        atomValues={[
          [
            editorAtomSimple,
            blocksToPlate({
              blocks: content.blocks,
              blocks_layout: content.blocks_layout,
            }),
          ],
        ]}
      >
        <div className="h-[90%] w-full" data-registry="plate">
          <SimplePlateEditor
            value={blocksToPlate({
              blocks: content.blocks,
              blocks_layout: content.blocks_layout,
            })}
          />

          <ConsoleLog />
          <Toaster />
        </div>
      </HydrateAtoms>
    </Provider>
  );
}
