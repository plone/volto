import { gridTeaserDisableStylingSchema } from '@plone/volto/components/manage/Blocks/Teaser/schema';

/**
 * finalizeCoreConfiguration
 *
 * It allows the finalization of the configuration object. In some edge cases, the core need to
 * modify the configuration **after** the add-ons apply theirs.
 *
 * @export
 * @param {*} config
 */
export function finalizeCoreConfiguration(config) {
  // This is required in order to initialize the inner blocksConfig
  // for the grid block, since we need to modify how the inner teaser
  // block behave in it (= no schemaEnhancer fields for teasers inside a grid)
  // Afterwards, it can be further customized in add-ons using the same technique.
  config.blocks.blocksConfig.gridBlock.blocksConfig = {
    ...config.blocks.blocksConfig,
  };
  config.blocks.blocksConfig.gridBlock.blocksConfig.teaser = {
    ...config.blocks.blocksConfig.teaser,
    schemaEnhancer: gridTeaserDisableStylingSchema,
  };
}
