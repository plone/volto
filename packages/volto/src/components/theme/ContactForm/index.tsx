import loadable from '@loadable/component';

export const ContactForm = loadable(
  () => import('@plone/volto/components/theme/ContactForm/ContactForm'),
);
