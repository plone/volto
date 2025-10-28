import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import imageFullSVG from '@plone/volto/icons/image-full.svg';

import AlignWidget from './AlignWidget';
import type { ButtonsWidgetProps } from './ButtonsWidget';

const mockStore = configureStore();

const renderAlignWidget = (
  props: Partial<ButtonsWidgetProps> = {},
): {
  onChange: ButtonsWidgetProps['onChange'];
  asFragment: () => DocumentFragment;
} => {
  const { onChange: providedOnChange, ...restProps } = props;
  const onChange = providedOnChange ?? vi.fn();
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const widgetProps: ButtonsWidgetProps = {
    id: 'align',
    title: 'Alignment',
    fieldSet: 'default',
    onChange,
    value: undefined,
    default: undefined,
    disabled: false,
    isDisabled: false,
    ...restProps,
  };

  const rendered = render(
    <Provider store={store}>
      <AlignWidget {...widgetProps} />
    </Provider>,
  );

  return {
    onChange,
    asFragment: rendered.asFragment,
  };
};

describe('AlignWidget', () => {
  it('renders with default actions', () => {
    const { asFragment } = renderAlignWidget();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with custom actions', () => {
    const { asFragment } = renderAlignWidget({
      actions: ['additional'],
      actionsInfoMap: {
        additional: [imageFullSVG, 'Additional action title'],
      },
    });

    expect(asFragment()).toMatchSnapshot();
  });

  it('uses defaultAction when value is missing', () => {
    const { onChange } = renderAlignWidget({
      defaultAction: 'left',
    });

    expect(onChange).toHaveBeenCalledWith('align', 'left');
  });

  it('uses default when value is missing', () => {
    const { onChange } = renderAlignWidget({
      default: 'left',
    });

    expect(onChange).toHaveBeenCalledWith('align', 'left');
  });

  it('does not override provided value with default', () => {
    const { onChange } = renderAlignWidget({
      default: 'left',
      value: 'center',
    });

    expect(onChange).not.toHaveBeenCalledWith('align', 'left');
  });
});
