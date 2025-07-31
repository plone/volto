import type { ConfigType } from '@plone/registry';
import App from '../components/App/App';
import Header from '../components/Header/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import Logo from '../components/Logo/Logo';
import Navigation from '../components/Navigation/Navigation';
import HeaderTools from '../components/Tools';
import ContentArea from '../components/ContentArea';
import MainFooter from '../components/MainFooter/MainFooter';
import Breadcrumbs from '../components/Breadcrumbs';
import { NotContentTypeCondition } from '../helpers';

export default function install(config: ConfigType) {
  // Main App Slot
  // config.registerSlotComponent({ name: 'App', slot: 'App', component: App });

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

  // Navigation
  config.registerSlotComponent({
    name: 'Navigation',
    slot: 'navigation',
    component: Navigation,
  });

  // Tools
  config.registerSlotComponent({
    name: 'Tools',
    slot: 'headertools',
    component: HeaderTools,
  });

  // Breadcrumbs
  config.registerSlotComponent({
    name: 'Breadcrumbs',
    slot: 'header',
    component: Breadcrumbs,
    predicates: [NotContentTypeCondition(config.settings.hideBreadcrumbs)],
  });

  // Main Slot
  config.registerSlotComponent({
    name: 'Main',
    slot: 'main',
    component: Main,
  });

  config.registerSlotComponent({
    name: 'contentArea',
    slot: 'contentArea',
    component: ContentArea,
  });

  // Footer Slot
  config.registerSlotComponent({
    name: 'Footer',
    slot: 'footer',
    component: Footer,
  });

  config.registerSlotComponent({
    name: 'mainFooter',
    slot: 'mainFooter',
    component: MainFooter,
  });

  return config;
}
