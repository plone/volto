/**
 * Form builder component.
 * @module components/manage/Form/FormBuilder
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { keys } from 'lodash';
import { Form as UiForm, Segment, Container } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import { Field } from '@plone/volto/components';

// const messages = defineMessages({
//   addBlock: {
//     id: 'Add block...',
//     defaultMessage: 'Add block...',
//   },
//   save: {
//     id: 'Save',
//     defaultMessage: 'Save',
//   },
//   cancel: {
//     id: 'Cancel',
//     defaultMessage: 'Cancel',
//   },
// });

/**
 * FormBuilder container class.
 * @class FormBuilder
 * @extends Component
 */
class FormBuilder extends Component {
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

  // /**
  //  * Constructor
  //  * @method constructor
  //  * @param {Object} props Component properties
  //  * @constructs FormBuilder
  //  */
  // constructor(props) {
  //   super(props);
  // }

  /**
   * Submit handler
   * @method onSubmit
   * @param {Object} event Event object.
   * @returns {undefined}
   */
  onSubmit(event) {}

  componentDidMount() {
    console.log('FORMBUILDER props', this.props);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { schema } = this.props;
    console.log('render schema', schema);
    return (
      <Container>
        <UiForm method="post" onSubmit={this.onSubmit}>
          <Segment.Group raised>
            {schema &&
              schema.fieldsets.map(item => [
                <Segment secondary attached key={item.title}>
                  {item.title}
                </Segment>,
                <Segment attached key={`fieldset-contents-${item.title}`}>
                  {item.fields.map((field, index) => (
                    <Field
                      {...schema.properties[field]}
                      id={field}
                      focus={false}
                      value={null}
                      required={schema.required.indexOf(field) !== -1}
                      onChange={() => {}}
                      onClick={() => {}}
                      onBlur={() => {}}
                      disabled={true}
                      key={field}
                      error={[]}
                    />
                  ))}
                </Segment>,
              ])}
          </Segment.Group>
        </UiForm>
      </Container>
    );
  }
}

export default injectIntl(FormBuilder, { forwardRef: true });
