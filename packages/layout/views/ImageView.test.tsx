import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ImageView from './ImageView';
import { vi, expect, it } from 'vitest';

expect.extend(toHaveNoViolations);

vi.mock('react-router', () => ({
  useFetcher: vi.fn(() => ({
    data: { results: { items: [] }, breadcrumbs: { items: [] } },
    state: 'idle',
    load: vi.fn(),
  })),
  useRouteLoaderData: vi.fn(() => ({
    content: {
      '@id': '/image.jpg',
      title: 'My image',
      description: 'That is a nice image.',
      image: {
        download: '/image.jpg/@@images/image.jpg',
        size: 1200000,
        width: 1920,
        height: 1080,
        scales: [],
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
  expect(link.getAttribute('href')).toBe('/image.jpg/@@images/image.jpg');
  const img = link.getElementsByTagName('img')[0];
  expect(img.getAttribute('src')).toBe('/image.jpg/@@images/image.jpg');
});
