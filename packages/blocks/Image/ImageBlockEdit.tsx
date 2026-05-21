import { useCallback } from 'react';
import ImageView from './ImageBlockView';
import type { BlockEditProps } from '@plone/types';
import clsx from 'clsx';
import config from '@plone/registry';
import styles from './Image.module.css';

function flattenToAppUrl(url: string) {
  const apiPath = config.settings.apiPath || '';
  if (!apiPath || !url) return url;

  return url.replace(`${apiPath}/`, '/').replace(apiPath, '/');
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

  return (
    <div className={clsx('image align block', styles['block'], data.align)}>
      {data.url ? (
        <ImageView {...props} />
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
