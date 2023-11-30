export function editorStateSettingLink(editorState: any, selection: any, data: any): any;
export function getCurrentLinkEntityKey(editorState: any): any;
export function getCurrentLink(editorState: any): any;
export default createLinkDetectionPlugin;
declare function createLinkDetectionPlugin(): {
    decorators: {
        strategy: (contentBlock: any, callback: any, contentState: any) => void;
        component: (props: any) => JSX.Element;
    }[];
    onChange: (editorState: any) => any;
};
