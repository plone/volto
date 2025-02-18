import type { SlotComponentProps } from '../SlotRenderer';
import { Link } from '@plone/components';
import LogoImage from './Logo.svg';
import config from '@plone/registry';
import { messages } from './messages';

const Logo = (props: SlotComponentProps) => {
  const { content } = props;
  const intl: (id: string) => string = config.getUtility({
    name: 'translation',
    type: 'factory',
  }).method;

  const navRootPath = content['@components'].navroot?.navroot?.['@id'] || '/';
  const site = content['@components'].site;
  const siteTitle = site?.['plone.site_title'] || '';
  const logoUrl = site?.['plone.site_logo']
    ? site['plone.site_logo']
    : LogoImage;

  return (
    <Link href={navRootPath} aria-label={intl(messages.home)} className="logo">
      <img src={logoUrl} alt={intl(messages.logoOf) + ' ' + siteTitle} />
    </Link>
  );
};

export default Logo;
