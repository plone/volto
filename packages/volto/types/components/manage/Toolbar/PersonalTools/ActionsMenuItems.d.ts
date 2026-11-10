export type PersonalToolsAction = {
    id: string;
    title: string;
    url: string;
    icon?: string;
};
export type ActionsMenuItemsProps = {
    /** Entries of the `personal_tools` actions category. */
    actions: PersonalToolsAction[];
    /** Opens a toolbar panel, such as `preferences`. */
    loadComponent: (selector: string) => void;
};
/**
 * Whether an action URL names a toolbar panel rather than a page.
 *
 * `@actions` does not expose an action's link target, so a panel is told
 * apart by its URL: a bare name such as `preferences`, with no leading slash,
 * scheme, query or fragment. Root paths and absolute URLs are links.
 */
export declare const isToolbarPanel: (url: string) => boolean;
/**
 * Personal tools menu entries built from the `personal_tools` actions
 * category. An action whose URL names a toolbar panel opens that panel;
 * any other action is a link.
 */
declare const ActionsMenuItems: ({ actions, loadComponent, }: ActionsMenuItemsProps) => import("react").JSX.Element;
export default ActionsMenuItems;
