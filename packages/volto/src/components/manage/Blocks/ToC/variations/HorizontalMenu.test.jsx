import { render } from '@testing-library/react';
import HorizontalMenu from './HorizontalMenu';

const data = { '@type': 'toc', variation: 'horizontalMenu' };

const renderToc = (tocEntries) =>
  render(<HorizontalMenu data={data} tocEntries={tocEntries} />);

test('links to the anchor provided by the block', () => {
  const { getAllByRole } = renderToc([
    {
      level: 2,
      title: 'Everything is not okay',
      items: [],
      id: 'block-id-0',
      anchor: 'subtitle-everything-is-not-okay',
    },
  ]);

  expect(getAllByRole('link')[0]).toHaveAttribute(
    'href',
    '#subtitle-everything-is-not-okay',
  );
});

test('slugs the title of blocks that provide no anchor', () => {
  const { getAllByRole } = renderToc([
    {
      level: 2,
      title: 'Everything is okay',
      items: [],
      id: 'block-id-0',
    },
  ]);

  expect(getAllByRole('link')[0]).toHaveAttribute(
    'href',
    '#everything-is-okay',
  );
});
