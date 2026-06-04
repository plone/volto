import type { BlockViewProps, ContainedItem } from '@plone/types';
import Image from '@plone/layout/components/Image/Image';

const ImageBlockView = (props: BlockViewProps) => {
  const { data } = props;
  if (!data.url) return null;

  const item = {
    '@id': data.url,
    image_field: data.image_field,
    image_scales: data.image_scales,
  } as ContainedItem;

  return (
    <figure>
      <Image
        item={item}
        alt={(data.alt as string) || ''}
        imageField={data.image_field as string}
      />
    </figure>
  );
};

export default ImageBlockView;
