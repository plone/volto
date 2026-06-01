import type { ConfigType } from '@plone/registry';
import LoginLogo from '../components/Login/LoginLogo';
import LoginHero from '../components/Login/LoginHero';
import LoginActions from '../components/Login/LoginActions';

export default function installSlots(config: ConfigType) {
  config.registerSlotComponent({
    name: 'LoginLogo',
    slot: 'loginLogo',
    component: LoginLogo,
  });

  config.registerSlotComponent({
    name: 'LoginHero',
    slot: 'loginHero',
    component: LoginHero,
  });

  config.registerSlotComponent({
    name: 'LoginActions',
    slot: 'loginActions',
    component: LoginActions,
  });
}
