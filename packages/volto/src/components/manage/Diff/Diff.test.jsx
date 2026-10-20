import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { waitFor, render, screen } from '@testing-library/react';

import Diff from './Diff';
import config from '@plone/volto/registry';

const mockStore = configureStore();

vi.mock('../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
}));

vi.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  const { __setLoadables } = await import(
    '@plone/volto/helpers/Loadable/Loadable'
  );
  await __setLoadables();
});

describe('Diff', () => {
  it('renders a diff component', async () => {
    const store = mockStore({
      history: {
        entries: [
          {
            time: '2017-04-19T14:09:36+02:00',
            version: 1,
            actor: { fullname: 'Web Admin' },
          },
          {
            time: '2017-04-19T14:09:35+02:00',
            version: 0,
            actor: { fullname: 'Web Admin' },
          },
        ],
      },
      content: {
        data: {
          title: 'Blog',
          '@type': 'Folder',
        },
      },
      schema: {
        schema: {
          fieldsets: [
            {
              fields: ['title'],
            },
          ],
          properties: {
            title: {
              title: 'Title',
              type: 'string',
            },
          },
        },
      },
      diff: {
        data: [
          {
            title: 'My old title',
          },
          {
            title: 'My new title,',
          },
        ],
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <CookiesProvider>
          <MemoryRouter initialEntries={['/blog?one=0&two=1']}>
            <Diff />
            <div id="toolbar"></div>
          </MemoryRouter>
        </CookiesProvider>
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('DiffField'));
    expect(container).toMatchSnapshot();
  });

  it('renders a reordered block and a changed block', async () => {
    const storeExtenders = config.settings.storeExtenders;
    config.settings.storeExtenders = [];
    config.blocks.blocksConfig.testText = {
      id: 'testText',
      view: ({ data }) => <p>{data.text}</p>,
    };
    const blocks = {
      a: { '@type': 'testText', text: 'Alpha' },
      b: { '@type': 'testText', text: 'Bravo' },
      c: { '@type': 'testText', text: 'Charlie old' },
    };
    const store = mockStore({
      history: { entries: [] },
      content: { data: { title: 'Page', '@type': 'Document' } },
      schema: {
        schema: {
          fieldsets: [{ fields: ['title', 'blocks', 'blocks_layout'] }],
          properties: {
            title: { title: 'Title', type: 'string' },
            blocks: { title: 'Blocks', type: 'dict', widget: 'json' },
            blocks_layout: { title: 'Blocks Layout', type: 'dict' },
          },
        },
      },
      diff: {
        data: [
          {
            title: 'Page',
            blocks,
            blocks_layout: { items: ['a', 'b', 'c'] },
          },
          {
            title: 'Page',
            blocks: {
              ...blocks,
              c: { '@type': 'testText', text: 'Charlie new' },
            },
            // "b" moved above "a", "c" stayed in place but changed
            blocks_layout: { items: ['b', 'a', 'c'] },
          },
        ],
      },
      intl: { locale: 'en', messages: {} },
    });
    const { container } = render(
      <Provider store={store}>
        <CookiesProvider>
          <MemoryRouter initialEntries={['/page?one=0&two=1']}>
            <Diff />
            <div id="toolbar"></div>
          </MemoryRouter>
        </CookiesProvider>
      </Provider>,
    );
    await waitFor(() => screen.getAllByTestId('DiffField'));
    expect(screen.getAllByText('Blocks')).toHaveLength(1);
    expect(container).toMatchSnapshot();

    delete config.blocks.blocksConfig.testText;
    config.settings.storeExtenders = storeExtenders;
  });
});
