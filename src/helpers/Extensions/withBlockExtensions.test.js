import React from 'react';
import withBlockExtensions from './withBlockExtensions';
import config from '@plone/volto/registry';
import { render } from '@testing-library/react';

beforeAll(() => {
  config.blocks.blocksConfig = {
    ...config.blocks.blocksConfig,
    testBlock: {
      id: 'testBlock',
      extensions: {
        variation: {
          items: [
            {
              id: 'default',
              title: 'Default',
              isDefault: true,
            },
            {
              id: 'extra',
              title: 'Extra',
            },
          ],
        },
        colRender: {
          items: [
            {
              id: 'small',
              isDefault: true,
            },
          ],
        },
      },
    },
  };
});

describe('withBlockExtensions', () => {
  const Block = (props) => {
    return (
      <>
        <div>{JSON.stringify(props.variation)}</div>
        <div>{JSON.stringify(props.colRender)}</div>
      </>
    );
  };
  it('injects extensions as props', () => {
    const ExtendedBlock = withBlockExtensions(Block);
    const data = { '@type': 'testBlock' };
    const { container } = render(<ExtendedBlock data={data} />);
    expect(container).toMatchSnapshot();
  });

  it('resolve extensions according to data', () => {
    const ExtendedBlock = withBlockExtensions(Block);
    const data = { '@type': 'testBlock', variation: 'extra' };
    const { container } = render(<ExtendedBlock data={data} />);
    expect(container).toMatchSnapshot();
  });
});
