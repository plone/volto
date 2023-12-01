/**
 * ObjectBrowserWidget component class.
 * @class ObjectBrowserWidget
 * @extends Component
 */
export class ObjectBrowserWidgetComponent extends Component<any, any, any> {
    /**
     * Property types.
     * @property {Object} propTypes Property types.
     * @static
     */
    static propTypes: {
        id: any;
        title: any;
        description: any;
        mode: any;
        return: any;
        initialPath: any;
        required: any;
        error: any;
        value: any;
        onChange: any;
        openObjectBrowser: any;
        allowExternals: any;
        placeholder: any;
    };
    /**
     * Default properties
     * @property {Object} defaultProps Default properties.
     * @static
     */
    static defaultProps: {
        description: any;
        required: boolean;
        error: any[];
        value: any[];
        mode: string;
        return: string;
        initialPath: string;
        allowExternals: boolean;
    };
    constructor(props: any);
    state: {
        manualLinkInput: string;
        validURL: boolean;
    };
    selectedItemsRef: any;
    placeholderRef: any;
    renderLabel(item: any): JSX.Element;
    removeItem: (item: any) => void;
    onChange: (item: any) => void;
    onManualLinkInput: (e: any) => void;
    validateManualLink: (url: any) => any;
    onSubmitManualLink: () => void;
    onKeyDownManualLink: (e: any) => void;
    showObjectBrowser: (ev: any) => void;
    handleSelectedItemsRefClick: (e: any) => void;
    /**
     * Render method.
     * @method render
     * @returns {string} Markup for the component.
     */
    render(): string;
}
declare const _default: import("react").ForwardRefExoticComponent<Pick<import("react-intl").WithIntlProps<import("react-intl").WrappedComponentProps<string>>, string> & import("react").RefAttributes<import("react").ComponentType<import("react-intl").WrappedComponentProps<string>>>> & {
    WrappedComponent: import("react").ComponentType<import("react-intl").WrappedComponentProps<string>>;
};
export default _default;
import { Component } from 'react';
export function ObjectBrowserWidgetMode(mode: any): import("react").ForwardRefExoticComponent<Pick<import("react-intl").WithIntlProps<import("react-intl").WrappedComponentProps<string>>, string> & import("react").RefAttributes<import("react").ComponentType<import("react-intl").WrappedComponentProps<string>>>> & {
    WrappedComponent: import("react").ComponentType<import("react-intl").WrappedComponentProps<string>>;
};
