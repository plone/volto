import React, { useEffect, useState } from 'react';

const VideoEmbed = (props) => {
  const {
    aspectRatio,
    autoplay = true,
    brandedUI = false,
    children,
    className,
    color = '#444444',
    content,
    hd = true,
    icon,
    id,
    placeholder,
    source,
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
    <div className="ui embed 16:9">
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
          {placeholder && <img src={placeholder} alt="" />}
          <button
            onClick={() => {
              PlayVideo();
            }}
          >
            Play
          </button>
        </>
      )}
    </div>
  );
};

export default VideoEmbed;
