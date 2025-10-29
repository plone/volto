import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import BlockAlignment from './BlockAlignment';
import type { ButtonsWidgetProps } from './ButtonsWidget';

const mockStore = configureStore();

const renderWidget = (props: Partial<ButtonsWidgetProps> = {}) => {
  const { onChange: providedOnChange, ...restProps } = props;
  const onChange = providedOnChange ?? vi.fn();
  const widgetProps: ButtonsWidgetProps = {
    id: 'alignment',
    title: 'Block alignment',
    fieldSet: 'default',
    onChange,
    value: undefined,
    default: undefined,
    disabled: false,
    isDisabled: false,
    ...restProps,
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
        <BlockAlignment {...widgetProps} />
      </Provider>,
    ),
  };
};

describe('BlockAlignment', () => {
  it('renders default alignment buttons', () => {
    renderWidget();

    expect(screen.getByRole('radio', { name: 'Left' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Center' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Right' })).toBeInTheDocument();
  });

  it('filters actions when filterActions is provided', () => {
    renderWidget({ filterActions: ['center'] });

    expect(screen.getByRole('radio', { name: 'Center' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Left' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Right' }),
    ).not.toBeInTheDocument();
  });

  it('merges custom actions info map entries', () => {
    renderWidget({
      actions: ['left', 'custom'],
      actionsInfoMap: {
        custom: ['Custom', 'Custom alignment'],
      },
    });

    expect(screen.getByRole('radio', { name: 'Left' })).toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: 'Custom alignment' }),
    ).toBeInTheDocument();
  });

  it('renders when style definitions are provided as actions', () => {
    renderWidget({
      actions: [
        {
          name: 'wide',
          label: 'Wide',
          style: {
            '--block-alignment': 'var(--align-wide)',
          },
        },
      ],
    });

    expect(screen.getByRole('radio', { name: 'wide' })).toBeInTheDocument();
  });

  it('invokes onChange with styles when default actions are used', () => {
    const { onChange } = renderWidget();

    fireEvent.click(screen.getByRole('radio', { name: 'Center' }));

    expect(onChange).toHaveBeenCalledWith('alignment', {
      '--block-alignment': 'var(--align-center)',
    });
  });
});
