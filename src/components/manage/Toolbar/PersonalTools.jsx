import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { Icon } from '../../../components';

import { getUser } from '../../../actions';
import logoutSVG from '../../../icons/log-out.svg';
import rightArrowSVG from '../../../icons/right-key.svg';
import avatar from './avatar.jpg';
import backSVG from '../../../icons/back.svg';

/**
 * Toolbar container class.
 * @class PersonalTools
 * @extends Component
 */
@connect(
  state => ({
    user: state.users.user,
    loaded: state.users.get.loaded,
    loading: state.users.update.loading,
    userId: state.userSession.token
      ? jwtDecode(state.userSession.token).sub
      : '',
  }),
  { getUser },
)
class PersonalTools extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    user: PropTypes.shape({
      fullname: PropTypes.string,
      email: PropTypes.string,
      home_page: PropTypes.string,
      location: PropTypes.string,
    }).isRequired,
    userId: PropTypes.string.isRequired,
    getUser: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool,
    loadComponent: PropTypes.func.isRequired,
    componentIndex: PropTypes.number.isRequired,
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getUser(this.props.userId);
  }

  push = selector => {
    this.setState(() => ({
      pushed: true,
    }));
    this.props.loadComponent(selector);
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
        className="personal-tools pastanaga-menu"
        style={{
          left: `${this.props.componentIndex * 100}%`,
        }}
      >
        <header className="header">
          <button className="back" onClick={this.pull}>
            <Icon name={backSVG} size="32px" />
          </button>
          <div className="vertical divider" />
          <h2>
            {this.props.user.fullname
              ? this.props.user.fullname
              : this.props.user.username}
          </h2>
          <Link to="/logout">
            <Icon className="logout" name={logoutSVG} size="32px" />
          </Link>
        </header>
        <div className="avatar">
          <img src={avatar} alt="user avatar" />
        </div>
        <div className="stats">
          {/* This should be a Component by itself*/}
          <ul>
            <li>
              <span>126</span>
              <span>Items Created</span>
            </li>
            <li>
              <span>43</span>
              <span>Uploads</span>
            </li>
            <li>
              <span>13</span>
              <span>Reviews</span>
            </li>
          </ul>
        </div>
        <div className="pastanaga-menu-list">
          {/* This (probably also) should be a Component by itself*/}
          <ul>
            <li>
              <button onClick={() => this.push('profile')}>
                Profile
                <Icon name={rightArrowSVG} size="24px" />
              </button>
            </li>
            <li>
              <Link to="/personal-preferences">
                Preferences
                <Icon name={rightArrowSVG} size="24px" />
              </Link>
            </li>
            <li>
              <Link to="/controlpanel">
                Site Setup
                <Icon name={rightArrowSVG} size="24px" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PersonalTools;
