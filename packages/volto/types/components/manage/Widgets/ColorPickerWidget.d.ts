type Color = {
    name: string;
    label: string;
    style: Record<`--${string}`, string>;
} | {
    name: string;
    label: string;
    style: undefined;
};
export type ColorPickerWidgetProps = {
    id: string;
    title: string;
    value?: string;
    default?: string | object;
    required?: boolean;
    missing_value?: unknown;
    className?: string;
    onChange: (id: string, value: any) => void;
    colors: Color[];
};
declare const ColorPickerWidget: (props: ColorPickerWidgetProps) => import("react/jsx-runtime").JSX.Element;
export default ColorPickerWidget;
