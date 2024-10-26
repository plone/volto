import type { ConfigType } from '@plone/registry';
import App from './components/App';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Logo from './components/Logo';
import Sections from './components/Sections';
import HeaderTools from './components/Tools';

export default function install(config: ConfigType) {
  // Main App Slot
  config.registerSlotComponent({ name: 'App', slot: 'App', component: App });

  // Header Slot
  config.registerSlotComponent({
    name: 'Header',
    slot: 'header',
    component: Header,
  });

  // Logo
  config.registerSlotComponent({
    name: 'Logo',
    slot: 'logo',
    component: Logo,
  });

  // Sections
  config.registerSlotComponent({
    name: 'Sections',
    slot: 'sections',
    component: Sections,
  });

  // Tools
  config.registerSlotComponent({
    name: 'Tools',
    slot: 'headertools',
    component: HeaderTools,
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
