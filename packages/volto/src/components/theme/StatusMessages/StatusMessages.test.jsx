import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { toast } from 'react-toastify';
import config from '@plone/volto/registry';
import StatusMessages from './StatusMessages';
import {
  ADD_STATUS_MESSAGES,
  CLEAR_STATUS_MESSAGES,
} from '@plone/volto/constants/ActionTypes';

vi.mock('react-toastify', () => ({
  toast: { info: vi.fn(), warning: vi.fn(), error: vi.fn() },
}));

const mockStore = configureStore();
const store = (items) =>
  mockStore({
    statusMessages: { items },
    intl: { locale: 'en', messages: {} },
  });

describe('StatusMessages', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    config.settings.showStatusMessages = true;
    document.cookie = 'statusmessages=; Max-Age=0; path=/';
  });

  it('shows the status messages as toasts and clears them', () => {
    const s = store([
      { message: 'Saved', type: 'info' },
      { message: 'Check this', type: 'warn' },
      { message: 'Failed', type: 'error' },
    ]);
    render(
      <Provider store={s}>
        <StatusMessages />
      </Provider>,
    );
    expect(toast.info).toHaveBeenCalledTimes(1);
    expect(toast.warning).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledTimes(1);
    expect(s.getActions()).toEqual([{ type: CLEAR_STATUS_MESSAGES }]);
  });

  it('takes the status messages of the page that was loaded', () => {
    document.cookie = 'statusmessages=AIVGb3V0ZXJyb3I%3D; path=/';
    const s = store([]);
    render(
      <Provider store={s}>
        <StatusMessages />
      </Provider>,
    );
    expect(s.getActions()).toEqual([
      {
        type: ADD_STATUS_MESSAGES,
        messages: [{ message: 'Fout', type: 'error' }],
      },
    ]);
    expect(document.cookie).not.toContain('statusmessages');
  });

  it('leaves the messages to the project with showStatusMessages off', () => {
    config.settings.showStatusMessages = false;
    const s = store([{ message: 'Saved', type: 'info' }]);
    render(
      <Provider store={s}>
        <StatusMessages />
      </Provider>,
    );
    expect(toast.info).not.toHaveBeenCalled();
    expect(s.getActions()).toEqual([]);
  });
});
