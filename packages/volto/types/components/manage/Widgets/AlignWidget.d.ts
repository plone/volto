import { type ActionInfo, type ButtonsWidgetProps } from './ButtonsWidget';
import type { IntlShape } from 'react-intl';
export declare const defaultActionsInfo: ({ intl, }: {
    intl: IntlShape;
}) => Record<string, ActionInfo>;
type AlignWidgetProps = ButtonsWidgetProps & {
    defaultAction?: string;
};
declare const AlignWidget: (props: AlignWidgetProps) => import("react/jsx-runtime").JSX.Element;
export default AlignWidget;
