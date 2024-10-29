import type { GetSlotArgs } from '@plone/types';
import SlotRenderer from '../SlotRenderer';
import { Container } from '@plone/components';

type FooterProps = {
  content: GetSlotArgs['content'];
  location: GetSlotArgs['location'];
};

const Footer = (props: FooterProps) => {
  const { content, location } = props;

  return (
    <Container>
      <SlotRenderer name="preFooter" content={content} location={location} />
      <SlotRenderer name="mainFooter" content={content} location={location} />
      <SlotRenderer name="postFooter" content={content} location={location} />
    </Container>
  );
};

export default Footer;
