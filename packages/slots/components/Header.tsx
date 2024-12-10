'use client';

import type { GetSlotArgs } from '@plone/types';
import SlotRenderer from '../SlotRenderer';
import { Container } from '@plone/components';

type HeaderProps = {
  content: GetSlotArgs['content'];
  location: GetSlotArgs['location'];
};

const Header = (props: HeaderProps) => {
  const { content, location } = props;

  return (
    <Container layout className="header-logo-nav-tools-wrapper">
      <SlotRenderer name="logo" content={content} location={location} />
      <SlotRenderer name="navigation" content={content} location={location} />
      <div className="header-tools">
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
