import React from 'react';
import { type ActionInfo, type ButtonsWidgetProps } from './ButtonsWidget';
import type { IntlShape } from 'react-intl';
export declare const defaultActionsInfo: ({ intl, }: {
    intl: IntlShape;
}) => Record<string, ActionInfo>;
declare const BlockAlignmentWidget: (props: ButtonsWidgetProps) => React.JSX.Element;
export default BlockAlignmentWidget;
