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
