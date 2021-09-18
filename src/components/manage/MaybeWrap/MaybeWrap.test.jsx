import React from 'react';
import { render } from '@testing-library/react';

import MaybeWrap from './MaybeWrap';

describe('<MaybeWrap />', () => {
  it('renders the component wrapped in the specified component', () => {
    const Component = (props) => (
      <div className={props.className}>{props.children}</div>
    );

    const { container } = render(
      <MaybeWrap condition as={Component} className="the-classname">
        Text
      </MaybeWrap>,
    );

    expect(container).toMatchSnapshot();
  });
  it('renders the component not wrapped (condition false)', () => {
    const Component = (props) => (
      <div className={props.className}>{props.children}</div>
    );

    const { container } = render(
      <MaybeWrap condition={false} as={Component} className="the-classname">
        Text
      </MaybeWrap>,
    );

    expect(container).toMatchSnapshot();
  });
});
