/**
 * UserAvatar component.
 * @module components/manage/Toolbar/UserAvatar
 */
import Icon from '@plone/volto/components/theme/Icon/Icon';
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
const UserAvatar = ({ title, icon, size = '30px' }: UserAvatarProps) => {
  return <Icon name={icon || userSVG} size={size} title={title} />;
};

export default UserAvatar;
