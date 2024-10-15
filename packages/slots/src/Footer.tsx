import type { Content } from '@plone/types';
import SlotRenderer from './SlotRenderer';

type FooterProps = {
  content: Content;
};

const Footer = (props: FooterProps) => {
  const { content } = props;

  return (
    <>
      <SlotRenderer name="preFooter" content={content} />
      <SlotRenderer name="mainFooter" content={content} />
      <SlotRenderer name="postFooter" content={content} />
    </>
  );
};

export default Footer;
