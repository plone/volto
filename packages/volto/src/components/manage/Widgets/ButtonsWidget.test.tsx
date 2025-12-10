import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import imageFullSVG from '@plone/volto/icons/image-full.svg';
import textJustifiedSVG from '@plone/volto/icons/align-justify.svg';
import textCenteredSVG from '@plone/volto/icons/align-center.svg';
import textLeftSVG from '@plone/volto/icons/align-left.svg';
import textRightSVG from '@plone/volto/icons/align-right.svg';

import ButtonsWidget from './ButtonsWidget';

const mockStore = configureStore();

const renderWidget = (ui: React.ReactElement) =>
  render(
    <Provider
      store={mockStore({
        intl: {
          locale: 'en',
          messages: {},
        },
      })}
    >
      {ui}
    </Provider>,
  );

describe('ButtonsWidget', () => {
  it('renders string-based actions', () => {
    const { asFragment } = renderWidget(
      <ButtonsWidget
        id="align"
        title="Alignment"
        fieldSet="default"
        onChange={() => {}}
        actions={['left', 'right', 'centered', 'justified']}
        actionsInfoMap={{
          left: [textLeftSVG, 'Text Left'],
          right: [textRightSVG, 'Text Right'],
          justified: [textJustifiedSVG, 'Text Justified'],
          centered: [textCenteredSVG, 'Text Centered'],
        }}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('renders actions info provided via props', () => {
    const { asFragment } = renderWidget(
      <ButtonsWidget
        id="align"
        title="Alignment"
        fieldSet="default"
        onChange={() => {}}
        actions={['additional']}
        actionsInfoMap={{
          additional: [imageFullSVG, 'Additional action title'],
        }}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('falls back to the action name when no info map entry is present', () => {
    renderWidget(
      <ButtonsWidget
        id="align"
        title="Alignment"
        fieldSet="default"
        onChange={() => {}}
        actions={['missing']}
      />,
    );

    expect(screen.getByRole('radio', { name: 'missing' })).toBeInTheDocument();
  });

  it('normalizes style definitions when an action is pressed', () => {
    const handleChange = vi.fn();

    renderWidget(
      <ButtonsWidget
        id="align"
        title="Alignment"
        fieldSet="default"
        onChange={handleChange}
        actions={[
          {
            name: 'wide',
            label: 'Wide',
            style: {
              '--layout-width': 'wide',
            },
          },
        ]}
        actionsInfoMap={{
          wide: ['Wide', 'Wide width'],
        }}
      />,
    );

    fireEvent.click(screen.getByRole('radio', { name: 'Wide width' }));

    expect(handleChange).toHaveBeenCalledWith('align', {
      '--layout-width': 'wide',
    });
  });

  it('selects default value from string names', () => {
    renderWidget(
      <ButtonsWidget
        id="align"
        title="Alignment"
        fieldSet="default"
        onChange={() => {}}
        actions={[
          {
            name: 'justified',
            label: 'Justified',
            style: {
              '--layout-width': 'wide',
            },
          },
        ]}
        default="justified"
        actionsInfoMap={{
          justified: [textJustifiedSVG, 'Text Justified'],
        }}
      />,
    );

    expect(screen.getByRole('radio', { name: 'Text Justified' })).toBeChecked();
  });
});
