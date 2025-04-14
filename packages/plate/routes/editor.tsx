import { Toaster } from 'sonner';

import { PlateEditor } from '@/components/editor/plate-editor';
import { SettingsProvider } from '@/components/editor/settings';
import { useRouteLoaderData } from 'react-router';

export default function Page() {
  const { content } = useRouteLoaderData('root');

  return (
    <div className="h-[90%] w-full" data-registry="plate">
      <SettingsProvider>
        <PlateEditor
          value={{
            blocks: content.blocks,
            blocks_layout: content.blocks_layout,
          }}
        />
      </SettingsProvider>

      <Toaster />
    </div>
  );
}
