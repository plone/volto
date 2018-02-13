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

import {
  cut,
  copy,
  copyContent,
  moveContent,
  addMessage,
} from '../../../actions';
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
  messageCopied: {
    id: '{title} copied.',
    defaultMessage: '{title} copied.',
  },
  messageCut: {
    id: '{title} cut.',
    defaultMessage: '{title} cut.',
  },
  messageDeleted: {
    id: '{title} has been deleted.',
    defaultMessage: '{title} has been deleted.',
  },
  messagePasted: {
    id: 'Item(s) pasted.',
    defaultMessage: 'Item(s) pasted.',
  },
});

@injectIntl
@connect(
  state => ({
    action: state.clipboard.action,
    source: state.clipboard.source,
    id: state.content.data.id,
    title: state.content.data.title,
  }),
  dispatch =>
    bindActionCreators(
      { cut, copy, copyContent, moveContent, addMessage },
      dispatch,
    ),
)
/**
 * Component to display actions.
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
    /**
     * Pathname of the current object
     */
    pathname: PropTypes.string.isRequired,
    /**
     * Id of the current object
     */
    id: PropTypes.string.isRequired,
    /**
     * Title of the current object
     */
    title: PropTypes.string.isRequired,
    /**
     * Previously executed action, can be cut or copy
     */
    action: PropTypes.string,
    /**
     * Ids of the source objects of the action
     */
    source: PropTypes.arrayOf(PropTypes.string),
    /**
     * Action to handle cut
     */
    cut: PropTypes.func.isRequired,
    /**
     * Action to handle copy
     */
    copy: PropTypes.func.isRequired,
    /**
     * Action to handle copy content
     */
    copyContent: PropTypes.func.isRequired,
    /**
     * Action to handle move content
     */
    moveContent: PropTypes.func.isRequired,
    /**
     * Action to add a notification message
     */
    addMessage: PropTypes.func.isRequired,
    /**
     * Expanded state
     */
    expanded: PropTypes.bool,
    /**
     * i18n object
     */
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
   */
  onRenameOk() {
    this.setState({
      showRename: false,
    });
  }

  /**
   * On rename cancel
   * @method onRenameCancel
   */
  onRenameCancel() {
    this.setState({
      showRename: false,
    });
  }

  /**
   * Cut handler
   * @method cut
   */
  cut() {
    this.props.cut([getBaseUrl(this.props.pathname)]);
    this.props.addMessage(
      null,
      this.props.intl.formatMessage(messages.messageCut, {
        title: this.props.title,
      }),
      'success',
    );
  }

  /**
   * Copy handler
   * @method copy
   */
  copy() {
    this.props.copy([getBaseUrl(this.props.pathname)]);
    this.props.addMessage(
      null,
      this.props.intl.formatMessage(messages.messageCopied, {
        title: this.props.title,
      }),
      'success',
    );
  }

  /**
   * Paste handler
   * @method paste
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
    this.props.addMessage(
      null,
      this.props.intl.formatMessage(messages.messagePasted),
      'success',
    );
  }

  /**
   * Rename handler
   * @method rename
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
            {this.props.expanded && (
              <FormattedMessage id="Actions" defaultMessage="Actions" />
            )}
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
