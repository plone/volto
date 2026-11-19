import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';
import DefaultTocRenderer from './DefaultTocRenderer';

const mockStore = configureStore();

const data = { '@type': 'toc', variation: 'default' };

const properties = {
  title: 'Table of Contents',
  hide_title: false,
  ordered: true,
};

const tocEntries = [
  {
    level: 2,
    title: 'Hello this is a sample page',
    items: [
      {
        level: 3,
        title: 'Test level 3',
        items: [],
        id: 'be612682-6df9-4a5e-b3a1-9dec5d82ae14',
        parentId: '3a8bff13-3245-44f6-8a35-e0defef5898e',
      },
    ],
    id: '3a8bff13-3245-44f6-8a35-e0defef5898e',
  },
];

test('renders a default toc renderer component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <DefaultTocRenderer
          properties={properties}
          data={data}
          tocEntries={tocEntries}
        />
      </MemoryRouter>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

const renderToc = (entries) => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  return renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <DefaultTocRenderer
          properties={properties}
          data={data}
          tocEntries={entries}
        />
      </MemoryRouter>
    </Provider>,
  );
};

test('links to the anchor provided by the block', () => {
  const component = renderToc([
    {
      level: 2,
      title: 'Everything is not okay',
      items: [],
      id: 'block-id-0',
      anchor: 'subtitle-everything-is-not-okay',
    },
  ]);

  expect(component.root.findByType('a').props.href).toMatch(
    /#subtitle-everything-is-not-okay$/,
  );
});

test('slugs the title of blocks that provide no anchor', () => {
  const component = renderToc([
    {
      level: 2,
      title: 'Everything is okay',
      items: [],
      id: 'block-id-0',
    },
  ]);

  expect(component.root.findByType('a').props.href).toMatch(
    /#everything-is-okay$/,
  );
});
