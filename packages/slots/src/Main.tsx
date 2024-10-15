import type { Content } from '@plone/types';
import SlotRenderer from './SlotRenderer';

type MainProps = {
  content: Content;
};

const Main = (props: MainProps) => {
  const { content } = props;

  return (
    <>
      <SlotRenderer name="aboveContent" content={content} />
      <SlotRenderer name="mainContentArea" content={content} />
      <SlotRenderer name="belowContent" content={content} />
    </>
  );
};

export default Main;
