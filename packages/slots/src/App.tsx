import type { GetSlotArgs } from '@plone/types';
import SlotRenderer from './SlotRenderer';

type AppProps = {
  content: GetSlotArgs['content'];
  location: GetSlotArgs['location'];
};

const App = (props: AppProps) => {
  const { content, location } = props;

  return (
    <>
      <SlotRenderer name="header" content={content} location={location} />
      <SlotRenderer name="main" content={content} location={location} />
      <SlotRenderer name="footer" content={content} location={location} />
    </>
  );
};

export default App;
