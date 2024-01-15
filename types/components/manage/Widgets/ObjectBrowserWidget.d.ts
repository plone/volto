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
        id: PropTypes.Validator<string>;
        title: PropTypes.Validator<string>;
        description: PropTypes.Requireable<string>;
        mode: PropTypes.Requireable<string>;
        return: PropTypes.Requireable<string>;
        initialPath: PropTypes.Requireable<string>;
        required: PropTypes.Requireable<boolean>;
        error: PropTypes.Requireable<string[]>;
        value: PropTypes.Requireable<object>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
        openObjectBrowser: PropTypes.Validator<(...args: any[]) => any>;
        allowExternals: PropTypes.Requireable<boolean>;
        placeholder: PropTypes.Requireable<string>;
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
    selectedItemsRef: React.RefObject<any>;
    placeholderRef: React.RefObject<any>;
    renderLabel(item: any): JSX.Element;
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
declare const _default: React.ForwardRefExoticComponent<Pick<import("react-intl").WithIntlProps<import("react-intl").WrappedComponentProps<string>>, string> & React.RefAttributes<React.ComponentType<import("react-intl").WrappedComponentProps<string>>>> & {
    WrappedComponent: React.ComponentType<import("react-intl").WrappedComponentProps<string>>;
};
export default _default;
import React from 'react';
import PropTypes from 'prop-types';
export function ObjectBrowserWidgetMode(mode: any): React.ForwardRefExoticComponent<Pick<import("react-intl").WithIntlProps<import("react-intl").WrappedComponentProps<string>>, string> & React.RefAttributes<React.ComponentType<import("react-intl").WrappedComponentProps<string>>>> & {
    WrappedComponent: React.ComponentType<import("react-intl").WrappedComponentProps<string>>;
};
