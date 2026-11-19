import React from 'react';
import { vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { applyMiddleware, createStore } from 'redux';
import searchReducer from '@plone/volto/reducers/search/search';
import config from '@plone/volto/registry';
import SidebarPopup from './SidebarPopup';
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
  const originalImageObjects = config.settings.imageObjects;
  const originalApiPath = config.settings.apiPath;
  beforeEach(() => {
    vi.useFakeTimers();
    config.settings.imageObjects = ['Image'];
    config.settings.apiPath = 'http://localhost:3000';
  });
  afterEach(() => {
    vi.useRealTimers();
    config.settings.imageObjects = originalImageObjects;
    config.settings.apiPath = originalApiPath;
  });

  const openSearch = (mode = 'image') => {
    const requests = [];
    const middleware = (store) => (next) => (action) => {
      if (action.type !== 'SEARCH_CONTENT') return next(action);
      store.dispatch({ ...action, type: 'SEARCH_CONTENT_PENDING' });
      return new Promise((resolve, reject) => {
        requests.push({ action, resolve, reject });
      });
    };
    const folderItem = {
      '@id': '/photos/original',
      '@type': 'Image',
      title: 'Original',
    };
    const initialState = {
      ...baseState,
      search: {
        subrequests: { [`test-block-${mode}`]: { items: [folderItem] } },
      },
    };
    const store = createStore(
      (state = initialState, action) => ({
        ...state,
        search: searchReducer(state.search, action),
      }),
      applyMiddleware(middleware),
    );
    const closeObjectBrowser = vi.fn();
    const onSelectItem = vi.fn();
    const { unmount } = render(
      <Provider store={store}>
        <SidebarPopup open onClose={closeObjectBrowser}>
          <ObjectBrowserBody
            {...baseProps}
            mode={mode}
            contextURL="/photos"
            searchableTypes={['Image', 'Document']}
            closeObjectBrowser={closeObjectBrowser}
            onSelectItem={onSelectItem}
          />
        </SidebarPopup>
      </Provider>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Search SVG' }));
    const input = screen.getByRole('textbox', { name: 'Search content' });
    const latestRequest = () => requests.at(-1).action;
    const respond = async (action, items, error = null) => {
      const request = requests.find((request) => request.action === action);
      await act(async () => {
        store.dispatch({
          ...action,
          type: error ? 'SEARCH_CONTENT_FAIL' : 'SEARCH_CONTENT_SUCCESS',
          result: { items, items_total: items.length },
          error,
        });
        if (error) request.reject(error);
        else request.resolve({ items });
      });
    };
    return {
      input,
      store,
      respond,
      closeObjectBrowser,
      latestRequest,
      requests,
      unmount,
      onSelectItem,
    };
  };

  const typeQuery = (input, value) =>
    fireEvent.change(input, { target: { value } });
  const finishDebounce = () => act(() => vi.advanceTimersByTime(300));

  it('shows loading during debounce and the request, then matching or empty results', async () => {
    const { input, latestRequest, respond } = openSearch();
    typeQuery(input, 'sun');
    expect(screen.getByRole('status', { name: 'Loading' })).toBeTruthy();
    finishDebounce();
    const first = latestRequest();
    expect(
      new URLSearchParams(first.request.path.split('?')[1]).get(
        'SearchableText',
      ),
    ).toBe('sun*');
    expect(screen.getByRole('status', { name: 'Loading' })).toBeTruthy();
    await respond(first, [
      { '@id': '/photos/sunset', '@type': 'Image', title: 'Sunset' },
    ]);
    expect(screen.queryByRole('status', { name: 'Loading' })).toBeNull();
    expect(screen.getByText('Sunset')).toBeTruthy();

    typeQuery(input, 'no-match');
    expect(screen.queryByText('Sunset')).toBeNull();
    finishDebounce();
    await respond(latestRequest(), []);
    expect(screen.getByRole('status').textContent).toBe('No results found.');
  });

  it('clears and refocuses the input, then exits search when the X is clicked again', () => {
    const { input, requests, closeObjectBrowser } = openSearch();
    typeQuery(input, 'sun');
    const clear = screen.getByRole('button', { name: 'Clear search' });
    clear.focus();
    fireEvent.click(clear);
    finishDebounce();
    expect(input.value).toBe('');
    expect(document.activeElement).toBe(input);
    expect(
      requests.every(
        ({ action }) => !action.request.path.includes('SearchableText'),
      ),
    ).toBe(true);
    expect(screen.getByText('Original')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Close search' }));
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.getByText('photos')).toBeTruthy();
    expect(closeObjectBrowser).not.toHaveBeenCalled();
  });

  it('handles the Escape key cycle inside SidebarPopup and lets a second Escape close the browser', () => {
    const { input, closeObjectBrowser, requests } = openSearch();
    typeQuery(input, 'sun');
    fireEvent.keyDown(input, { key: 'Escape' });
    fireEvent.keyUp(input, { key: 'Escape' });
    finishDebounce();
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(screen.getByText('Original')).toBeTruthy();
    expect(closeObjectBrowser).not.toHaveBeenCalled();
    expect(
      requests.every(
        ({ action }) => !action.request.path.includes('SearchableText'),
      ),
    ).toBe(true);
    fireEvent.keyUp(screen.getByRole('button', { name: 'Search SVG' }), {
      key: 'Escape',
    });
    expect(closeObjectBrowser).toHaveBeenCalledTimes(1);
  });

  it.each(['image', 'link', 'multiple'])(
    'uses the normalized query consistently in %s mode',
    (mode) => {
      const { input, requests } = openSearch(mode);
      typeQuery(input, '  ab  ');
      finishDebounce();
      expect(screen.getByRole('status').textContent).toBe(
        'Enter at least 3 characters to search',
      );
      typeQuery(input, '   ');
      expect(screen.getByRole('button', { name: 'Close search' })).toBeTruthy();
      expect(screen.queryByRole('status')).toBeNull();
      typeQuery(input, config.settings.apiPath);
      finishDebounce();
      expect(screen.getByRole('button', { name: 'Close search' })).toBeTruthy();
      expect(screen.queryByRole('status')).toBeNull();
      expect(
        requests.every(
          ({ action }) => !action.request.path.includes('SearchableText'),
        ),
      ).toBe(true);
    },
  );

  it.each(['/news', 'http://localhost:3000/news'])(
    'restores path navigation for %s after selecting an item and leaving search',
    async (path) => {
      const { input, latestRequest, respond, onSelectItem } = openSearch();
      typeQuery(input, path);
      finishDebounce();
      expect(latestRequest().request.path).toContain('/news/@search?');
      const item = {
        '@id': '/news/photo',
        '@type': 'Image',
        title: 'News photo',
      };
      await respond(latestRequest(), [item]);
      fireEvent.click(screen.getByLabelText('Select News photo'));
      expect(onSelectItem).toHaveBeenCalledWith(
        '/news/photo',
        expect.anything(),
      );
      fireEvent.click(screen.getByRole('button', { name: 'Back' }));
      expect(screen.queryByRole('textbox')).toBeNull();
      expect(latestRequest().request.path).toContain('/news/@search?');
      await respond(latestRequest(), [item]);
      expect(screen.getByText('news')).toBeTruthy();
      expect(screen.getByText('News photo')).toBeTruthy();
    },
  );

  it('navigates to a folder from search and discards the search results', async () => {
    const { input, latestRequest, respond, store } = openSearch();
    typeQuery(input, 'news');
    finishDebounce();
    const search = latestRequest();
    await respond(search, [
      {
        '@id': '/news',
        '@type': 'Document',
        title: 'News',
        is_folderish: true,
      },
    ]);
    fireEvent.click(screen.getByLabelText('Browse News'));
    expect(screen.queryByRole('textbox')).toBeNull();
    expect(latestRequest().request.path).toContain('/news/@search?');
    expect(
      store.getState().search.subrequests[search.subrequest],
    ).toBeUndefined();
  });

  it.each(['Back', 'clear', 'unmount'])(
    'cleans up pending searches on %s, including late responses',
    async (action) => {
      const { input, latestRequest, respond, store, unmount } = openSearch();
      typeQuery(input, 'sun');
      finishDebounce();
      const oldSearch = latestRequest();
      typeQuery(input, 'moon');
      expect(
        store.getState().search.subrequests[oldSearch.subrequest],
      ).toBeUndefined();
      finishDebounce();
      const current = latestRequest();
      await respond(oldSearch, [
        { '@id': '/late', '@type': 'Image', title: 'Late result' },
      ]);
      expect(
        store.getState().search.subrequests[oldSearch.subrequest],
      ).toBeUndefined();
      expect(screen.queryByText('Late result')).toBeNull();

      if (action === 'unmount') unmount();
      else
        fireEvent.click(
          screen.getByRole('button', {
            name: action === 'Back' ? 'Back' : 'Clear search',
          }),
        );
      expect(
        store.getState().search.subrequests[current.subrequest],
      ).toBeUndefined();
      await respond(
        current,
        [],
        action === 'unmount' ? new Error('Request failed') : null,
      );
      expect(
        store.getState().search.subrequests[current.subrequest],
      ).toBeUndefined();
    },
  );
});
