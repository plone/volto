import type { ConfigType } from '@plone/registry';
import App from '../slots/App/App';
import Header from '../slots/Header/Header';
import Main from '../slots/Main';
import Footer from '../slots/Footer';
import Logo from '../slots/Logo/Logo';
import LanguageSwitcher from '../slots/LanguageSwitcher/LanguageSwitcher';
import Navigation from '../slots/Navigation/Navigation';
import HeaderTools from '../slots/Tools';
import ContentArea from '../slots/ContentArea';
import MainFooter from '../slots/MainFooter/MainFooter';
import Breadcrumbs from '../slots/Breadcrumbs';
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

  config.registerSlotComponent({
    name: 'Language Switcher',
    slot: 'language-switcher',
    component: LanguageSwitcher,
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
