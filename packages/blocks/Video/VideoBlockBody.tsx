import type { BlockViewProps } from '@plone/types';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { flattenToAppURL, isInternalURL } from '@plone/helpers';
import config from '@plone/registry';

type VideoData = NonNullable<BlockViewProps['data']>;

const YOUTUBE_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)(?:.*)$/i;

export const getVideoIDAndPlaceholder = (
  url: string,
  peertubeInstances?: string[],
) => {
  let hasMatch = false;
  let videoID: string | null = null;
  let listID: string | null = null;
  let thumbnailURL: string | null = null;
  let videoUrl: string | null = null;

  if (YOUTUBE_REGEX.test(url)) {
    hasMatch = true;
    if (url.match('list')) {
      const matches = url.match(/^.*\?list=(.*)|^.*&list=(.*)$/);
      listID = matches?.[1] || matches?.[2] || null;
      videoUrl = listID
        ? `https://www.youtube.com/embed/videoseries?list=${listID}`
        : null;

      let thumbnailID: string | null = null;
      if (url.match(/\?v=(.*)&list/)) {
        thumbnailID = url.match(/^.*\?v=(.*)&list(.*)/)?.[1] ?? null;
      }
      if (url.match(/\?v=(.*)\?list/)) {
        thumbnailID = url.match(/^.*\?v=(.*)\?list(.*)/)?.[1] ?? null;
      }
      if (thumbnailID) {
        thumbnailURL = `https://img.youtube.com/vi/${thumbnailID}/sddefault.jpg`;
      }
    } else if (url.match('live')) {
      videoID = url.match(/^.*\/live\/(.*)/)?.[1] ?? null;
    } else if (url.match(/\.be\//)) {
      videoID = url.match(/^.*\.be\/(.*)/)?.[1] ?? null;
    } else if (url.match(/\?v=/)) {
      videoID = url.match(/^.*\?v=([^&]*)/)?.[1] ?? null;
    } else if (url.match('shorts')) {
      videoID = url.match(/^.*\/shorts\/(.*)/)?.[1] ?? null;
    }

    if (videoID) {
      let thumbnailID = videoID;
      if (videoID.match(/\?si=/)) {
        thumbnailID = videoID.match(/(.*)\?si=(.*)/)?.[1] ?? thumbnailID;
      }
      thumbnailURL = `https://img.youtube.com/vi/${thumbnailID}/sddefault.jpg`;
    }
  } else if (url.includes('vimeo')) {
    hasMatch = true;
    videoID = url.match(/^.*\.com\/(.*)/)?.[1] ?? null;
    if (videoID) {
      let thumbnailID = videoID;
      if (videoID.match(/\?si=/)) {
        thumbnailID = videoID.match(/(.*)\?si=(.*)/)?.[1] ?? thumbnailID;
      }
      thumbnailURL = `https://vumbnail.com/${thumbnailID}.jpg`;
    }
  } else if (
    Array.isArray(peertubeInstances) &&
    peertubeInstances.length > 0 &&
    url.match(new RegExp(peertubeInstances.join('|'), 'gi'))
  ) {
    const peertubeRegex = /^(https?:\/\/[^/]+)\/w\/([A-Za-z0-9_-]+)/i;
    const match = url.match(peertubeRegex);
    if (match) {
      hasMatch = true;
      const instance = match[1];
      videoID = match[2];
      videoUrl = `${instance}/videos/embed/${videoID}`;
    }
  }

  return { videoID, listID, videoUrl, thumbnailURL, hasMatch };
};

const getVideoSrc = (url: string) => {
  if (isInternalURL(url)) {
    const flattened = flattenToAppURL(url);
    return url.includes('@@download')
      ? flattened
      : `${flattened}/@@download/file`;
  }

  return url;
};

export const VideoBlockBody = ({
  data,
  isEditMode,
}: {
  data: VideoData;
  isEditMode?: boolean;
}) => {
  if (!data.url) return null;

  let placeholder: string | null =
    typeof data.preview_image === 'string'
      ? isInternalURL(data.preview_image)
        ? `${flattenToAppURL(data.preview_image)}/@@images/image`
        : data.preview_image
      : null;

  const peertubeInstances: string[] =
    config.blocks?.blocksConfig?.video?.allowedPeertubeInstances ?? [];

  const { videoID, listID, videoUrl, thumbnailURL, hasMatch } =
    getVideoIDAndPlaceholder(data.url, peertubeInstances);
  placeholder = placeholder || thumbnailURL;

  const autoplay = data.autoplay ? '?autoplay=1' : '';

  const iframeProps = {
    allow:
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    allowFullScreen: true,
    loading: 'lazy' as const,
  };

  let content: ReactNode = null;

  if (hasMatch) {
    if (listID && videoUrl) {
      content = (
        <iframe
          src={`${videoUrl}${autoplay ? `&autoplay=1` : ''}`}
          title={data.title || 'YouTube playlist'}
          {...iframeProps}
        />
      );
    } else if (videoID) {
      if (YOUTUBE_REGEX.test(data.url)) {
        content = (
          <iframe
            src={`https://www.youtube.com/embed/${videoID}${autoplay}`}
            title={data.title || 'YouTube video'}
            {...iframeProps}
          />
        );
      } else if (data.url.includes('vimeo')) {
        content = (
          <iframe
            src={`https://player.vimeo.com/video/${videoID}${autoplay}`}
            title={data.title || 'Vimeo video'}
            {...iframeProps}
          />
        );
      } else if (videoUrl) {
        // PeerTube
        content = (
          <iframe
            src={`${videoUrl}${autoplay}`}
            title={data.title || 'PeerTube video'}
            {...iframeProps}
          />
        );
      }
    }
  } else if (data.url.match(/\.mp4($|[?&#])/i)) {
    content = (
      // eslint-disable-next-line jsx-a11y/media-has-caption
      <video
        src={getVideoSrc(data.url)}
        controls
        poster={placeholder || undefined}
        preload="metadata"
      />
    );
  }

  if (!content) {
    if (!isEditMode) {
      return null;
    }

    return (
      <div className="invalid-video-format" aria-live="polite">
        Please enter a valid URL.
      </div>
    );
  }

  return (
    <div
      className={clsx('video-inner', {
        'full-width': data.align === 'full',
      })}
    >
      {content}
    </div>
  );
};

export type { VideoData };
