import { withImage } from './extensions';
import { ImageElement } from './render';
import { extractImages } from './deconstruct';

export default function install(config) {
  const { slate } = config.settings;

  slate.extensions = [...(slate.extensions || []), withImage];
  slate.elements.img = ImageElement;
  slate.voltoBlockEmiters = [
    ...(config.settings.slate.voltoBlockEmiters || []),
    extractImages,
  ];

  return config;
}
