import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { BlockViewProps } from '@plone/types';
import MapsBlockView from './MapsBlockView';

const makeProps = (data: Record<string, unknown>) =>
  ({
    data,
    blocksConfig: {},
    content: {},
    extensions: {},
    id: 'maps',
    location: {} as BlockViewProps['location'],
    history: {} as BlockViewProps['history'],
    intl: {} as BlockViewProps['intl'],
    properties: {},
    token: '',
    variation: {} as BlockViewProps['variation'],
    path: '/',
    className: '',
    style: {},
  }) as unknown as BlockViewProps;

describe('MapsBlockView', () => {
  it('renders nothing when url is missing', () => {
    const { container } = render(<MapsBlockView {...makeProps({})} />);

    expect(container.firstChild).toBeNull();
  });

  it('renders iframe with center alignment by default', () => {
    const props = makeProps({
      url: 'https://maps.google.com/?q=',
      title: 'Map Title',
    });

    const { container } = render(<MapsBlockView {...props} />);
    const iframe = screen.getByTitle('Map Title');

    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://maps.google.com/?q=');
    expect(
      container.querySelector('.maps.align.block.center'),
    ).toBeInTheDocument();
  });

  it('applies alignment classname', () => {
    const props = makeProps({
      url: 'https://maps.google.com/?q=cluj',
      title: 'map',
      align: 'right',
    });

    const { container } = render(<MapsBlockView {...props} />);

    expect(
      container.querySelector('.maps.align.block.right'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('.maps.align.block.center'),
    ).not.toBeInTheDocument();
  });
});
