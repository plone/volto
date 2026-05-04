import { PencilLineIcon } from 'lucide-react';
import { useEditorPlugin, usePluginOption } from 'platejs/react';

import { cn } from '../../lib/utils';
import { usePlatePlugins } from '../editor/plate-plugins-context';
import { SuggestionPlugin } from '../editor/plugins/suggestion-kit';

import { ToolbarButton } from './toolbar';

export function SuggestionToolbarButton() {
  const { setOption } = useEditorPlugin(SuggestionPlugin);
  const isSuggesting = usePluginOption(SuggestionPlugin, 'isSuggesting');
  const { currentUserId } = usePlatePlugins();

  return (
    <ToolbarButton
      className={cn(
        isSuggesting &&
          `
            text-brand/80
            hover:text-brand/80
          `,
      )}
      onClick={() => {
        const nextIsSuggesting = !isSuggesting;

        setOption('currentUserId', nextIsSuggesting ? currentUserId : null);
        setOption('isSuggesting', nextIsSuggesting);
      }}
      onMouseDown={(e) => e.preventDefault()}
      tooltip={isSuggesting ? 'Turn off suggesting' : 'Suggestion edits'}
    >
      <PencilLineIcon />
    </ToolbarButton>
  );
}
