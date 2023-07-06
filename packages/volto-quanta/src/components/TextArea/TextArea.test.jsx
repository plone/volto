import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import TextArea from './TextArea';

expect.extend(toHaveNoViolations);

it('should demonstrate this matcher`s usage with react testing library', async () => {
  const { container } = render(
    <TextArea
      id="field1"
      title="field 1 title"
      placeholder="Type something…"
      description="Optional help text"
      required
    />,
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
