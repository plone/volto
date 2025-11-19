import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import ContentsPropertiesModal from './ContentsPropertiesModal';

const mockStore = configureStore();

vi.mock('@plone/volto/components/manage/Form');

describe('ContentsPropertiesModal', () => {
  it('renders a contents properties modal component', () => {
    const store = mockStore({
      content: {
        update: {
          loading: false,
          loaded: true,
        },
      },
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <ContentsPropertiesModal
          open
          onOk={() => {}}
          onCancel={() => {}}
          items={['/blog']}
        />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
