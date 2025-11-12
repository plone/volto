import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Size from './Size';
import type { ButtonsWidgetProps } from './ButtonsWidget';

const mockStore = configureStore();

const renderWidget = (props: Partial<ButtonsWidgetProps> = {}) => {
  const onChange = props.onChange ?? vi.fn();
  const widgetProps: ButtonsWidgetProps = {
    id: 'size',
    title: 'Size',
    fieldSet: 'default',
    onChange,
    value: undefined,
    default: undefined,
    disabled: false,
    isDisabled: false,
    ...props,
  };

  return {
    onChange,
    ...render(
      <Provider
        store={mockStore({
          intl: {
            locale: 'en',
            messages: {},
          },
        })}
      >
        <Size {...widgetProps} />
      </Provider>,
    ),
  };
};

describe('Size widget', () => {
  it('renders the default size options', () => {
    renderWidget();

    expect(screen.getByRole('radio', { name: 'Small' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Medium' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Large' })).toBeInTheDocument();
  });

  it('returns the selected size name', () => {
    const { onChange } = renderWidget();

    fireEvent.click(screen.getByRole('radio', { name: 'Medium' }));

    expect(onChange).toHaveBeenCalledWith('size', 'm');
  });
});
