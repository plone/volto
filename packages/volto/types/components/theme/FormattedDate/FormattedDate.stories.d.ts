export const Default: any;
export const Localized: any;
export const Long: any;
export const IncludeTime: any;
export const CustomFormat: any;
export const SplitParts: any;
declare namespace _default {
    export let title: string;
    export { FormattedDate as component };
    export let decorators: ((Story: any) => import("react/jsx-runtime").JSX.Element)[];
    export namespace argTypes {
        namespace locale {
            let options: string[];
            namespace control {
                let type: string;
            }
        }
    }
}
export default _default;
import FormattedDate from './FormattedDate';
