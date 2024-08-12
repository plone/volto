import { injectIntl } from 'react-intl';
import React from 'react';
import AlbumViewComponent from './AlbumView';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

const IntlAlbumViewComponent = injectIntl(AlbumViewComponent);

function StoryComponent(args) {
  return (
    <Wrapper customStore={{}}>
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlAlbumViewComponent
        content={{
          ...args,
          items: [
            {
              url: '/news',
              image: {
                scales: {
                  preview: {
                    download: 'https://6.docs.plone.org/_static/logo.svg',
                  },
                  large: {
                    download: 'https://6.docs.plone.org/_static/logo.svg',
                  },
                },
              },
            },
            {
              url: '',
              image: {
                scales: {
                  preview: {
                    download: 'https://6.docs.plone.org/_static/logo.svg',
                  },
                  large: {
                    download: 'https://6.docs.plone.org/_static/logo.svg',
                  },
                },
              },
            },
          ],
        }}
      />
    </Wrapper>
  );
}

export const AlbumView = StoryComponent.bind({});
AlbumView.args = {
  title: 'Plone 6',
  description:
    'Plone is a free and open source content management system built on top of the Zope application server.',
};
export default {
  title: 'Public components/Views/AlbumView',
  component: AlbumView,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the document',
    },
    description: {
      control: 'text',
      description: 'Description of the document',
    },
  },
};
