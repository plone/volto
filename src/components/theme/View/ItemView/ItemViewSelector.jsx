import { createElement } from 'react';
import config from '@plone/volto/registry';

const ItemViewSelector = ({ children, ...props }) => {
  const { item } = props;

  const resultTypeMapper = (contentType) =>
    config.views.itemViews[contentType] || config.views.itemViews.Default;

  return createElement(resultTypeMapper(item['@type']), props, children);
};

export default ItemViewSelector;
