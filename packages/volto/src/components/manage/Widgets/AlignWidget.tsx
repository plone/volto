import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import ButtonsWidget, {
  type ActionInfo,
  type ButtonsWidgetProps,
} from './ButtonsWidget';
import imageLeftSVG from '@plone/volto/icons/image-left.svg';
import imageRightSVG from '@plone/volto/icons/image-right.svg';
import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageNarrowSVG from '@plone/volto/icons/image-narrow.svg';
import imageWideSVG from '@plone/volto/icons/image-wide.svg';
import imageFullSVG from '@plone/volto/icons/image-full.svg';
import type { IntlShape } from 'react-intl';

const messages = defineMessages({
  left: {
    id: 'Left',
    defaultMessage: 'Left',
  },
  right: {
    id: 'Right',
    defaultMessage: 'Right',
  },
  center: {
    id: 'Center',
    defaultMessage: 'Center',
  },
  narrow: {
    id: 'Narrow',
    defaultMessage: 'Narrow',
  },
  wide: {
    id: 'Wide',
    defaultMessage: 'Wide',
  },
  full: {
    id: 'Full',
    defaultMessage: 'Full',
  },
});

export const defaultActionsInfo = ({
  intl,
}: {
  intl: IntlShape;
}): Record<string, ActionInfo> => ({
  left: [imageLeftSVG, intl.formatMessage(messages.left)],
  center: [imageFitSVG, intl.formatMessage(messages.center)],
  right: [imageRightSVG, intl.formatMessage(messages.right)],
  narrow: [imageNarrowSVG, intl.formatMessage(messages.narrow)],
  wide: [imageWideSVG, intl.formatMessage(messages.wide)],
  full: [imageFullSVG, intl.formatMessage(messages.full)],
});

type AlignWidgetProps = ButtonsWidgetProps & {
  defaultAction?: string;
};

const AlignWidget = (props: AlignWidgetProps) => {
  const intl = useIntl();

  const {
    actions = ['left', 'center', 'right', 'full'],
    actionsInfoMap,
    default: defaultValue,
    defaultAction,
  } = props;

  const actionsInfo = {
    ...defaultActionsInfo({ intl }),
    ...actionsInfoMap,
  };

  return (
    <ButtonsWidget
      {...props}
      actions={actions}
      actionsInfoMap={actionsInfo}
      default={defaultValue ?? defaultAction ?? 'center'}
    />
  );
};

export default AlignWidget;
