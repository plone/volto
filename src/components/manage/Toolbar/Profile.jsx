import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../../components';
import backSVG from '../../../icons/back.svg';

/**
 * Profile container class.
 * @class Profile
 * @extends Component
 */
class Profile extends Component {
  static propTypes = {
    unloadComponent: PropTypes.func.isRequired,
    componentIndex: PropTypes.number.isRequired,
  };

  pull = () => {
    this.props.unloadComponent();
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div
        className="profile pastanaga-menu"
        style={{
          width: '100vw',
        }}
      >
        <header className="header pulled">
          <button onClick={this.pull}>
            <Icon name={backSVG} size="32px" />
          </button>
          <div className="vertical divider" />
          <h2>Profile</h2>
        </header>
      </div>
    );
  }
}

export default Profile;
