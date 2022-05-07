/**
 * Logo component.
 * @module components/theme/Logo/Logo
 */

import { defineMessages, useIntl } from 'react-intl';
import { Image } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';
import { UniversalLink } from '@plone/volto/components';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';
import { URLUtils } from '@plone/volto/helpers';

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
  const { isMultilingual } = config.settings;
  const lang = useSelector((state) => state.intl.locale);
  const intl = useIntl();
  const path = URLUtils.normalizePath(isMultilingual ? `/${lang}` : '');
  return (
    <UniversalLink href={path} title={intl.formatMessage(messages.site)}>
      <Image
        src={LogoImage}
        alt={intl.formatMessage(messages.plonesite)}
        title={intl.formatMessage(messages.plonesite)}
      />
    </UniversalLink>
  );
};

export default Logo;
