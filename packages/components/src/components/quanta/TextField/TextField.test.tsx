import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { QuantaTextField } from './TextField';

expect.extend(toHaveNoViolations);

it('QuantaTextField basic a11y test', async () => {
  const { container } = render(
    <QuantaTextField
      name="field1"
      label="field 1 title"
      placeholder="Type something…"
      description="Optional help text"
      isRequired
    />,
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
