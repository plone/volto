export default Link;
declare function Link({ children, className, entityKey, getEditorState, target }: {
    children: any;
    className: any;
    entityKey: any;
    getEditorState: any;
    target: any;
}): JSX.Element;
declare namespace Link {
    export { propTypes };
    export namespace defaultProps {
        let className: any;
        let entityKey: any;
        let target: any;
    }
}
declare namespace propTypes {
    let className_1: any;
    export { className_1 as className };
    export let children: any;
    let entityKey_1: any;
    export { entityKey_1 as entityKey };
    export let getEditorState: any;
    let target_1: any;
    export { target_1 as target };
}
