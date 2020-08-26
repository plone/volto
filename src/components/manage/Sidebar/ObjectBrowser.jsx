import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ObjectBrowserBody from '@plone/volto/components/manage/Sidebar/ObjectBrowserBody';
import { getParentURL } from '@plone/volto/components/manage/Sidebar/ObjectBrowserBody';

const DEFAULT_TIMEOUT = 500;

const withObjectBrowser = (WrappedComponent) =>
  class extends React.Component {
    /**
     * Default properties
     * @property {Object} defaultProps Default properties.
     * @static
     */
    static defaultProps = {
      onChangeBlock: () => {},
      data: {},
      block: new Date().getTime() + '',
    };

    constructor() {
      super();
      this.state = { isObjectBrowserOpen: false };
    }

    /**
     * openObjectBrowser
     * @function openObjectBrowser
     * @param {Object} object ObjectBrowser configuration.
     * @param {string} object.mode Quick mode, defaults to `image`. Values: link, image, multiple
     * @param {string} object.dataName Name of the block data property to write the selected item.
     * @param {string} object.onSelectItem Function that will be called on item selection.
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
    openObjectBrowser = ({
      mode = 'image',
      onSelectItem = null,
      dataName = null,
      propDataName = null,
      selectableTypes,
      maximumSelectionSize,
    } = {}) =>
      this.setState({
        isObjectBrowserOpen: true,
        mode,
        onSelectItem,
        dataName,
        propDataName,
        selectableTypes,
        maximumSelectionSize,
      });

    closeObjectBrowser = () => this.setState({ isObjectBrowserOpen: false });

    render() {
      let contextURL = this.props.pathname;
      if (this.props.pathname?.endsWith('edit')) {
        contextURL = getParentURL(this.props.pathname);
      }
      return (
        <>
          <WrappedComponent
            {...this.props}
            isObjectBrowserOpen={this.state.isObjectBrowserOpen}
            openObjectBrowser={this.openObjectBrowser}
            closeObjectBrowser={this.closeObjectBrowser}
          />
          <CSSTransition
            in={this.state.isObjectBrowserOpen}
            timeout={DEFAULT_TIMEOUT}
            classNames="sidebar-container"
            unmountOnExit
          >
            <ObjectBrowserBody
              {...this.props}
              data={
                this.state.propDataName
                  ? this.props[this.state.propDataName]
                  : { ...this.props.data, url: contextURL }
              }
              closeObjectBrowser={this.closeObjectBrowser}
              mode={this.state.mode}
              onSelectItem={this.state.onSelectItem}
              dataName={this.state.dataName}
              selectableTypes={this.state.selectableTypes}
              maximumSelectionSize={this.state.maximumSelectionSize}
            />
          </CSSTransition>
        </>
      );
    }
  };
export default withObjectBrowser;
