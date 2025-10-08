import React from 'react';
import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Button } from './Button';

expect.extend(toHaveNoViolations);

it('Button basic a11y test', async () => {
  const { container } = render(<Button>The button</Button>);

  const button = screen.getByText('The button');
  expect(button).toHaveRole('button');

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
