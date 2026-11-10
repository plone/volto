/**
 * ActionsMenuItems component.
 * @module components/manage/Toolbar/PersonalTools/ActionsMenuItems
 */
import { Link } from 'react-router-dom';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import rightArrowSVG from '@plone/volto/icons/right-key.svg';

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

const TOOLBAR_PANEL_NAME = /^[A-Za-z][\w-]*$/;

/**
 * Whether an action URL names a toolbar panel rather than a page.
 *
 * `@actions` does not expose an action's link target, so a panel is told
 * apart by its URL: a bare name such as `preferences`, with no leading slash,
 * scheme, query or fragment. Root paths and absolute URLs are links.
 */
export const isToolbarPanel = (url: string): boolean =>
  TOOLBAR_PANEL_NAME.test(url);

/**
 * Personal tools menu entries built from the `personal_tools` actions
 * category. An action whose URL names a toolbar panel opens that panel;
 * any other action is a link.
 */
const ActionsMenuItems = ({
  actions,
  loadComponent,
}: ActionsMenuItemsProps) => (
  <>
    {actions.map((action) => (
      <li key={action.id}>
        {isToolbarPanel(action.url) ? (
          <button
            aria-label={action.title}
            onClick={() => loadComponent(action.url)}
          >
            {action.title}
            <Icon name={rightArrowSVG} size="24px" />
          </button>
        ) : (
          <Link to={flattenToAppURL(action.url)}>
            {action.title}
            <Icon name={rightArrowSVG} size="24px" />
          </Link>
        )}
      </li>
    ))}
  </>
);

export default ActionsMenuItems;
