import React from 'react';
import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Link } from './Link.quanta';

expect.extend(toHaveNoViolations);

it('Link basic a11y test', async () => {
  const { container } = render(<Link href="/">The link</Link>);

  const asd = screen.getByText('The link');
  expect(asd).toHaveAttribute('href', '/');

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});

it('Link asButton a11y test', async () => {
  const { container } = render(
    <Link asButton variant="primary" accent href="/">
      The link as button
    </Link>,
  );

  const asd = screen.getByText('The link as button');
  expect(asd).toHaveAttribute('href', '/');

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
