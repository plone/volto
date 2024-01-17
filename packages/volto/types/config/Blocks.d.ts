/// <reference types="@plone/registry/node_modules/@plone/types/src/modules" />
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
                    template: {
                        (props: any): JSX.Element;
                        propTypes: {
                            data: any;
                            isEditMode: any;
                        };
                    };
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
import { gridTeaserDisableStylingSchema } from '@plone/volto/components/manage/Blocks/Teaser/schema';
import imagesSVG from '@plone/volto/icons/images.svg';
import TeaserViewBlock from '@plone/volto/components/manage/Blocks/Teaser/View';
import TeaserEditBlock from '@plone/volto/components/manage/Blocks/Teaser/Edit';
import { TeaserSchema } from '@plone/volto/components/manage/Blocks/Teaser/schema';
import { TeaserBlockDataAdapter } from '@plone/volto/components/manage/Blocks/Teaser/adapter';
import { gridImageDisableSizeAndPositionHandlersSchema } from '@plone/volto/components/manage/Blocks/Image/schema';
import cameraSVG from '@plone/volto/icons/camera.svg';
import ViewImageBlock from '@plone/volto/components/manage/Blocks/Image/View';
import EditImageBlock from '@plone/volto/components/manage/Blocks/Image/Edit';
import ImageSettingsSchema from '@plone/volto/components/manage/Blocks/Image/LayoutSchema';
import { getImageBlockSizes } from '@plone/volto/components/manage/Blocks/Image/utils';
