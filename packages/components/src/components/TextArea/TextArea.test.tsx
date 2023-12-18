import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import TextArea from './TextArea';

expect.extend(toHaveNoViolations);

it('TextArea basic a11y test', async () => {
  const { container } = render(
    <TextArea
      name="field1"
      title="field 1 title"
      placeholder="Type something…"
      description="Optional help text"
      isRequired
    />,
  );

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
