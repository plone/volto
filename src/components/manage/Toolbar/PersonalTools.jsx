import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import cx from 'classnames';
import { Icon } from '../../../components';
import { getUser } from '../../../actions';
import logoutSVG from '../../../icons/log-out.svg';
import rightArrowSVG from '../../../icons/right-key.svg';

import backSVG from '../../../icons/back.svg';
import cameraSVG from '../../../icons/camera.svg';

/**
 * Toolbar container class.
 * @class PersonalTools
 * @extends Component
 */
@connect(
  state => ({
    user: state.users.user,
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
    loadComponent: PropTypes.func.isRequired,
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
        className={cx('personal-tools pastanaga-menu', {
          'has-inner-actions': this.props.hasActions,
        })}
      >
        <header className="header">
          <button className="back" onClick={this.pull}>
            <Icon name={backSVG} size="30px" />
          </button>
          <div className="vertical divider" />
          <h2>
            {this.props.user.fullname
              ? this.props.user.fullname
              : this.props.user.username}
          </h2>
          <Link id="toolbar-logout" to="/logout">
            <Icon className="logout" name={logoutSVG} size="30px" />
          </Link>
        </header>
        <div className={cx('avatar', { default: !this.props.user.portrait })}>
          {this.props.user.portrait ? (
            <img src={this.props.user.portrait} alt="user avatar" />
          ) : (
            <Icon name={cameraSVG} size="96px" />
          )}
        </div>
        {/* <Stats /> Maybe we can find a good fit in the future for this visual element */}
        <div className="pastanaga-menu-list">
          {/* This (probably also) should be a Component by itself*/}
          <ul>
            <li>
              <button aria-label="Profile" onClick={() => this.push('profile')}>
                Profile
                <Icon name={rightArrowSVG} size="24px" />
              </button>
            </li>
            <li>
              <button
                aria-label="Preferences"
                onClick={() => this.push('preferences')}
              >
                Preferences
                <Icon name={rightArrowSVG} size="24px" />
              </button>
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
