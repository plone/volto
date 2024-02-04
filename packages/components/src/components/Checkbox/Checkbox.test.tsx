import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Checkbox from './Checkbox';

expect.extend(toHaveNoViolations);

it('Checkbox basic a11y test', async () => {
  const { container } = render(
    <Checkbox
      name="field1"
      title="field 1 title"
      description="Optional help text"
      isRequired
    />,
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
