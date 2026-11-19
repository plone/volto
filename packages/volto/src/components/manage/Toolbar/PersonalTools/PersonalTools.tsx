/**
 * PersonalTools component.
 * @module components/manage/Toolbar/PersonalTools/PersonalTools
 */
import { useEffect, type RefObject } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import cx from 'classnames';
import { useIntl, defineMessages } from 'react-intl';
import type { AnyAction } from 'redux';

import Icon from '@plone/volto/components/theme/Icon/Icon';
import Image from '@plone/volto/components/theme/Image/Image';
import { getUser } from '@plone/volto/actions/users/users';
import { Pluggable } from '@plone/volto/components/manage/Pluggable';
import { expandToBackendURL, getBaseUrl } from '@plone/volto/helpers/Url/Url';
import logoutSVG from '@plone/volto/icons/log-out.svg';
import backSVG from '@plone/volto/icons/back.svg';
import cameraSVG from '@plone/volto/icons/camera.svg';

import ActionsMenuItems, { type PersonalToolsAction } from './ActionsMenuItems';
import DefaultMenuItems from './DefaultMenuItems';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  logout: {
    id: 'Logout',
    defaultMessage: 'Logout',
  },
  userAvatar: {
    id: 'user avatar',
    defaultMessage: 'user avatar',
  },
});

type SelectorState = {
  userSession: { token?: string | null };
  users: {
    user: {
      fullname?: string;
      username?: string;
      portrait?: string | null;
    };
  };
  actions?: {
    actions?: {
      personal_tools?: PersonalToolsAction[];
    };
  };
};

export type PersonalToolsProps = {
  /** Opens a toolbar panel, such as `preferences`. */
  loadComponent: (selector: string) => void;
  /** Closes the current toolbar panel. */
  unloadComponent: () => void;
  /** Whether the toolbar shows inner actions. */
  hasActions?: boolean;
  /** The toolbar element, used to match the menu width. */
  theToolbar: RefObject<HTMLElement>;
};

/**
 * Personal tools menu of the toolbar.
 *
 * Lists the `personal_tools` actions when the site provides them, and the
 * built-in entries otherwise.
 */
const PersonalTools = (props: PersonalToolsProps) => {
  const { loadComponent, unloadComponent, hasActions, theToolbar } = props;
  const dispatch = useDispatch();
  const intl = useIntl();
  const { pathname } = useLocation();
  const token = useSelector(
    (state: SelectorState) => state.userSession.token,
    shallowEqual,
  );
  const user = useSelector((state: SelectorState) => state.users.user);
  const userId = token ? jwtDecode<{ sub: string }>(token).sub : '';
  const personalToolsActions = useSelector(
    (state: SelectorState) => state.actions?.actions?.personal_tools,
    shallowEqual,
  );

  useEffect(() => {
    dispatch(getUser(userId) as AnyAction);
  }, [dispatch, userId]);

  return (
    <div
      className={cx('personal-tools pastanaga-menu', {
        'has-inner-actions': hasActions,
      })}
      style={{
        flex: theToolbar.current
          ? `0 0 ${theToolbar.current.getBoundingClientRect().width}px`
          : undefined,
      }}
    >
      <header className="header">
        <button className="back" onClick={() => unloadComponent()}>
          <Icon
            name={backSVG}
            size="30px"
            title={intl.formatMessage(messages.back)}
          />
        </button>
        <div className="vertical divider" />
        <h2>{user.fullname ? user.fullname : user.username}</h2>
        <Link id="toolbar-logout" to={`${getBaseUrl(pathname)}/logout`}>
          <Icon
            className="logout"
            name={logoutSVG}
            size="30px"
            title={intl.formatMessage(messages.logout)}
          />
        </Link>
      </header>
      <div className={cx('avatar', { default: !user.portrait })}>
        {user.portrait ? (
          <Image
            src={expandToBackendURL(user.portrait)}
            alt={intl.formatMessage(messages.userAvatar)}
          />
        ) : (
          <Icon name={cameraSVG} size="96px" />
        )}
      </div>
      <div className="pastanaga-menu-list">
        <ul>
          {personalToolsActions?.length ? (
            <ActionsMenuItems
              actions={personalToolsActions}
              loadComponent={loadComponent}
            />
          ) : (
            <DefaultMenuItems loadComponent={loadComponent} />
          )}
          <Pluggable name="toolbar-user-menu" />
        </ul>
      </div>
    </div>
  );
};

export default PersonalTools;
