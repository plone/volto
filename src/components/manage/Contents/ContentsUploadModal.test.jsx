import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import ContentsUploadModal from './ContentsUploadModal';

const mockStore = configureStore();

describe('ContentsUploadModal', () => {
  it('renders a contents upload modal component', () => {
    const store = mockStore({
      content: {
        add: {
          loading: false,
          loaded: true,
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <ContentsUploadModal
          pathname="/blog"
          open={false}
          onOk={() => {}}
          onCancel={() => {}}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
