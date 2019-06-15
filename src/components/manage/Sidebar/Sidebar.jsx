import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import SidebarBody from './SidebarBody';

const DEFAULT_TIMEOUT = 500;

const Sidebar = props => {
  const isSidebarOpen = useSelector(state => state.sidebar.isSidebarOpen);

  return (
    <CSSTransition
      in={isSidebarOpen}
      timeout={DEFAULT_TIMEOUT}
      classNames="sidebar-container"
      unmountOnExit
    >
      <SidebarBody {...props} />
    </CSSTransition>
  );
};

Sidebar.propTypes = {
  tile: PropTypes.string,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  closeBrowser: PropTypes.func.isRequired,
  onChangeTile: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  tile: '',
};

export default Sidebar;
