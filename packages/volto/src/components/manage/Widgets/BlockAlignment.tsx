import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import ButtonsWidget, {
  type ActionInfo,
  type ButtonsWidgetProps,
} from './ButtonsWidget';
import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageLeftSVG from '@plone/volto/icons/image-left.svg';
import imageRightSVG from '@plone/volto/icons/image-right.svg';
import type { IntlShape } from 'react-intl';
import type { StyleDefinition } from '@plone/types';

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
});

export const defaultActionsInfo = ({
  intl,
}: {
  intl: IntlShape;
}): Record<string, ActionInfo> => ({
  left: [imageLeftSVG, intl.formatMessage(messages.left)],
  right: [imageRightSVG, intl.formatMessage(messages.right)],
  center: [imageFitSVG, intl.formatMessage(messages.center)],
});

const DEFAULT_ACTIONS: StyleDefinition[] = [
  {
    style: {
      '--block-alignment': 'var(--align-left)',
    },
    name: 'left',
    label: 'Left',
  },
  {
    style: {
      '--block-alignment': 'var(--align-center)',
    },
    name: 'center',
    label: 'Center',
  },
  {
    style: {
      '--block-alignment': 'var(--align-right)',
    },
    name: 'right',
    label: 'Right',
  },
];

const BlockAlignmentWidget = (props: ButtonsWidgetProps) => {
  const intl = useIntl();

  const { actions = DEFAULT_ACTIONS, actionsInfoMap, filterActions } = props;
  const filteredActions =
    filterActions && filterActions.length > 0
      ? actions.filter((action) => {
          const actionName = typeof action === 'string' ? action : action.name;
          return filterActions.includes(actionName);
        })
      : actions;

  const actionsInfo = {
    ...defaultActionsInfo({ intl }),
    ...actionsInfoMap,
  };

  return (
    <ButtonsWidget
      {...props}
      actions={filteredActions}
      actionsInfoMap={actionsInfo}
    />
  );
};

export default BlockAlignmentWidget;
