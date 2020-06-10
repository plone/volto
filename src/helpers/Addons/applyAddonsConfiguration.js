import packageJSON from '~/../package.json';
import { has } from 'lodash';

const getAddonConfigs = (addonConfigString) => {
  const configsToLoad = [];
  const addonConfigLoadInfo = addonConfigString.split(':');
  const addonConfigs = require(addonConfigLoadInfo[0]);
  configsToLoad.push(addonConfigs.default);

  if (addonConfigLoadInfo.length > 1) {
    const additionalConfigs = addonConfigLoadInfo[1].split(',');
    additionalConfigs.forEach((additionalConfig) => {
      if (has(addonConfigs, additionalConfig)) {
        configsToLoad.push(addonConfigs[additionalConfig]);
      } else {
        console.log(
          `Config ${additionalConfig} for addon ${addonConfigLoadInfo[0]} not found in addon exports`,
        );
      }
    });
  }
  return configsToLoad;
};

export default (config) => {
  const addons = packageJSON.addons;
  let configsToLoad = [];
  addons.forEach((addon) => {
    configsToLoad = [...configsToLoad, ...getAddonConfigs(addon)];
  });

  return configsToLoad.reduce((acc, apply) => apply(acc), config);
};
