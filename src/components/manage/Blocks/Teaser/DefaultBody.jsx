import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import placeholderIMG from './teaserPlaceholder.jpg';
import { flattenToAppURL } from '@plone/volto/helpers';
import { getTeaserImageURL } from './utils';
import { MaybeWrap } from '@plone/volto/components';
import { UniversalLink } from '@plone/volto/components';
import { getContent } from '@plone/volto/actions';
import cx from 'classnames';
import config from '@plone/volto/registry';

const messages = defineMessages({
  PleaseChooseContent: {
    id: 'Please choose an existing content as source for this element',
    defaultMessage:
      'Please choose an existing content as source for this element',
  },
  PlaceholderHeadtitle: {
    id: 'Head Title',
    defaultMessage: 'Head Title',
  },
  PlaceholderTitle: {
    id: 'Teaser Title',
    defaultMessage: 'Teaser Title',
  },
  PlaceholderDescription: {
    id:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
    defaultMessage:
      'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
  },
});

const TeaserDefaultTemplate = (props) => {
  const { className, data, isEditMode, id } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const [isLive, setIsLive] = useState(false);
  const [error, setError] = useState(false);
  let href = data.href?.[0];
  let image = data.preview_image?.[0];
  const align = data?.styles?.align;
  const alwaysLive = data.is_live;
  const liveData = useRef({});

  const DefaultImage = (props) => <img {...props} alt={props.alt || ''} />;

  const Image = config.getComponent('Image').component || DefaultImage;

  console.group(liveData.current, data);

  // const live = useSelector((state) => state?.content?.subrequests?.[id]?.data);

  useEffect(() => {
    if (href && alwaysLive) {
      dispatch(getContent(flattenToAppURL(href['@id']), null, id)).then(
        (resp) => {
          if (resp) {
            image = resp?.preview_image;
            liveData.current = resp;

            if (data.overwritten.length > 0) {
              data.overwritten.map((i) => {
                if (Object.keys(liveData.current).includes(i)) {
                  liveData.current[i] = data[i];
                }
              });
              setIsLive(true);
            }
            if (resp.status === 200) {
              setError(true);
            }
          }
        },
      );
    }
  }, [alwaysLive]);

  return isLive && alwaysLive ? (
    <div className={cx('block teaser', className)}>
      <>
        {!liveData.current && isEditMode && (
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
        {liveData.current && (
          <MaybeWrap
            condition={!isEditMode}
            as={UniversalLink}
            href={liveData.current['@id']}
            target={data?.openLinkInNewTab ? '_blank' : null}
          >
            <div className="teaser-item default">
              {(liveData.current.hasPreviewImage ||
                liveData.current.image_field ||
                image) && (
                <div className="image-wrapper">
                  <Image
                    src={
                      liveData.current?.preview_image
                        ? flattenToAppURL(
                            liveData.current.preview_image.scales.teaser
                              .download,
                          )
                        : liveData.current?.image
                        ? flattenToAppURL(
                            liveData.current.image.scales.teaser.download,
                          )
                        : placeholderIMG
                    }
                    alt=""
                    loading="lazy"
                  />
                </div>
              )}
              <div className="content">
                {liveData.current?.head_title && (
                  <div className="headline">{liveData.current.head_title}</div>
                )}
                <h2>{liveData.current?.title}</h2>
                {!liveData.current.hide_description && (
                  <p>{liveData.current?.description}</p>
                )}
              </div>
            </div>
          </MaybeWrap>
        )}
      </>
    </div>
  ) : !alwaysLive || error ? (
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
  ) : null;
};

TeaserDefaultTemplate.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
};

export default TeaserDefaultTemplate;
