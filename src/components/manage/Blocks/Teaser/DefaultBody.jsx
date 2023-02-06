import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import imageBlockSVG from '@plone/volto/components/manage/Blocks/Image/block-image.svg';
import placeholderIMG from './placeholder.jpg';
import { flattenToAppURL } from '@plone/volto/helpers';
import { getTeaserImageURL } from './utils';
import { MaybeWrap } from '@plone/volto/components';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import config from '@plone/volto/registry';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
  PlaceholderHeadtitle: {
    id: 'Alpine City Sprint',
    defaultMessage: 'Alpine City Sprint',
  },
  PlaceholderTitle: {
    id: 'Plone in the sky with diamonds',
    defaultMessage: 'Plone in the sky with diamonds',
  },
  PlaceholderDescription: {
    id:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    defaultMessage:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
  },
});

const TeaserDefaultTemplate = (props) => {
  const { className, data, isEditMode } = props;
  const intl = useIntl();
  const href = data.href?.[0];
  const image = data.preview_image?.[0];
  const align = data?.styles?.align;

  const DefaultImage = (props) => <img {...props} alt={props.alt || ''} />;

  const Image = config.getComponent('Image').component || DefaultImage;

  return (
    <div className={cx('block teaser', className)}>
      <>
        {!href && isEditMode && (
          <div className="teaser-item default">
            <div className="image-wrapper">
              <Image src={placeholderIMG} alt="" loading="lazy" />
            </div>
            <div className="content">
              <div className="headline">
                {intl.formatMessage(messages.PlaceholderHeadtitle)}
              </div>
              <h2>{intl.formatMessage(messages.PlaceholderTitle)}</h2>
              <p>{intl.formatMessage(messages.PlaceholderDescription)}</p>
            </div>
          </div>
        )}
        {href && (
          <MaybeWrap
            condition={!isEditMode}
            as={UniversalLink}
            href={href['@id']}
            target={data.openLinkInNewTab ? '_blank' : null}
          >
            <div className="teaser-item default">
              {(href.hasPreviewImage || href.image_field || image) && (
                <div className="image-wrapper">
                  <Image
                    src={flattenToAppURL(
                      getTeaserImageURL({ href, image, align }),
                    )}
                    alt=""
                    loading="lazy"
                  />
                </div>
              )}
              <div className="content">
                {data?.head_title && (
                  <div className="headline">{data.head_title}</div>
                )}
                <h2>{data?.title}</h2>
                {!data.hide_description && <p>{data?.description}</p>}
              </div>
            </div>
          </MaybeWrap>
        )}
      </>
    </div>
  );
};

TeaserDefaultTemplate.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserDefaultTemplate;
