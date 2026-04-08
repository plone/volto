export function installDefaultBlocks(config: any): void;
export const groupBlocksOrder: {
    id: string;
    title: string;
}[];
export const requiredBlocks: string[];
export namespace blocksConfig {
    namespace gridBlock {
        namespace blocksConfig {
            namespace teaser {
                export { gridTeaserDisableStylingSchema as schemaEnhancer };
            }
            namespace image {
                export { gridImageDisableSizeAndPositionHandlersSchema as schemaEnhancer };
            }
        }
    }
}
export const initialBlocks: {};
export const initialBlocksFocus: {};
import { gridTeaserDisableStylingSchema } from '@plone/volto/components/manage/Blocks/Teaser/schema';
import { gridImageDisableSizeAndPositionHandlersSchema } from '@plone/volto/components/manage/Blocks/Image/schema';
