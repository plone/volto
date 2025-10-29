import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import BlockWidth from './BlockWidth';
import type { ButtonsWidgetProps } from './ButtonsWidget';

const mockStore = configureStore();

const renderWidget = (props: Partial<ButtonsWidgetProps> = {}) => {
  const onChange = props.onChange ?? vi.fn();
  const widgetProps: ButtonsWidgetProps = {
    id: 'blockWidth',
    title: 'Block width',
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
        <BlockWidth {...widgetProps} />
      </Provider>,
    ),
  };
};

describe('BlockWidth', () => {
  it('renders the default action buttons provided by the widget', () => {
    renderWidget();

    expect(screen.getByRole('radio', { name: 'Narrow' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Default' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Layout' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Full' })).toBeInTheDocument();
  });

  it('emits the correct value for the default actions', () => {
    const { onChange } = renderWidget();

    fireEvent.click(screen.getByRole('radio', { name: 'Layout' }));

    expect(onChange).toHaveBeenCalledWith('blockWidth', {
      '--block-width': 'var(--layout-container-width)',
    });
  });
});
