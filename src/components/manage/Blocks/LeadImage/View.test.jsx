import React from 'react';
import renderer from 'react-test-renderer';
import View from './View';
import { ConfigContext } from '@plone/volto/components/theme/App/App';

test('renders a view image component', () => {
  const component = renderer.create(
    <ConfigContext.Provider
      value={{
        settings: {
          apiPath: 'http://localhost:8080/Plone',
        },
      }}
    >
      <View
        data={{}}
        properties={{
          image: {
            download: 'image.png',
          },
        }}
      />
    </ConfigContext.Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
