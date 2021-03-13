export default function applyConfig(config) {
  config.settings.isMultilingual = true;
  config.settings.supportedLanguages = ['en', 'es'];
  return config;
}
