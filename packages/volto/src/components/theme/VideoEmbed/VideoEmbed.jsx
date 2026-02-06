import React, { useState } from 'react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Image from '@plone/volto/components/theme/Image/Image';
import cx from 'classnames';

import PlayIcon from '@plone/volto/icons/play.svg';

const VideoEmbed = (props) => {
  const {
    aspectRatio = '16:9',
    autoplay,
    brandedUI = false,
    className,
    color = '#444444',
    hd = true,
    id,
    placeholder,
    source,
    title,
  } = props;

  const [isActive, setIsActive] = useState(false);
  const PlayVideo = () => {
    setIsActive(true);
  };
  const getSrc = () => {
    if (source === 'youtube') {
      return [
        `https://www.youtube.com/embed/${id}`,
        '?autohide=true',
        `&autoplay=${isActive || autoplay ? 1 : 0}`,
        `&mute=${autoplay ? 1 : 0}`,
        `&color=${encodeURIComponent(color)}`,
        `&hq=${hd}`,
        '&jsapi=false',
        `&modestbranding=${brandedUI}`,
        `&rel=${brandedUI ? 0 : 1}`,
      ].join('');
    }

    if (source === 'vimeo') {
      return [
        `https://player.vimeo.com/video/${id}`,
        '?api=false',
        `&autoplay=${isActive || autoplay ? 1 : 0}`,
        `&muted=${autoplay ? 1 : 0}`,
        `&byline=false`,
        `&color=${encodeURIComponent(color)}`,
        `&portrait=false`,
        `&title=false`,
      ].join('');
    }
  };

  return (
    <div className={cx('ui embed video-embed', aspectRatio, className)}>
      {isActive || autoplay ? (
        <iframe
          allowFullScreen={false}
          frameBorder="0"
          height="100%"
          scrolling="no"
          src={getSrc()}
          title={`Embedded content from ${source}.`}
          width="100%"
          allow="autoplay; encrypted-media"
        />
      ) : (
        <>
          {placeholder ? (
            <Image className="placeholder" src={placeholder} alt="" />
          ) : (
            <div className="fallback-placeholder"></div>
          )}
          <button
            className="video-play-button"
            onClick={() => {
              PlayVideo();
            }}
            aria-label={title ? `Play video ${title}` : 'Play video'}
          >
            <Icon name={PlayIcon} color="white" size="100%" />
          </button>
        </>
      )}
    </div>
  );
};

export default VideoEmbed;
