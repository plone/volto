import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BooleanWidget } from './BooleanWidget';

describe('BooleanWidget', () => {
  it('renders the schema label', () => {
    render(
      <BooleanWidget
        name="allow_discussion"
        label="Allow discussion"
        value={false}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Allow discussion')).toBeInTheDocument();
  });

  it('maps the boolean value to the checkbox selected state', () => {
    render(
      <BooleanWidget
        name="exclude_from_nav"
        label="Exclude from navigation"
        value
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('emits normalized boolean values', () => {
    const onChange = vi.fn();

    render(
      <BooleanWidget
        name="is_folderish"
        label="Folderish"
        value={false}
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByRole('checkbox'));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('renders description and validation messages', () => {
    render(
      <BooleanWidget
        name="confirm"
        label="Confirm"
        value={false}
        onChange={vi.fn()}
        description="Confirm before publishing."
        errors={['This field is required.']}
      />,
    );

    expect(screen.getByText('Confirm before publishing.')).toBeInTheDocument();
    expect(screen.getByText('This field is required.')).toBeInTheDocument();
  });
});
