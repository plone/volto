import '@testing-library/jest-dom';
import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import VideoBlockView from './VideoBlockView';

describe('VideoBlockView', () => {
  test('renders view video component', () => {
    const { asFragment } = render(
      <VideoBlockView
        data={{ '@type': 'video', url: 'https://youtu.be/KqjeO_ekW3g' }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders view video component with placeholder image', () => {
    const { asFragment } = render(
      <VideoBlockView
        data={{
          '@type': 'video',
          url: 'https://youtu.be/KqjeO_ekW3g',
          preview_image:
            'https://github.com/plone/volto/raw/main/logos/volto-colorful.png',
        }}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
