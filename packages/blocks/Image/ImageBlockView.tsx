import type {
  BlockViewProps,
  Brain,
  ContainedItem,
  Content,
  RelatedItem,
} from '@plone/types';
import Image from '@plone/layout/components/Image/Image';
import config from '@plone/registry';
import clsx from 'clsx';
import styles from './Image.module.css';

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

const ImageBlockView = (props: BlockViewProps) => {
  const { data } = props;

  const imageItem = data.image_scales
    ? ({
        '@id': data.url,
        image_field: data.image_field,
        image_scales: data.image_scales,
      } as unknown as Content | Brain | ContainedItem | RelatedItem)
    : undefined;

  return (
    <figure className={clsx(styles['block'], styles[data.align], data.align)}>
      <Image
        item={imageItem}
        alt={(data.alt as string) || ''}
        imageField={data.image_field as string}
        src={
          data.image_scales
            ? undefined
            : isInternalUrl(data.url)
              ? getLegacyScaledSrc(data.url, data.size || 'l')
              : data.url
        }
        loading="lazy"
        responsive={true}
      />
    </figure>
  );
};

export default ImageBlockView;
