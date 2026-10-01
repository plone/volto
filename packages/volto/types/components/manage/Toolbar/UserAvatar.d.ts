import userSVG from '@plone/volto/icons/user.svg';
export type UserAvatarProps = {
    /** Title of the rendered icon (a11y). */
    title?: string;
    /** Icon to render in place of the default user glyph. */
    icon?: typeof userSVG;
    /** Size of the avatar (in px). Defaults to the toolbar button size. */
    size?: string;
};
/**
 * Avatar of the currently signed-in user, as shown in the toolbar.
 *
 * Extracted so that add-ons can shadow this component alone — rendering a
 * portrait, initials or a gravatar — instead of shadowing the whole toolbar.
 */
declare const UserAvatar: ({ title, icon, size }: UserAvatarProps) => import("react/jsx-runtime").JSX.Element;
export default UserAvatar;
