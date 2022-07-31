/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import { Image } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';

/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = (props) => {
  const { navroot } = props;

  return (
    <UniversalLink href={navroot?.url} title={navroot?.title}>
      <Image src={LogoImage} alt={navroot?.title} title={navroot?.title} />
    </UniversalLink>
  );
};

export default Logo;
