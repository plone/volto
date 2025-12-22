import type { GetSlotArgs } from '@plone/types';
import SlotRenderer from '../SlotRenderer';
import { ScrollToTopButton } from '@plone/components';

type AppProps = {
  content: GetSlotArgs['content'];
  location: GetSlotArgs['location'];
};

const App = (props: AppProps) => {
  const { content, location } = props;

  return (
    <div className="app-slot">
      <header className="header-slot">
        <SlotRenderer name="header" content={content} location={location} />
      </header>
      <SlotRenderer name="main" content={content} location={location} />
      <footer id="footer">
        <SlotRenderer name="footer" content={content} location={location} />
      </footer>
      <ScrollToTopButton />
    </div>
  );
};

export default App;
