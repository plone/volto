export default withObjectBrowser;
declare function withObjectBrowser(WrappedComponent: any): {
    new (): {
        state: {
            isObjectBrowserOpen: boolean;
        };
        /**
         * openObjectBrowser
         * @function openObjectBrowser
         * @param {Object} object ObjectBrowser configuration.
         * @param {string} object.mode Quick mode, defaults to `image`. Values: link, image, multiple
         * @param {string} object.dataName Name of the block data property to write the selected item.
         * @param {string} object.onSelectItem Function that will be called on item selection.
         * @param {string} object.overlay Boolean to show overlay background on content when opening objectBrowser.
         *
         * Usage:
         *
         * this.props.openObjectBrowser();
         *
         * this.props.openObjectBrowser({mode: 'link'});
         *
         * this.props.openObjectBrowser({
         *   dataName: 'myfancydatafield'
         *   });
         *
         * this.props.openObjectBrowser({
         *   onSelectItem: url =>
         *     this.props.onChangeBlock(this.props.block, {
         *       ...this.props.data,
         *       myfancydatafield: url,
         *     }),
         *   });
         */
        openObjectBrowser: ({ mode, onSelectItem, dataName, overlay, propDataName, searchableTypes, selectableTypes, maximumSelectionSize, currentPath, }?: {
            mode: string;
            dataName: string;
            onSelectItem: string;
            overlay: string;
        }) => any;
        closeObjectBrowser: () => any;
        render(): JSX.Element;
    };
    /**
     * Default properties
     * @property {Object} defaultProps Default properties.
     * @static
     */
    defaultProps: {
        onChangeBlock: () => void;
        data: {};
        block: string;
    };
};
