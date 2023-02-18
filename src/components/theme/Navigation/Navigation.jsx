/**
 * Navigation components.
 * @module components/theme/Navigation/Navigation
 */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { Menu } from 'semantic-ui-react';
import cx from 'classnames';
import { BodyClass } from '@plone/volto/helpers';
import { CSSTransition } from 'react-transition-group';
import NavItems from '@plone/volto/components/theme/Navigation/NavItems';
import useNavigation from '@plone/volto/queries/useNavigation';

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

const Navigation = () => {
  const intl = useIntl();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const items = useNavigation();
  // TODO: if token changes, then navigation should refresh
  // eslint-disable-next-line no-unused-vars
  const token = useSelector((state) => state.userSession.token);
  const lang = useSelector((state) => state.intl.locale);

  return (
    <nav className="navigation" id="navigation" aria-label="navigation">
      <div className="hamburger-wrapper mobile tablet only">
        <button
          className={cx('hamburger hamburger--spin', {
            'is-active': isMobileMenuOpen,
          })}
          aria-label={
            isMobileMenuOpen
              ? intl.formatMessage(messages.closeMobileMenu)
              : intl.formatMessage(messages.openMobileMenu)
          }
          title={
            isMobileMenuOpen
              ? intl.formatMessage(messages.closeMobileMenu)
              : intl.formatMessage(messages.openMobileMenu)
          }
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
      </div>
      <Menu
        stackable
        pointing
        secondary
        className="computer large screen widescreen only"
        onClick={() => setIsMobileMenuOpen(false)}
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
            <Menu
              stackable
              pointing
              secondary
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <NavItems items={items} lang={lang} />
            </Menu>
          </div>
        </div>
      </CSSTransition>
    </nav>
  );
};

export default Navigation;

Navigation.propTypes = {
  pathname: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
  lang: PropTypes.string,
};

// static defaultProps = {
//   token: null,
// };
