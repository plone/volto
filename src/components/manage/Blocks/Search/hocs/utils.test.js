import { getSort } from './utils';

describe('getSort to extracting sorting values for search block', () => {
  it('uses old sortOn values', () => {
    const res = getSort({ sortOn: 'created', sortOrder: 'ascending' });

    expect(res).toStrictEqual({ sortOn: 'created', sortOrder: 'ascending' });
  });

  it('can take next state sort values', () => {
    const res = getSort({
      sortOn: 'created',
      sortOrder: 'ascending',
      toSortOn: 'effective',
      toSortOrder: 'descending',
    });

    expect(res).toStrictEqual({ sortOn: 'effective', sortOrder: 'descending' });
  });

  it('can take searchedText', () => {
    const res = getSort({
      sortOn: 'created',
      sortOrder: 'ascending',
      toSortOn: 'effective',
      toSortOrder: 'descending',
      searchedText: 'something',
    });

    expect(res).toStrictEqual({ sortOn: 'effective', sortOrder: 'descending' });
  });

  it('does not resets sortOn and sortOrder when search text is unchanged', () => {
    const res = getSort({
      sortOn: 'created',
      sortOrder: 'ascending',
      toSortOn: 'effective',
      toSortOrder: 'descending',
      searchedText: 'something',
    });

    expect(res).toStrictEqual({ sortOn: 'effective', sortOrder: 'descending' });
  });

  it('resets sortOn and sortOrder when search text is changed', () => {
    const res = getSort({
      sortOn: 'created',
      sortOrder: 'ascending',
      toSortOn: 'effective',
      toSortOrder: 'descending',
      searchedText: 'something',
      toSearchText: 'else',
    });

    expect(res).toStrictEqual({ sortOn: '', sortOrder: '' });
  });
});
