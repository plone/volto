import { useState, useEffect, useRef, useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import { withCookies } from 'react-cookie';
import { find, filter } from 'lodash';
import cx from 'classnames';
import config from '@plone/volto/registry';

import More from '@plone/volto/components/manage/Toolbar/More';
import PersonalTools from '@plone/volto/components/manage/Toolbar/PersonalTools';
import Types from '@plone/volto/components/manage/Toolbar/Types';
import PersonalInformation from '@plone/volto/components/manage/Preferences/PersonalInformation';
import PersonalPreferences from '@plone/volto/components/manage/Preferences/PersonalPreferences';
import StandardWrapper from '@plone/volto/components/manage/Toolbar/StandardWrapper';
import {
  getTypes,
  listActions,
  setExpandedToolbar,
  unlockContent,
} from '@plone/volto/actions';
import { Icon } from '@plone/volto/components';
import {
  BodyClass,
  getBaseUrl,
  getCookieOptions,
  hasApiExpander,
  usePrevious,
} from '@plone/volto/helpers';

import { Pluggable } from '@plone/volto/components/manage/Pluggable';

import penSVG from '@plone/volto/icons/pen.svg';
import unlockSVG from '@plone/volto/icons/unlock.svg';
import folderSVG from '@plone/volto/icons/folder.svg';
import addSVG from '@plone/volto/icons/add-document.svg';
import moreSVG from '@plone/volto/icons/more.svg';
import userSVG from '@plone/volto/icons/user.svg';
import backSVG from '@plone/volto/icons/back.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import { useContent } from '@plone/volto/hooks/content/useContent';

const messages = defineMessages({
  edit: {
    id: 'Edit',
    defaultMessage: 'Edit',
  },
  contents: {
    id: 'Contents',
    defaultMessage: 'Contents',
  },
  add: {
    id: 'Add',
    defaultMessage: 'Add',
  },
  more: {
    id: 'More',
    defaultMessage: 'More',
  },
  personalTools: {
    id: 'Personal tools',
    defaultMessage: 'Personal tools',
  },
  shrinkToolbar: {
    id: 'Shrink toolbar',
    defaultMessage: 'Shrink toolbar',
  },
  personalInformation: {
    id: 'Personal Information',
    defaultMessage: 'Personal Information',
  },
  personalPreferences: {
    id: 'Personal Preferences',
    defaultMessage: 'Personal Preferences',
  },
  collection: {
    id: 'Collection',
    defaultMessage: 'Collection',
  },
  file: {
    id: 'File',
    defaultMessage: 'File',
  },
  link: {
    id: 'Link',
    defaultMessage: 'Link',
  },
  newsItem: {
    id: 'News Item',
    defaultMessage: 'News Item',
  },
  page: {
    id: 'Page',
    defaultMessage: 'Page',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  unlock: {
    id: 'Unlock',
    defaultMessage: 'Unlock',
  },
});

let toolbarComponents = {
  personalTools: { component: PersonalTools, wrapper: null },
  more: { component: More, wrapper: null },
  types: { component: Types, wrapper: null, contentAsProps: true },
  profile: {
    component: PersonalInformation,
    wrapper: StandardWrapper,
    wrapperTitle: messages.personalInformation,
    hideToolbarBody: true,
  },
  preferences: {
    component: PersonalPreferences,
    wrapper: StandardWrapper,
    wrapperTitle: messages.personalPreferences,
    hideToolbarBody: true,
  },
};

const Toolbar = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const toolbarWindow = useRef();
  const pusher = useRef();

  const actions = useSelector((state) => state.actions.actions, shallowEqual);

  const content = useContent();
  const unlockRequest = useSelector((state) => state.content?.unlock);

  const token = useSelector((state) => state.userSession.token, shallowEqual);

  const type = useSelector((state) => state.types.types, shallowEqual);
  const types = filter(type, 'addable');

  const userId = token ? jwtDecode(token).sub : '';

  const { cookies, pathname, hideDefaultViewButtons, inner } = props;

  const [expanded, setExpanded] = useState(
    cookies.get('toolbar_expanded') !== 'false',
  );
  const [showMenu, setShowMenu] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const [loadedComponents, setLoadedComponents] = useState([]);
  const [, setHideToolbarBody] = useState(false);
  const unlockloading = unlockRequest?.loading;
  const unlockloaded = unlockRequest?.loaded;
  const prevUnlockloading = usePrevious(unlockloading);

  useEffect(() => {
    // Do not trigger the actions action if the expander is present
    if (!hasApiExpander('actions', getBaseUrl(pathname))) {
      dispatch(listActions(getBaseUrl(pathname)));
    }
    // Do not trigger the types action if the expander is present
    if (!hasApiExpander('types', getBaseUrl(pathname))) {
      dispatch(getTypes(getBaseUrl(pathname)));
    }
  }, [pathname, dispatch]);

  const closeMenu = () => {
    setShowMenu(false);
    setLoadedComponents([]);
  };

  const handleClickOutside = (e) => {
    if (pusher.current && doesNodeContainClick(pusher.current, e)) return;
    closeMenu();
  };

  useEffect(() => {
    toolbarComponents = {
      ...(config.settings
        ? config.settings.additionalToolbarComponents || {}
        : {}),
      ...toolbarComponents,
    };
    setExpandedToolbar(expanded);
    document.addEventListener('mousedown', handleClickOutside, false);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside, false);
  });

  useEffect(() => {
    // Unlock
    if (prevUnlockloading && unlockloaded) {
      dispatch(listActions(getBaseUrl(pathname)));
    }
  }, [prevUnlockloading, unlockloaded, dispatch, pathname]);

  const handleShrink = () => {
    cookies.set('toolbar_expanded', !expanded, getCookieOptions());

    setExpanded(!expanded);
    dispatch(setExpandedToolbar(expanded));
  };

  const loadComponent = useCallback(
    (type) => {
      if (!loadedComponents.includes(type)) {
        setLoadedComponents([...loadedComponents, type]);
        setHideToolbarBody(toolbarComponents[type].hideToolbarBody || false);
      }
    },
    [loadedComponents],
  );

  const unloadComponent = () => {
    setLoadedComponents(loadedComponents.slice(0, -1));
    setHideToolbarBody(
      toolbarComponents[loadedComponents[loadedComponents.length - 2]]
        .hideToolbarBody || false,
    );
  };

  const toggleMenu = useCallback(
    (e, selector) => {
      if (showMenu) {
        closeMenu();
        return;
      }
      // PersonalTools always shows at bottom
      if (selector === 'personalTools') {
        setShowMenu(!showMenu);
        setMenuStyle({ bottom: 0 });
      } else if (selector === 'more') {
        setShowMenu(!showMenu);
        setMenuStyle({
          overflow: 'visible',
          top: 0,
        });
      } else {
        setShowMenu(!showMenu);
        setMenuStyle({ top: 0 });
      }
      loadComponent(selector);
    },
    [showMenu, loadComponent],
  );

  const unlock = () => {
    dispatch(unlockContent(getBaseUrl(pathname), true));
  };

  const path = getBaseUrl(pathname);
  const lock = content?.lock;
  const unlockAction =
    lock?.locked && lock?.stealable && lock?.creator !== userId;
  const editAction = !unlockAction && find(actions.object, { id: 'edit' });
  const folderContentsAction = find(actions.object, {
    id: 'folderContents',
  });

  return (
    !!token && (
      <>
        <BodyClass
          className={expanded ? 'has-toolbar' : 'has-toolbar-collapsed'}
        />
        <div
          style={menuStyle}
          className={showMenu ? 'toolbar-content show' : 'toolbar-content'}
          ref={toolbarWindow}
        >
          {showMenu && (
            // This sets the scroll locker in the body tag in mobile
            <BodyClass className="has-toolbar-menu-open" />
          )}
          <div
            className="pusher-puller"
            ref={pusher}
            style={{
              transform: toolbarWindow.current
                ? `translateX(-${
                    (loadedComponents.length - 1) *
                    toolbarWindow.current.getBoundingClientRect().width
                  }px)`
                : null,
            }}
          >
            {loadedComponents.map((component, index) =>
              (() => {
                const ToolbarComponent = toolbarComponents[component].component;
                const WrapperComponent = toolbarComponents[component].wrapper;
                const haveActions =
                  toolbarComponents[component].hideToolbarBody;
                const title =
                  toolbarComponents[component].wrapperTitle &&
                  intl.formatMessage(toolbarComponents[component].wrapperTitle);
                if (WrapperComponent) {
                  return (
                    <WrapperComponent
                      componentName={component}
                      componentTitle={title}
                      pathname={pathname}
                      loadComponent={loadComponent}
                      unloadComponent={unloadComponent}
                      componentIndex={index}
                      theToolbar={toolbarWindow}
                      key={`personalToolsComponent-${index}`}
                      closeMenu={closeMenu}
                      hasActions={haveActions}
                    >
                      <ToolbarComponent
                        pathname={pathname}
                        loadComponent={loadComponent}
                        unloadComponent={unloadComponent}
                        componentIndex={index}
                        theToolbar={toolbarWindow}
                        closeMenu={closeMenu}
                        isToolbarEmbedded
                      />
                    </WrapperComponent>
                  );
                } else {
                  return (
                    <ToolbarComponent
                      pathname={pathname}
                      loadComponent={loadComponent}
                      unloadComponent={unloadComponent}
                      componentIndex={index}
                      theToolbar={toolbarWindow}
                      key={`personalToolsComponent-${index}`}
                      closeMenu={closeMenu}
                      content={
                        toolbarComponents[component].contentAsProps
                          ? content
                          : null
                      }
                    />
                  );
                }
              })(),
            )}
          </div>
        </div>
        <div className={expanded ? 'toolbar expanded' : 'toolbar'}>
          <div className="toolbar-body">
            <div className="toolbar-actions">
              {hideDefaultViewButtons && inner && <>{inner}</>}
              {!hideDefaultViewButtons && (
                <>
                  {unlockAction && (
                    <button
                      aria-label={intl.formatMessage(messages.unlock)}
                      className="unlock"
                      onClick={unlock}
                      tabIndex={0}
                    >
                      <Icon
                        name={unlockSVG}
                        size="30px"
                        className="unlock"
                        title={intl.formatMessage(messages.unlock)}
                      />
                    </button>
                  )}

                  {editAction && (
                    <Link
                      aria-label={intl.formatMessage(messages.edit)}
                      className="edit"
                      to={`${path}/edit`}
                    >
                      <Icon
                        name={penSVG}
                        size="30px"
                        className="circled"
                        title={intl.formatMessage(messages.edit)}
                      />
                    </Link>
                  )}
                  {content &&
                    content.is_folderish &&
                    folderContentsAction &&
                    !pathname.endsWith('/contents') && (
                      <Link
                        aria-label={intl.formatMessage(messages.contents)}
                        to={`${path}/contents`}
                      >
                        <Icon
                          name={folderSVG}
                          size="30px"
                          title={intl.formatMessage(messages.contents)}
                        />
                      </Link>
                    )}
                  {content &&
                    content.is_folderish &&
                    folderContentsAction &&
                    pathname.endsWith('/contents') && (
                      <Link
                        to={`${path}`}
                        aria-label={intl.formatMessage(messages.back)}
                      >
                        <Icon
                          name={backSVG}
                          className="circled"
                          size="30px"
                          title={intl.formatMessage(messages.back)}
                        />
                      </Link>
                    )}
                  {content &&
                    ((content.is_folderish && types.length > 0) ||
                      (config.settings.isMultilingual &&
                        content['@components']?.translations)) && (
                      <button
                        className="add"
                        aria-label={intl.formatMessage(messages.add)}
                        onClick={(e) => toggleMenu(e, 'types')}
                        tabIndex={0}
                        id="toolbar-add"
                      >
                        <Icon
                          name={addSVG}
                          size="30px"
                          title={intl.formatMessage(messages.add)}
                        />
                      </button>
                    )}
                  <div className="toolbar-button-spacer" />
                  <button
                    className="more"
                    aria-label={intl.formatMessage(messages.more)}
                    onClick={(e) => toggleMenu(e, 'more')}
                    tabIndex={0}
                    id="toolbar-more"
                  >
                    <Icon
                      className="mobile hidden"
                      name={moreSVG}
                      size="30px"
                      title={intl.formatMessage(messages.more)}
                    />
                    {showMenu ? (
                      <Icon
                        className="mobile only"
                        name={clearSVG}
                        size="30px"
                      />
                    ) : (
                      <Icon
                        className="mobile only"
                        name={moreSVG}
                        size="30px"
                      />
                    )}
                  </button>
                </>
              )}
              <Pluggable name="main.toolbar.top" />
            </div>
            <div className="toolbar-bottom">
              <Pluggable
                name="main.toolbar.bottom"
                params={{ onClickHandler: toggleMenu }}
              />
              {!hideDefaultViewButtons && (
                <button
                  className="user"
                  aria-label={intl.formatMessage(messages.personalTools)}
                  onClick={(e) => toggleMenu(e, 'personalTools')}
                  tabIndex={0}
                  id="toolbar-personal"
                >
                  <Icon
                    name={userSVG}
                    size="30px"
                    title={intl.formatMessage(messages.personalTools)}
                  />
                </button>
              )}
            </div>
          </div>
          <div className="toolbar-handler">
            <button
              aria-label={intl.formatMessage(messages.shrinkToolbar)}
              className={cx({
                [content?.review_state]: content?.review_state,
              })}
              onClick={handleShrink}
            />
          </div>
        </div>
        <div className="pusher" />
      </>
    )
  );
};

Toolbar.propTypes = {
  pathname: PropTypes.string.isRequired,
  inner: PropTypes.element.isRequired,
  hideDefaultViewButtons: PropTypes.bool,
};

Toolbar.defaultProps = {
  hideDefaultViewButtons: false,
};
export default withCookies(Toolbar);
