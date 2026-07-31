export const Default: any;
export const PathToBlocks: any;
export const InvalidBlocks: any;
declare namespace _default {
    export let title: string;
    export { RenderBlocksComponent as component };
    export let decorators: ((Story: any) => import("react/jsx-runtime").JSX.Element)[];
    export namespace argTypes {
        namespace view {
            let description: string;
        }
        namespace blocks {
            let description_1: string;
            export { description_1 as description };
        }
        namespace blocks_layout {
            let description_2: string;
            export { description_2 as description };
        }
    }
}
export default _default;
import RenderBlocksComponent from './RenderBlocks';
