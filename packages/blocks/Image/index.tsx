import { BlocksFormData } from '@plone/types';

const ImageBlockView = (props: BlocksFormData) => {
  const { data } = props;
  return (
    <figure>
      <img src={data.url} alt={data.alt} />
    </figure>
  );
};

export default ImageBlockView;
