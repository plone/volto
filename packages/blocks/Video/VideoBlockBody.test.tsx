import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { VideoBlockBody, getVideoIDAndPlaceholder } from './VideoBlockBody';

describe('getVideoIDAndPlaceholder', () => {
  test('handles YouTube playlist URLs', () => {
    const url =
      'https://www.youtube.com/watch?v=KwRSRRyuk-Q&list=PLGN9BI-OAQkQmEqf6O8jeyoFY1b2hD1uL&index=1';
    expect(getVideoIDAndPlaceholder(url)).toEqual({
      videoID: null,
      listID: 'PLGN9BI-OAQkQmEqf6O8jeyoFY1b2hD1uL&index=1',
      videoUrl:
        'https://www.youtube.com/embed/videoseries?list=PLGN9BI-OAQkQmEqf6O8jeyoFY1b2hD1uL&index=1',
      thumbnailURL: 'https://img.youtube.com/vi/KwRSRRyuk-Q/sddefault.jpg',
      hasMatch: true,
    });
  });

  test('extracts video from YouTube live URL', () => {
    const url = 'https://www.youtube.com/live/ISdHvS6Ck3k?si=COeVakmC1lI6jQy3';
    expect(getVideoIDAndPlaceholder(url)).toEqual({
      videoID: 'ISdHvS6Ck3k?si=COeVakmC1lI6jQy3',
      listID: null,
      videoUrl: null,
      thumbnailURL: 'https://img.youtube.com/vi/ISdHvS6Ck3k/sddefault.jpg',
      hasMatch: true,
    });
  });

  test('extracts video from shortened YouTube URL', () => {
    const url = 'https://youtu.be/P9j-xYdWT28?si=zZ2putStJbPBLCdt';
    expect(getVideoIDAndPlaceholder(url)).toEqual({
      videoID: 'P9j-xYdWT28?si=zZ2putStJbPBLCdt',
      listID: null,
      videoUrl: null,
      thumbnailURL: 'https://img.youtube.com/vi/P9j-xYdWT28/sddefault.jpg',
      hasMatch: true,
    });
  });

  test('extracts video from standard YouTube URL', () => {
    const url = 'https://www.youtube.com/watch?v=KUd6e105u_I';
    expect(getVideoIDAndPlaceholder(url)).toEqual({
      videoID: 'KUd6e105u_I',
      listID: null,
      videoUrl: null,
      thumbnailURL: 'https://img.youtube.com/vi/KUd6e105u_I/sddefault.jpg',
      hasMatch: true,
    });
  });

  test('extracts video from YouTube Shorts URL', () => {
    const url = 'https://www.youtube.com/shorts/dQw4w9WgXcQ';
    expect(getVideoIDAndPlaceholder(url)).toEqual({
      videoID: 'dQw4w9WgXcQ',
      listID: null,
      videoUrl: null,
      thumbnailURL: 'https://img.youtube.com/vi/dQw4w9WgXcQ/sddefault.jpg',
      hasMatch: true,
    });
  });

  test('extracts video details from Vimeo URL', () => {
    const url = 'https://vimeo.com/639449679';
    expect(getVideoIDAndPlaceholder(url)).toEqual({
      videoID: '639449679',
      listID: null,
      videoUrl: null,
      thumbnailURL: 'https://vumbnail.com/639449679.jpg',
      hasMatch: true,
    });
  });

  test('extracts PeerTube video when instance is allowed', () => {
    const url = 'https://peertube.eus/w/qjubDnZ79UmmjhAUqvX2zu';
    const peertubeInstances = ['peertube.eus'];
    expect(getVideoIDAndPlaceholder(url, peertubeInstances)).toEqual({
      videoID: 'qjubDnZ79UmmjhAUqvX2zu',
      listID: null,
      videoUrl: 'https://peertube.eus/videos/embed/qjubDnZ79UmmjhAUqvX2zu',
      thumbnailURL: null,
      hasMatch: true,
    });
  });

  test('does not match PeerTube when instance is not allowed', () => {
    const url = 'https://other.peertube.org/w/qjubDnZ79UmmjhAUqvX2zu';
    const peertubeInstances = ['peertube.eus'];
    expect(getVideoIDAndPlaceholder(url, peertubeInstances)).toEqual({
      videoID: null,
      listID: null,
      videoUrl: null,
      thumbnailURL: null,
      hasMatch: false,
    });
  });

  test('returns hasMatch false for non-video URLs', () => {
    const url = 'https://www.example.com';
    expect(getVideoIDAndPlaceholder(url)).toEqual({
      videoID: null,
      listID: null,
      videoUrl: null,
      thumbnailURL: null,
      hasMatch: false,
    });
  });
});

describe('VideoBlockBody rendering', () => {
  test('renders a YouTube playlist iframe when list in URL', () => {
    const { container } = render(
      <VideoBlockBody
        data={{
          '@type': 'video',
          url: 'https://www.youtube.com/watch?v=KwRSRRyuk-Q&list=PLGN9BI-OAQkQmEqf6O8jeyoFY1b2hD1uL&index=1',
        }}
      />,
    );

    const iframe = container.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe?.getAttribute('src')).toContain(
      'https://www.youtube.com/embed/videoseries?list=PLGN9BI-OAQkQmEqf6O8jeyoFY1b2hD1uL',
    );
  });

  test('renders a YouTube iframe for standard video URL', () => {
    const { container } = render(
      <VideoBlockBody
        data={{
          '@type': 'video',
          url: 'https://www.youtube.com/watch?v=KUd6e105u_I',
        }}
      />,
    );

    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toBe(
      'https://www.youtube.com/embed/KUd6e105u_I',
    );
  });

  test('renders a YouTube Shorts iframe', () => {
    const { container } = render(
      <VideoBlockBody
        data={{
          '@type': 'video',
          url: 'https://www.youtube.com/shorts/dQw4w9WgXcQ',
        }}
      />,
    );

    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toBe(
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
    );
  });

  test('renders Vimeo iframe when URL contains vimeo domain', () => {
    const { container } = render(
      <VideoBlockBody
        data={{ '@type': 'video', url: 'https://vimeo.com/639449679' }}
      />,
    );

    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toBe(
      'https://player.vimeo.com/video/639449679',
    );
  });

  test('renders HTML5 video element for mp4 URL', () => {
    const internalUrl = '/videos/example.mp4';
    const { container } = render(
      <VideoBlockBody data={{ '@type': 'video', url: internalUrl }} />,
    );

    const videoElement = container.querySelector('video');
    expect(videoElement).not.toBeNull();
    expect(videoElement?.getAttribute('src')).toBe(
      '/videos/example.mp4/@@download/file',
    );
  });

  test('shows warning div for unsupported URL in edit mode', () => {
    const { getByText } = render(
      <VideoBlockBody
        data={{ '@type': 'video', url: 'https://www.example.com' }}
        isEditMode
      />,
    );

    expect(getByText('Please enter a valid URL.')).toBeInTheDocument();
  });

  test('renders YouTube iframe with autoplay when autoplay is set', () => {
    const { container } = render(
      <VideoBlockBody
        data={{
          '@type': 'video',
          url: 'https://www.youtube.com/watch?v=KUd6e105u_I',
          autoplay: true,
        }}
      />,
    );

    const iframe = container.querySelector('iframe');
    expect(iframe?.getAttribute('src')).toBe(
      'https://www.youtube.com/embed/KUd6e105u_I?autoplay=1',
    );
  });
});
