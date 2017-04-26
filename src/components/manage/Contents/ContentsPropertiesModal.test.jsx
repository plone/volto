import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import ContentsPropertiesModal from './ContentsPropertiesModal';

const mockStore = configureStore();

jest.mock('../Form/ModalForm', () => jest.fn(() => <div id="modalform" />));

describe('ContentsPropertiesModal', () => {
  it('renders a contents properties modal component', () => {
    const store = mockStore({
      content: {
        edit: {
          loading: false,
          loaded: true,
        },
      },
    });
    const component = renderer.create(
      <Provider store={store}>
        <ContentsPropertiesModal
          open
          onOk={() => {}}
          onCancel={() => {}}
          items={['/blog']}
        />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
