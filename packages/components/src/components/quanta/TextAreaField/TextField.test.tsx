import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { QuantaTextAreaField } from './TextAreaField';

expect.extend(toHaveNoViolations);

it('QuantaTextAreaField basic a11y test', async () => {
  const { container } = render(
    <QuantaTextAreaField
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
