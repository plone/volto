declare namespace _default {
    export let title: string;
    export { Pluggable as component };
    export namespace parameters {
        let componentSubtitle: string;
        namespace docs {
            function page(): JSX.Element;
        }
    }
}
export default _default;
export function Simple(args: any): JSX.Element;
export namespace Simple {
    export namespace parameters_1 {
        export namespace docs_1 {
            namespace description {
                let component: string;
            }
            namespace source {
                let code: string;
            }
        }
        export { docs_1 as docs };
    }
    export { parameters_1 as parameters };
}
export function Override(args: any): JSX.Element;
export namespace Override {
    export namespace parameters_2 {
        export namespace docs_2 {
            export namespace description_1 {
                let componentSubtitle_1: string;
                export { componentSubtitle_1 as componentSubtitle };
            }
            export { description_1 as description };
            export namespace source_1 {
                let code_1: string;
                export { code_1 as code };
            }
            export { source_1 as source };
        }
        export { docs_2 as docs };
    }
    export { parameters_2 as parameters };
}
export function UsingCreatePluggableAndPlug(args: any): JSX.Element;
export namespace UsingCreatePluggableAndPlug {
    export let storyName: string;
    export namespace parameters_3 {
        export { createPluggableAndPlug as component };
        export namespace docs_3 {
            export namespace description_2 {
                let componentSubtitle_2: string;
                export { componentSubtitle_2 as componentSubtitle };
            }
            export { description_2 as description };
            export namespace source_2 {
                let code_2: string;
                export { code_2 as code };
            }
            export { source_2 as source };
        }
        export { docs_3 as docs };
    }
    export { parameters_3 as parameters };
}
import { Pluggable } from './index';
import { createPluggableAndPlug } from './index';
