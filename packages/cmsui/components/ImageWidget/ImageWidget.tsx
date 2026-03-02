import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
} from 'react';
import { useFetcher } from 'react-router';
import { DialogTrigger } from 'react-aria-components';
import { Button, Input } from '@plone/components/quanta';
import {
  BinIcon,
  ImageIcon,
  LinkIcon,
  NavigationIcon,
  UploadIcon,
} from '@plone/components/Icons';
import type { Brain } from '@plone/types';
import type { BaseFormFieldProps } from '../TextField/TextField';
import { Description, FieldError, Label } from '../Field/Field';
import { ObjectBrowserModal } from '../ObjectBrowserWidget/ObjectBrowserModal';
import {
  ObjectBrowserProvider,
  useObjectBrowserContext,
} from '../ObjectBrowserWidget/ObjectBrowserContext';

type ImageChangeExtras = {
  title?: string;
  image_field?: string;
  image_scales?: Record<string, unknown>;
};

type VoltoImageChange = (
  id: string,
  value: string | null,
  extras?: ImageChangeExtras,
) => void;

type SevenImageChange = (
  value: string | null,
  extras?: ImageChangeExtras,
) => void;

type CommonImageInputProps = {
  className?: string;
  imageSize?: string;
  value?: unknown;
  selected?: boolean;
  hideLinkPicker?: boolean;
  hideObjectBrowserPicker?: boolean;
  restrictFileUpload?: boolean;
  objectBrowserPickerType?: 'single' | 'multiple' | 'image';
  placeholderLinkInput?: string;
  onFocus?: () => void;
  uploadPath?: string;
  currentPath?: string;
};

type ImageInputProps = CommonImageInputProps & {
  id: string;
  onChange: VoltoImageChange;
};

type ImageWidgetProps = BaseFormFieldProps &
  CommonImageInputProps & {
    onChange?: SevenImageChange;
    error?: Array<unknown>;
  };

type CreateContentResponse = {
  '@id'?: string;
  title?: string;
  message?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object';
}

function normalizeImageValue(value: unknown): string {
  if (typeof value === 'string') return value;

  if (Array.isArray(value) && value[0] && isRecord(value[0])) {
    const first = value[0];
    return typeof first['@id'] === 'string' ? first['@id'] : '';
  }

  if (isRecord(value) && typeof value['@id'] === 'string') {
    return value['@id'];
  }

  return '';
}

function isInternalUrl(url: string) {
  return url.startsWith('/');
}

function getPreviewSrc(url: string, imageSize: string) {
  if (!url) return '';
  return isInternalUrl(url) ? `${url}/@@images/image/${imageSize}` : url;
}

function getBasePath(path: string) {
  const cleanPath = path.split('?')[0].split('#')[0] || '/';
  const segments = cleanPath.split('/').filter(Boolean);

  if (segments.length <= 1) return '/';
  return `/${segments.slice(0, -1).join('/')}`;
}

function getEditPathFromUrl(pathname: string) {
  if (pathname.startsWith('/@@edit/')) {
    return `/${pathname.replace(/^\/@@edit\//, '')}`;
  }
  if (pathname === '/@@edit') return '/';
  return pathname;
}

function readFileAsDataURL(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () =>
      reject(reader.error || new Error('File read failed'));
    reader.readAsDataURL(file);
  });
}

function parseDataUrl(dataUrl: string) {
  const match = dataUrl.match(/^data:(.*?);base64,(.*)$/);
  if (!match) return null;

  return {
    contentType: match[1],
    data: match[2],
  };
}

function ObjectBrowserButton({
  title,
  onBeforeOpen,
}: {
  title: string;
  onBeforeOpen?: () => void;
}) {
  const { open, setOpen } = useObjectBrowserContext();

  return (
    <DialogTrigger isOpen={open} onOpenChange={setOpen}>
      <Button
        aria-label={title}
        size="L"
        type="button"
        variant="icon"
        onPress={onBeforeOpen}
      >
        <NavigationIcon />
      </Button>
      <ObjectBrowserModal />
    </DialogTrigger>
  );
}

function ImageInputBase({
  className,
  imageSize = 'teaser',
  selected = true,
  hideLinkPicker = false,
  hideObjectBrowserPicker = false,
  restrictFileUpload = false,
  objectBrowserPickerType = 'single',
  placeholderLinkInput,
  onFocus,
  uploadPath,
  currentPath,
  value,
  onValueChange,
}: CommonImageInputProps & {
  onValueChange: (value: string | null, extras?: ImageChangeExtras) => void;
}) {
  const imageValue = normalizeImageValue(value);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const uploadFetcher = useFetcher<CreateContentResponse>();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const [linkValue, setLinkValue] = useState(imageValue);

  useEffect(() => {
    setLinkValue(imageValue);
  }, [imageValue]);

  const resolvedCurrentPath = useMemo(() => {
    const fallbackPath =
      typeof window !== 'undefined'
        ? getEditPathFromUrl(window.location.pathname)
        : '/';
    return currentPath || fallbackPath;
  }, [currentPath]);

  const resolvedUploadPath = useMemo(
    () => uploadPath || getBasePath(resolvedCurrentPath),
    [resolvedCurrentPath, uploadPath],
  );
  const objectBrowserMode =
    objectBrowserPickerType === 'multiple' ? 'multiple' : 'single';

  useEffect(() => {
    if (uploadFetcher.state !== 'idle' || !isUploading) {
      return;
    }

    const result = uploadFetcher.data;
    if (result && typeof result?.['@id'] === 'string') {
      setUploadError('');
      onValueChange(result['@id'], {
        title: result.title,
      });
    } else {
      setUploadError(result?.message || 'Image upload failed');
    }
    setIsUploading(false);
  }, [uploadFetcher.state, uploadFetcher.data, isUploading, onValueChange]);

  const submitUpload = useCallback(
    async (file: File) => {
      if (!file || restrictFileUpload) return;
      if (!file.type.startsWith('image/')) {
        setUploadError('Please upload an image file');
        return;
      }

      setUploadError('');
      setIsUploading(true);

      try {
        const dataUrl = await readFileAsDataURL(file);
        const parsed = parseDataUrl(dataUrl);

        if (!parsed) {
          setUploadError('Could not parse the selected file');
          setIsUploading(false);
          return;
        }

        uploadFetcher.submit(
          {
            path: resolvedUploadPath,
            data: {
              '@type': 'Image',
              title: file.name,
              image: {
                data: parsed.data,
                encoding: 'base64',
                'content-type': parsed.contentType,
                filename: file.name,
              },
            },
          },
          {
            method: 'post',
            encType: 'application/json',
            action: '/@createContent',
          },
        );
      } catch {
        setUploadError('Could not read the selected file');
        setIsUploading(false);
      }
    },
    [restrictFileUpload, uploadFetcher, resolvedUploadPath],
  );

  const onDrop = useCallback(
    async (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);

      const file = event.dataTransfer.files?.[0];
      if (file) {
        await submitUpload(file);
      }
    },
    [submitUpload],
  );

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  }, []);

  const onSelectInternalImage = useCallback(
    (selectedItems: Partial<Brain>[]) => {
      const selectedImage = selectedItems[0];
      if (selectedImage && typeof selectedImage['@id'] === 'string') {
        onValueChange(selectedImage['@id'], {
          title:
            typeof selectedImage.title === 'string'
              ? selectedImage.title
              : undefined,
        });
      }
    },
    [onValueChange],
  );

  if (imageValue) {
    return (
      <div
        className={`
          relative overflow-hidden rounded-md border border-quanta-azure bg-quanta-snow
          ${className || ''}
        `}
      >
        {selected && (
          <div className="absolute top-2 right-2 z-10">
            <Button
              aria-label="Clear image"
              size="L"
              type="button"
              variant="icon"
              onPress={() => onValueChange(null)}
            >
              <BinIcon />
            </Button>
          </div>
        )}
        <img
          className="max-h-[320px] w-full object-cover"
          src={getPreviewSrc(imageValue, imageSize)}
          alt=""
        />
      </div>
    );
  }

  return (
    <div
      className={`
        space-y-3 rounded-md border border-dashed border-quanta-azure bg-quanta-snow p-4
        ${className || ''}
      `}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragEnter={() => !restrictFileUpload && setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      role="group"
    >
      <div className="flex items-center gap-2 text-quanta-pigeon">
        <ImageIcon />
        <p>
          {isDragging
            ? 'Drop an image to upload'
            : 'Browse the site, drop an image, or use a URL'}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {!hideObjectBrowserPicker && (
          <ObjectBrowserProvider
            config={{
              mode: objectBrowserMode,
              selectedAttrs: ['@id', 'title'],
              onChange: onSelectInternalImage,
              initialPath: resolvedCurrentPath,
              title: 'Pick an existing image',
              widgetOptions: {
                pattern_options: {
                  selectableTypes: ['Image'],
                },
              },
            }}
          >
            <ObjectBrowserButton
              title="Pick an existing image"
              onBeforeOpen={onFocus}
            />
          </ObjectBrowserProvider>
        )}

        {!restrictFileUpload && (
          <>
            <Button
              aria-label="Upload an image"
              size="L"
              type="button"
              variant="icon"
              onPress={() => {
                onFocus?.();
                fileInputRef.current?.click();
              }}
            >
              <UploadIcon />
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) submitUpload(file);
                event.currentTarget.value = '';
              }}
            />
          </>
        )}
      </div>

      {!hideLinkPicker && (
        <div className="flex items-center gap-2">
          <div className="text-quanta-pigeon">
            <LinkIcon />
          </div>
          <Input
            value={linkValue}
            onChange={(event) => {
              setLinkValue(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key !== 'Enter') return;
              event.preventDefault();
              const nextValue = linkValue.trim();
              onValueChange(nextValue || null);
            }}
            placeholder={placeholderLinkInput || 'Enter an image URL'}
          />
        </div>
      )}

      {isUploading && (
        <p className="text-sm text-quanta-pigeon">Uploading image...</p>
      )}
      {uploadError && (
        <p className="text-sm text-quanta-candy">{uploadError}</p>
      )}
    </div>
  );
}

export function ImageInput(props: ImageInputProps) {
  const { id, onChange, ...rest } = props;

  return (
    <ImageInputBase
      {...rest}
      onValueChange={(value, extras) => onChange(id, value, extras)}
    />
  );
}

export default function ImageWidget(props: ImageWidgetProps) {
  const {
    label,
    description,
    errorMessage,
    error,
    onChange,
    className,
    ...rest
  } = props;

  const fieldError =
    typeof errorMessage === 'string'
      ? errorMessage
      : (error?.filter(Boolean).join(', ') ?? '');

  return (
    <div className="group mb-4 flex flex-col gap-1">
      {label && <Label>{label}</Label>}

      <ImageInputBase
        {...rest}
        className={className}
        value={props.value}
        currentPath={rest.currentPath}
        onValueChange={(value, extras) => onChange?.(value, extras)}
      />

      {description && <Description>{description}</Description>}
      <FieldError>{fieldError}</FieldError>
    </div>
  );
}

ImageWidget.displayName = 'ImageWidget';
