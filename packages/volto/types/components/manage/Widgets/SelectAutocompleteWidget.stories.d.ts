export const Default: any;
export const Required: any;
export const FilledWithToken: any;
export const FilledWithString: any;
export const Errored: any;
export const NoPlaceholder: any;
export const Disabled: any;
export const ManyOptions1000: any;
declare namespace _default {
    export let title: string;
    export { SelectAutoCompleteComponent as component };
    export let decorators: ((Story: any) => JSX.Element)[];
    export namespace argTypes {
        namespace value {
            namespace control {
                let disable: boolean;
            }
        }
        namespace getVocabulary {
            export namespace control_1 {
                let disable_1: boolean;
                export { disable_1 as disable };
            }
            export { control_1 as control };
        }
    }
}
export default _default;
import { SelectAutoCompleteComponent } from './SelectAutoComplete';
