/**
 * Display component.
 * @module components/manage/Display/Display
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Icon } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import { getSchema, editContent, getContent } from '../../../actions';
import layouts from '../../../constants/Layouts';

@connect(
  state => ({
    loaded: state.content.edit.loaded,
    layouts: state.schema.schema ? state.schema.schema.layouts : [],
    layout: state.content.data ? state.content.data.layout : '',
    type: state.content.data ? state.content.data['@type'] : '',
  }),
  dispatch =>
    bindActionCreators({ getSchema, editContent, getContent }, dispatch),
)
/**
 * Component to display the display menu.
 * @class Display
 * @extends Component
 */
export default class Display extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    /**
     * Action to get the schema
     */
    getSchema: PropTypes.func.isRequired,
    /**
     * Action to edit content
     */
    editContent: PropTypes.func.isRequired,
    /**
     * Action to get content
     */
    getContent: PropTypes.func.isRequired,
    /**
     * Loaded status
     */
    loaded: PropTypes.bool.isRequired,
    /**
     * Pathname of the object
     */
    pathname: PropTypes.string.isRequired,
    /**
     * Available layouts
     */
    layouts: PropTypes.arrayOf(PropTypes.string),
    /**
     * Current layout
     */
    layout: PropTypes.string.isRequired,
    /**
     * Type of the object
     */
    type: PropTypes.string.isRequired,
    /**
     * True if menu is expanded
     */
    expanded: PropTypes.bool,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    history: [],
    transitions: [],
    layouts: [],
    expanded: true,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Workflow
   */
  constructor(props) {
    super(props);
    this.setLayout = this.setLayout.bind(this);
  }

  /**
   * Component will mount
   * @method componentWillMount
   */
  componentWillMount() {
    this.props.getSchema(this.props.type);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.getSchema(nextProps.type);
    }
    if (!this.props.loaded && nextProps.loaded) {
      this.props.getContent(nextProps.pathname);
    }
  }

  /**
   * On set layout handler
   * @method setLayout
   * @param {Object} event Event object
   */
  setLayout(event, { value }) {
    this.props.editContent(this.props.pathname, {
      layout: value,
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
            <Icon name="block layout" />{' '}
            {this.props.expanded && (
              <FormattedMessage id="Display" defaultMessage="Display" />
            )}
          </span>
        }
        pointing="left"
      >
        <Dropdown.Menu>
          {this.props.layouts.map(item => (
            <Dropdown.Item
              text={layouts[item] || item}
              value={item}
              active={this.props.layout === item}
              key={item}
              onClick={this.setLayout}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
