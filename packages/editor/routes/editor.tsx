import { Toaster } from 'sonner';
import type { Value } from '@udecode/plate';

import { PlateEditor } from '@/components/editor/plate-editor';
import { SettingsProvider } from '@/components/editor/settings';
import { useRouteLoaderData } from 'react-router';
import type { BlocksData } from '@plone/types';
import { atom, useAtom } from 'jotai';
import { InitAtoms } from '@plone/helpers';
import { blocksToPlate as blocksToPlateNew } from '../helpers/conversions';

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
  const [editorState] = useAtom(editorAtom);

  return (
    <div className="mt-4">
      <pre>{JSON.stringify(editorState, null, 2)}</pre>
    </div>
  );
};

export const editorAtom = atom({} as Value);

export default function Page() {
  const { content } = useRouteLoaderData('root');
  const initialValue = blocksToPlateNew(content);

  return (
    <InitAtoms atomValues={[[editorAtom, initialValue]]}>
      <div className="h-[90%] w-full" data-registry="plate">
        <SettingsProvider>
          <PlateEditor value={initialValue} />
        </SettingsProvider>
        <ConsoleLog />
        <Toaster />
      </div>
    </InitAtoms>
  );
}
