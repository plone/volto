import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('renders no pagination when only 1 page', () => {
    const component = renderer.create(
      <Pagination current={1} total={1} onChangePage={x => x} />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders page size options when specified', () => {
    const component = renderer.create(
      <Pagination
        pageSize={15}
        pageSizes={[15, 30, 50]}
        onChangePageSize={x => x}
        current={1}
        total={1}
        onChangePage={x => x}
      />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders pagination when multiple pages are specified', () => {
    const component = renderer.create(
      <Pagination current={6} total={12} onChangePage={x => x} />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
