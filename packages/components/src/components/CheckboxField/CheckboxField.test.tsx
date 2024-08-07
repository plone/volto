import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CheckboxField } from './CheckboxField';

expect.extend(toHaveNoViolations);

it('CheckboxField basic a11y test', async () => {
  const { container } = render(
    <CheckboxField
      name="field1"
      label="field 1 title"
      description="Optional help text"
      isRequired
    />,
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
