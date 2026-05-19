import type { TImageElement } from 'platejs';
import type { PlateElementProps } from 'platejs/react';

import { useDraggable } from '@platejs/dnd';
import {
  ImagePlugin,
  Image as PlateImage,
  useMediaState,
} from '@platejs/media/react';
import { flattenToAppURL } from '@plone/helpers';
import config from '@plone/registry';
import { Button, Tabs, TextField } from '@plone/components/quanta';
import { ResizableProvider, useResizableValue } from '@platejs/resizable';
import {
  ExternalLinkIcon,
  ImagePlusIcon,
  Loader2Icon,
  SearchIcon,
  UploadIcon,
} from 'lucide-react';
import { isUrl } from 'platejs';
import { PlateElement, withHOC } from 'platejs/react';
import * as React from 'react';
import { toast } from 'sonner';
import { useFilePicker } from 'use-file-picker';

import { cn } from '../../lib/utils';
import { useUploadFile } from '../../hooks/use-upload-file';

import { Caption, CaptionTextarea } from './caption';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './dialog';
import { MediaToolbar } from './media-toolbar';
import {
  mediaResizeHandleVariants,
  Resizable,
  ResizeHandle,
} from './resize-handle';

type ImageSearchItem = {
  '@id'?: string;
  title?: string;
  description?: string;
};

export const ImageElement = withHOC(
  ResizableProvider,
  function ImageElement(props: PlateElementProps<TImageElement>) {
    const imageElement = props.element as TImageElement;
    const { align = 'center', focused, readOnly, selected } = useMediaState();
    const normalizedAlign = align;
    const isFloatingAlign =
      normalizedAlign === 'left' || normalizedAlign === 'right';
    const width = useResizableValue('width');
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('upload');
    const [didDismissEmptyImageDialog, setDidDismissEmptyImageDialog] =
      React.useState(false);
    const [urlValue, setUrlValue] = React.useState('');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [searchResults, setSearchResults] = React.useState<ImageSearchItem[]>(
      [],
    );
    const [searchPending, setSearchPending] = React.useState(false);
    const [searchError, setSearchError] = React.useState('');
    const [selectedResultId, setSelectedResultId] = React.useState('');

    const { isDragging, handleRef } = useDraggable({
      element: props.element,
    });
    const { isUploading, progress, uploadFile, uploadingFile } =
      useUploadFile();
    const hasImageUrl = Boolean(imageElement.url);

    const setImageNode = React.useCallback(
      (values: Partial<TImageElement>) => {
        const path = props.editor.api.findPath(props.element);

        if (!path) return false;

        props.editor.tf.setNodes(values, { at: path });

        return true;
      },
      [props.editor, props.element],
    );

    const closeDialog = React.useCallback(() => {
      setDialogOpen(false);
    }, []);

    const handleDialogOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        setDialogOpen(nextOpen);
        if (!nextOpen && !hasImageUrl) {
          setDidDismissEmptyImageDialog(true);
        }
      },
      [hasImageUrl],
    );

    const openDialog = React.useCallback(() => {
      setDidDismissEmptyImageDialog(false);
      setDialogOpen(true);
    }, []);

    const handleUrlInsert = React.useCallback(() => {
      const normalized = urlValue.trim();

      if (!isUrl(normalized)) {
        toast.error('Please enter a valid URL');
        return;
      }

      const didSet = setImageNode({ url: normalized });
      if (!didSet) {
        toast.error('Unable to update image block');
        return;
      }

      closeDialog();
    }, [closeDialog, setImageNode, urlValue]);

    const handleExistingImageSelect = React.useCallback(() => {
      const selectedItem = searchResults.find(
        (item) => item['@id'] === selectedResultId,
      );
      const rawId = selectedItem?.['@id'];

      if (!rawId) {
        toast.error('Please select an image');
        return;
      }

      const imageUrl = toImageScaleUrl(rawId);
      const didSet = setImageNode({
        alt:
          (props.element as TImageElement & { alt?: string }).alt ??
          selectedItem?.title ??
          '',
        url: imageUrl,
      });

      if (!didSet) {
        toast.error('Unable to update image block');
        return;
      }

      closeDialog();
    }, [
      closeDialog,
      props.element,
      searchResults,
      selectedResultId,
      setImageNode,
    ]);

    const handleUpload = React.useCallback(
      async (file?: File) => {
        if (!file) return;

        const uploadedFile = await uploadFile(file);
        if (!uploadedFile?.url) {
          toast.error('Could not upload image');
          return;
        }

        const didSet = setImageNode({
          alt:
            (props.element as TImageElement & { alt?: string }).alt ??
            file.name ??
            '',
          isUpload: true,
          url: uploadedFile.url,
        });

        if (!didSet) {
          toast.error('Unable to update image block');
          return;
        }

        closeDialog();
      },
      [closeDialog, props.element, setImageNode, uploadFile],
    );

    const { openFilePicker } = useFilePicker({
      accept: ['image/*'],
      multiple: false,
      onFilesSelected: ({ plainFiles }) => {
        void handleUpload(plainFiles[0]);
      },
    });

    React.useEffect(() => {
      if (hasImageUrl) {
        setDidDismissEmptyImageDialog(false);
      }
    }, [hasImageUrl]);

    React.useEffect(() => {
      if (
        !hasImageUrl &&
        selected &&
        focused &&
        !readOnly &&
        !didDismissEmptyImageDialog
      ) {
        setDialogOpen(true);
      }
    }, [didDismissEmptyImageDialog, focused, hasImageUrl, readOnly, selected]);

    React.useEffect(() => {
      if (!dialogOpen || activeTab !== 'existing') return;

      const apiPath = config.settings.apiPath;

      if (!apiPath) {
        setSearchError('API path is not configured');
        setSearchResults([]);
        return;
      }

      const controller = new AbortController();
      const timeoutId = window.setTimeout(async () => {
        setSearchPending(true);
        setSearchError('');

        const params = new URLSearchParams({
          b_size: '20',
          portal_type: 'Image',
          sort_on: 'modified',
          sort_order: 'descending',
        });

        if (searchTerm.trim()) {
          params.set('SearchableText', searchTerm.trim());
        }

        try {
          const response = await fetch(
            `${apiPath.replace(/\/$/, '')}/@search?${params.toString()}`,
            {
              credentials: 'include',
              signal: controller.signal,
            },
          );

          if (!response.ok) {
            throw new Error(response.statusText || 'Search request failed');
          }

          const data = await response.json();
          const items: ImageSearchItem[] = Array.isArray(data?.items)
            ? data.items
            : [];

          setSearchResults(items);
          if (
            selectedResultId &&
            !items.some((item) => item['@id'] === selectedResultId)
          ) {
            setSelectedResultId('');
          }
        } catch {
          if (controller.signal.aborted) return;
          setSearchResults([]);
          setSearchError('Could not load images');
        } finally {
          if (!controller.signal.aborted) {
            setSearchPending(false);
          }
        }
      }, 250);

      return () => {
        controller.abort();
        window.clearTimeout(timeoutId);
      };
    }, [activeTab, dialogOpen, searchTerm, selectedResultId]);

    const imageNode = (
      <PlateElement {...props} className="py-2.5">
        <figure
          className={cn(
            'group pointer-events-auto relative z-20 m-0 w-fit max-w-full',
            normalizedAlign === 'left' && 'float-left mr-4 mb-2',
            normalizedAlign === 'right' && 'float-right mb-2 ml-4',
            !isFloatingAlign && 'clear-both mx-auto',
          )}
          contentEditable={false}
        >
          {hasImageUrl ? (
            <>
              <Resizable
                align={normalizedAlign}
                options={{
                  align: normalizedAlign,
                  // The resizable wrapper width can collapse to the current
                  // image width, which blocks growing again after shrinking.
                  // Use an explicit pixel max to keep growth possible.
                  maxWidth: 2000,
                  readOnly,
                }}
              >
                <ResizeHandle
                  className={mediaResizeHandleVariants({ direction: 'left' })}
                  options={{ direction: 'left' }}
                />
                <PlateImage
                  ref={handleRef}
                  className={cn(
                    'block w-full max-w-full cursor-pointer object-cover px-0',
                    'rounded-sm',
                    focused && selected && 'ring-2 ring-ring ring-offset-2',
                    isDragging && 'opacity-50',
                  )}
                  alt={
                    (imageElement as TImageElement & { alt?: string }).alt ??
                    (props.attributes.alt as string | undefined)
                  }
                  src={imageElement.url}
                />
                <ResizeHandle
                  className={mediaResizeHandleVariants({
                    direction: 'right',
                  })}
                  options={{ direction: 'right' }}
                />
              </Resizable>

              <Caption style={{ width }} align={normalizedAlign}>
                <CaptionTextarea
                  readOnly={readOnly}
                  onFocus={(e) => {
                    e.preventDefault();
                  }}
                  placeholder="Write a caption..."
                />
              </Caption>
            </>
          ) : (
            <div
              className={cn(
                `
                  flex min-h-36 w-full flex-col justify-center gap-3 rounded-md border border-dashed
                  border-muted-foreground/35 bg-muted/30 p-4
                `,
                focused && selected && 'ring-2 ring-ring ring-offset-2',
              )}
            >
              <div className="flex items-center gap-2 text-sm font-medium">
                <ImagePlusIcon className="size-4 text-muted-foreground" />
                Choose an image source
              </div>
              <div className="text-xs text-muted-foreground">
                Upload from your computer, select an existing Image content
                item, or provide an external URL.
              </div>
              {!readOnly && (
                <div>
                  <Button variant="primary" onPress={openDialog}>
                    Add image
                  </Button>
                </div>
              )}
            </div>
          )}
        </figure>
        {!isFloatingAlign && (
          <div aria-hidden className="clear-both h-0" contentEditable={false} />
        )}

        {!readOnly && !hasImageUrl && (
          <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Insert image</DialogTitle>
                <DialogDescription>
                  Upload a file, select an existing image content item, or use
                  an image URL.
                </DialogDescription>
              </DialogHeader>

              <Tabs
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(String(key))}
                tabs={[
                  {
                    id: 'upload',
                    title: 'Upload',
                    content: (
                      <div className="space-y-3 pt-1">
                        <p className="text-sm text-muted-foreground">
                          Upload an image from your computer.
                        </p>
                        <Button
                          variant="primary"
                          onPress={() => openFilePicker()}
                          isDisabled={isUploading}
                        >
                          {isUploading ? (
                            <>
                              <Loader2Icon className="size-4 animate-spin" />
                              Uploading {uploadingFile?.name ?? 'image'}{' '}
                              {Math.round(progress ?? 0)}%
                            </>
                          ) : (
                            <>
                              <UploadIcon className="size-4" />
                              Upload image
                            </>
                          )}
                        </Button>
                      </div>
                    ),
                  },
                  {
                    id: 'existing',
                    title: 'Existing',
                    content: (
                      <div className="space-y-3 pt-1">
                        <TextField
                          label="Search images"
                          placeholder="Type to search image content..."
                          value={searchTerm}
                          onChange={setSearchTerm}
                        />
                        <div
                          className={`
                            max-h-64 overflow-y-auto rounded-md border border-border bg-background
                          `}
                        >
                          {searchPending && (
                            <div
                              className={`
                                flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground
                              `}
                            >
                              <Loader2Icon className="size-4 animate-spin" />
                              Loading images...
                            </div>
                          )}
                          {!searchPending && searchError && (
                            <div className="px-3 py-2 text-sm text-destructive">
                              {searchError}
                            </div>
                          )}
                          {!searchPending &&
                            !searchError &&
                            searchResults.length === 0 && (
                              <div
                                className={`
                                  flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground
                                `}
                              >
                                <SearchIcon className="size-4" />
                                No image content found
                              </div>
                            )}
                          {!searchPending &&
                            !searchError &&
                            searchResults.map((item) => {
                              const id = item['@id'] ?? '';
                              const selected = id === selectedResultId;

                              return (
                                <button
                                  key={id}
                                  type="button"
                                  className={cn(
                                    `
                                      flex w-full flex-col items-start border-b border-border px-3
                                      py-2 text-left text-sm
                                      last:border-b-0
                                    `,
                                    selected
                                      ? 'bg-primary/10 text-foreground'
                                      : 'hover:bg-muted/40',
                                  )}
                                  onClick={() => setSelectedResultId(id)}
                                >
                                  <span className="font-medium">
                                    {item.title || id}
                                  </span>
                                  {item.description ? (
                                    <span className="text-xs text-muted-foreground">
                                      {item.description}
                                    </span>
                                  ) : null}
                                  <span className="text-xs text-muted-foreground">
                                    {flattenToAppURL(id)}
                                  </span>
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    ),
                  },
                  {
                    id: 'url',
                    title: 'URL',
                    content: (
                      <div className="space-y-3 pt-1">
                        <TextField
                          label="Image URL"
                          placeholder="https://example.com/image.jpg"
                          value={urlValue}
                          onChange={setUrlValue}
                        />
                        <p className="text-sm text-muted-foreground">
                          Paste a direct image URL.
                        </p>
                      </div>
                    ),
                  },
                ]}
              />

              <DialogFooter>
                <Button variant="neutral" onPress={closeDialog}>
                  Cancel
                </Button>
                {activeTab === 'existing' && (
                  <Button
                    variant="primary"
                    onPress={handleExistingImageSelect}
                    isDisabled={!selectedResultId}
                  >
                    Use selected image
                  </Button>
                )}
                {activeTab === 'url' && (
                  <Button
                    variant="primary"
                    onPress={handleUrlInsert}
                    isDisabled={!urlValue.trim()}
                  >
                    <ExternalLinkIcon className="size-4" />
                    Use URL
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {props.children}
      </PlateElement>
    );

    if (!hasImageUrl) return imageNode;

    return <MediaToolbar plugin={ImagePlugin}>{imageNode}</MediaToolbar>;
  },
);

function toImageScaleUrl(imageId: string) {
  const flattenedId = flattenToAppURL(imageId);

  if (flattenedId.includes('/@@images/')) return flattenedId;

  return `${flattenedId.replace(/\/$/, '')}/@@images/image`;
}
