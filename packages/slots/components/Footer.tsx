import type { GetSlotArgs } from '@plone/types';
import SlotRenderer from '../SlotRenderer';

type FooterProps = {
  content: GetSlotArgs['content'];
  location: GetSlotArgs['location'];
};

const Footer = (props: FooterProps) => {
  const { content, location } = props;

  return (
    <>
      <SlotRenderer name="preFooter" content={content} location={location} />
      <SlotRenderer name="mainFooter" content={content} location={location} />
      <SlotRenderer name="postFooter" content={content} location={location} />
    </>
  );
};

export default Footer;
