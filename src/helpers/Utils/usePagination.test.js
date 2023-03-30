import { renderHook } from '@testing-library/react-hooks';
import { usePagination } from './usePagination';
import * as redux from 'react-redux';
import routeData from 'react-router';

const state = {
  content: {
    data: {
      blocks: {
        '1a4ebb48-8095-4182-98a5-d7ccf5761bd2': {
          '@type': 'title',
        },
        '545b33de-92cf-4747-969d-68851837b317': {
          '@type': 'search',
          query: {
            b_size: '4',
            query: [
              {
                i: 'path',
                o: 'plone.app.querystring.operation.string.relativePath',
                v: '',
              },
            ],
            sort_order: 'ascending',
          },
          showSearchInput: true,
          showTotalResults: true,
        },
        '454b33de-92cf-4747-969d-68851837b317': {
          '@type': 'search',
          query: {
            b_size: '4',
            query: [
              {
                i: 'path',
                o: 'plone.app.querystring.operation.string.relativePath',
                v: '',
              },
            ],
            sort_order: 'ascending',
          },
          showSearchInput: true,
          showTotalResults: true,
        },
        '81509424-dcbc-4478-8db0-903c74b28b3d': {
          '@type': 'slate',
          plaintext: '',
          value: [
            {
              children: [
                {
                  text: '',
                },
              ],
              type: 'p',
            },
          ],
        },
      },
      blocks_layout: {
        items: [
          '545b33de-92cf-4747-969d-68851837b317',
          '81509424-dcbc-4478-8db0-903c74b28b3d',
        ],
      },
    },
  },
};

let mockUseLocationValue = {
  pathname: '/testroute',
  search: '',
};

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useLocation: () => ({
//     pathname: 'localhost:3000/example/path',
//   }),
// }));

const setUp = (searchParam) => {
  mockUseLocationValue.search = searchParam;
  return renderHook(
    ({ blockId, defaultPage }) => usePagination(blockId, defaultPage),
    {
      initialProps: {
        blockId: '545b33de-92cf-4747-969d-68851837b317',
        defaultPage: 1,
      },
    },
  );
};

// jest.mock('react-router-dom', () => ({
//   useHistory: () => ({ replace: jest.fn() }),
//   useLocation: () => ({
//     search: jest.fn().mockImplementation(() => {
//       return mockUseLocationValue;
//     }),
//   }),
// }));

jest.spyOn(redux, 'useSelector').mockImplementation((cb) => cb(state));
describe('Utils tests', () => {
  const useLocation = jest.spyOn(routeData, 'useLocation');
  const useHistory = jest.spyOn(routeData, 'useHistory');
  const useSelector = jest.spyOn(redux, 'useSelector');
  beforeEach(() => {
    useLocation.mockReturnValue(mockUseLocationValue);
    useHistory.mockReturnValue({ replace: jest.fn() });
    // useSelector.mockReturnValue((cb) => cb(state));
  });

  it('with blockId and defaultPage 1 - shoud be 1', () => {
    const { result } = setUp();
    expect(result.current.currentPage).toBe(1);
  });

  it('without params - shoud be 1', () => {
    const { result } = setUp();
    expect(result.current.currentPage).toBe(1);
  });

  it('with page 2 param - shoud be 2', () => {
    const { result } = setUp('?page=2');
    expect(result.current.currentPage).toBe(2);
  });

  it('first time with page 2 - shoud be 2', () => {
    const { result } = setUp('?page-545b33de-92cf-4747-969d-68851837b317=2');
    expect(result.current.currentPage).toBe(2);
  });
});

// it('should always return previous state after each update', () => {
//   const { result, rerender } = setUp();

//   rerender({ state: 2 });
//   expect(result.current).toBe(0);

//   rerender({ state: 4 });
//   expect(result.current).toBe(2);

//   rerender({ state: 6 });
//   expect(result.current).toBe(4);
// });
