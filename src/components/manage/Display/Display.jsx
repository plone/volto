/**
 * Display component.
 * @module components/manage/Display/Display
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Icon } from 'semantic-ui-react';

import { getSchema, editContent, getContent } from '../../../actions';
import layouts from '../../../constants/Layouts';

/**
 * Display container class.
 * @class Display
 * @extends Component
 */
@connect(
  state => ({
    loaded: state.content.edit.loaded,
    layouts: state.schema.schema ? state.schema.schema.layouts : [],
    layout: state.content.data ? state.content.data.layout : '',
    type: state.content.data['@type'],
  }),
  dispatch =>
    bindActionCreators({ getSchema, editContent, getContent }, dispatch),
)
export default class Display extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getSchema: PropTypes.func.isRequired,
    editContent: PropTypes.func.isRequired,
    getContent: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    pathname: PropTypes.string.isRequired,
    layouts: PropTypes.arrayOf(PropTypes.string),
    layout: PropTypes.string,
    type: PropTypes.string.isRequired,
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
    layout: '',
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
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getSchema(this.props.type);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
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
   * @returns {undefined}
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
        trigger={<span><Icon name="block layout" /> Display</span>}
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
