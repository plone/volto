import cx from 'classnames';
import { flattenToAppURL, flattenScales } from '@plone/volto/helpers/Url/Url';

export function buildImageAttrs({
  item,
  src,
  className,
  responsive,
  loading,
  imageField,
}) {
  if (!item && !src) return null;

  // TypeScript hints for editor autocomplete :)
  /** @type {React.ImgHTMLAttributes<HTMLImageElement>} */
  const attrs = {};
  attrs.className = cx(className, { responsive }) || undefined;

  if (!item && src) {
    attrs.src = src;
  } else {
    const isFromRealObject = !item.image_scales;
    const imageFieldWithDefault = imageField || item.image_field || 'image';

    const image = isFromRealObject
      ? flattenScales(item['@id'], item[imageFieldWithDefault])
      : flattenScales(
          item['@id'],
          item.image_scales[imageFieldWithDefault]?.[0],
        );

    if (!image) return null;

    const isSvg = image['content-type'] === 'image/svg+xml';
    // In case `base_path` is present (`preview_image_link`) use it as base path
    const basePath = image.base_path || item['@id'];

    attrs.src = `${flattenToAppURL(basePath)}/${image.download}`;
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
        if (a.width > b.width) return 1;
        else if (a.width < b.width) return -1;
        else return 0;
      });

      attrs.srcSet = sortedScales
        .map(
          (scale) =>
            `${flattenToAppURL(basePath)}/${scale.download} ${scale.width}w`,
        )
        .join(', ');
    }
  }

  if (loading === 'lazy') {
    attrs.loading = 'lazy';
    attrs.decoding = 'async';
  } else {
    attrs.fetchpriority = 'high';
  }

  return attrs;
}
