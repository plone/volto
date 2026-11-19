import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import ObjectBrowserBody from './ObjectBrowserBody';

const mockStore = configureStore();

const baseState = {
  search: { subrequests: {} },
  intl: { locale: 'en', messages: {} },
};

const baseProps = {
  block: 'test-block',
  data: {},
  closeObjectBrowser: () => {},
  onChangeBlock: () => {},
};

const getInitialSearchPath = (actions) => {
  const action = actions.find((a) => a.type === 'SEARCH_CONTENT');
  return action?.request?.path?.split('/@search')[0];
};

describe('ObjectBrowserBody', () => {
  it('uses initialPath as the default folder when mode=multiple', () => {
    const store = mockStore(baseState);
    render(
      <Provider store={store}>
        <ObjectBrowserBody
          {...baseProps}
          mode="multiple"
          initialPath="/company/team"
        />
      </Provider>,
    );

    expect(getInitialSearchPath(store.getActions())).toBe('/company/team');
  });

  it('defaults to root when mode=multiple and initialPath is not provided', () => {
    const store = mockStore(baseState);
    render(
      <Provider store={store}>
        <ObjectBrowserBody {...baseProps} mode="multiple" />
      </Provider>,
    );

    expect(getInitialSearchPath(store.getActions())).toBe('/');
  });
});
