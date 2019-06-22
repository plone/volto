import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';

import { tiles } from '~/config';

class SidebarBody extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    tile: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    openSidebar: PropTypes.func.isRequired,
    closeSidebar: PropTypes.func.isRequired,
    onChangeTile: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  /**
   * Component will receive props
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  handleClickOutside = e => {
    if (this.sidebar && doesNodeContainClick(this.sidebar.current, e)) return;
    this.props.closeSidebar();
  };

  sidebar = React.createRef();

  render() {
    const SidebarComponent = tiles.sidebarComponents[this.props.data['@type']];
    return ReactDOM.createPortal(
      <aside
        onClick={e => {
          e.stopPropagation();
        }}
        ref={this.sidebar}
        key="volto-sidebar"
        className="sidebar-container"
      >
        <SidebarComponent {...this.props} />
      </aside>,
      document.body,
    );
  }
}

export default SidebarBody;
