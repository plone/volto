/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */
import { useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import { ConditionalLink } from '@plone/volto/components';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getNavroot } from '@plone/volto/actions';
import {
  hasApiExpander,
  getBaseUrl,
  useUrlHelpers,
} from '@plone/volto/helpers';

/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = () => {
  const pathname = useSelector((state) => state.router.location.pathname);
  const site = useSelector((state) => state.site.data);
  const navroot = useSelector((state) => state.navroot.data);
  const dispatch = useDispatch();
  const { flattenToAppURL, toPublicURL } = useUrlHelpers();

  useEffect(() => {
    if (pathname && !hasApiExpander('navroot', getBaseUrl(pathname))) {
      dispatch(getNavroot(getBaseUrl(pathname)));
    }
  }, [dispatch, pathname]);

  // remove trailing slash
  const currentURL = toPublicURL(pathname).replace(/\/$/, '');

  return (
    <ConditionalLink
      href={navroot?.navroot?.['@id']}
      title={navroot?.navroot?.title}
      condition={currentURL !== navroot?.navroot?.['@id']}
    >
      <Image
        src={
          site['plone.site_logo']
            ? flattenToAppURL(site['plone.site_logo'])
            : LogoImage
        }
        alt={navroot?.navroot?.title}
        title={navroot?.navroot?.title}
      />
    </ConditionalLink>
  );
};

export default Logo;
