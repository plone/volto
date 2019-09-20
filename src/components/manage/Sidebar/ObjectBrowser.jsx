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

    openObjectBrowser = (mode = 'image') =>
      this.setState({ isObjectBrowserOpen: true, mode });
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
            />
          </CSSTransition>
        </>
      );
    }
  };
export default withObjectBrowser;
