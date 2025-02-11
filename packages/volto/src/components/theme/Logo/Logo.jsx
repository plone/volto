/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */
import { defineMessages, useIntl } from 'react-intl';
import { useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getNavroot } from '@plone/volto/actions/navroot/navroot';
import { flattenToAppURL, getBaseUrl } from '@plone/volto/helpers/Url/Url';
import { hasApiExpander } from '@plone/volto/helpers/Utils/Utils';

/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = () => {
  const pathname = useLocation().pathname;
  const site = useSelector((state) => state.site.data);
  const navroot = useSelector((state) => state.navroot.data);
  const dispatch = useDispatch();
  const intl = useIntl();

  const messages = defineMessages({
    home: {
      id: 'Home',
      defaultMessage: 'Home',
    },
    logoOf: {
      id: 'Logo of',
      defaultMessage: 'Logo of',
    },
  });

  useEffect(() => {
    if (pathname && !hasApiExpander('navroot', getBaseUrl(pathname))) {
      dispatch(getNavroot(getBaseUrl(pathname)));
    }
  }, [dispatch, pathname]);

  const navRootPath = flattenToAppURL(navroot?.navroot?.['@id']) || '/';
  return null;
  return (
    <Link to={navRootPath} aria-label={intl.formatMessage(messages.home)}>
      <Image
        src={
          site['plone.site_logo']
            ? flattenToAppURL(site['plone.site_logo'])
            : LogoImage
        }
        alt={
          intl.formatMessage(messages.logoOf) + ' ' + site['plone.site_title']
        }
      />
    </Link>
  );
};

export default Logo;
