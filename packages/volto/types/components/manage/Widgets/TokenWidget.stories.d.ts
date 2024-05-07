export const Default: any;
export const Required: any;
export const Filled: any;
export const Errored: any;
export const NoPlaceholder: any;
export const WithoutNoValueOption: any;
export const Disabled: any;
declare namespace _default {
    export let title: string;
    export { TokenWidget as component };
    export let decorators: ((Story: any) => import("react/jsx-runtime").JSX.Element)[];
    export namespace argTypes {
        namespace value {
            namespace control {
                let disable: boolean;
            }
        }
    }
}
export default _default;
import TokenWidget from './TokenWidget';
