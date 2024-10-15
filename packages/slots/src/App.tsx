import type { Content } from '@plone/types';
import SlotRenderer from './SlotRenderer';

type AppProps = {
  content: Content;
};

const App = (props: AppProps) => {
  const { content } = props;

  return (
    <>
      <SlotRenderer name="header" content={content} />
      <SlotRenderer name="main" content={content} />
      <SlotRenderer name="footer" content={content} />
    </>
  );
};

export default App;
