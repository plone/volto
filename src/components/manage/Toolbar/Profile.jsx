import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '../../../components';
import backSVG from '../../../icons/back.svg';

class Profile extends Component {
  static propTypes = {
    unloadComponent: PropTypes.func.isRequired,
    componentIndex: PropTypes.number.isRequired,
  };

  pull = () => {
    this.props.unloadComponent();
  };

  render() {
    return (
      <div
        className="profile pastanaga-menu"
        style={{
          left: `${this.props.componentIndex * 100}%`,
          width: '100vw',
        }}
      >
        <header className="header pulled">
          <button onClick={this.pull}>
            <Icon name={backSVG} size="36px" />
          </button>
          <div className="vertical divider" />
          <h2>Profile</h2>
        </header>
      </div>
    );
  }
}

export default Profile;
