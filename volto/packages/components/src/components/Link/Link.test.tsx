import React from 'react';
import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Link } from './Link';

expect.extend(toHaveNoViolations);

it('Link basic a11y test', async () => {
  const { container } = render(<Link href="/">The link</Link>);

  const asd = screen.getByText('The link');
  expect(asd).toHaveAttribute('href', '/');

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
