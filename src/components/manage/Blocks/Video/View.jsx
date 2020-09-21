/**
 * View video block.
 * @module components/manage/Blocks/Video/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Embed } from 'semantic-ui-react';
import cx from 'classnames';
import { isInternalURL, getParentUrl } from '@plone/volto/helpers';
import { settings } from '~/config';

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
                  placeholder={data.preview_image}
                  icon="arrow right"
                  defaultActive
                  autoplay={false}
                />
              ) : (
                <Embed
                  url={`https://www.youtube.com/embed/videoseries?list=${
                    data.url.match(/^.*\?list=(.*)$/)[1]
                  }`}
                  icon="arrow right"
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
                placeholder={data.preview_image}
                icon="arrow right"
              />
            ) : (
              <Embed
                id={
                  data.url.match(/.be\//)
                    ? data.url.match(/^.*\.be\/(.*)/)[1]
                    : data.url.match(/^.*\?v=(.*)$/)[1]
                }
                source="youtube"
                icon="arrow right"
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
                  placeholder={data.preview_image}
                  icon="arrow right"
                  autoplay={false}
                />
              ) : (
                <Embed
                  id={data.url.match(/^.*\.com\/(.*)/)[1]}
                  source="vimeo"
                  icon="arrow right"
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
                      isInternalURL(
                        data.url.replace(getParentUrl(settings.apiPath), ''),
                      )
                        ? `${data.url}/@@download/file`
                        : data.url
                    }
                    controls
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
