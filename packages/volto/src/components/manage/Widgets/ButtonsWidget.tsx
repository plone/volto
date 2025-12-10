import React from 'react';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { Radio, RadioGroup } from '@plone/components';
import isEqual from 'lodash/isEqual';
import type { StyleDefinition } from '@plone/types';

/**
 * A tuple that has an icon in the first element and a i18n string in the second.
 */
export type ActionInfo = [React.ReactElement<any>, string] | [string, string];

type ActionValue = string | Record<`--${string}`, string>;

export type ButtonsWidgetProps = {
  /**
   * Unique identifier for the widget.
   */
  id: string;

  /**
   * Callback function to handle changes.
   */
  onChange: (id: string, value: ActionValue) => void;

  /**
   * List of actions available for the widget.
   */
  actions?: Array<StyleDefinition | string>;

  /**
   * Map containing additional the information (icon and i18n string) for each action.
   */
  actionsInfoMap?: Record<string, ActionInfo>;

  /**
   * List of actions to be filtered out. In case that we don't want the default ones
   * we can filter them out.
   */
  filterActions?: string[];

  /**
   * Current value of the widget.
   */
  value?: ActionValue;

  /**
   * Default value of the widget.
   */
  default?: ActionValue;

  /**
   * Indicates if the widget is disabled.
   */
  disabled?: boolean;

  /**
   * Indicates if the widget is disabled (alternative flag for compatibility reasons).
   */
  isDisabled?: boolean;
  [key: string]: any;
};

type NormalizedAction = {
  name: string;
  value: ActionValue;
};

const ButtonsWidget = (props: ButtonsWidgetProps) => {
  const {
    disabled,
    id,
    onChange,
    actions = [],
    actionsInfoMap,
    value,
    isDisabled,
    default: defaultValue,
  } = props;

  const normalizedActions: NormalizedAction[] = actions.map((action) =>
    typeof action === 'string'
      ? { name: action, value: action }
      : {
          name: action.name,
          value: action.style ?? action.name,
        },
  );

  const selectedActionName = normalizedActions.find((action) =>
    isEqual(value, action.value),
  )?.name;

  const defaultSelectedActionName = (() => {
    if (!defaultValue) {
      return undefined;
    }

    if (typeof defaultValue === 'string') {
      const matchedByName = normalizedActions.find(
        ({ name }) => name === defaultValue,
      );

      if (matchedByName) {
        return matchedByName.name;
      }
    }

    return normalizedActions.find(({ value: actionValue }) =>
      isEqual(defaultValue, actionValue),
    )?.name;
  })();

  const radioGroupValueProps: {
    value?: string;
    defaultValue?: string;
  } = selectedActionName
    ? { value: selectedActionName }
    : defaultSelectedActionName
      ? { defaultValue: defaultSelectedActionName }
      : {};

  const handleChange = (selectedName: string) => {
    const selectedAction = normalizedActions.find(
      ({ name }) => name === selectedName,
    );

    if (selectedAction) {
      onChange(id, selectedAction.value);
    }
  };

  return (
    <FormFieldWrapper {...props} className="widget">
      <RadioGroup
        aria-label={props.title || props.label || id}
        orientation="horizontal"
        {...radioGroupValueProps}
        onChange={handleChange}
        isDisabled={disabled || isDisabled}
        className="buttons buttons-widget"
      >
        {normalizedActions.map((action) => {
          const actionInfo = actionsInfoMap?.[action.name];
          const [iconOrText, ariaLabel] = actionInfo ?? [
            action.name,
            action.name,
          ];

          return (
            <Radio
              key={action.name}
              aria-label={ariaLabel}
              value={action.name}
              className="buttons-widget-option"
            >
              {typeof iconOrText === 'string' ? (
                <div className="image-sizes-text">{iconOrText}</div>
              ) : (
                <Icon
                  // TODO: Refactor Icon component and type it correctly
                  name={iconOrText as any}
                  title={ariaLabel || action.name}
                  size="24px"
                  ariaHidden={true}
                />
              )}
            </Radio>
          );
        })}
      </RadioGroup>
    </FormFieldWrapper>
  );
};

export default ButtonsWidget;
