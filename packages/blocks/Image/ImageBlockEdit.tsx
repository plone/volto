import { useCallback } from 'react';
import type {
  BlockEditProps,
  Brain,
  ContainedItem,
  Content,
  RelatedItem,
} from '@plone/types';
import Image from '@plone/layout/components/Image/Image';
import clsx from 'clsx';
import config from '@plone/registry';

function flattenToAppUrl(url: string) {
  const apiPath = config.settings.apiPath || '';
  if (!apiPath || !url) return url;

  return url.replace(`${apiPath}/`, '/').replace(apiPath, '/');
}

function isInternalUrl(url: string) {
  return url.startsWith('/') || url.includes('/++api++/');
}

function getLegacyScaledSrc(url: string, size: string) {
  const base = flattenToAppUrl(url);
  if (size === 'm') return `${base}/@@images/image/preview`;
  if (size === 's') return `${base}/@@images/image/mini`;
  return `${base}/@@images/image`;
}

const ImageBlockEdit = (props: BlockEditProps) => {
  const { block, data, setBlock, selected } = props;
  const ImageWidget = config.getWidget('image') as
    | React.ComponentType<any>
    | undefined;

  const handleChange = useCallback(
    (
      image: string | null,
      item: {
        title?: string;
        image_field?: string;
        image_scales?: Record<string, unknown>;
      } = {},
    ) => {
      const { title, image_field, image_scales } = item;
      const url = image ? flattenToAppUrl(image) : '';

      setBlock({
        ...data,
        url,
        image_field,
        image_scales,
        alt: data.alt || title || '',
      });
    },
    [data, setBlock],
  );

  const imageItem = data.image_scales
    ? ({
        '@id': data.url,
        image_field: data.image_field,
        image_scales: data.image_scales,
      } as unknown as Content | Brain | ContainedItem | RelatedItem)
    : undefined;

  return (
    <div
      className={clsx(
        'image align block',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      {data.url ? (
        <Image
          className={clsx({
            'full-width': data.align === 'full',
            large: data.size === 'l',
            medium: data.size === 'm',
            small: data.size === 's',
          })}
          item={imageItem}
          src={
            data.image_scales
              ? undefined
              : isInternalUrl(data.url)
                ? getLegacyScaledSrc(data.url, data.size || 'l')
                : data.url
          }
          alt={data.alt || ''}
          loading="lazy"
          responsive={true}
        />
      ) : ImageWidget ? (
        <ImageWidget
          onChange={handleChange}
          value={data.url || ''}
          placeholderLinkInput={data.placeholder}
          id={block}
          selected={selected}
          objectBrowserPickerType="image"
        />
      ) : null}
    </div>
  );
};

export default ImageBlockEdit;
