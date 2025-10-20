import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { vi } from 'vitest';
import FileView from './FileView';

expect.extend(toHaveNoViolations);

vi.mock('react-router', () => ({
  useFetcher: vi.fn(() => ({
    data: { results: { items: [] }, breadcrumbs: { items: [] } },
    state: 'idle',
    load: vi.fn(),
  })),
  useRouteLoaderData: vi.fn(() => ({
    content: {
      title: 'My file',
      description: 'This is a file.',
      file: {
        download: 'http://somewhere/file.pdf',
        filename: 'file.pdf',
        size: 10000,
      },
    },
  })),
}));

it('FileView basic test', async () => {
  await import('react-router');
  const { container } = render(<FileView />);

  const results = await axe(container);

  expect(results).toHaveNoViolations();
  const title = screen.getByRole('heading', { level: 1 });
  expect(title).toHaveTextContent('My file');
  const description = screen.getByText(/This is a file\./i);
  expect(description).toBeInTheDocument();
  const link = screen.getByRole('link', { name: /file\.pdf/i });
  expect(link).toHaveAttribute('href', 'http://somewhere/file.pdf');
  expect(link).toHaveTextContent(/file\.pdf/i);
});
