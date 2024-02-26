export class BlocksToolbarComponent extends React.Component<any, any, any> {
    constructor(props: any);
    copyBlocksToClipboard(): void;
    cutBlocksToClipboard(): void;
    deleteBlocks(): void;
    loadFromStorage(): void;
    pasteBlocks(e: any): void;
    setBlocksClipboard(actionType: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
declare const _default: React.ForwardRefExoticComponent<Omit<import("react-intl").WithIntlProps<import("react-intl").WrappedComponentProps<string>>, "ref"> & React.RefAttributes<React.ComponentType<import("react-intl").WrappedComponentProps<string>>>> & {
    WrappedComponent: React.ComponentType<import("react-intl").WrappedComponentProps<string>>;
};
export default _default;
import React from 'react';
