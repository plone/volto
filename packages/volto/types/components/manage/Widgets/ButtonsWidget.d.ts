import React from 'react';
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
declare const ButtonsWidget: (props: ButtonsWidgetProps) => import("react/jsx-runtime").JSX.Element;
export default ButtonsWidget;
