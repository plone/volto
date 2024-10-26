import type { GetSlotArgs } from '@plone/types';
import SlotRenderer from '../SlotRenderer';

type MainProps = {
  content: GetSlotArgs['content'];
  location: GetSlotArgs['location'];
};

const Main = (props: MainProps) => {
  const { content, location } = props;

  return (
    <>
      <SlotRenderer name="aboveContent" content={content} location={location} />
      <SlotRenderer
        name="mainContentArea"
        content={content}
        location={location}
      />
      <SlotRenderer name="belowContent" content={content} location={location} />
    </>
  );
};

export default Main;
