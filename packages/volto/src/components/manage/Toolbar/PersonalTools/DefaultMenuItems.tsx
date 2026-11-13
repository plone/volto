/**
 * DefaultMenuItems component.
 * @module components/manage/Toolbar/PersonalTools/DefaultMenuItems
 */
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl, defineMessages } from 'react-intl';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import rightArrowSVG from '@plone/volto/icons/right-key.svg';
import type { PersonalToolsAction } from './ActionsMenuItems';

const messages = defineMessages({
  preferences: {
    id: 'Preferences',
    defaultMessage: 'Preferences',
  },
  profile: {
    id: 'Profile',
    defaultMessage: 'Profile',
  },
});

type SelectorState = {
  actions?: {
    actions?: {
      user?: PersonalToolsAction[];
    };
  };
};

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
const DefaultMenuItems = ({ loadComponent }: DefaultMenuItemsProps) => {
  const intl = useIntl();
  const siteSetupAction = useSelector((state: SelectorState) =>
    state.actions?.actions?.user?.find(
      (action) => action?.id === 'plone_setup',
    ),
  );

  return (
    <>
      <li>
        <Link
          id={intl.formatMessage(messages.profile)}
          to="/personal-information"
        >
          <FormattedMessage id="Profile" defaultMessage="Profile" />
          <Icon name={rightArrowSVG} size="24px" />
        </Link>
      </li>
      <li>
        <button
          aria-label={intl.formatMessage(messages.preferences)}
          onClick={() => loadComponent('preferences')}
        >
          <FormattedMessage id="Preferences" defaultMessage="Preferences" />
          <Icon name={rightArrowSVG} size="24px" />
        </button>
      </li>
      {siteSetupAction && (
        <li>
          <Link to="/controlpanel">
            <FormattedMessage id="Site Setup" defaultMessage="Site Setup" />
            <Icon name={rightArrowSVG} size="24px" />
          </Link>
        </li>
      )}
    </>
  );
};

export default DefaultMenuItems;
