import { defineMessages, useIntl } from 'react-intl';
import ButtonsWidget, {
  type ActionInfo,
  type ButtonsWidgetProps,
} from './ButtonsWidget';
import type { IntlShape } from 'react-intl';
import type { StyleDefinition } from '@plone/types';

const messages = defineMessages({
  s: {
    id: 'Small',
    defaultMessage: 'Small',
  },
  m: {
    id: 'Medium',
    defaultMessage: 'Medium',
  },
  l: {
    id: 'Large',
    defaultMessage: 'Large',
  },
});

export const defaultActionsInfo = ({
  intl,
}: {
  intl: IntlShape;
}): Record<string, ActionInfo> => ({
  s: ['S', intl.formatMessage(messages.s)],
  m: ['M', intl.formatMessage(messages.m)],
  l: ['L', intl.formatMessage(messages.l)],
});

const DEFAULT_ACTIONS: StyleDefinition[] = [
  {
    name: 's',
    label: 'Small',
    style: undefined,
  },
  {
    name: 'm',
    label: 'Medium',
    style: undefined,
  },
  {
    name: 'l',
    label: 'Large',
    style: undefined,
  },
];

const SizeWidget = (props: ButtonsWidgetProps) => {
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

export default SizeWidget;
