import React from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import 'react-image-gallery/styles/css/image-gallery.css';
import { settings } from '~/config';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Button } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import galleryLeftSVG from '@plone/volto/icons/left-key.svg';
import galleryRightSVG from '@plone/volto/icons/right-key.svg';
import galleryPlaySVG from '@plone/volto/icons/play.svg';
import galleryPauseSVG from '@plone/volto/icons/pause.svg';
import galleryFullScreenSVG from '@plone/volto/icons/fullscreen.svg';
import galleryBackDownSVG from '@plone/volto/icons/back-down.svg';

const ImageGallery = loadable(() => import('react-image-gallery'));

const renderLeftNav = (onClick, disabled) => {
  return (
    <Button
      className="image-gallery-icon image-gallery-left-nav primary basic"
      disabled={disabled}
      onClick={onClick}
    >
      <Icon name={galleryLeftSVG} size="48px" fill="black" />
    </Button>
  );
};
const renderRightNav = (onClick, disabled) => {
  return (
    <Button
      className="image-gallery-icon image-gallery-right-nav primary basic"
      disabled={disabled}
      onClick={onClick}
    >
      <Icon name={galleryRightSVG} size="48px" />
    </Button>
  );
};

const renderPlayPauseButton = (onClick, isPlaying) => (
  <Button
    type="button"
    className="image-gallery-icon image-gallery-play-button basic primary"
    onClick={onClick}
    aria-label="Play or Pause Slideshow"
  >
    {isPlaying ? (
      <Icon name={galleryPauseSVG} size="48px" />
    ) : (
      <Icon name={galleryPlaySVG} size="48px" />
    )}
  </Button>
);

const renderFullscreenButton = (onClick, isFullscreen) => {
  return (
    <Button
      type="button"
      className="image-gallery-icon image-gallery-fullscreen-button primary basic"
      onClick={onClick}
      aria-label="Open Fullscreen"
    >
      {isFullscreen ? (
        <Icon name={galleryBackDownSVG} size="48px" />
      ) : (
        <Icon name={galleryFullScreenSVG} size="48px" />
      )}
    </Button>
  );
};

const ImageGalleryTemplate = ({ items }) => {
  const renderItems = items.filter((content) =>
    settings.imageObjects.includes(content['@type']),
  );
  const imagesInfo = renderItems.map((item) => {
    return {
      original: flattenToAppURL(
        item[settings.listingPreviewImageField]?.scales.preview.download || '',
      ),
      thumbnail: flattenToAppURL(
        item[settings.listingPreviewImageField]?.scales.thumb.download || '',
      ),
    };
  });

  return (
    renderItems.length > 0 && (
      <ImageGallery
        items={imagesInfo}
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
        renderPlayPauseButton={renderPlayPauseButton}
        renderFullscreenButton={renderFullscreenButton}
        lazyLoad
      />
    )
  );
};

ImageGalleryTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ImageGalleryTemplate;
