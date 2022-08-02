/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */
import { useEffect } from 'react';
import { Image } from 'semantic-ui-react';
import { ConditionalLink } from '@plone/volto/components';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getNavroot, getSite } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';

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

  useEffect(() => {
    pathname && dispatch(getNavroot(pathname));
  }, [dispatch, pathname]);

  useEffect(() => {
    dispatch(getSite());
  }, [dispatch]);

  return (
    <ConditionalLink
      href={navroot?.url}
      title={navroot?.title}
      condition={navroot?.url ? true : false}
    >
      <Image
        src={site?.logo ? flattenToAppURL(site?.logo) : LogoImage}
        alt={navroot?.title}
        title={navroot?.title}
      />
    </ConditionalLink>
  );
};

export default Logo;
