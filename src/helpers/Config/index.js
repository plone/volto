import { merge } from 'lodash';

let _config = {};

export function load(newConfig) {
  _config = merge(_config, newConfig);
}

export function get() {
  return _config;
}
