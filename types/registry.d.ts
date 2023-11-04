export default instance;
declare const instance: Config;
declare class Config {
    _data: {};
    set(registry: any, item: any): void;
    get(registry: any): any;
    set settings(arg: any);
    get settings(): any;
    set experimental(arg: any);
    get experimental(): any;
    set blocks(arg: any);
    get blocks(): any;
    set views(arg: any);
    get views(): any;
    set widgets(arg: any);
    get widgets(): any;
    set addonReducers(arg: any);
    get addonReducers(): any;
    set addonRoutes(arg: any);
    get addonRoutes(): any;
    set slots(arg: any);
    get slots(): any;
    set components(arg: any);
    get components(): any;
    getComponent({ name, dependencies }: {
        name: any;
        dependencies?: string;
    }, ...args: any[]): any;
    registerComponent({ name, component, dependencies }: {
        name: any;
        component: any;
        dependencies?: string;
    }): void;
}
