import {
  installAddon,
  uninstallAddon,
  upgradeAddon,
  listAddons,
} from './addons';
import {
  INSTALL_ADDON,
  LIST_ADDONS,
  UNINSTALL_ADDON,
  UPGRADE_ADDON,
} from '../../constants/ActionTypes';

describe('Addons action', () => {
  describe('installAddon', () => {
    it('should create an action to install an addon', () => {
      const id = 'plone.app.example';
      const action = installAddon(id);
      expect(action.type).toEqual(INSTALL_ADDON);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`/@addons/${id}/install`);
    });
  });
  describe('uninstallAddon', () => {
    it('should create an action to uninstall an addon', () => {
      const id = 'plone.app.example';
      const action = uninstallAddon(id);
      expect(action.type).toEqual(UNINSTALL_ADDON);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`/@addons/${id}/uninstall`);
    });
  });
  describe('upgradeAddon', () => {
    it('should create an action to upgrade an addon', () => {
      const id = 'plone.app.example';
      const action = upgradeAddon(id);
      expect(action.type).toEqual(UPGRADE_ADDON);
      expect(action.request.op).toEqual('post');
      expect(action.request.path).toEqual(`/@addons/${id}/upgrade`);
    });
  });
  describe('listAddons', () => {
    it('should create an action to list all addons', () => {
      const action = listAddons();
      expect(action.type).toEqual(LIST_ADDONS);
      expect(action.request.op).toEqual('get');
      expect(action.request.path).toEqual(`/@addons`);
    });
  });
});
