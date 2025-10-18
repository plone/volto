import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ImageView from './ImageView';
import { vi } from 'vitest';

expect.extend(toHaveNoViolations);

vi.mock('react-router', () => ({
  useFetcher: vi.fn(() => ({
    data: { results: { items: [] }, breadcrumbs: { items: [] } },
    state: 'idle',
    load: vi.fn(),
  })),
  useRouteLoaderData: vi.fn(() => ({
    content: {
      title: 'My image',
      description: 'That is a nice image.',
      image: {
        download: 'http://somewhere/image.jpg',
        size: 1200000,
      },
    },
  })),
}));

it('ImageView basic test', async () => {
  await import('react-router');
  const { container } = render(<ImageView />);

  const results = await axe(container);

  expect(results).toHaveNoViolations();
  const link = screen.getByRole('link');
  expect(link.getAttribute('href')).toBe('http://somewhere/image.jpg');
  const img = link.getElementsByTagName('img')[0];
  expect(img.getAttribute('src')).toBe('http://somewhere/image.jpg');
});
