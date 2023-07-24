import { renderHook } from '@testing-library/react-hooks';
import { usePagination } from './usePagination';
import * as redux from 'react-redux';
import routeData from 'react-router';
import { slugify } from '@plone/volto/helpers/Utils/Utils';

const searchBlockId = '545b33de-92cf-4747-969d-68851837b317';
const searchBlockId2 = '454b33de-92cf-4747-969d-68851837b713';
const searchBlock = {
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
};
let state = {
  content: {
    data: {
      blocks: {
        [searchBlockId]: searchBlock,
      },
      blocks_layout: {
        items: [searchBlockId],
      },
    },
  },
};

let mockUseLocationValue = {
  pathname: '/testroute',
  search: '',
};

const setUp = (searchParam, numberOfSearches) => {
  mockUseLocationValue.search = searchParam;
  if (numberOfSearches > 1) {
    state.content.data.blocks[searchBlockId2] = searchBlock;
    state.content.data.blocks_layout.items.push(searchBlockId2);
  }
  return renderHook(({ id, defaultPage }) => usePagination(id, defaultPage), {
    initialProps: {
      id: searchBlockId,
      defaultPage: 1,
    },
  });
};

describe(`Tests for usePagination, for the block ${searchBlockId}`, () => {
  const useLocation = jest.spyOn(routeData, 'useLocation');
  const useHistory = jest.spyOn(routeData, 'useHistory');
  const useSelector = jest.spyOn(redux, 'useSelector');
  beforeEach(() => {
    useLocation.mockReturnValue(mockUseLocationValue);
    useHistory.mockReturnValue({ replace: jest.fn() });
    useSelector.mockImplementation((cb) => cb(state));
  });

  it('1 paginated block with id and defaultPage 1 - shoud be 1', () => {
    const { result } = setUp();
    expect(result.current.currentPage).toBe(1);
  });

  it('1 paginated block without params - shoud be 1', () => {
    const { result } = setUp();
    expect(result.current.currentPage).toBe(1);
  });

  const param1 = '?page=2';
  it(`1 paginated block with params: ${param1} - shoud be 2`, () => {
    const { result } = setUp(param1);
    expect(result.current.currentPage).toBe(2);
  });

  const param2 = `?${slugify(`page-${searchBlockId}`)}=2`;
  it(`2 paginated blocks with current block in the params: ${param2} - shoud be 2`, () => {
    const { result } = setUp(param2, 2);
    expect(result.current.currentPage).toBe(2);
  });

  const param3 = `?${slugify(`page-${searchBlockId2}`)}=2`;
  it(`2 paginated blocks with the other block in the params: ${param3} - shoud be 1`, () => {
    const { result } = setUp(param3, 2);
    expect(result.current.currentPage).toBe(1);
  });

  const param4 = `?${slugify(`page-${searchBlockId}`)}=2&${slugify(
    `page-${searchBlockId2}`,
  )}=1`;
  it(`2 paginated blocks with both blocks in the params, current 2: ${param4} - shoud be 2`, () => {
    const { result } = setUp(param4, 2);
    expect(result.current.currentPage).toBe(2);
  });

  const param5 = `?${slugify(`page-${searchBlockId}`)}=1&${slugify(
    `page-${searchBlockId2}`,
  )}=2`;
  it(`2 paginated blocks with both blocks in the params, current 1: ${param5} - shoud be 1`, () => {
    const { result } = setUp(param5, 2);
    expect(result.current.currentPage).toBe(1);
  });

  it(`2 paginated blocks with wrong page param: ${param1} - shoud be 1`, () => {
    const { result } = setUp(param1, 2);
    expect(result.current.currentPage).toBe(1);
  });
});
