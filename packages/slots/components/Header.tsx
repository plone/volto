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
    <Container layout>
      <SlotRenderer name="logo" content={content} location={location} />
      <SlotRenderer name="navigation" content={content} location={location} />
      <SlotRenderer name="headertools" content={content} location={location} />
    </Container>
  );
};

export default Header;
