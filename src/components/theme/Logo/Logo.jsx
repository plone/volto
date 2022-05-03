/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import { Link } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { Image } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';

import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';

const messages = defineMessages({
  site: {
    id: 'Site',
    defaultMessage: 'Site',
  },
  plonesite: {
    id: 'Plone Site',
    defaultMessage: 'Plone Site',
  },
});

/**
 * Logo component class.
 * @function Logo
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component.
 */
const Logo = () => {
  const { isMultilingual, prefixPath } = config.settings;
  const lang = useSelector((state) => state.intl.locale);
  const intl = useIntl();

  return (
    <Link
      to={isMultilingual ? `${prefixPath}/${lang}` : `${prefixPath}/`}
      title={intl.formatMessage(messages.site)}
    >
      <Image
        src={LogoImage}
        alt={intl.formatMessage(messages.plonesite)}
        title={intl.formatMessage(messages.plonesite)}
      />
    </Link>
  );
};

export default Logo;
