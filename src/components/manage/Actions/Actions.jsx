/**
 * Actions component.
 * @module components/manage/Actions/Actions
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { Dropdown, Icon } from 'semantic-ui-react';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

import { cut, copy, copyContent, moveContent } from '../../../actions';
import { getBaseUrl } from '../../../helpers';
import { ContentsRenameModal } from '../../../components';

const messages = defineMessages({
  cut: {
    id: 'Cut',
    defaultMessage: 'Cut',
  },
  copy: {
    id: 'Copy',
    defaultMessage: 'Copy',
  },
  paste: {
    id: 'Paste',
    defaultMessage: 'Paste',
  },
  rename: {
    id: 'Rename',
    defaultMessage: 'Rename',
  },
});

/**
 * Actions container class.
 * @class Actions
 * @extends Component
 */
@injectIntl
@connect(
  state => ({
    action: state.clipboard.action,
    source: state.clipboard.source,
    id: state.content.data.id,
    title: state.content.data.title,
  }),
  dispatch =>
    bindActionCreators({ cut, copy, copyContent, moveContent }, dispatch),
)
export default class Actions extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    action: PropTypes.string,
    source: PropTypes.arrayOf(PropTypes.string),
    cut: PropTypes.func.isRequired,
    copy: PropTypes.func.isRequired,
    copyContent: PropTypes.func.isRequired,
    moveContent: PropTypes.func.isRequired,
    expanded: PropTypes.bool,
    intl: intlShape.isRequired,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    action: null,
    source: null,
    expanded: true,
  };

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
    this.rename = this.rename.bind(this);
    this.onRenameOk = this.onRenameOk.bind(this);
    this.onRenameCancel = this.onRenameCancel.bind(this);
    this.state = {
      showRename: false,
    };
  }

  /**
   * On rename ok
   * @method onRenameOk
   * @returns {undefined}
   */
  onRenameOk() {
    this.setState({
      showRename: false,
    });
  }

  /**
   * On rename cancel
   * @method onRenameCancel
   * @returns {undefined}
   */
  onRenameCancel() {
    this.setState({
      showRename: false,
    });
  }

  /**
   * Cut handler
   * @method cut
   * @returns {undefined}
   */
  cut() {
    this.props.cut([getBaseUrl(this.props.pathname)]);
  }

  /**
   * Copy handler
   * @method copy
   * @returns {undefined}
   */
  copy() {
    this.props.copy([getBaseUrl(this.props.pathname)]);
  }

  /**
   * Paste handler
   * @method paste
   * @returns {undefined}
   */
  paste() {
    if (this.props.action === 'copy') {
      this.props.copyContent(
        this.props.source,
        getBaseUrl(this.props.pathname),
      );
    }
    if (this.props.action === 'cut') {
      this.props.moveContent(
        this.props.source,
        getBaseUrl(this.props.pathname),
      );
    }
  }

  /**
   * Rename handler
   * @method rename
   * @returns {undefined}
   */
  rename() {
    this.setState({
      showRename: true,
    });
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
        trigger={
          <span>
            <Icon name="lightning" />{' '}
            {this.props.expanded &&
              <FormattedMessage id="Actions" defaultMessage="Actions" />}
          </span>
        }
        pointing="left"
      >
        <Dropdown.Menu>
          <Dropdown.Item
            icon="cut"
            text={this.props.intl.formatMessage(messages.cut)}
            onClick={this.cut}
          />
          <Dropdown.Item
            icon="copy"
            text={this.props.intl.formatMessage(messages.copy)}
            onClick={this.copy}
          />
          <Dropdown.Item
            icon="paste"
            text="Paste"
            onClick={this.paste}
            disabled={this.props.action === null}
          />
          <Link to={`${this.props.pathname}/delete`} className="item">
            <Icon name="trash" />
            <FormattedMessage id="Delete" defaultMessage="Delete" />
          </Link>
          <Dropdown.Item
            icon="text cursor"
            text={this.props.intl.formatMessage(messages.rename)}
            onClick={this.rename}
          />
          <ContentsRenameModal
            open={this.state.showRename}
            onCancel={this.onRenameCancel}
            onOk={this.onRenameOk}
            items={[
              {
                url: this.props.pathname,
                title: this.props.title,
                id: this.props.id,
              },
            ]}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
