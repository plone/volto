'use client';

import { type SlotComponentProps } from '@plone/slots/SlotRenderer';
import { Link } from '@plone/components';
import LogoImage from './logo.png';

const Logo = (props: SlotComponentProps) => {
  const { content } = props;
  const navRootPath = content['@components'].navroot?.navroot?.['@id'] || '/';

  return (
    <Link href={navRootPath} aria-label={'Home'} className="logo">
      <img src={LogoImage} alt={'Site Title'} />
    </Link>
  );
};

export default Logo;
