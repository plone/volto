export const Default: any;
export const Localized: any;
export const Style: any;
export const RelativeToDate: any;
export const LiveRefresh: any;
export const SplitParts: any;
declare namespace _default {
    export let title: string;
    export { FormattedRelativeDate as component };
    export let decorators: ((Story: any) => import("react/jsx-runtime").JSX.Element)[];
    export namespace argTypes {
        namespace live {
            namespace control {
                let type: string;
            }
        }
        namespace refresh {
            export namespace control_1 {
                let type_1: string;
                export { type_1 as type };
            }
            export { control_1 as control };
        }
        namespace date {
            export namespace control_2 {
                let type_2: string;
                export { type_2 as type };
            }
            export { control_2 as control };
        }
        namespace relativeTo {
            export namespace control_3 {
                let type_3: string;
                export { type_3 as type };
            }
            export { control_3 as control };
        }
        namespace locale {
            export namespace control_4 {
                let type_4: string;
                export { type_4 as type };
                export let options: string[];
            }
            export { control_4 as control };
        }
        namespace style {
            export namespace control_5 {
                let type_5: string;
                export { type_5 as type };
                let options_1: string[];
                export { options_1 as options };
            }
            export { control_5 as control };
        }
    }
}
export default _default;
import FormattedRelativeDate from './FormattedRelativeDate';
