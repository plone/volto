import React from 'react';
import type { ImgHTMLAttributes } from 'react';
import clsx from 'clsx';
import type { ImageScale, ContainedItem } from '@plone/types';

function removeObjectIdFromURL(basePath: string, scale: string) {
  return scale.replace(`${basePath}/`, '');
}

export function flattenScales(path: string, image: any) {
  if (!image) return;

  const basePath = image.base_path || path;
  const imageInfo = {
    ...image,
    download: removeObjectIdFromURL(basePath, image.download),
  };

  Object.keys(imageInfo.scales).forEach((key) => {
    imageInfo.scales[key].download = removeObjectIdFromURL(
      basePath,
      image.scales[key].download,
    );
  });

  return imageInfo;
}

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  item?: ContainedItem;
  imageField?: string;
  src?: string;
  alt: string;
  loading?: 'eager' | 'lazy';
  responsive?: boolean;
  sizes?: string;
}

export function Image(props: ImageProps) {
  const {
    item,
    imageField,
    src,
    alt,
    loading = 'eager',
    responsive = false,
    className,
    sizes,
    ...imageProps
  } = props;

  if (!item && !src) return null;
  const attrs: ImgHTMLAttributes<HTMLImageElement> = {};
  attrs.className = clsx(className, { responsive }) || undefined;

  if (!item && src) {
    attrs.src = src;
  } else if (item) {
    const isFromRealObject = !('image_scales' in item);
    const imageFieldWithDefault = imageField || item.image_field || 'image';

    const image = isFromRealObject
      ? flattenScales(item['@id'], (item as any)[imageFieldWithDefault])
      : flattenScales(
          item['@id'],
          (item as any)?.image_scales?.[imageFieldWithDefault]?.[0],
        );

    if (!image) return null;

    const isSvg = image['content-type'] === 'image/svg+xml';
    // In case `base_path` is present (`preview_image_link`) use it as base path
    const basePath = image.base_path || item['@id'];

    attrs.src = `${basePath}/${image.download}`;
    attrs.width = image.width;
    attrs.height = image.height;

    if (!isSvg && image.scales && Object.keys(image.scales).length > 0) {
      const sortedScales = Object.values({
        ...image.scales,
        original: {
          download: `${image.download}`,
          width: image.width,
          height: image.height,
        },
      }).sort((a, b) => {
        const scaleA = a as ImageScale;
        const scaleB = b as ImageScale;
        if (scaleA.width > scaleB.width) return 1;
        else if (scaleA.width < scaleB.width) return -1;
        else return 0;
      });
      attrs.srcSet = sortedScales
        .map(
          (scale: unknown) =>
            `${basePath}/${(scale as ImageScale).download} ${(scale as ImageScale).width}w`,
        )
        .join(', ');
    }
  }

  if (loading === 'lazy') {
    attrs.loading = 'lazy';
    attrs.decoding = 'async';
  } else {
    attrs.fetchPriority = 'high';
  }

  return <img {...attrs} alt={alt} {...imageProps} />;
}
