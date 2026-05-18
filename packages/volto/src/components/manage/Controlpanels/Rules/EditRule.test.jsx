import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import EditRule from './EditRule';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

vi.mock('../../Toolbar/Toolbar', () => ({
  default: vi.fn(() => <div id="Portal" />),
}));

vi.mock('@plone/volto/components/manage/Form');

describe('EditRule', () => {
  it('renders rules edit interface', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const { container } = render(
      <Provider store={store}>
        <>
          <EditRule location={{ pathname: '/controlpanel/rules/:id/edit' }} />
          <div id="toolbar"></div>
        </>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
