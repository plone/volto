import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Embed, Message } from 'semantic-ui-react';
import cx from 'classnames';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers';
import VideoEmbed from './VideoEmbed';

//Extracting videoID, listID and thumbnailURL from the video URL
const getVideoIDAndPlaceholder = (url) => {
  let videoID = null;
  let listID = null;
  let thumbnailURL = null;

  if (url) {
    if (url.match('youtu')) {
      if (url.match('list')) {
        const matches = url.match(/^.*\?list=(.*)|^.*&list=(.*)$/);
        listID = matches[1] || matches[2];

        let thumbnailID = null;
        if (url.match(/\?v=(.*)&list/)) {
          thumbnailID = url.match(/^.*\?v=(.*)&list(.*)/)[1];
        }
        if (url.match(/\?v=(.*)\?list/)) {
          thumbnailID = url.match(/^.*\?v=(.*)\?list(.*)/)[1];
        }
        thumbnailURL =
          'https://img.youtube.com/vi/' + thumbnailID + '/sddefault.jpg';
      } else if (url.match('live')) {
        videoID = url.match(/^.*\/live\/(.*)/)[1];
      } else if (url.match(/\.be\//)) {
        videoID = url.match(/^.*\.be\/(.*)/)[1];
      } else if (url.match(/\?v=/)) {
        videoID = url.match(/^.*\?v=(.*)$/)[1];
      }

      if (videoID) {
        let thumbnailID = videoID;
        if (videoID.match(/\?si=/)) {
          thumbnailID = videoID.match(/(.*)\?si=(.*)/)[1];
        }
        //load video preview image from youtube
        thumbnailURL =
          'https://img.youtube.com/vi/' + thumbnailID + '/sddefault.jpg';
      }
    } else if (url.match('vimeo')) {
      videoID = url.match(/^.*\.com\/(.*)/)[1];
      if (videoID) {
        let thumbnailID = videoID;
        if (videoID.match(/\?si=/)) {
          thumbnailID = videoID.match(/(.*)\?si=(.*)/)[1];
        }
        thumbnailURL = 'https://vumbnail.com/' + thumbnailID + '.jpg';
      }
    }
  }
  return { videoID, listID, thumbnailURL };
};

const Body = ({ data, isEditMode }) => {
  let placeholder = data.preview_image
    ? isInternalURL(data.preview_image)
      ? `${flattenToAppURL(data.preview_image)}/@@images/image`
      : data.preview_image
    : null;

  const { videoID, listID, thumbnailURL } = getVideoIDAndPlaceholder(data.url);

  placeholder = !placeholder ? thumbnailURL : placeholder;

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
    autoplay: true,
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
                <VideoEmbed id={videoID} source="youtube" {...embedSettings} />
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
export { getVideoIDAndPlaceholder };
