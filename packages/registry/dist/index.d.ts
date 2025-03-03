import { SettingsConfig, BlocksConfig, ViewsConfig, WidgetsConfig, AddonReducersConfig, AddonRoutesConfig, ReactRouterRouteEntry, SlotsConfig, ComponentsConfig, UtilitiesConfig, ExperimentalConfig, GetSlotArgs, GetSlotReturn, SlotPredicate, SlotComponent } from '@plone/types';

type ConfigData = {
    settings: SettingsConfig | Record<string, never>;
    blocks: BlocksConfig | Record<string, never>;
    views: ViewsConfig | Record<string, never>;
    widgets: WidgetsConfig | Record<string, never>;
    addonReducers?: AddonReducersConfig;
    addonRoutes?: AddonRoutesConfig;
    routes?: Array<ReactRouterRouteEntry>;
    slots: SlotsConfig | Record<string, never>;
    components: ComponentsConfig | Record<string, never>;
    utilities: UtilitiesConfig | Record<string, never>;
    experimental?: ExperimentalConfig;
};
type GetComponentResult = {
    component: React.ComponentType<any>;
};
type GetUtilityResult = {
    method: (...args: any[]) => any;
};
type ConfigType = InstanceType<typeof Config>;
declare class Config {
    _data: ConfigData | Record<string, never>;
    static instance: ConfigType;
    constructor();
    set<RegistryKey extends keyof ConfigData>(registry: RegistryKey, item: ConfigData[RegistryKey]): void;
    get(registry: keyof ConfigData): SettingsConfig | Record<string, never> | BlocksConfig | ViewsConfig | WidgetsConfig | AddonReducersConfig | AddonRoutesConfig | ReactRouterRouteEntry[] | SlotsConfig | ComponentsConfig | UtilitiesConfig | ExperimentalConfig | undefined;
    get settings(): SettingsConfig | Record<string, never>;
    set settings(settings: SettingsConfig | Record<string, never>);
    get experimental(): ExperimentalConfig | undefined;
    set experimental(experimental: ExperimentalConfig | undefined);
    get blocks(): Record<string, never> | BlocksConfig;
    set blocks(blocks: Record<string, never> | BlocksConfig);
    get views(): Record<string, never> | ViewsConfig;
    set views(views: Record<string, never> | ViewsConfig);
    get widgets(): Record<string, never> | WidgetsConfig;
    set widgets(widgets: Record<string, never> | WidgetsConfig);
    get addonReducers(): AddonReducersConfig | undefined;
    set addonReducers(addonReducers: AddonReducersConfig | undefined);
    get addonRoutes(): AddonRoutesConfig | undefined;
    set addonRoutes(addonRoutes: AddonRoutesConfig | undefined);
    get routes(): ReactRouterRouteEntry[] | undefined;
    set routes(routes: ReactRouterRouteEntry[] | undefined);
    get slots(): Record<string, never> | SlotsConfig;
    set slots(slots: Record<string, never> | SlotsConfig);
    get components(): Record<string, never> | ComponentsConfig;
    set components(components: Record<string, never> | ComponentsConfig);
    get utilities(): Record<string, never> | UtilitiesConfig;
    set utilities(utilities: Record<string, never> | UtilitiesConfig);
    getComponent(options: {
        name: string;
        dependencies?: string[] | string;
    } | string): GetComponentResult;
    registerComponent(options: {
        name: string;
        dependencies?: string[] | string;
        component: React.ComponentType;
    }): void;
    getSlot(name: string, args: GetSlotArgs): GetSlotReturn;
    registerSlotComponent(options: {
        slot: string;
        name: string;
        predicates?: SlotPredicate[];
        component: SlotComponent['component'];
    }): void;
    getSlotComponent(slot: string, name: string): SlotComponent[];
    getSlotComponents(slot: string): string[];
    reorderSlotComponent({ slot, name, position, action, target, }: {
        slot: string;
        name: string;
        position?: number;
        action?: 'after' | 'before' | 'first' | 'last';
        target?: string;
    }): void;
    unRegisterSlotComponent(slot: string, name: string, position: number): void;
    registerUtility(options: {
        name: string;
        type: string;
        dependencies?: Record<string, string>;
        method: (args: any) => any;
    }): void;
    getUtility(options: {
        name: string;
        type: string;
        dependencies?: Record<string, string>;
    }): GetUtilityResult;
    getUtilities(options: {
        type: string;
        dependencies?: Record<string, string>;
    }): Array<GetUtilityResult>;
    registerRoute(options: ReactRouterRouteEntry): void;
}
declare const instance: Config;

export { type ConfigData, type ConfigType, instance as default };
