import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { MemoryRouter } from 'react-router-dom';

import RelatedItems from './RelatedItems';

const mockStore = configureStore();
let store;

describe('Related Items', () => {
  beforeEach(() => {
    store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
  });

  it('renders without related items', () => {
    const content = {};
    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <RelatedItems content={content} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders with related items', () => {
    const content = {
      relatedItems: [
        {
          '@id': '/test-1',
          title: 'Title 1',
          description: 'Description 1',
        },
        {
          '@id': '/test-2',
          title: 'Title 2',
          description: 'Description 2',
        },
      ],
    };

    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <RelatedItems content={content} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders with related items has null', () => {
    const content = {
      relatedItems: [
        {
          '@id': '/test-1',
          title: 'Title 1',
          description: 'Description 1',
        },
        null,
      ],
    };

    const component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <RelatedItems content={content} />
        </MemoryRouter>
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
