import { useEffect, useRef } from 'react';
import type { Content } from '@plone/types/src/content';
import type { BlockEditProps } from '@plone/types/src/blocks';
import { useFieldFocusedAtom } from '@plone/cmsui/helpers/atoms';
import config from '@plone/registry';
import { clsx } from 'clsx';

/**
 * Single-line, plain-text, fixed-style editable heading using bare contentEditable.
 * - Prevents Enter/newlines.
 * - Strips formatting on paste (plain text only).
 * - Collapses any injected newlines into spaces.
 * - Optional maxLength.
 *
 * This component has been AI generated.
 */
export function SingleLineH1({
  value,
  onChange,
  placeholder = 'Type a title…',
  maxLength = 120,
  className = '',
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}) {
  const ref = useRef(null);

  // Keep DOM in sync with value when controlled externally
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.innerText !== (value ?? '')) {
      el.innerText = value ?? '';
    }
  }, [value]);

  const getSanitized = (text) => {
    if (typeof text !== 'string') return '';
    // Replace any newlines/tabs with single spaces and trim extra spaces
    const collapsed = text.replace(/[\n\r\t]+/g, ' ').replace(/\s{2,}/g, ' ');
    return collapsed.slice(0, maxLength);
  };

  const emitChange = () => {
    const el = ref.current;
    if (!el) return;
    const sanitized = getSanitized(el.innerText);
    if (el.innerText !== sanitized) {
      el.innerText = sanitized;
    }
    onChange?.(sanitized);
  };

  const onKeyDown = (e) => {
    // Block Enter/Return from creating new lines
    if (e.key === 'Enter') {
      e.preventDefault();
      return;
    }
    // Optionally prevent line breaks via Shift+Enter on some platforms
    if (e.key === 'Enter' && (e.shiftKey || e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      return;
    }
    // Enforce max length in a simple way for common typing
    const el = ref.current;
    if (!el) return;
    const sel = window.getSelection();
    const isPrintable =
      e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey;
    const len = el.innerText.length;
    const selectionLength = sel && sel.toString ? sel.toString().length : 0;
    if (isPrintable && len - selectionLength >= maxLength) {
      e.preventDefault();
    }
  };

  const onPaste = (e) => {
    // Force plain text paste, collapse newlines, enforce max length
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain') || '';
    const toInsert = getSanitized(text);

    // Insert at caret position without formatting
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(toInsert));

    // Move caret to end of inserted text
    range.setStartAfter(range.endContainer);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);

    // Emit sanitized content
    requestAnimationFrame(emitChange);
  };

  const onInput = () => {
    emitChange();
  };

  return (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h1
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      role="textbox"
      aria-multiline="false"
      spellCheck={true}
      data-placeholder={placeholder}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      onInput={onInput}
      className={clsx(
        'pb-1 font-heading text-4xl font-bold slate-h1 outline-none caret-current selection:bg-black/10 dark:selection:bg-white/20 empty:before:text-gray-400 empty:before:content-[attr(data-placeholder)] leading-tight break-words whitespace-nowrap',
        className,
      )}
      style={{
        // Hard limit to single rendered line; show ellipsis if too long
        display: 'block',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    />
  );
}

export default function TitleBlockEdit(props: BlockEditProps) {
  const formAtom = config
    .getUtility({
      name: 'formAtom',
      type: 'atom',
    })
    ?.method();

  const [titleValue, setTitle] = useFieldFocusedAtom<Content>(
    formAtom,
    'title',
  );

  return (
    <SingleLineH1
      onChange={(value) => setTitle(value)}
      value={titleValue as string}
    />
  );
}
