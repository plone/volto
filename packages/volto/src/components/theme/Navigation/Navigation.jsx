import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { Menu } from 'semantic-ui-react';

import cx from 'classnames';
import { BodyClass, getBaseUrl, hasApiExpander } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { getNavigation } from '@plone/volto/actions';
import { CSSTransition } from 'react-transition-group';
import NavItems from '@plone/volto/components/theme/Navigation/NavItems';

const messages = defineMessages({
  closeMobileMenu: {
    id: 'Close menu',
    defaultMessage: 'Close menu',
  },
  openMobileMenu: {
    id: 'Open menu',
    defaultMessage: 'Open menu',
  },
});

const Navigation = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { pathname, type } = props;
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
  const token = useSelector((state) => state.userSession.token, shallowEqual);
  const items = useSelector((state) => state.navigation.items, shallowEqual);
  const lang = useSelector((state) => state.intl.locale);

  useEffect(() => {
    const { settings } = config;
    if (!hasApiExpander('navigation', getBaseUrl(pathname))) {
      dispatch(getNavigation(getBaseUrl(pathname), settings.navDepth));
    }
  }, [pathname, token, dispatch]);

  const toggleMobileMenu = () => {
    setisMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    if (!isMobileMenuOpen) {
      return;
    }
    setisMobileMenuOpen(false);
  };
  return (
    <nav className="navigation" id="navigation" aria-label="Site" tabindex="-1">
      {items?.length ? (
        <div className="hamburger-wrapper mobile tablet only">
          <button
            className={cx('hamburger hamburger--spin', {
              'is-active': isMobileMenuOpen,
            })}
            aria-label={
              isMobileMenuOpen
                ? intl.formatMessage(messages.closeMobileMenu, {
                    type: type,
                  })
                : intl.formatMessage(messages.openMobileMenu, {
                    type: type,
                  })
            }
            title={
              isMobileMenuOpen
                ? intl.formatMessage(messages.closeMobileMenu, {
                    type: type,
                  })
                : intl.formatMessage(messages.openMobileMenu, {
                    type: type,
                  })
            }
            type="button"
            onClick={toggleMobileMenu}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>
      ) : null}

      <Menu
        stackable
        pointing
        secondary
        className="computer large screen widescreen only"
        onClick={closeMobileMenu}
      >
        <NavItems items={items} lang={lang} />
      </Menu>
      <CSSTransition
        in={isMobileMenuOpen}
        timeout={500}
        classNames="mobile-menu"
        unmountOnExit
      >
        <div key="mobile-menu-key" className="mobile-menu">
          <BodyClass className="has-mobile-menu-open" />
          <div className="mobile-menu-nav">
            <Menu stackable pointing secondary onClick={closeMobileMenu}>
              <NavItems items={items} lang={lang} />
            </Menu>
          </div>
        </div>
      </CSSTransition>
    </nav>
  );
};

Navigation.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Navigation;
