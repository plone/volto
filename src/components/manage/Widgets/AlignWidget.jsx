import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import ButtonsWidget from './ButtonsWidget';
import imageLeftSVG from '@plone/volto/icons/image-left.svg';
import imageRightSVG from '@plone/volto/icons/image-right.svg';
import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageNarrowSVG from '@plone/volto/icons/image-narrow.svg';
import imageWideSVG from '@plone/volto/icons/image-wide.svg';
import imageFullSVG from '@plone/volto/icons/image-full.svg';

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

export const defaultActionsInfo = ({ intl }) => ({
  left: [imageLeftSVG, intl.formatMessage(messages.left)],
  right: [imageRightSVG, intl.formatMessage(messages.right)],
  center: [imageFitSVG, intl.formatMessage(messages.center)],
  narrow: [imageNarrowSVG, intl.formatMessage(messages.narrow)],
  wide: [imageWideSVG, intl.formatMessage(messages.wide)],
  full: [imageFullSVG, intl.formatMessage(messages.full)],
});

const AlignWidget = (props) => {
  const intl = useIntl();

  const {
    actions = ['left', 'right', 'center', 'full'],
    actionsInfoMap,
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
      defaultAction={props.defaultAction || 'center'}
    />
  );
};

export default AlignWidget;
