import type { GetSlotArgs } from '@plone/types';
import SlotRenderer from '../SlotRenderer';
import clsx from 'clsx';

import styles from './App.module.css';

type AppProps = {
  content: GetSlotArgs['content'];
  location: GetSlotArgs['location'];
};

const App = (props: AppProps) => {
  const { content, location } = props;

  return (
    <div className={clsx(styles.app, 'app-slot')}>
      <header id="header">
        <SlotRenderer name="header" content={content} location={location} />
      </header>
      <SlotRenderer name="main" content={content} location={location} />
      <footer id="footer">
        <SlotRenderer name="footer" content={content} location={location} />
      </footer>
    </div>
  );
};

export default App;
