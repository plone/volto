import React from 'react';
import { CSSTransition } from 'react-transition-group';
import ObjectBrowserBody from './ObjectBrowserBody';

const DEFAULT_TIMEOUT = 500;

const withObjectBrowser = WrappedComponent =>
  class extends React.Component {
    constructor() {
      super();
      this.state = { isObjectBrowserOpen: false };
    }

    /**
     * openObjectBrowser
     * @function openObjectBrowser
     * @param {Object} object ObjectBrowser configuration.
     * @param {string} object.mode Quick mode, defaults to `image`.
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
    } = {}) =>
      this.setState({
        isObjectBrowserOpen: true,
        mode,
        onSelectItem,
        dataName,
      });

    closeObjectBrowser = () => this.setState({ isObjectBrowserOpen: false });

    render() {
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
              closeObjectBrowser={this.closeObjectBrowser}
              mode={this.state.mode}
              onSelectItem={this.state.onSelectItem}
              dataName={this.state.dataName}
            />
          </CSSTransition>
        </>
      );
    }
  };
export default withObjectBrowser;
