import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Select from './Select';
import { SelectItem } from './SelectItem';

expect.extend(toHaveNoViolations);

it('Select basic a11y test', async () => {
  const items = [
    { label: '1', value: 'Aerospace' },
    { label: '2', value: 'Mechanical' },
    { label: '3', value: 'Civil' },
    { label: '4', value: 'Biomedical' },
    { label: '5', value: 'Nuclear' },
    { label: '6', value: 'Industrial' },
    { label: '7', value: 'Chemical' },
    { label: '8', value: 'Agricultural' },
    { label: '9', value: 'Electrical' },
    { label: '10', value: 'Telco' },
  ];

  const { container } = render(
    <Select
      name="field1"
      title="field 1 title"
      placeholder="Select…"
      description="Optional help text"
      isRequired
      items={items}
    >
      {(item) => <SelectItem id={item.label}>{item.value}</SelectItem>}
    </Select>,
  );
  screen.getByText('Select…');

  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
