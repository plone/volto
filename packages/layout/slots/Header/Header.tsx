import type { GetSlotArgs } from '@plone/types';
import SlotRenderer from '../SlotRenderer';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import clsx from 'clsx';

import styles from './Header.module.css';

type HeaderProps = {
  content: GetSlotArgs['content'];
  location: GetSlotArgs['location'];
};

const Header = (props: HeaderProps) => {
  const { content, location } = props;

  return (
    <SectionWrapper
      section="header"
      width="layout"
      className={clsx(
        styles['header-wrapper'],
        'header-logo-nav-tools-wrapper',
      )}
    >
      <SlotRenderer name="logo" content={content} location={location} />
      <SlotRenderer name="navigation" content={content} location={location} />
      <div className={clsx(styles['header-tools'], 'header-tools')}>
        <SlotRenderer
          name="headertools"
          content={content}
          location={location}
        />
        <SlotRenderer
          name="language-switcher"
          content={content}
          location={location}
        />
      </div>
    </SectionWrapper>
  );
};

export default Header;
