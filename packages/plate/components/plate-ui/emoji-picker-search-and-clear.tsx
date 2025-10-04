import type { UseEmojiPickerType } from '@udecode/plate-emoji/react';

import { cn } from '@udecode/cn';

import { Button } from './button';
import { emojiSearchIcons } from './emoji-icons';

export type EmojiPickerSearchAndClearProps = Pick<
  UseEmojiPickerType,
  'clearSearch' | 'i18n' | 'searchValue'
>;

export function EmojiPickerSearchAndClear({
  clearSearch,
  i18n,
  searchValue,
}: EmojiPickerSearchAndClearProps) {
  return (
    <div className="text-foreground flex items-center">
      <div
        className={cn(
          'text-foreground absolute top-1/2 left-2.5 z-10 flex size-5 -translate-y-1/2 items-center justify-center',
        )}
      >
        {emojiSearchIcons.loupe}
      </div>
      {searchValue && (
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            'text-popover-foreground absolute top-1/2 right-0.5 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-transparent hover:bg-transparent',
          )}
          onClick={clearSearch}
          title={i18n.clear}
          aria-label="Clear"
          type="button"
        >
          {emojiSearchIcons.delete}
        </Button>
      )}
    </div>
  );
}
