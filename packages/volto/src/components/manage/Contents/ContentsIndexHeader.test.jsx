import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-intl-redux';

import ContentsIndexHeader from './ContentsIndexHeader';

const mockStore = configureStore([thunk]);

vi.mock('@plone/volto/helpers/Loadable/Loadable');

beforeAll(async () => {
  const { __setLoadables } = await import(
    '@plone/volto/helpers/Loadable/Loadable'
  );
  await __setLoadables();
});

describe('ContentsIndexHeader', () => {
  it('renders a contents titles component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <ContentsIndexHeader
          id="review_state"
          width={1}
          label="Review state"
          order={1}
          isDragging={false}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
