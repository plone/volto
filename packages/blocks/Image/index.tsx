import { BlocksFormData } from '@plone/types';
import { usePloneProvider } from '@plone/providers';

const ImageBlockView = (props: BlocksFormData) => {
  const flattenToAppURL = usePloneProvider().flattenToAppURL;
  const { data } = props;
  const url = data.image_scales
    ? `/++api++${flattenToAppURL(data.url)}/${data.image_scales[data.image_field][0].download}`
    : data.url;
  // data.preview_image?.[0]?.['@id'] ||
  // `/++api++${data.href[0]?.image_scales[data.href[0].image_field][0].base_path}/${data.href[0]?.image_scales[data.href[0].image_field][0].download}`;

  return (
    <figure>
      <img src={url} alt={data.alt} />
    </figure>
  );
};

export default ImageBlockView;
