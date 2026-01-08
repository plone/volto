import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { vi } from 'vitest';
import NewsItemView from './NewsItemView';

expect.extend(toHaveNoViolations);

vi.mock('react-router', () => ({
  useFetcher: vi.fn(() => ({
    data: { results: { items: [] }, breadcrumbs: { items: [] } },
    state: 'idle',
    load: vi.fn(),
  })),
  useRouteLoaderData: vi.fn(() => ({
    content: {
      title: 'My news item',
      description: 'This is a news item.',
    },
  })),
}));

it('NewsItemView basic test', async () => {
  await import('react-router');
  const { container } = render(<NewsItemView />);

  const results = await axe(container);

  expect(results).toHaveNoViolations();
  const title = screen.getByRole('heading', { level: 1 });
  expect(title).toHaveTextContent('My news item');
  const description = screen.getByText(/This is a news item\./i);
  expect(description).toBeInTheDocument();
});
