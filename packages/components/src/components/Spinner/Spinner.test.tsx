import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Spinner } from './Spinner';

expect.extend(toHaveNoViolations);

it('Spinner basic a11y test', async () => {
  const { container } = render(<Spinner />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
  expect(screen.getByRole('status')).toBeInTheDocument();
});

it('Spinner decorative mode is hidden from assistive tech', () => {
  render(<Spinner isDecorative data-testid="spinner" />);
  expect(screen.getByTestId('spinner')).toHaveAttribute('aria-hidden', 'true');
});
