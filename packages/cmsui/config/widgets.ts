import type { ConfigType } from '@plone/registry';
import { QuantaTextAreaField, QuantaTextField } from '@plone/components';

export default function install(config: ConfigType) {
  config.widgets.default = QuantaTextField;
  config.widgets.widget.textarea = QuantaTextAreaField;

  return config;
}
