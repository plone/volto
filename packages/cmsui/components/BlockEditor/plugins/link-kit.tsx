import * as React from 'react';

import type { Brain } from '@plone/types';
import type { TLinkElement } from 'platejs';

import {
  type UseVirtualFloatingOptions,
  flip,
  offset,
} from '@platejs/floating';
import {
  LinkPlugin as PlateLinkPlugin,
  submitFloatingLink,
  useFloatingLinkEdit,
  useFloatingLinkEditState,
  useFloatingLinkEscape,
  useFloatingLinkInsert,
  useFloatingLinkInsertState,
} from '@platejs/link/react';
import { cva } from 'class-variance-authority';
import {
  Check,
  ExternalLink,
  FolderOpen,
  Link,
  LoaderCircle,
  Search,
  Unlink,
} from 'lucide-react';
import { useAtomValue } from 'jotai';
import { KEYS, RangeApi } from 'platejs';
import {
  useEditorPlugin,
  useEditorRef,
  useEditorSelection,
  useFormInputProps,
  usePluginOption,
} from 'platejs/react';
import { useFetcher } from 'react-router';
import { flattenToAppURL, isInternalURL } from '@plone/helpers';

import { buttonVariants } from '@plone/plate/components/ui/button';
import { LinkElement } from '@plone/plate/components/ui/link-node';
import { Separator } from '@plone/plate/components/ui/separator';
import { LegacyLinkPlugin } from '@plone/plate/components/editor/plugins/legacy-link-plugin';
import { ObjectBrowserProvider } from '../../ObjectBrowserWidget/ObjectBrowserContext';
import { ObjectBrowserModal } from '../../ObjectBrowserWidget/ObjectBrowserModal';
import { buildObjectBrowserUrl } from '../../ObjectBrowserWidget/utils';
import { formAtom } from '../../../routes/atoms';

const popoverVariants = cva(
  'z-50 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-hidden',
);

const inputVariants = cva(
  `
    flex h-[28px] w-full rounded-md border-none bg-transparent px-1.5 py-1 text-base
    placeholder:text-muted-foreground
    focus-visible:ring-transparent focus-visible:outline-none
    md:text-sm
  `,
);

const resultsListVariants = cva(
  'mt-1 max-h-56 overflow-y-auto rounded-md border bg-background',
);

const resultButtonVariants = cva(
  `
    flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left text-sm
    hover:bg-muted
    focus:bg-muted focus:outline-none
  `,
);

type SearchItem = Pick<Brain, '@id' | 'title' | 'description' | '@type'>;

const isDirectLinkInput = (value: string) => {
  const trimmed = value.trim();

  return (
    trimmed.startsWith('/') ||
    trimmed.startsWith('#') ||
    /^[a-z][a-z\d+.-]*:/i.test(trimmed) ||
    false
  );
};

const shouldSearchForInput = (value: string) => {
  const trimmed = value.trim();

  if (trimmed.length < 2) return false;
  if (isDirectLinkInput(trimmed)) return false;

  return true;
};

const normalizeLinkUrl = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) return trimmed;
  if (isInternalURL(trimmed)) {
    return flattenToAppURL(trimmed);
  }

  return trimmed;
};

const getInternalLinkTarget = (value?: string | null) => {
  if (!value) return null;

  const normalizedUrl = normalizeLinkUrl(value);

  return normalizedUrl.startsWith('/') ? normalizedUrl : null;
};

const getParentPath = (path?: string | null) => {
  if (!path || path === '/') return '/';

  const segments = path.split('/').filter(Boolean);
  if (segments.length <= 1) return '/';

  return `/${segments.slice(0, -1).join('/')}`;
};

function LinkOpenButton() {
  const editor = useEditorRef();
  useEditorSelection();
  const entry = editor.api.node<TLinkElement>({
    match: { type: editor.getType(KEYS.link) },
  });
  const attributes = entry
    ? editor.getApi(PlateLinkPlugin).link.getAttributes(entry[0])
    : {};

  return (
    <a
      {...attributes}
      className={buttonVariants({
        size: 'sm',
        variant: 'ghost',
      })}
      onMouseOver={(event) => {
        event.stopPropagation();
      }}
      onFocus={(event) => {
        event.stopPropagation();
      }}
      aria-label="Open link in a new tab"
      target="_blank"
    >
      <ExternalLink width={18} />
    </a>
  );
}

function CmsuiLinkInput({
  url,
  onChange,
  onSubmit,
  onOpenBrowser,
  searching,
  inputProps,
}: {
  url: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onOpenBrowser: () => void;
  searching: boolean;
  inputProps: ReturnType<typeof useFormInputProps>;
}) {
  return (
    <div className="flex items-center gap-1" {...inputProps}>
      <div className="flex items-center pr-1 pl-2 text-muted-foreground">
        <Link className="size-4" />
      </div>

      <input
        className={inputVariants()}
        placeholder="Paste link or search content"
        data-plate-focus
        value={url}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key !== 'Enter') return;

          event.preventDefault();
          onSubmit();
        }}
      />

      <button
        className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        type="button"
        onMouseDown={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onOpenBrowser();
        }}
        aria-label="Browse content"
      >
        <FolderOpen className="size-4" />
      </button>

      <button
        className={buttonVariants({ size: 'icon', variant: 'ghost' })}
        type="button"
        onMouseDown={(event) => {
          event.preventDefault();
        }}
        onClick={onSubmit}
        aria-label={shouldSearchForInput(url) ? 'Search content' : 'Apply link'}
      >
        {searching ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : shouldSearchForInput(url) ? (
          <Search className="size-4" />
        ) : (
          <Check className="size-4" />
        )}
      </button>
    </div>
  );
}

function LinkObjectBrowser({
  open,
  initialPath,
  selectedUrl,
  onClose,
  onSelect,
}: {
  open: boolean;
  initialPath?: string;
  selectedUrl?: string;
  onClose: () => void;
  onSelect: (item: SearchItem) => void;
}) {
  const handleChange = React.useCallback(
    (selected: Partial<Brain>[]) => {
      const item = selected[0];
      if (!item?.['@id']) return;

      onSelect(item as SearchItem);
      onClose();
    },
    [onClose, onSelect],
  );

  if (!open) return null;

  return (
    <ObjectBrowserProvider
      config={{
        mode: 'single',
        title: 'Select content',
        initialPath,
        selectedItemAttrs: ['@id', 'title', 'description', '@type'],

        defaultValue: selectedUrl
          ? ([{ '@id': selectedUrl, title: '' }] as Brain[])
          : [],
        onChange: handleChange,
      }}
    >
      <ObjectBrowserModal
        isOpen={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) onClose();
        }}
      />
    </ObjectBrowserProvider>
  );
}

function LinkFloatingToolbar({
  state,
}: {
  state?: { floatingOptions?: UseVirtualFloatingOptions };
}) {
  const editor = useEditorRef();
  const selection = useEditorSelection();
  const content = useAtomValue(formAtom);
  const currentContentPath = content?.['@id'];
  const { setOption } = useEditorPlugin(PlateLinkPlugin);
  const searchFetcher = useFetcher<{ results?: { items?: SearchItem[] } }>();
  const inputProps = useFormInputProps({
    preventDefaultOnEnterKeydown: true,
  });
  const activeCommentId = usePluginOption({ key: KEYS.comment }, 'activeId');
  const activeSuggestionId = usePluginOption(
    { key: KEYS.suggestion },
    'activeId',
  );
  const mode = usePluginOption(PlateLinkPlugin, 'mode');
  const isEditing = usePluginOption(PlateLinkPlugin, 'isEditing');
  const url = usePluginOption(PlateLinkPlugin, 'url') ?? '';
  const [isObjectBrowserOpen, setObjectBrowserOpen] = React.useState(false);
  const lastSelectionRef = React.useRef(selection);
  const pendingSelectionRef = React.useRef<any>(null);
  const debouncedUrl = React.useDeferredValue(url);
  const [objectBrowserPath, setObjectBrowserPath] = React.useState<
    string | undefined
  >(undefined);
  const activeLinkEntry = editor.api.node<TLinkElement>({
    match: { type: editor.getType(KEYS.link) },
  });

  React.useEffect(() => {
    if (selection) {
      lastSelectionRef.current = selection;
    }
  }, [selection]);

  const floatingOptions: UseVirtualFloatingOptions = React.useMemo(() => {
    return {
      middleware: [
        offset(8),
        flip({
          fallbackPlacements: ['bottom-end', 'top-start', 'top-end'],
          padding: 12,
        }),
      ],
      placement:
        activeSuggestionId || activeCommentId ? 'top-start' : 'bottom-start',
    };
  }, [activeCommentId, activeSuggestionId]);

  const insertState = useFloatingLinkInsertState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions,
    },
  });
  const {
    hidden,
    props: insertProps,
    ref: insertRef,
  } = useFloatingLinkInsert(insertState);

  const editState = useFloatingLinkEditState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions,
    },
  });
  const {
    editButtonProps,
    props: editProps,
    ref: editRef,
    unlinkButtonProps,
  } = useFloatingLinkEdit(editState);

  useFloatingLinkEscape();

  React.useEffect(() => {
    if (!mode) return;
    if (!shouldSearchForInput(debouncedUrl)) return;

    const timeout = window.setTimeout(() => {
      const searchUrl = buildObjectBrowserUrl(undefined, debouncedUrl.trim());
      if (searchUrl) {
        searchFetcher.load(searchUrl);
      }
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [debouncedUrl, mode, searchFetcher]);

  const restoreSelection = React.useCallback(() => {
    const selectionToRestore =
      pendingSelectionRef.current ?? lastSelectionRef.current;

    if (!selectionToRestore) return;

    editor.tf.select(selectionToRestore);
  }, [editor]);

  const openObjectBrowser = React.useCallback(() => {
    const currentSelection = editor.selection ?? lastSelectionRef.current;
    const activeLinkUrl =
      activeLinkEntry && typeof activeLinkEntry[0]?.url === 'string'
        ? activeLinkEntry[0].url
        : '';
    const nextTarget =
      getInternalLinkTarget(url) ?? getInternalLinkTarget(activeLinkUrl);

    pendingSelectionRef.current = currentSelection;
    setObjectBrowserPath(getParentPath(nextTarget ?? currentContentPath));
    setObjectBrowserOpen(true);
  }, [activeLinkEntry, currentContentPath, editor, url]);

  const applyLink = React.useCallback(
    (nextUrl: string, fallbackText?: string) => {
      const normalizedUrl = normalizeLinkUrl(nextUrl);

      restoreSelection();
      setOption('url', normalizedUrl);

      const selectionToRestore =
        pendingSelectionRef.current ?? lastSelectionRef.current;
      const selectedText = selectionToRestore
        ? editor.api.string(selectionToRestore).trim()
        : '';
      const shouldUseFallbackText =
        !selectedText &&
        selectionToRestore &&
        RangeApi.isCollapsed(selectionToRestore);

      if (selectedText) {
        setOption('text', selectedText);
      } else if (shouldUseFallbackText && fallbackText) {
        setOption('text', fallbackText);
      }

      submitFloatingLink(editor);
      pendingSelectionRef.current = null;
    },
    [editor, restoreSelection, setOption],
  );

  const handleResultSelect = React.useCallback(
    (item: SearchItem) => {
      applyLink(flattenToAppURL(item['@id']), item.title);
    },
    [applyLink],
  );

  const results = React.useMemo(
    () =>
      shouldSearchForInput(url)
        ? ((searchFetcher.data?.results?.items as SearchItem[] | undefined) ??
          [])
        : [],
    [searchFetcher.data?.results?.items, url],
  );
  const searching =
    shouldSearchForInput(url) && searchFetcher.state === 'loading';

  const handleSubmit = React.useCallback(() => {
    const nextUrl = normalizeLinkUrl(url);
    if (!nextUrl) return;
    if (shouldSearchForInput(nextUrl) && results.length > 0) {
      handleResultSelect(results[0]);
      return;
    }
    if (!shouldSearchForInput(nextUrl)) {
      applyLink(nextUrl);
    }
  }, [applyLink, handleResultSelect, results, url]);

  const input = (
    <div
      className="flex w-full flex-col"
      onPointerDown={(event) => event.stopPropagation()}
    >
      <CmsuiLinkInput
        url={url}
        onChange={(value) => setOption('url', value)}
        onSubmit={handleSubmit}
        onOpenBrowser={openObjectBrowser}
        searching={searching}
        inputProps={inputProps}
      />

      {shouldSearchForInput(url) ? (
        <>
          <Separator className="my-1" />
          <div className="px-2 pb-1 text-xs text-muted-foreground">
            Search results
          </div>
          <div className={resultsListVariants()}>
            {results.length > 0 ? (
              results.map((item) => (
                <button
                  key={item['@id']}
                  type="button"
                  className={`
                    ${resultButtonVariants()}
                    ${item['@id'] === results[0]?.['@id'] ? 'bg-muted' : ''}
                  `}
                  data-selected={item['@id'] === results[0]?.['@id']}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  onClick={() => handleResultSelect(item)}
                >
                  <span className="font-medium">
                    {item.title || item['@id']}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {flattenToAppURL(item['@id'])}
                  </span>
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-muted-foreground">
                {searching ? 'Searching…' : 'No matching content found'}
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );

  const editContent = isEditing ? (
    input
  ) : (
    <div className="box-content flex items-center">
      <button
        className={buttonVariants({ size: 'sm', variant: 'ghost' })}
        type="button"
        {...editButtonProps}
      >
        Edit link
      </button>

      <Separator orientation="vertical" />

      <button
        className={buttonVariants({ size: 'sm', variant: 'ghost' })}
        type="button"
        onMouseDown={(event) => {
          event.preventDefault();
          event.stopPropagation();
          openObjectBrowser();
        }}
      >
        Browse
      </button>

      <Separator orientation="vertical" />

      <LinkOpenButton />

      <Separator orientation="vertical" />

      <button
        className={buttonVariants({
          size: 'sm',
          variant: 'ghost',
        })}
        type="button"
        {...unlinkButtonProps}
      >
        <Unlink width={18} />
      </button>
    </div>
  );

  if (hidden && !isObjectBrowserOpen) return null;

  return (
    <>
      {!hidden ? (
        <>
          <div
            ref={insertRef as any}
            className={popoverVariants()}
            {...(insertProps as any)}
          >
            {input}
          </div>

          <div
            ref={editRef as any}
            className={popoverVariants()}
            {...(editProps as any)}
          >
            {editContent}
          </div>
        </>
      ) : null}

      <LinkObjectBrowser
        open={isObjectBrowserOpen}
        initialPath={objectBrowserPath}
        selectedUrl={getInternalLinkTarget(url) ?? undefined}
        onClose={() => setObjectBrowserOpen(false)}
        onSelect={(item) => {
          applyLink(flattenToAppURL(item['@id']), item.title);
        }}
      />
    </>
  );
}

export const LinkKit = [
  ...LegacyLinkPlugin,
  PlateLinkPlugin.configure({
    options: {
      transformInput: normalizeLinkUrl,
    },
    render: {
      node: LinkElement,
      afterEditable: () => <LinkFloatingToolbar />,
    },
  }),
];
