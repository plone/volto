import type { IntlShape } from 'react-intl';
import type { Location } from 'history';
import type { BlocksConfigData } from '@plone/types';
type RouteProps = {
    history: History;
    location: Location;
};
/**
 * List the configured blocks, by title.
 *
 * An add-on can configure a block that was never registered — enhancing one
 * that ships with another add-on, say — which leaves an entry behind that is
 * not a block at all, with no id or no title. `BlockConfigBase` says both are
 * always there, but the config disagrees, so drop those entries rather than
 * list a block that does not exist.
 * @function sortConfigBlocks
 * @param {BlocksConfigData} blocksConfig The blocks configuration.
 * @param {IntlShape} intl Used to translate each block title.
 * @returns {Array} The configured blocks, sorted by translated title.
 */
export declare function sortConfigBlocks(blocksConfig: BlocksConfigData, intl: IntlShape): {
    title: string;
    id: string;
    icon: string;
    group: string;
    category?: string;
    blockModel?: number;
    view?: React.ComponentType<import("@plone/types").BlockViewProps>;
    edit?: React.ComponentType<import("@plone/types").BlockEditProps>;
    schema?: object;
    blockSchema: import("@plone/types").JSONSchema | ((args?: import("@plone/types").BlockSchemaArgs) => import("@plone/types").JSONSchema);
    dataAdapter?: ({ block, data, id, onChangeBlock, value, }: {
        block: string;
        data: import("@plone/types").BlocksFormData;
        id: string;
        onChangeBlock: (id: string, newData: any) => void;
        value: any;
    }) => void;
    restricted: ((args: {
        properties: import("@plone/types").Content;
        block: import("@plone/types").BlockConfigBase;
        navRoot: import("@plone/types").Content;
        contentType: string;
        user: import("@plone/types").User;
    }) => boolean) | boolean;
    mostUsed: boolean;
    blockHasOwnFocusManagement?: boolean;
    sidebarTab: boolean | 0 | 1;
    schemaEnhancer?: (args: import("@plone/types").SchemaEnhancerArgs) => import("@plone/types").JSONSchema;
    variations?: import("@plone/types").BlockExtension[];
    extensions?: Record<string, import("@plone/types").BlockExtension>;
    blocksConfig?: Partial<BlocksConfigData>;
}[];
declare const BlockTypesControlpanel: (props: RouteProps) => import("react/jsx-runtime").JSX.Element;
export default BlockTypesControlpanel;
