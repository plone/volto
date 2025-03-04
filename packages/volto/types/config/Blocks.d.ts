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
                export let id: string;
                export let title: string;
                export { imagesSVG as icon };
                export let group: string;
                export { TeaserViewBlock as view };
                export { TeaserEditBlock as edit };
                export let restricted: boolean;
                export let mostUsed: boolean;
                export let sidebarTab: number;
                export { TeaserSchema as blockSchema };
                export { TeaserBlockDataAdapter as dataAdapter };
                export let variations: {
                    id: string;
                    isDefault: boolean;
                    title: string;
                    template: any;
                }[];
            }
            namespace image {
                export { gridImageDisableSizeAndPositionHandlersSchema as schemaEnhancer };
                let id_1: string;
                export { id_1 as id };
                let title_1: string;
                export { title_1 as title };
                export { cameraSVG as icon };
                let group_1: string;
                export { group_1 as group };
                export { ViewImageBlock as view };
                export { EditImageBlock as edit };
                export { ImageSettingsSchema as schema };
                let restricted_1: boolean;
                export { restricted_1 as restricted };
                let mostUsed_1: boolean;
                export { mostUsed_1 as mostUsed };
                let sidebarTab_1: number;
                export { sidebarTab_1 as sidebarTab };
                export { getImageBlockSizes as getSizes };
            }
        }
    }
}
export const initialBlocks: {};
export const initialBlocksFocus: {};
