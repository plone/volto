import type { ConfigType } from '@plone/registry';
import App from './App';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

export default function install(config: ConfigType) {
  // Main App Slot
  config.registerSlotComponent({ name: 'App', slot: 'App', component: App });

  // Header Slot
  config.registerSlotComponent({
    name: 'Header',
    slot: 'header',
    component: Header,
  });

  // Main Slot
  config.registerSlotComponent({
    name: 'Main',
    slot: 'main',
    component: Main,
  });

  // Footer Slot
  config.registerSlotComponent({
    name: 'Footer',
    slot: 'footer',
    component: Footer,
  });

  return config;
}
