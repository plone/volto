/**
 * Toolbar component.
 * @module components/manage/Toolbar/Toolbar
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import cookie from 'react-cookie';
import { find } from 'lodash';
import cx from 'classnames';

import More from './More';
import PersonalTools from './PersonalTools';
import Types from './Types';
import PersonalInformation from '../Preferences/PersonalInformation';
import PersonalPreferences from '../Preferences/PersonalPreferences';
import StandardWrapper from './StandardWrapper';
import { listActions } from '../../../actions';
import { Icon } from '../../../components';
import { BodyClass, getBaseUrl } from '../../../helpers';

import pastanagaSmall from './pastanaga-small.svg';
import pastanagalogo from './pastanaga.svg';
import penSVG from '../../../icons/pen.svg';
import folderSVG from '../../../icons/folder.svg';
import addSVG from '../../../icons/add-document.svg';
import moreSVG from '../../../icons/more.svg';
import userSVG from '../../../icons/user.svg';
import clearSVG from '../../../icons/clear.svg';

const toolbarComponents = {
  personalTools: { component: PersonalTools, wrapper: null },
  more: { component: More, wrapper: null },
  types: { component: Types, wrapper: null },
  profile: {
    component: PersonalInformation,
    wrapper: StandardWrapper,
    hideToolbarBody: true,
  },
  preferences: {
    component: PersonalPreferences,
    wrapper: StandardWrapper,
    hideToolbarBody: true,
  },
};

/**
 * Toolbar container class.
 * @class Toolbar
 * @extends Component
 */
class Toolbar extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    actions: PropTypes.shape({
      object: PropTypes.arrayOf(PropTypes.object),
      object_buttons: PropTypes.arrayOf(PropTypes.object),
      user: PropTypes.arrayOf(PropTypes.object),
    }),
    token: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    content: PropTypes.shape({
      '@type': PropTypes.string,
      is_folderish: PropTypes.bool,
      review_state: PropTypes.string,
    }),
    listActions: PropTypes.func.isRequired,
    inner: PropTypes.element.isRequired,
    hideDefaultViewButtons: PropTypes.bool,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    actions: null,
    token: null,
    content: null,
    hideDefaultViewButtons: false,
  };

  state = {
    expanded: cookie.load('toolbar_expanded') !== 'false',
    showMenu: false,
    menuStyle: {},
    menuComponents: [],
    loadedComponents: [],
    hideToolbarBody: false,
  };

  toolbarWindow = React.createRef();

  /**
   * Component will mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.listActions(getBaseUrl(this.props.pathname));
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.listActions(getBaseUrl(nextProps.pathname));
    }
  }

  /**
   * Component will receive props
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  handleShrink = () => {
    cookie.save('toolbar_expanded', !this.state.expanded, {
      expires: new Date((2 ** 31 - 1) * 1000),
      path: '/',
    });
    this.setState(state => ({ expanded: !state.expanded }));
  };

  closeMenu = () =>
    this.setState(() => ({ showMenu: false, loadedComponents: [] }));

  loadComponent = type => {
    const { loadedComponents } = this.state;
    if (!this.state.loadedComponents.includes(type)) {
      this.setState({
        loadedComponents: [...loadedComponents, type],
        hideToolbarBody: toolbarComponents[type].hideToolbarBody || false,
      });
    }
  };

  unloadComponent = () => {
    this.setState(state => ({
      loadedComponents: state.loadedComponents.slice(0, -1),
      hideToolbarBody:
        toolbarComponents[
          state.loadedComponents[state.loadedComponents.length - 2]
        ].hideToolbarBody || false,
    }));
  };

  toggleMenu = (e, selector) => {
    if (this.state.showMenu) {
      this.closeMenu();
      return;
    }
    // PersonalTools always shows at bottom
    if (selector === 'personalTools') {
      this.setState(state => ({
        showMenu: !state.showMenu,
        menuStyle: { bottom: 0 },
      }));
    } else {
      this.setState(state => ({
        showMenu: !state.showMenu,
        menuStyle: { top: 0 },
      }));
    }
    this.loadComponent(selector);
  };

  handleClickOutside = e => {
    if (this.pusher && doesNodeContainClick(this.pusher, e)) return;
    this.closeMenu();
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const path = getBaseUrl(this.props.pathname);
    const editAction = find(this.props.actions.object, { id: 'edit' });
    const folderContentsAction = find(this.props.actions.object, {
      id: 'folderContents',
    });
    const { expanded } = this.state;

    return (
      this.props.token && (
        <>
          <BodyClass
            className={expanded ? 'has-toolbar' : 'has-toolbar-collapsed'}
          />
          <div
            style={this.state.menuStyle}
            className={
              this.state.showMenu ? 'toolbar-content show' : 'toolbar-content'
            }
            ref={this.toolbarWindow}
          >
            {this.state.showMenu && (
              // This sets the scroll locker in the body tag in mobile
              <BodyClass className="has-toolbar-menu-open" />
            )}
            <div
              className="pusher-puller"
              ref={node => (this.pusher = node)}
              style={{
                transform: this.toolbarWindow.current
                  ? `translateX(-${(this.state.loadedComponents.length - 1) *
                      this.toolbarWindow.current.getBoundingClientRect()
                        .width}px)`
                  : null,
              }}
            >
              {this.state.loadedComponents.map((component, index) =>
                (() => {
                  const ToolbarComponent =
                    toolbarComponents[component].component;
                  const WrapperComponent = toolbarComponents[component].wrapper;
                  const haveActions =
                    toolbarComponents[component].hideToolbarBody;
                  if (WrapperComponent) {
                    return (
                      <WrapperComponent
                        componentName={component}
                        pathname={this.props.pathname}
                        loadComponent={this.loadComponent}
                        unloadComponent={this.unloadComponent}
                        componentIndex={index}
                        theToolbar={this.theToolbar}
                        key={`personalToolsComponent-${index}`}
                        closeMenu={this.closeMenu}
                        hasActions={haveActions}
                      >
                        <ToolbarComponent
                          pathname={this.props.pathname}
                          loadComponent={this.loadComponent}
                          unloadComponent={this.unloadComponent}
                          componentIndex={index}
                          theToolbar={this.theToolbar}
                          closeMenu={this.closeMenu}
                          isToolbarEmbedded
                        />
                      </WrapperComponent>
                    );
                  } else {
                    return (
                      <ToolbarComponent
                        pathname={this.props.pathname}
                        loadComponent={this.loadComponent}
                        unloadComponent={this.unloadComponent}
                        componentIndex={index}
                        theToolbar={this.theToolbar}
                        key={`personalToolsComponent-${index}`}
                        closeMenu={this.closeMenu}
                      />
                    );
                  }
                })(),
              )}
            </div>
          </div>
          <div className={this.state.expanded ? 'toolbar expanded' : 'toolbar'}>
            <div className="toolbar-body">
              <div className="toolbar-actions">
                {this.props.hideDefaultViewButtons && this.props.inner && (
                  <>{this.props.inner}</>
                )}
                {!this.props.hideDefaultViewButtons && (
                  <>
                    {editAction && (
                      <Link
                        aria-label="Edit"
                        className="edit"
                        to={`${path}/edit`}
                      >
                        <Icon name={penSVG} size="30px" className="circled" />
                      </Link>
                    )}
                    {this.props.content &&
                      this.props.content.is_folderish &&
                      folderContentsAction && (
                        <Link aria-label="Contents" to={`${path}/contents`}>
                          <Icon name={folderSVG} size="30px" />
                        </Link>
                      )}
                    {this.props.content && this.props.content.is_folderish && (
                      <button
                        className="add"
                        aria-label="Add"
                        onClick={e => this.toggleMenu(e, 'types')}
                        tabIndex={0}
                        id="toolbar-add"
                      >
                        <Icon name={addSVG} size="30px" />
                      </button>
                    )}
                    <div className="toolbar-button-spacer" />
                    <button
                      className="more"
                      aria-label="More"
                      onClick={e => this.toggleMenu(e, 'more')}
                      tabIndex={0}
                      id="toolbar-more"
                    >
                      <Icon
                        className="mobile hidden"
                        name={moreSVG}
                        size="30px"
                      />
                      {this.state.showMenu ? (
                        <Icon
                          className="mobile only"
                          name={clearSVG}
                          size="30px"
                        />
                      ) : (
                        <Icon
                          className="mobile only"
                          name={moreSVG}
                          size="30px"
                        />
                      )}
                    </button>
                  </>
                )}
              </div>
              <div className="toolbar-bottom">
                <img className="minipastanaga" src={pastanagaSmall} alt="" />
                {!this.props.hideDefaultViewButtons && (
                  <button
                    className="user"
                    aria-label="Personal tools"
                    onClick={e => this.toggleMenu(e, 'personalTools')}
                    tabIndex={0}
                    id="toolbar-personal"
                  >
                    <Icon name={userSVG} size="30px" />
                  </button>
                )}
                <div className="divider" />
                <div className="pastanagalogo">
                  <img src={pastanagalogo} alt="" />
                </div>
              </div>
            </div>
            <div className="toolbar-handler">
              <button
                aria-label="Shrink toolbar"
                className={cx({
                  [this.props.content.review_state]:
                    this.props.content && this.props.content.review_state,
                })}
                onClick={this.handleShrink}
              />
            </div>
          </div>
          <div className="pusher" />
        </>
      )
    );
  }
}

export default connect(
  (state, props) => ({
    actions: state.actions.actions,
    token: state.userSession.token,
    content: state.content.data,
    pathname: props.pathname,
  }),
  { listActions },
)(Toolbar);
