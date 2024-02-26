import React from 'react';
import renderer from 'react-test-renderer';

import SocialSharing from './SocialSharing';

describe('SocialSharing', () => {
  it('renders a social sharing component', () => {
    const component = renderer.create(
      <SocialSharing url="someurl" title="Title" description="Description" />,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
