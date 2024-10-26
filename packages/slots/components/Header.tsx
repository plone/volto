import type { GetSlotArgs } from '@plone/types';
import SlotRenderer from '../SlotRenderer';

type HeaderProps = {
  content: GetSlotArgs['content'];
  location: GetSlotArgs['location'];
};

const Header = (props: HeaderProps) => {
  const { content, location } = props;

  return (
    <>
      <SlotRenderer name="logo" content={content} location={location} />
      <SlotRenderer name="sections" content={content} location={location} />
      <SlotRenderer name="headertools" content={content} location={location} />
    </>
  );
};

export default Header;
