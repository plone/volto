import type { GetSlotArgs } from '@plone/types';
import SlotRenderer from '../../SlotRenderer';
import Container from '../Container/Container';
import clsx from 'clsx';

import styles from './Header.module.css';

type HeaderProps = {
  content: GetSlotArgs['content'];
  location: GetSlotArgs['location'];
};

const Header = (props: HeaderProps) => {
  const { content, location } = props;

  return (
    <Container
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
      </div>
    </Container>
  );
};

export default Header;
