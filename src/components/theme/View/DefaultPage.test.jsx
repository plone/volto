import React from 'react';
import DefaultPage from './DefaultPage';
import { shallow } from 'enzyme';

test('renders a document default page component', () => {
  const component = shallow(
    <DefaultPage />);
});
