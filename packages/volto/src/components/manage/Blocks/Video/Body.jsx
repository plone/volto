import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Embed, Message } from 'semantic-ui-react';
import cx from 'classnames';
import { isInternalURL, flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import config from '@plone/volto/registry';

//Extracting videoID, listID and thumbnailURL from the video URL
const getVideoIDAndPlaceholder = (url) => {
  let hasMatch = false;
  let videoID = null;
  let listID = null;
  let thumbnailURL = null;
  let videoSource = null;
  let videoUrl = null;

  if (url) {
    if (url.match(/youtu.*?(list|live|\?v=|\.be\/|shorts)/)) {
      hasMatch = true;
      videoSource = 'youtube';
      if (url.match('list')) {
        const matches = url.match(/^.*\?list=(.*)|^.*&list=(.*)$/);
        listID = matches[1] || matches[2];
        videoUrl = `https://www.youtube.com/embed/videoseries?list=${listID}`;
        videoSource = null;
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
      } else if (url.match('shorts')) {
        videoID = url.match(/^.*\/shorts\/(.*)/)[1];
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
      hasMatch = true;
      videoSource = 'vimeo';
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
  return { videoID, videoUrl, thumbnailURL, videoSource, hasMatch };
};

const Body = ({ data, isEditMode }) => {
  let placeholder = data.preview_image
    ? isInternalURL(data.preview_image)
      ? `${flattenToAppURL(data.preview_image)}/@@images/image`
      : data.preview_image
    : null;
  let iframeSettings = {};
  const peertubeInstances =
    config.blocks.blocksConfig.video.allowedPeertubeInstances;

  const { videoID, videoUrl, thumbnailURL, videoSource, hasMatch } =
    getVideoIDAndPlaceholder(data.url);

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
    autoplay: false,
    aspectRatio: '16:9',
    tabIndex: 0,
    onKeyPress: onKeyDown,
    ref: ref,
    id: videoID,
    source: videoSource,
    url: videoUrl,
  };

  if (
    peertubeInstances instanceof Array &&
    data.url.match(new RegExp(peertubeInstances.join('|'), 'gi'))
  ) {
    const instance = data.url.match(/^(.*)\/w\/(.*)$/)[1];
    const videoID = data.url.match(/^(.*)\/w\/(.*)$/)[2];
    iframeSettings['src'] = `${instance}/videos/embed/${videoID}`;
    iframeSettings['style'] = { aspectRatio: '16/9', width: '100%' };
  }
  return (
    <>
      {data.url && (
        <div
          className={cx('video-inner', {
            'full-width': data.align === 'full',
          })}
        >
          {hasMatch ? (
            <>
              <Embed {...embedSettings} />
            </>
          ) : Object.keys(iframeSettings).length > 0 ? (
            <iframe title="Peertube video iframe" {...iframeSettings}></iframe>
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
