import { type ConfigType } from '@plone/registry';
import Logo from './components/Logo/Logo';

export default function install(config: ConfigType): ConfigType {
  // config.unRegisterSlotComponent('logo', 'Logo', 0);
  // console.log('slots', JSON.stringify(config.slots, null, 2));
  config.registerSlotComponent({
    name: 'Logo',
    slot: 'logo',
    component: Logo,
    predicates: [() => true],
  });

  return config;
}
