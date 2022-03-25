/**
 * View video block.
 * @module components/manage/Blocks/Video/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Embed } from 'semantic-ui-react';
import cx from 'classnames';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';

/**
 * View video block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => (
  <div
    className={cx(
      'block video align',
      {
        center: !Boolean(data.align),
      },
      data.align,
    )}
  >
    {data.url && (
      <div
        className={cx('video-inner', {
          'full-width': data.align === 'full',
        })}
      >
        {data.url.match('youtu') ? (
          <>
            {data.url.match('list') ? (
              data.preview_image ? (
                <Embed
                  url={`https://www.youtube.com/embed/videoseries?list=${
                    data.url.match(/^.*\?list=(.*)$/)[1]
                  }`}
                  placeholder={
                    isInternalURL(data.preview_image)
                      ? `${flattenToAppURL(data.preview_image)}/@@images/image`
                      : data.preview_image
                  }
                  defaultActive
                  autoplay={false}
                />
              ) : (
                <Embed
                  url={`https://www.youtube.com/embed/videoseries?list=${
                    data.url.match(/^.*\?list=(.*)$/)[1]
                  }`}
                  icon="play"
                  defaultActive
                  autoplay={false}
                />
              )
            ) : data.preview_image ? (
              <Embed
                id={
                  data.url.match(/.be\//)
                    ? data.url.match(/^.*\.be\/(.*)/)[1]
                    : data.url.match(/^.*\?v=(.*)$/)[1]
                }
                source="youtube"
                placeholder={
                  isInternalURL(data.preview_image)
                    ? `${flattenToAppURL(data.preview_image)}/@@images/image`
                    : data.preview_image
                }
                icon="play"
                autoplay={false}
              />
            ) : (
              <Embed
                id={
                  data.url.match(/.be\//)
                    ? data.url.match(/^.*\.be\/(.*)/)[1]
                    : data.url.match(/^.*\?v=(.*)$/)[1]
                }
                source="youtube"
                icon="play"
                defaultActive
                autoplay={false}
              />
            )}
          </>
        ) : (
          <>
            {data.url.match('vimeo') ? (
              data.preview_image ? (
                <Embed
                  id={data.url.match(/^.*\.com\/(.*)/)[1]}
                  source="vimeo"
                  placeholder={
                    isInternalURL(data.preview_image)
                      ? `${flattenToAppURL(data.preview_image)}/@@images/image`
                      : data.preview_image
                  }
                  icon="play"
                  autoplay={false}
                />
              ) : (
                <Embed
                  id={data.url.match(/^.*\.com\/(.*)/)[1]}
                  source="vimeo"
                  icon="play"
                  defaultActive
                  autoplay={false}
                />
              )
            ) : (
              <>
                {data.url.match('.mp4') ? (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <video
                    src={
                      isInternalURL(data.url)
                        ? `${flattenToAppURL(data.url)}/@@download/file`
                        : data.url
                    }
                    controls
                    poster={
                      data.preview_image
                        ? isInternalURL(data.preview_image)
                          ? `${flattenToAppURL(
                              data.preview_image,
                            )}/@@images/image`
                          : data.preview_image
                        : ''
                    }
                    type="video/mp4"
                  />
                ) : (
                  <div className="invalidVideoFormat" />
                )}
              </>
            )}
          </>
        )}
      </div>
    )}
  </div>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
