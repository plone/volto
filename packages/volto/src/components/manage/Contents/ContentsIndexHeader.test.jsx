import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-intl-redux';

import ContentsIndexHeader from './ContentsIndexHeader';

const mockStore = configureStore([thunk]);

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
          width={1}
          label="Review state"
          onOrderIndex={() => {}}
          connectDragSource={(x) => x}
          connectDropTarget={(x) => x}
          order={1}
          isDragging={false}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
