import React from 'react';
import PropTypes from 'prop-types';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import cx from 'classnames';
import config from '@plone/volto/registry';

const View = ({ data, properties }) => {
  const Image = config.getComponent({ name: 'Image' }).component;

  return (
    <p
      className={cx(
        'block image align',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      {properties.image && (
        <>
          {(() => {
            const image = (
              <Image
                className={cx({ 'full-width': data.align === 'full' })}
                item={properties}
                imageField="image"
                sizes={config.blocks.blocksConfig.leadimage.getSizes(data)}
                alt={properties.image_caption || ''}
                responsive={true}
              />
            );
            if (data.href) {
              return (
                <UniversalLink
                  href={data.href}
                  openLinkInNewTab={data.openLinkInNewTab}
                >
                  {image}
                </UniversalLink>
              );
            } else {
              return image;
            }
          })()}
        </>
      )}
    </p>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
