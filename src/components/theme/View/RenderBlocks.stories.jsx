import { injectIntl } from 'react-intl';
import React from 'react';
import RenderBlocksComponent from './RenderBlocks';
import { RealStoreWrapper as Wrapper } from '@plone/volto/storybook';

import config from '@plone/volto/registry';

const IntlRenderBlocksComponent = injectIntl(RenderBlocksComponent);

function StoryComponent(args) {
  return (
    <Wrapper
      customStore={{
        intl: {
          locale: 'en',
          messages: {},
        },
      }}
    >
      <div id="toolbar" style={{ display: 'none' }} />
      <IntlRenderBlocksComponent
        blocksConfig={{
          ...config.blocks.blocksConfig,
          custom: {
            id: 'custom',
            ...args,
          },
        }}
        content={{
          blocks_layout: {
            items: ['a', 'b'],
          },
          ...args,
        }}
        path="/foo"
      />
    </Wrapper>
  );
}

export const Default = StoryComponent.bind({});
Default.args = {
  view: ({ id, data }) => (
    <div>
      {id} - {data.text}
    </div>
  ),
  blocks: {
    a: {
      '@type': 'custom',
      text: 'a',
    },
    b: {
      '@type': 'custom',
      text: 'b',
    },
  },
};
export const PathToBlocks = StoryComponent.bind({});
PathToBlocks.args = {
  view: ({ id, data, path }) => (
    <div>
      id: {id} - text: {data.text} - path: {path}
    </div>
  ),

  blocks: {
    a: {
      '@type': 'custom',
      text: 'bar',
    },
    b: {
      '@type': 'custom',
      text: 'foo',
    },
  },
};

export const InvalidBlocks = StoryComponent.bind({});
InvalidBlocks.args = {
  blocks_layout: {
    items: ['MISSING-YOU-1', 'a', 'MISSING-YOU-2'],
  },
  blocks: {
    a: {
      '@type': 'custom',
      text: 'bar',
    },
  },
};
export default {
  title: 'Public components/View/RenderBlocks',
  component: RenderBlocksComponent,
  decorators: [
    (Story) => (
      <div className="ui segment form attached" style={{ width: '900px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    view: {
      description: 'Patter in which block content will be placed',
    },
    blocks: {
      description: 'blocks in the page',
    },
    blocks_layout: {
      description: 'block layout in the page',
    },
  },
};
