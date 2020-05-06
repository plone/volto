/**
 * ObjectBrowserWidget component.
 * @module components/manage/Widgets/ObjectBrowserWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { map } from 'lodash';
import { Form, Grid, Label, Popup } from 'semantic-ui-react';

import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { defineMessages, injectIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const messages = defineMessages({
  no_value: {
    id: 'No value',
    defaultMessage: 'No value',
  },
});

/**
 * ObjectBrowserWidget component class.
 * @class ObjectBrowserWidget
 * @extends Component
 */
class ObjectBrowserWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    mode: PropTypes.string,
    required: PropTypes.bool,
    //  multiple: PropTypes.bool, [TODO]
    error: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.object,
    ]),
    onChange: PropTypes.func.isRequired,
    openObjectBrowser: PropTypes.func.isRequired,
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
    value: null,
    mode: 'link',
    // multiple: false,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Actions
   */
  constructor(props) {
    super(props);

    // this.state = {
    //   choices: props.value
    //     ? props.multiple
    //       ? fromPairs(
    //           map(props.value, value => [
    //             value['@id'],
    //             {
    //               key: value['@id'],
    //               text: value['@id']?.replace(settings.apiPath, ''),
    //               value: value['@id'],
    //               label: {
    //                 content: value.title,
    //               },
    //               data: value,
    //             },
    //           ]),
    //         )
    //       : {
    //           [props.value['@id']]: {
    //             key: props.value['@id'],
    //             text: props.value?.replace(settings.apiPath, ''),
    //             value: props.value['@id'],
    //             label: {
    //               content: props.value.title,
    //             },
    //             data: props.value,
    //           },
    //           novalue: {
    //             key: 'novalue',
    //             text: this.props.intl.formatMessage(messages.no_value),
    //             value: 'novalue',
    //             data: null,
    //           },
    //         }
    //     : {},
    // };
  }

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
    //             text: value['@id']?.replace(settings.apiPath, ''),
    //             value: value['@id'],
    //             label: {
    //               content: value.title,
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

  renderLabel(item) {
    return (
      <Popup
        key={item.value}
        content={
          <>
            <Icon name="home" /> {item.value}
          </>
        }
        trigger={
          <Label>
            {item.label.content}
            <Icon
              name="delete"
              onClick={event => {
                console.log('[TODO]: remove item');
              }}
            />
          </Label>
        }
      />
    );
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const {
      id,
      title,
      required,
      description,
      error,
      value,
      multiple,
      onEdit,
      onChange,
      onDelete,
      mode,
      openObjectBrowser,
      fieldSet,
    } = this.props;
    console.log('value', value);

    let icon = value && value.length > 0 ? clearSVG : navTreeSVG;
    let iconAction =
      value && value.length > 0
        ? ev => {
            ev.preventDefault();
            onChange(id, null);
          }
        : ev => {
            ev.preventDefault();
            openObjectBrowser({
              mode: mode,
              onSelectItem: (url, item) => {
                multiple ? null : this.onChange(id, url, item); finire da qui
                console.log('selected url', url, 'item', item);
              },
            });
          };

    return (
      <Form.Field
        inline
        required={required}
        error={error.length > 0}
        className={description ? 'help text' : 'text'}
        id={`${fieldSet || 'field'}-${id}`}
      >
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width="4">
              <div className="wrapper">
                <label htmlFor={`field-${id}`}>
                  {onEdit && (
                    <i
                      aria-hidden="true"
                      className="grey bars icon drag handle"
                    />
                  )}
                  {title}
                </label>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              {value.map(item => this.renderLabel(item))}
              {map(error, message => (
                <Label key={message} basic color="red" pointing>
                  {message}
                </Label>
              ))}
              {icon && iconAction && (
                <button onClick={iconAction}>
                  <Icon name={icon} size="18px" />
                </button>
              )}
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

export default compose(injectIntl, withObjectBrowser)(ObjectBrowserWidget);
