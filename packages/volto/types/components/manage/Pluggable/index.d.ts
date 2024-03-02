export function usePluggable(name: any): any;
/**

**/
export function Pluggable(props: any): any;
export function usePlug({ pluggable, id, renderer, dependencies, options }: {
    pluggable: any;
    id: any;
    renderer: any;
    dependencies: any;
    options: any;
}): void;
export function createPluggable(name: any): {
    (props: any): React.FunctionComponentElement<any>;
    pluggableName: any;
    Plug: {
        (props: any): React.FunctionComponentElement<{
            [x: string]: any;
            pluggable: any;
            id: any;
            dependencies?: any[];
            children: any;
        }>;
        displayName: string;
    };
};
/**
 * Creates a Pluggable + Plug pair
 */
export function createPluggableAndPlug(name: any): ({
    (props: any): React.FunctionComponentElement<any>;
    pluggableName: any;
    Plug: {
        (props: any): React.FunctionComponentElement<{
            [x: string]: any;
            pluggable: any;
            id: any;
            dependencies?: any[];
            children: any;
        }>;
        displayName: string;
    };
} | {
    (props: any): React.FunctionComponentElement<{
        [x: string]: any;
        pluggable: any;
        id: any;
        dependencies?: any[];
        children: any;
    }>;
    displayName: string;
})[];
export const context: React.Context<any>;
export function Plug({ pluggable, id, dependencies, children, ...options }: {
    [x: string]: any;
    pluggable: any;
    id: any;
    dependencies?: any[];
    children: any;
}): any;
export function PluggablesProvider({ children }: {
    children: any;
}): React.FunctionComponentElement<React.ProviderProps<any>>;
export default Pluggable;
import React from 'react';
