import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Button } from 'semantic-ui-react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import {
  addSubpathPrefix,
  flattenToAppURL,
} from '@plone/volto/helpers/Url/Url';
import config from '@plone/volto/registry';
import { defineMessages } from 'react-intl';

import galleryLeftSVG from '@plone/volto/icons/left-key.svg';
import galleryRightSVG from '@plone/volto/icons/right-key.svg';
import galleryPlaySVG from '@plone/volto/icons/play.svg';
import galleryPauseSVG from '@plone/volto/icons/pause.svg';
import galleryFullScreenSVG from '@plone/volto/icons/fullscreen.svg';
import galleryBackDownSVG from '@plone/volto/icons/back-down.svg';
import { useIntl } from 'react-intl';

const messages = defineMessages({
  playOrPauseSlideshow: {
    id: 'Play or pause slideshow',
    defaultMessage: 'Play or pause slideshow',
  },
  openFullscreen: {
    id: 'Open full screen',
    defaultMessage: 'Open full screen',
  },
});

const ImageGallery = loadable(() => import('react-image-gallery'));

const renderLeftNav = (onClick, disabled) => {
  return (
    <Button
      type="button"
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
      type="button"
      className="image-gallery-icon image-gallery-right-nav primary basic"
      disabled={disabled}
      onClick={onClick}
    >
      <Icon name={galleryRightSVG} size="48px" />
    </Button>
  );
};

const renderPlayPauseButton = (onClick, isPlaying, intl) => {
  return (
    <Button
      type="button"
      className="image-gallery-icon image-gallery-play-button basic primary"
      onClick={onClick}
      aria-label={intl.formatMessage(messages.playOrPauseSlideshow)}
    >
      {isPlaying ? (
        <Icon name={galleryPauseSVG} size="48px" />
      ) : (
        <Icon name={galleryPlaySVG} size="48px" />
      )}
    </Button>
  );
};

const renderFullscreenButton = (onClick, isFullscreen, intl) => {
  return (
    <Button
      type="button"
      className="image-gallery-icon image-gallery-fullscreen-button primary basic"
      onClick={onClick}
      aria-label={intl.formatMessage(messages.openFullscreen)}
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
  const { settings } = config;
  const renderItems = items.filter(
    (content) =>
      settings.imageObjects.includes(content['@type']) && content.image_field,
  );
  const imagesInfo = renderItems.map((item) => {
    return {
      original: `${addSubpathPrefix(flattenToAppURL(item['@id']))}/@@images/${
        item.image_field
      }/large`,
      thumbnail: `${addSubpathPrefix(flattenToAppURL(item['@id']))}/@@images/${
        item.image_field
      }/thumb`,
    };
  });

  const intl = useIntl();

  return (
    renderItems.length > 0 && (
      <ImageGallery
        items={imagesInfo}
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
        renderPlayPauseButton={(onClick, isPlaying) =>
          renderPlayPauseButton(onClick, isPlaying, intl)
        }
        renderFullscreenButton={(onClick, isFullScreen) =>
          renderFullscreenButton(onClick, isFullScreen, intl)
        }
        lazyLoad={true}
      />
    )
  );
};

ImageGalleryTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ImageGalleryTemplate;
