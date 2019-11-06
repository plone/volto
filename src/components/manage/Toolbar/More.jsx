import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { find } from 'lodash';

import { Icon, Display, Workflow } from '../../../components';
import { getBaseUrl } from '../../../helpers';

import rightArrowSVG from '../../../icons/right-key.svg';
import userSVG from '../../../icons/user.svg';

/**
 * More container class.
 * @class More
 * @extends Component
 */
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
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const path = getBaseUrl(this.props.pathname);
    const editAction = find(this.props.actions.object, { id: 'edit' });
    const historyAction = find(this.props.actions.object, { id: 'history' });
    const sharingAction = find(this.props.actions.object, {
      id: 'local_roles',
    });
    return (
      <div className="menu-more pastanaga-menu">
        <header>
          <h2>{this.props.content.title}</h2>
          <button
            className="more-user"
            aria-label="Personal tools"
            onClick={() => this.push('personalTools')}
            tabIndex={0}
          >
            <Icon name={userSVG} size="30px" />
          </button>
        </header>
        <div className="pastanaga-menu-list">
          <ul>
            <li className="state-select">
              <Workflow pathname={path} />
            </li>
            <li className="display-select">
              {editAction && <Display pathname={path} />}
            </li>
            <li>
              {historyAction ? (
                <Link to={`${path}/history`}>
                  <button>
                    <div>
                      <span className="pastanaga-menu-label">
                        {historyAction.title}
                      </span>
                      <span className="pastanaga-menu-value" />
                    </div>
                    <Icon name={rightArrowSVG} size="24px" />
                  </button>
                </Link>
              ) : (
                <button aria-label="History">
                  <div>
                    <span className="pastanaga-menu-label">
                      {historyAction.title}
                    </span>
                    <span className="pastanaga-menu-value" />
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
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
  (state, props) => ({
    actions: state.actions.actions,
    pathname: props.pathname,
    content: state.content.data,
  }),
  {},
)(More);
