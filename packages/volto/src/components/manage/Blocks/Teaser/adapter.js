import { isEmpty } from 'lodash';

export const TeaserBlockDataAdapter = ({
  block,
  data,
  id,
  onChangeBlock,
  value,
  item,
}) => {
  let dataSaved = {
    ...data,
    [id]: value,
  };
  if (id === 'href' && !isEmpty(value) && !data.title && !data.description) {
    dataSaved = {
      ...dataSaved,
      title: value[0].Title,
      description: value[0].Description,
      head_title: value[0].head_title,
    };
  } else if (id === 'preview_image' && typeof value === 'string' && item) {
    dataSaved = {
      ...dataSaved,
      [id]: [
        {
          '@id': value,
          image_field: item.image_field,
          image_scales: item.image_scales,
        },
      ],
    };
  }
  onChangeBlock(block, dataSaved);
};
