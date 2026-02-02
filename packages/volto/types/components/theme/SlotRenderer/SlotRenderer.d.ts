import type { GetSlotArgs } from '@plone/types';
export interface SlotRendererProps extends GetSlotArgs {
    name: string;
}
declare const SlotRenderer: ({ name, content, navRoot, data, ...rest }: SlotRendererProps) => import("react/jsx-runtime").JSX.Element;
export default SlotRenderer;
