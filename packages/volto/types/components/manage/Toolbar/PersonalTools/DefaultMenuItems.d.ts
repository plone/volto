export type DefaultMenuItemsProps = {
    /** Opens a toolbar panel, such as `preferences`. */
    loadComponent: (selector: string) => void;
};
/**
 * Built-in personal tools menu entries: Profile, Preferences and, for users
 * with the `plone_setup` action, Site Setup.
 *
 * Used when the site has no `personal_tools` actions.
 */
declare const DefaultMenuItems: ({ loadComponent }: DefaultMenuItemsProps) => import("react").JSX.Element;
export default DefaultMenuItems;
