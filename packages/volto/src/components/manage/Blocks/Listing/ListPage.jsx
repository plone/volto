import React from 'react';
import { ConditionalLink, Component } from '@plone/volto/components';
import cx from 'classnames';

const ListPage = ({ item, TitleTag, isEditMode, image, grid }) => {
  const Tag = TitleTag ?? 'h3';
  return (
    <div className={cx('listing-item', { grid: grid })} key={item['@id']}>
      <ConditionalLink item={item} condition={!isEditMode}>
        {image && <Component componentName="PreviewImage" item={item} alt="" />}
        <div className="listing-body">
          <Tag>{item.title ? item.title : item.id}</Tag>
          <p>{item.description}</p>
        </div>
      </ConditionalLink>
    </div>
  );
};

export default ListPage;
