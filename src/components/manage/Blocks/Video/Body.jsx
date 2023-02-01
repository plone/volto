/**
 * Body video block.
 * @module components/manage/Blocks/Video/Body
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Embed, Message } from 'semantic-ui-react';
import cx from 'classnames';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';

/**
 * Body video block class.
 * @class Body
 * @extends Component
 */
const Body = ({ data, isEditMode }) => {
  let placeholder = data.preview_image
    ? isInternalURL(data.preview_image)
      ? `${flattenToAppURL(data.preview_image)}/@@images/image`
      : data.preview_image
    : null;

  let videoID = null;
  let listID = null;

  if (data.url) {
    if (data.url.match('youtu')) {
      if (data.url.match('list')) {
        const matches = data.url.match(/^.*\?list=(.*)|^.*&list=(.*)$/);
        listID = matches[1] || matches[2];
      } else {
        videoID = data.url.match(/.be\//)
          ? data.url.match(/^.*\.be\/(.*)/)[1]
          : data.url.match(/^.*\?v=(.*)$/)[1];
      }

      if (!placeholder) {
        //load video preview image from youtube
        placeholder =
          'https://img.youtube.com/vi/' + videoID + '/sddefault.jpg';
      }
    } else if (data.url.match('vimeo')) {
      videoID = data.url.match(/^.*\.com\/(.*)/)[1];
      if (!placeholder) {
        placeholder = 'https://vumbnail.com/' + videoID + '.jpg';
      }
    }
  }

  const ref = React.createRef();
  const onKeyDown = (e) => {
    if (e.nativeEvent.keyCode === 13) {
      ref.current.handleClick();
    }
  };

  const embedSettings = {
    placeholder: placeholder,
    icon: 'play',
    defaultActive: false,
    autoplay: false,
    aspectRatio: '16:9',
    tabIndex: 0,
    onKeyPress: onKeyDown,
    ref: ref,
  };

  return (
    <>
      {data.url && (
        <div
          className={cx('video-inner', {
            'full-width': data.align === 'full',
          })}
        >
          {data.url.match('youtu') ? (
            <>
              {data.url.match('list') ? (
                <Embed
                  url={`https://www.youtube.com/embed/videoseries?list=${listID}`}
                  {...embedSettings}
                />
              ) : (
                <Embed id={videoID} source="youtube" {...embedSettings} />
              )}
            </>
          ) : (
            <>
              {data.url.match('vimeo') ? (
                <Embed id={videoID} source="vimeo" {...embedSettings} />
              ) : (
                <>
                  {data.url.match('.mp4') ? (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video
                      src={
                        isInternalURL(data.url)
                          ? data.url.includes('@@download')
                            ? data.url
                            : `${flattenToAppURL(data.url)}/@@download/file`
                          : data.url
                      }
                      controls
                      poster={placeholder}
                      type="video/mp4"
                    />
                  ) : isEditMode ? (
                    <div>
                      <Message>
                        <center>
                          <FormattedMessage
                            id="Please enter a valid URL by deleting the block and adding a new video block."
                            defaultMessage="Please enter a valid URL by deleting the block and adding a new video block."
                          />
                        </center>
                      </Message>
                    </div>
                  ) : (
                    <div className="invalidVideoFormat" />
                  )}
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Body.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Body;
