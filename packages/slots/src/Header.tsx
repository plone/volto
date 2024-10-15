import type { Content } from '@plone/types';
import SlotRenderer from './SlotRenderer';

type HeaderProps = {
  content: Content;
};

const Header = (props: HeaderProps) => {
  const { content } = props;

  return (
    <>
      <SlotRenderer name="logo" content={content} />
      <SlotRenderer name="Sections" content={content} />
      <SlotRenderer name="tools" content={content} />
    </>
  );
};

export default Header;
