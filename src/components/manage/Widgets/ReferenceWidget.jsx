/**
 * ReferenceWidget component.
 * @module components/manage/Widgets/ReferenceWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { Form, Grid, Label, Button } from 'semantic-ui-react';
import { map } from 'lodash';
import { injectIntl } from 'react-intl';

import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

// const messages = defineMessages({
//   no_results_found: {
//     id: 'No results found.',
//     defaultMessage: 'No results found.',
//   },
//   no_value: {
//     id: 'No value',
//     defaultMessage: 'No value',
//   },
// });

/**
 * ReferenceWidget component class.
 * @class ReferenceWidget
 * @extends Component
 */
class ReferenceWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    openObjectBrowser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,

    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    required: PropTypes.bool,
    multiple: PropTypes.bool,
    error: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.object,
    ]),
    onChange: PropTypes.func.isRequired,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    description: null,
    required: false,
    error: [],
    search: [],
    value: null,
    multiple: false,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Actions
   */
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     choices: props.value
  //       ? props.multiple
  //         ? fromPairs(
  //             map(props.value, value => [
  //               value['@id'],
  //               {
  //                 key: value['@id'],
  //                 text: value.title,
  //                 value: value['@id'],
  //                 label: {
  //                   content: value['@id'].replace(settings.apiPath, ''),
  //                 },
  //                 data: value,
  //               },
  //             ]),
  //           )
  //         : {
  //             [props.value['@id']]: {
  //               key: props.value['@id'],
  //               text: props.value.title,
  //               value: props.value['@id'],
  //               label: {
  //                 content: props.value['@id'].replace(settings.apiPath, ''),
  //               },
  //               data: props.value,
  //             },
  //             novalue: {
  //               key: 'novalue',
  //               text: this.props.intl.formatMessage(messages.no_value),
  //               value: 'novalue',
  //               data: null,
  //             },
  //           }
  //       : {},
  //   };
  // }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    // this.setState({
    //   choices: {
    //     ...fromPairs(
    //       map(
    //         uniqBy(
    //           map(compact(concat(nextProps.value, nextProps.search)), item => ({
    //             ...item,
    //             '@id': item['@id'].replace(settings.apiPath, ''),
    //           })),
    //           '@id',
    //         ),
    //         value => [
    //           value['@id'],
    //           {
    //             key: value['@id'],
    //             text: value.title,
    //             value: value['@id'],
    //             label: {
    //               content: value['@id'],
    //             },
    //             data: value,
    //           },
    //         ],
    //       ),
    //     ),
    //     novalue: {
    //       key: 'novalue',
    //       text: this.props.intl.formatMessage(messages.no_value),
    //       value: 'novalue',
    //       data: null,
    //     },
    //   },
    // });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const {
      openObjectBrowser,
      id,
      title,
      required,
      description,
      error,
      // value,
      // multiple,
      // onChange,
      // onChangeBlock,
      fieldSet,
    } = this.props;

    return (
      <Form.Field
        inline
        required={required}
        error={error.length > 0}
        className={description ? 'help' : ''}
        id={`${fieldSet || 'field'}-${id}`}
      >
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width="4">
              <div className="wrapper">
                <label htmlFor={`field-${id}`}>{title}</label>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              <Button
                onClick={() => openObjectBrowser({ mode: 'link' })}
                type="button"
              >
                Open
              </Button>
              {/*               
              <Dropdown
                options={values(this.state.choices)}
                placeholder={title}
                
                selection
                fluid
                noResultsMessage={this.props.intl.formatMessage(
                  messages.no_results_found,
                )}
                value={
                  multiple
                    ? value
                      ? map(value, item =>
                          item['@id'].replace(settings.apiPath, ''),
                        )
                      : []
                    : value
                    ? value['@id'].replace(settings.apiPath, '')
                    : ''
                }
                onChange={(event, data) =>
                  onChange(
                    id,
                    multiple
                      ? map(data.value, item => this.state.choices[item].data)
                      : this.state.choices[data.value].data,
                  )
                }
                onSearchChange={this.onSearchChange}
              /> */}
              {map(error, message => (
                <Label key={message} basic color="red" pointing>
                  {message}
                </Label>
              ))}
            </Grid.Column>
          </Grid.Row>
          {description && (
            <Grid.Row stretched>
              <Grid.Column stretched width="12">
                <p className="help">{description}</p>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </Form.Field>
    );
  }
}

const defaultComponentProps = {
  data: { url: '/' },
  onChangeBlock: () => {},
  block: 'referenceWidget',
};

const RFW = compose(withObjectBrowser, injectIntl)(ReferenceWidget);
export default function(props) {
  return <RFW {...defaultComponentProps} {...props}></RFW>;
}
