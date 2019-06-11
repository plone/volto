/**
 * Toolbar component.
 * @module components/manage/Toolbar/Toolbar
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import cookie from 'react-cookie';
import { find } from 'lodash';

import { listActions } from '../../../actions';

import { Icon } from '../../../components';
import pastanagaSmall from './pastanaga-small.svg';
import pastanagalogo from './pastanaga.svg';
import { BodyClass, getBaseUrl } from '../../../helpers';

import { toolbarComponents } from '~/config';

import penSVG from '../../../icons/pen.svg';
import folderSVG from '../../../icons/folder.svg';
import addSVG from '../../../icons/add-document.svg';
import moreSVG from '../../../icons/more.svg';
import userSVG from '../../../icons/user.svg';
import clearSVG from '../../../icons/clear.svg';

/**
 * Toolbar container class.
 * @class Toolbar
 * @extends Component
 */
@connect(
  (state, props) => ({
    actions: state.actions.actions,
    token: state.userSession.token,
    content: state.content.data,
    pathname: props.pathname,
  }),
  { listActions },
)
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

    // if (nextProps.actions.object_buttons) {
    //   const objectButtons = nextProps.actions.object_buttons;
    //   this.setState({
    //     hasObjectButtons: !!objectButtons.length,
    //   });
    // }
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
    const { menuComponents } = this.state;
    const nextIndex = menuComponents.length;

    if (
      !this.state.menuComponents.reduce(
        (prev, current) => prev && current.name === `${type}`,
        false,
      )
    ) {
      import(`./${type}.jsx`).then(LoadedComponent =>
        this.setState(state => ({
          menuComponents: state.menuComponents.concat({
            name: `${type}`,
            component: (
              <LoadedComponent.default
                pathname={this.props.pathname}
                loadComponent={this.loadComponent}
                unloadComponent={this.unloadComponent}
                componentIndex={nextIndex}
                theToolbar={this.theToolbar}
                key={`menucomp-${nextIndex}`}
                closeMenu={this.closeMenu}
              />
            ),
          }),
        })),
      );
    }
  };

  unloadComponent = () => {
    this.setState(state => ({
      menuComponents: state.menuComponents.slice(0, -1),
    }));
  };

  loadNewComponent = type => {
    const { loadedComponents } = this.state;
    if (!this.state.loadedComponents.includes(type)) {
      this.setState({
        loadedComponents: [...loadedComponents, type],
      });
    }
  };

  unloadNewComponent = () => {
    this.setState(state => ({
      loadedComponents: state.loadedComponents.slice(0, -1),
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
      const elemOffsetTop = e.target.getBoundingClientRect().top;
      this.setState(state => ({
        showMenu: !state.showMenu,
        menuStyle: { top: `${elemOffsetTop}px` },
      }));
    }
    this.loadNewComponent(selector);
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
        <Fragment>
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
                  const ToolbarComponent = toolbarComponents[component];

                  return (
                    <ToolbarComponent
                      pathname={this.props.pathname}
                      loadComponent={this.loadNewComponent}
                      unloadComponent={this.unloadNewComponent}
                      componentIndex={index}
                      theToolbar={this.theToolbar}
                      key={`personalToolsComponent-${index}`}
                      closeMenu={this.closeMenu}
                    />
                  );
                })(),
              )}
            </div>
          </div>
          <div className={this.state.expanded ? 'toolbar expanded' : 'toolbar'}>
            <div className="toolbar-body">
              <div className="toolbar-actions">
                {this.props.hideDefaultViewButtons && this.props.inner && (
                  <Fragment>{this.props.inner}</Fragment>
                )}
                {!this.props.hideDefaultViewButtons && (
                  <Fragment>
                    {editAction && (
                      <Link className="edit" to={`${path}/edit`}>
                        <Icon name={penSVG} size="32px" className="circled" />
                      </Link>
                    )}
                    {this.props.content &&
                      this.props.content.is_folderish &&
                      folderContentsAction && (
                        <Link to="/contents">
                          <Icon name={folderSVG} size="32px" />
                        </Link>
                      )}
                    {this.props.content && this.props.content.is_folderish && (
                      <button
                        className="add"
                        onClick={e => this.toggleMenu(e, 'types')}
                        tabIndex={0}
                      >
                        <Icon name={addSVG} size="32px" />
                      </button>
                    )}
                    <button
                      className="more"
                      onClick={e => this.toggleMenu(e, 'more')}
                      tabIndex={0}
                    >
                      <Icon
                        className="tablet or lower hidden"
                        name={moreSVG}
                        size="32px"
                      />
                      {this.state.showMenu ? (
                        <Icon
                          className="mobile tablet only"
                          name={clearSVG}
                          size="32px"
                        />
                      ) : (
                        <Icon
                          className="mobile tablet only"
                          name={moreSVG}
                          size="32px"
                        />
                      )}
                    </button>
                  </Fragment>
                )}
              </div>
              <div className="toolbar-bottom">
                <img className="minipastanaga" src={pastanagaSmall} alt="" />
                {!this.props.hideDefaultViewButtons && (
                  <button
                    className="user"
                    onClick={e => this.toggleMenu(e, 'personalTools')}
                    tabIndex={0}
                  >
                    <Icon name={userSVG} size="32px" />
                  </button>
                )}
                <div className="divider" />
                <div className="pastanagalogo">
                  <img src={pastanagalogo} alt="" />
                </div>
              </div>
            </div>
            <div className="toolbar-handler">
              <button onClick={this.handleShrink} />
            </div>
          </div>
          <div className="pusher" />
        </Fragment>
      )
    );
  }
}

export default Toolbar;
