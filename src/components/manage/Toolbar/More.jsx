import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { find } from 'lodash';

import { Icon, Display, Workflow } from '../../../components';
import rightArrowSVG from '../../../icons/right-key.svg';
import userSVG from '../../../icons/user.svg';

import { getBaseUrl } from '../../../helpers';

@connect(
  (state, props) => ({
    actions: state.actions.actions,
    pathname: props.pathname,
    content: state.content.data,
  }),
  {},
)
class More extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      object: PropTypes.arrayOf(PropTypes.object),
      object_buttons: PropTypes.arrayOf(PropTypes.object),
      user: PropTypes.arrayOf(PropTypes.object),
    }),
    pathname: PropTypes.string.isRequired,
    content: PropTypes.shape({
      title: PropTypes.string,
      '@type': PropTypes.string,
      is_folderish: PropTypes.bool,
      review_state: PropTypes.string,
    }),
    loadComponent: PropTypes.func.isRequired,
    componentIndex: PropTypes.number.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    actions: null,
    content: null,
  };

  push = selector => {
    this.setState(() => ({
      pushed: true,
    }));
    this.props.loadComponent(selector);
  };

  render() {
    const path = getBaseUrl(this.props.pathname);
    const historyAction = find(this.props.actions.object, { id: 'history' });
    const sharingAction = find(this.props.actions.object, {
      id: 'local_roles',
    });
    return (
      <div
        className="menu-more pastanaga-menu"
        style={{
          left: `${this.props.componentIndex * 100}%`,
        }}
      >
        <header>
          <h2>{this.props.content.title}</h2>
          <button
            className="more-user"
            onClick={() => this.push('PersonalTools')}
            tabIndex={0}
          >
            <Icon name={userSVG} size="32px" />
          </button>
        </header>
        <div className="pastanaga-menu-list">
          <ul>
            <li className="state-select">
              <Workflow pathname={path} />
            </li>
            <li className="display-select">
              <Display pathname={path} />
            </li>
            <li>
              {historyAction ? (
                <button onClick={() => this.push('History')}>
                  <div>
                    <span className="pastanaga-menu-label">
                      {historyAction.title}
                    </span>
                    <span className="pastanaga-menu-value">6 days ago</span>
                  </div>
                  <Icon name={rightArrowSVG} size="24px" />
                </button>
              ) : (
                <button>
                  <div>
                    <span className="pastanaga-menu-label">
                      {historyAction.title}
                    </span>
                    <span className="pastanaga-menu-value">6 days ago</span>
                  </div>
                </button>
              )}
            </li>
            {sharingAction && (
              <li>
                <Link to={`${path}/sharing`}>
                  <button>
                    {sharingAction.title}
                    <Icon name={rightArrowSVG} size="24px" />
                  </button>
                </Link>
              </li>
            )}
            <li>
              <button onClick={() => this.push('Portlets')}>
                Portlets
                <Icon name={rightArrowSVG} size="24px" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default More;
