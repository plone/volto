'use client';

import type { GetSlotArgs } from '@plone/types';
import SlotRenderer from '../SlotRenderer';
import { Container } from '@plone/components';

type MainProps = {
  content: GetSlotArgs['content'];
  location: GetSlotArgs['location'];
};

const Main = (props: MainProps) => {
  const { content, location } = props;

  return (
    <Container className="content-area">
      <SlotRenderer name="aboveContent" content={content} location={location} />
      <SlotRenderer name="contentArea" content={content} location={location} />
      <SlotRenderer name="belowContent" content={content} location={location} />
    </Container>
  );
};

export default Main;
