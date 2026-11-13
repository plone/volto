import React from 'react';
import { vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
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

describe('ObjectBrowserBody search', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const openSearch = () => {
    let state = {
      ...baseState,
      search: {
        subrequests: {
          'test-block-image': {
            items: [
              {
                '@id': '/photos/original',
                '@type': 'Image',
                title: 'Original',
              },
            ],
          },
        },
      },
    };
    const store = mockStore(() => state);
    const closeObjectBrowser = vi.fn();
    render(
      <Provider store={store}>
        <ObjectBrowserBody
          {...baseProps}
          mode="image"
          contextURL="/photos"
          searchableTypes={['Image']}
          closeObjectBrowser={closeObjectBrowser}
        />
      </Provider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Search SVG' }));
    const input = screen.getByRole('textbox', { name: 'Search content' });
    const respond = (subrequest, items) => {
      state = {
        ...state,
        search: {
          subrequests: {
            ...state.search.subrequests,
            [subrequest]: { loaded: true, items },
          },
        },
      };
      act(() => store.dispatch({ type: 'SEARCH_RESULTS_RECEIVED' }));
    };
    return { input, store, respond, closeObjectBrowser };
  };

  const typeQuery = (input, value) =>
    fireEvent.change(input, { target: { value } });
  const finishDebounce = () => act(() => vi.advanceTimersByTime(300));

  it('shows matching images and reports when a new query returns no results', () => {
    const { input, store, respond } = openSearch();
    typeQuery(input, 'sun');
    finishDebounce();
    const first = store.getActions().at(-1);
    const query = new URLSearchParams(first.request.path.split('?')[1]);
    expect(query.get('SearchableText')).toBe('sun*');
    respond(first.subrequest, [
      { '@id': '/photos/sunset', '@type': 'Image', title: 'Sunset' },
    ]);
    expect(screen.getByText('Sunset')).toBeTruthy();

    typeQuery(input, 'no-match');
    expect(screen.queryByText('Sunset')).toBeNull();
    finishDebounce();
    const second = store.getActions().at(-1);
    respond(second.subrequest, []);
    expect(screen.getByRole('status').textContent).toBe('No results found.');
  });

  it('clears and refocuses the input, then exits search when the X is clicked again', () => {
    const { input, store, closeObjectBrowser } = openSearch();
    typeQuery(input, 'sun');
    const clear = screen.getByRole('button', { name: 'Clear search' });
    clear.focus();
    fireEvent.click(clear);
    finishDebounce();
    expect(input.value).toBe('');
    expect(document.activeElement).toBe(input);
    expect(store.getActions()).toHaveLength(1);
    expect(screen.getByText('Original')).toBeTruthy();

    const closeSearch = screen.getByRole('button', { name: 'Close search' });
    fireEvent.click(closeSearch);
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.getByText('photos')).toBeTruthy();
    expect(closeObjectBrowser).not.toHaveBeenCalled();
  });
});
