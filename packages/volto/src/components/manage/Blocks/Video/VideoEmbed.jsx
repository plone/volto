import React, { useState } from 'react';
import { Icon } from '@plone/volto/components';
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
        `//www.youtube.com/embed/${id}`,
        '?autohide=true',
        `&amp;autoplay=${autoplay}`,
        `&amp;color=${encodeURIComponent(color)}`,
        `&amp;hq=${hd}`,
        '&amp;jsapi=false',
        `&amp;modestbranding=${brandedUI}`,
        `&amp;rel=${brandedUI ? 0 : 1}`,
      ].join('');
    }

    if (source === 'vimeo') {
      return [
        `//player.vimeo.com/video/${id}`,
        '?api=false',
        `&amp;autoplay=${autoplay}`,
        '&amp;byline=false',
        `&amp;color=${encodeURIComponent(color)}`,
        '&amp;portrait=false',
        '&amp;title=false',
      ].join('');
    }
  };

  return (
    <div className={cx('ui embed video-embed', aspectRatio, className)}>
      {isActive ? (
        <iframe
          allowFullScreen={false}
          frameBorder="0"
          height="100%"
          scrolling="no"
          src={getSrc()}
          title={`Embedded content from ${source}.`}
          width="100%"
        />
      ) : (
        <>
          {placeholder ? (
            <img src={placeholder} alt="" aria-hidden />
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
