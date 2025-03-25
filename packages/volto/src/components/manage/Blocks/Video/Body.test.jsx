import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import Body from './Body';
import { getVideoIDAndPlaceholder } from './Body';
import config from '@plone/volto/registry';

config.blocks.blocksConfig = {
  video: {
    id: 'video',
    title: 'Video',
    group: 'media',
    extensions: {},
    variations: [],
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  },
};

const mockStore = configureStore();

test('renders a youtube video component with "list" in its url', () => {
  const url =
    'https://www.youtube.com/watch?v=KwRSRRyuk-Q&list=PLGN9BI-OAQkQmEqf6O8jeyoFY1b2hD1uL&index=1';
  const videoDetails = getVideoIDAndPlaceholder(url);
  const listID = 'PLGN9BI-OAQkQmEqf6O8jeyoFY1b2hD1uL&index=1';
  expect(videoDetails).toEqual({
    hasMatch: true,
    videoID: null,
    videoUrl: `https://www.youtube.com/embed/videoseries?list=${listID}`,
    thumbnailURL: 'https://img.youtube.com/vi/KwRSRRyuk-Q/sddefault.jpg',
    videoSource: null,
  });
});

test('extracts video details from a youtube video with "/live/" in its url', () => {
  const url = 'https://www.youtube.com/live/ISdHvS6Ck3k?si=COeVakmC1lI6jQy3';
  const videoDetails = getVideoIDAndPlaceholder(url);
  expect(videoDetails).toEqual({
    hasMatch: true,
    videoID: 'ISdHvS6Ck3k?si=COeVakmC1lI6jQy3',
    videoUrl: null,
    thumbnailURL: 'https://img.youtube.com/vi/ISdHvS6Ck3k/sddefault.jpg',
    videoSource: 'youtube',
  });
});

test('extracts video details from a youtube video with ".be/" in its url', () => {
  const url = 'https://youtu.be/P9j-xYdWT28?si=zZ2putStJbPBLCdt';
  const videoDetails = getVideoIDAndPlaceholder(url);
  expect(videoDetails).toEqual({
    hasMatch: true,
    videoID: 'P9j-xYdWT28?si=zZ2putStJbPBLCdt',
    videoUrl: null,
    thumbnailURL: 'https://img.youtube.com/vi/P9j-xYdWT28/sddefault.jpg',
    videoSource: 'youtube',
  });
});

test('extracts video details from a youtube video with "?v=" in its url', () => {
  const url = 'https://www.youtube.com/watch?v=KUd6e105u_I';
  const videoDetails = getVideoIDAndPlaceholder(url);
  expect(videoDetails).toEqual({
    hasMatch: true,
    videoID: 'KUd6e105u_I',
    videoUrl: null,
    thumbnailURL: 'https://img.youtube.com/vi/KUd6e105u_I/sddefault.jpg',
    videoSource: 'youtube',
  });
});

test('extracts video details from a youtube short', () => {
  const url = 'https://www.youtube.com/shorts/_-DjLZCfGOg';
  const videoDetails = getVideoIDAndPlaceholder(url);
  expect(videoDetails).toEqual({
    hasMatch: true,
    videoID: '_-DjLZCfGOg',
    videoUrl: null,
    thumbnailURL: 'https://img.youtube.com/vi/_-DjLZCfGOg/sddefault.jpg',
    videoSource: 'youtube',
  });
});

test('extracts video details from a vimeo video url', () => {
  const url = 'https://vimeo.com/639449679';
  const videoDetails = getVideoIDAndPlaceholder(url);
  expect(videoDetails).toEqual({
    hasMatch: true,
    videoID: '639449679',
    videoUrl: null,
    thumbnailURL: 'https://vumbnail.com/639449679.jpg',
    videoSource: 'vimeo',
  });
});

test('renders a youtube video body component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <Body
        data={{
          '@type': 'video',
          url: 'https://www.youtube.com/watch?v=KwRSRRyuk-Q&list=PLGN9BI-OAQkQmEqf6O8jeyoFY1b2hD1uL&index=1',
        }}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders a youtube video body component in edit mode', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <Body
        data={{
          '@type': 'video',
          url: 'https://www.youtube.com/watch?v=KwRSRRyuk-Q&list=PLGN9BI-OAQkQmEqf6O8jeyoFY1b2hD1uL&index=1',
        }}
        isEditMode={true}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders invalid video body component with invalid URL', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <Body
        data={{
          '@type': 'video',
          url: 'https://www.google.com',
        }}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders a error message for invalid video URL in edit mode', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <Body
        data={{
          '@type': 'video',
          url: 'https://www.google.com',
        }}
        isEditMode={true}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
