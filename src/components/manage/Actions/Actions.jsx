/**
 * Actions component.
 * @module components/manage/Actions/Actions
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { filter, last, map } from 'lodash';
import { Dropdown, Icon } from 'semantic-ui-react';

import { cut, copy, copyContent, moveContent } from '../../../actions';
import config from '../../../config';

@connect(
  state => ({
    loaded: state.clipboard.request.loaded,
    action: state.clipboard.action,
    source: state.clipboard.source,
  }),
  dispatch => bindActionCreators({ cut, copy, copyContent, moveContent }, dispatch),
)
/**
 * Actions container class.
 * @class Actions
 * @extends Component
 */
export default class Actions extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    loaded: PropTypes.bool.isRequired,
    action: PropTypes.string,
    source: PropTypes.string,
    cut: PropTypes.func.isRequired,
    copy: PropTypes.func.isRequired,
    copyContent: PropTypes.func.isRequired,
    moveContent: PropTypes.func.isRequired,
  }

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    action: null,
    source: null,
  }

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Actions
   */
  constructor(props) {
    super(props);
    this.cut = this.cut.bind(this);
    this.copy = this.copy.bind(this);
    this.paste = this.paste.bind(this);
  }

  /**
   * Cut handler
   * @method cut
   * @returns {undefined}
   */
  cut() {
    this.props.cut(this.props.pathname);
  }

  /**
   * Copy handler
   * @method copy
   * @returns {undefined}
   */
  copy() {
    this.props.copy(this.props.pathname);
  }

  /**
   * Paste handler
   * @method paste
   * @returns {undefined}
   */
  paste() {
    if (this.props.action === 'copy') {
      this.props.copyContent(this.props.source, this.props.pathname);
    }
    if (this.props.action === 'cut') {
      this.props.moveContent(this.props.source, this.props.pathname);
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Dropdown
        item
        trigger={<span><Icon name="lightning" /> Actions</span>}
        pointing="left"
      >
        <Dropdown.Menu>
          <Dropdown.Item
            icon="cut"
            text="Cut"
            onClick={this.cut}
          />
          <Dropdown.Item
            icon="copy"
            text="Copy"
            onClick={this.copy}
          />
          <Dropdown.Item
            icon="paste"
            text="Paste"
            onClick={this.paste}
          />
          <Link
            to={`${this.props.pathname}/delete`}
            className="item"
          >
            <Icon name="trash" />Delete
          </Link>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
