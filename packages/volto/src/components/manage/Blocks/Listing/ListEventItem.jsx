import React from 'react';
import {
  ConditionalLink,
  FormattedDate,
  Component,
} from '@plone/volto/components';
import cx from 'classnames';

const ListEvent = ({ item, TitleTag, isEditMode, image, grid }) => {
  const Tag = TitleTag ?? 'h3';
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  if (!item) {
    return null;
  }

  return (
    <div className={cx('listing-item', { grid: grid })} key={item['@id']}>
      <ConditionalLink item={item} condition={!isEditMode}>
        {image && <Component componentName="PreviewImage" item={item} alt="" />}
        <div className="listing-body">
          <div className="dates">
            {item?.start && (
              <span className="day">
                <FormattedDate date={item?.start} format={dateOptions} />{' '}
              </span>
            )}{' '}
            &mdash;&nbsp;
            {item?.end && (
              <span className="day">
                <FormattedDate date={item?.end} format={dateOptions} />{' '}
              </span>
            )}
          </div>
          <Tag>{item.title ? item.title : item.id}</Tag>
          <p>{item.description}</p>
        </div>
      </ConditionalLink>
    </div>
  );
};

export default ListEvent;
