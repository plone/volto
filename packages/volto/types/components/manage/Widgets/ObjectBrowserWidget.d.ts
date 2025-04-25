/**
 * ObjectBrowserWidget component class.
 * @class ObjectBrowserWidget
 * @extends Component
 */
export class ObjectBrowserWidgetComponent extends React.Component<any, any, any> {
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
        errors: any[];
    };
    selectedItemsRef: React.RefObject<any>;
    placeholderRef: React.RefObject<any>;
    renderLabel(item: any): import("react/jsx-runtime").JSX.Element;
    removeItem: (item: any) => void;
    onChange: (item: any) => void;
    onManualLinkInput: (e: any) => void;
    validateManualLink: (url: any) => boolean;
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
declare const _default: React.ForwardRefExoticComponent<Omit<import("react-intl").WithIntlProps<import("react-intl").WrappedComponentProps<string>>, "ref"> & React.RefAttributes<React.ComponentType<import("react-intl").WrappedComponentProps<string>>>> & {
    WrappedComponent: React.ComponentType<import("react-intl").WrappedComponentProps<string>>;
};
export default _default;
import React from 'react';
export function ObjectBrowserWidgetMode(mode: any): React.ForwardRefExoticComponent<Omit<import("react-intl").WithIntlProps<import("react-intl").WrappedComponentProps<string>>, "ref"> & React.RefAttributes<React.ComponentType<import("react-intl").WrappedComponentProps<string>>>> & {
    WrappedComponent: React.ComponentType<import("react-intl").WrappedComponentProps<string>>;
};
