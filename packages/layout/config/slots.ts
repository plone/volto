import type { ConfigType } from '@plone/registry';
import Header from '../slots/Header/Header';
import Main from '../slots/Main';
import Footer from '../slots/Footer';
import Logo from '../slots/Logo/Logo';
import LanguageSwitcher from '../slots/LanguageSwitcher/LanguageSwitcher';
import Navigation from '../slots/Navigation/Navigation';
import ContentArea from '../slots/ContentArea';
import MainFooter from '../slots/MainFooter/MainFooter';
import Breadcrumbs from '../slots/Breadcrumbs';
import { NotContentTypeCondition } from '../helpers';
import AnonymousTools from '../slots/HeaderTools/AnonymousTools';
import HeaderTools from '../slots/HeaderTools/HeaderTools';
import SearchWidget from '../slots/HeaderTools/SearchWidget';
import Actions from '../slots/HeaderTools/Actions';

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

  // Header Tools
  config.registerSlotComponent({
    name: 'HeaderTools',
    slot: 'headerTools',
    component: HeaderTools,
  });

  config.registerSlotComponent({
    name: 'Actions',
    slot: 'actions',
    component: Actions,
  });

  config.registerSlotComponent({
    name: 'AnonymousTools',
    slot: 'anonymousTools',
    component: AnonymousTools,
  });

  config.registerSlotComponent({
    name: 'SearchWidget',
    slot: 'searchWidget',
    component: SearchWidget,
  });

  config.registerSlotComponent({
    name: 'LanguageSwitcher',
    slot: 'languageSwitcher',
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
