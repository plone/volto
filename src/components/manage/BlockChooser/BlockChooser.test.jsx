import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import BlockChooser from './BlockChooser';
import config from '@plone/volto/registry';

const blockSVG = {};

config.experimental = { addBlockButton: { enabled: false } };

config.blocks.blocksConfig = {
  title: {
    id: 'title',
    title: 'Title',
    icon: blockSVG,
    group: 'text',
    restricted: true,
    mostUsed: false,
  },
  description: {
    id: 'description',
    title: 'Description',
    icon: blockSVG,
    group: 'text',
    restricted: true,
    mostUsed: false,
  },
  text: {
    id: 'text',
    title: 'Text',
    icon: blockSVG,
    group: 'text',
    restricted: false,
    mostUsed: false,
  },
  image: {
    id: 'image',
    title: 'Image',
    icon: blockSVG,
    group: 'media',
    restricted: false,
    mostUsed: true,
  },
  leadimage: {
    id: 'leadimage',
    title: 'Lead Image Field',
    icon: blockSVG,
    group: 'media',
    restricted: false,
    mostUsed: false,
  },
  listing: {
    id: 'listing',
    title: 'Listing',
    icon: blockSVG,
    group: 'common',
    restricted: false,
    mostUsed: true,
    sidebarTab: 1,
  },
  video: {
    id: 'video',
    title: 'Video',
    icon: blockSVG,
    group: 'media',
    restricted: false,
    mostUsed: true,
  },
  toc: {
    id: 'toc',
    title: 'Table of Contents',
    icon: blockSVG,
    group: 'common',
    restricted: false,
    mostUsed: false,
  },
  hero: {
    id: 'hero',
    title: 'Hero',
    icon: blockSVG,
    group: 'common',
    restricted: false,
    mostUsed: false,
  },
  maps: {
    id: 'maps',
    title: 'Maps',
    icon: blockSVG,
    group: 'common',
    restricted: false,
    mostUsed: false,
  },
  html: {
    id: 'html',
    title: 'HTML',
    icon: blockSVG,
    group: 'common',
    restricted: false,
    mostUsed: false,
  },
  table: {
    id: 'table',
    title: 'Table',
    icon: blockSVG,
    group: 'common',
    restricted: false,
    mostUsed: false,
  },
};

const mockStore = configureStore();

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('BlocksChooser', () => {
  it('renders a BlockChooser component', () => {
    const { container } = render(
      <Provider store={store}>
        <BlockChooser onInsertBlock={() => {}} currentBlock="theblockid" />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('Fallback BlockChooser component onMutateBlock', () => {
    const { container } = render(
      <Provider store={store}>
        <BlockChooser onMutateBlock={() => {}} currentBlock="theblockid" />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
  it('allowedBlocks test', () => {
    const { container } = render(
      <Provider store={store}>
        <BlockChooser
          onInsertBlock={() => {}}
          currentBlock="theblockid"
          allowedBlocks={['image', 'listing']}
        />
      </Provider>,
    );
    expect(container.firstChild).not.toHaveTextContent('Video');
    // There are 2 because the others are aria-hidden="true"
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
  it('allowedBlocks bypasses showRestricted', () => {
    config.blocks.blocksConfig.listing.restricted = true;
    const { container } = render(
      <Provider store={store}>
        <BlockChooser
          onInsertBlock={() => {}}
          currentBlock="theblockid"
          allowedBlocks={['image', 'listing']}
        />
      </Provider>,
    );
    expect(container).toHaveTextContent('Listing');
  });
  it('showRestricted test', () => {
    const { container } = render(
      <Provider store={store}>
        <BlockChooser
          onInsertBlock={() => {}}
          currentBlock="theblockid"
          allowedBlocks={['image', 'title']}
          showRestricted
        />
      </Provider>,
    );
    expect(container.firstChild).not.toHaveTextContent('Video');
    // There's 1 because the others are aria-hidden="true"
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(container.firstChild).toHaveTextContent('Title');
  });
  it('uses custom blocksConfig test', () => {
    const blocksConfig = {
      ...config.blocks.blocksConfig,
      custom: {
        id: 'custom',
        title: 'Custom block',
        icon: blockSVG,
        mostUsed: true,
        group: 'site',
        edit: ({ id, data }) => (
          <div>
            {id} - {data.text}
          </div>
        ),
      },
    };
    const { container } = render(
      <Provider store={store}>
        <BlockChooser
          onInsertBlock={() => {}}
          currentBlock="theblockid"
          blocksConfig={blocksConfig}
        />
      </Provider>,
    );
    expect(container).toHaveTextContent('Custom block');
  });
  it("doesn't show empty groups", () => {
    const old = [...config.blocks.groupBlocksOrder];
    config.blocks.groupBlocksOrder.push({
      id: 'customGroup',
      title: 'Custom group',
    });
    const blocksConfig = {
      ...config.blocks.blocksConfig,
      custom: {
        id: 'custom',
        title: 'Custom block',
        icon: blockSVG,
        mostUsed: true,
        group: 'customGroup',
        restricted: true,
        edit: ({ id, data }) => (
          <div>
            {id} - {data.text}
          </div>
        ),
      },
    };
    const { container } = render(
      <Provider store={store}>
        <BlockChooser
          onInsertBlock={() => {}}
          currentBlock="theblockid"
          blocksConfig={blocksConfig}
        />
      </Provider>,
    );
    expect(container).not.toHaveTextContent('Custom group');
    config.blocks.groupBlocksOrder = old;
  });
  it('Show unique in case they have been removed (restricted as a function)', () => {
    config.blocks.required = [];
    config.blocks.blocksConfig.title.restricted = ({ properties, block }) =>
      properties.blocks_layout?.items?.find(
        (uid) => properties.blocks?.[uid]?.['@type'] === block.id,
      );

    const { container } = render(
      <Provider store={store}>
        <BlockChooser
          onInsertBlock={() => {}}
          currentBlock="theblockid"
          properties={{
            blocks: {
              'my-block-hash': {
                '@type': 'text',
              },
            },
          }}
        />
      </Provider>,
    );
    expect(container.firstChild).toHaveTextContent('Title');
  });
  it('Do not show unique in case it is present', () => {
    config.blocks.required = [];
    config.blocks.blocksConfig.title.restricted = true;

    const { container } = render(
      <Provider store={store}>
        <BlockChooser
          onInsertBlock={() => {}}
          currentBlock="theblockid"
          properties={{
            blocks: {
              'my-block-hash': {
                '@type': 'text',
              },
              'my-block-title-hash': {
                '@type': 'title',
              },
            },
          }}
        />
      </Provider>,
    );
    expect(container.firstChild).not.toHaveTextContent('Title');
  });
});
