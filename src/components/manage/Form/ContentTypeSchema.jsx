/**
 * Schema builder component.
 * @module components/manage/Form/SchemaBuilder
 */

import { SchemaWidget } from '@plone/volto/components';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';

const makeSchemaList = (schema) => {
  let result = [];

  return result;
};

/**
 * SchemaBuilder container class.
 * @class SchemaBuilder
 * @extends Component
 */
class SchemaBuilder extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    schema: PropTypes.shape({
      fieldsets: PropTypes.arrayOf(
        PropTypes.shape({
          fields: PropTypes.arrayOf(PropTypes.string),
          id: PropTypes.string,
          title: PropTypes.string,
        }),
      ),
      properties: PropTypes.objectOf(PropTypes.any),
      definitions: PropTypes.objectOf(PropTypes.any),
      required: PropTypes.arrayOf(PropTypes.string),
    }),
    pathname: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
    loading: PropTypes.bool,
    hideActions: PropTypes.bool,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    schema: {},
    pathname: '',
    onSubmit: null,
    onCancel: null,
    error: null,
    loading: null,
    hideActions: false,
    visual: false,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs SchemaBuilder
   */
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      placeholderProps: {},
      formData: {},
      activeIndex: 0,
      schemaItems: makeSchemaList(props?.schema),
    };
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {Object} event Event object.
   * @returns {undefined}
   */
  onSubmit(event) {}

  componentDidMount() {
    // console.log('componentDidMount props', this.props);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { schema } = this.props;
    const { activeIndex } = this.state;
    // console.log('render this.state', this.state);
    // console.log('render this.props', this.props);

    return (
      <Container>
        <SchemaWidget></SchemaWidget>
      </Container>
    );
  }
}

export default injectIntl(SchemaBuilder, { forwardRef: true });
