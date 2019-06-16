import React from 'react';
import { CSSTransition } from 'react-transition-group';
import SidebarBody from './SidebarBody';

const DEFAULT_TIMEOUT = 500;

const withSidebar = WrappedComponent =>
  class extends React.Component {
    constructor() {
      super();
      this.state = { isSidebarOpen: false };
    }

    openSidebar = () => this.setState({ isSidebarOpen: true });
    closeSidebar = () => this.setState({ isSidebarOpen: false });

    render() {
      return (
        <>
          <WrappedComponent
            {...this.props}
            isSidebarOpen={this.state.isSidebarOpen}
            openSidebar={this.openSidebar}
            closeSidebar={this.closeSidebar}
          />
          <CSSTransition
            in={this.state.isSidebarOpen}
            timeout={DEFAULT_TIMEOUT}
            classNames="sidebar-container"
            unmountOnExit
          >
            <SidebarBody {...this.props} closeSidebar={this.closeSidebar} />
          </CSSTransition>
        </>
      );
    }
  };

export default withSidebar;
