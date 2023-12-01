import { withImage } from './extensions';
import { ImageElement } from './render';

export default function install(config) {
  const { slate } = config.settings;

  slate.extensions = [...(slate.extensions || []), withImage];
  slate.elements.img = ImageElement;

  return config;
}
