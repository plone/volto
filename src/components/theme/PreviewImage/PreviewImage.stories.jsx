import React from 'react';
import PreviewImage from './PreviewImage';
import Wrapper from '@plone/volto/storybook';

const PreviewImageComponent = (props) => {
  const { item, size = 'preview', alt, ...rest } = props;
  return (
    <Wrapper location={{ pathname: '/folder2/folder21/doc212' }}>
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <PreviewImage item={item} alt={alt} size={size} {...rest} />
      </div>
    </Wrapper>
  );
};

const item = {
  '@id': '/static/media/.storybook/static/preview.png',
  title: 'Item title',
  image_field: 'preview_image',
};

export const Default = PreviewImageComponent.bind({});
Default.args = {
  item: item,
};

export default {
  title: 'Public Components/PreviewImage',
  component: PreviewImageComponent,
  argTypes: {},
};
