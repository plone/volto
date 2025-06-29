import type { GetSlotArgs } from '@plone/types';
import SlotRenderer from '../SlotRenderer';

type AppProps = {
  content: GetSlotArgs['content'];
  location: GetSlotArgs['location'];
};

const App = (props: AppProps) => {
  const { content, location } = props;

  return (
    <div className="app-slot">
      <SlotRenderer name="main" content={content} location={location} />
    </div>
  );
};

export default App;
