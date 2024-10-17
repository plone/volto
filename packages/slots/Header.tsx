import type { GetSlotArgs } from '@plone/types';
import SlotRenderer from './SlotRenderer';

type HeaderProps = {
  content: GetSlotArgs['content'];
  location: GetSlotArgs['location'];
};

const Header = (props: HeaderProps) => {
  const { content, location } = props;

  return (
    <>
      <SlotRenderer name="logo" content={content} location={location} />
      <SlotRenderer name="Sections" content={content} location={location} />
      <SlotRenderer name="tools" content={content} location={location} />
    </>
  );
};

export default Header;
