/**
 * ObjectBrowserWidget component.
 * @module components/manage/Widgets/ObjectBrowserWidget
 */

import { searchContent } from '@plone/volto/actions/search/search';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import {
  flattenToAppURL,
  isInternalURL,
  isUrl,
  normalizeUrl,
  removeProtocol,
} from '@plone/volto/helpers/Url/Url';
import config from '@plone/volto/registry';
import { compact, remove } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Grid, Image, Input, Label, Popup } from 'semantic-ui-react';

import {
  ClearIndicator,
  MenuList,
  MultiValueContainer,
  Option,
  customSelectStyles,
  selectTheme,
} from '@plone/volto/components/manage/Widgets/SelectStyling';

import aheadSVG from '@plone/volto/icons/ahead.svg';
import blankSVG from '@plone/volto/icons/blank.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import homeSVG from '@plone/volto/icons/home.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import { withRouter } from 'react-router';

const messages = defineMessages({
  placeholder: {
    id: 'No items selected',
    defaultMessage: 'No items selected',
  },
  edit: {
    id: 'Edit',
    defaultMessage: 'Edit',
  },
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
  openObjectBrowser: {
    id: 'Object browser',
    defaultMessage: 'Object browser',
  },
});

function SingleInput({ id, value, onChange, readOnly }) {
  return (
    <Input
      id={`field-${id}`}
      name={id}
      value={value || ''}
      // disabled={isDisabled}
      // icon={icon || null}
      // placeholder={placeholder}
      onChange={({ target }) =>
        onChange(id, target.value === '' ? undefined : target.value)
      }
      readOnly={readOnly}
      // ref={ref}
      // onBlur={({ target }) =>
      //   onBlur(id, target.value === '' ? undefined : target.value)
      // }
      // onClick={() => onClick()}
      // minLength={minLength || null}
      // maxLength={maxLength || null}
    />
  );
}

function MultipleNoTextBody({ id, value, onChange, readOnly, reactSelect }) {
  const Select = reactSelect.default;

  const options = [
    { value: 'Op1', label: 'OP 1' },
    { value: 'Op2', label: 'OP 2' },
    { value: 'Op3', label: 'OP 3' },
  ];

  function normalizeValue() {
    return value.map((v) => {
      return {
        // label: find(choices, (c) => c.value === v)?.label || v,
        label: options.find((c) => c.value === v)?.label || v,
        value: v,
      };
    });
  }

  console.log('VALUE', value);

  return (
    <Select
      id={`field-${id}`}
      name={id}
      menuShouldScrollIntoView={false}
      // isDisabled={disabled}
      isSearchable={true}
      className="react-select-container"
      classNamePrefix="react-select"
      isMulti
      options={options}
      styles={customSelectStyles}
      theme={selectTheme}
      components={{
        // ...(options?.length > 25 && {
        // MenuList,
        // }),
        MultiValueContainer,
        DropdownIndicator: () => null,
        ClearIndicator,
        Option: Option,
      }}
      value={normalizeValue(value)}
      onChange={(selectedOption) => {
        // TODO: On change from existing input
        return onChange(
          id,
          selectedOption.map((el) => el.value),
        );
      }}
      readOnly
      // value={['Op1']}
      // placeholder={
      //   this.props.placeholder ?? this.props.intl.formatMessage(messages.select)
      // }
      // onChange={(selectedOption) => {
      //   if (isMulti) {

      //   return onChange(
      //     id,
      //     selectedOption && selectedOption.value !== 'no-value'
      //       ? selectedOption.value
      //       : undefined,
      //   );
      // }}
      // isClearable
    />
  );
}
const MultipleNoText = injectLazyLibs('reactSelect')(MultipleNoTextBody);

function MultipleWithText() {
  return <p>Multiple with text</p>;
}

/**
 * ObjectBrowserWidget component class.
 * @class ObjectBrowserWidget
 * @extends Component
 */
export class ObjectBrowserWidgetComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    mode: PropTypes.string, // link, image, multiple
    return: PropTypes.string, // single, multiple
    initialPath: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.object,
    ]),
    onChange: PropTypes.func.isRequired,
    openObjectBrowser: PropTypes.func.isRequired,
    allowExternals: PropTypes.bool,
    placeholder: PropTypes.string,
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
    value: [],
    mode: 'multiple',
    return: 'multiple',
    initialPath: '',
    allowExternals: false,
  };

  state = {
    manualLinkInput: '',
    validURL: false,
  };

  constructor(props) {
    super(props);
    this.selectedItemsRef = React.createRef();
    this.placeholderRef = React.createRef();
  }

  removeItem = (item) => {
    let value = [...this.props.value];
    remove(value, function (_item) {
      return _item['@id'] === item['@id'];
    });
    this.props.onChange(this.props.id, value);
  };

  onChange = (item) => {
    let value =
      this.props.mode === 'multiple' && this.props.value
        ? [...this.props.value]
        : [];
    value = value.filter((item) => item != null);
    const maxSize =
      this.props.widgetOptions?.pattern_options?.maximumSelectionSize || -1;
    if (maxSize === 1 && value.length === 1) {
      value = []; //enable replace of selected item with another value, if maxsize is 1
    }
    let exists = false;
    let index = -1;
    value.forEach((_item, _index) => {
      if (flattenToAppURL(_item['@id']) === flattenToAppURL(item['@id'])) {
        exists = true;
        index = _index;
      }
    });
    //find(value, {
    //   '@id': flattenToAppURL(item['@id']),
    // });
    if (!exists) {
      // add item
      // Check if we want to filter the attributes of the selected item
      let resultantItem = item;
      if (this.props.selectedItemAttrs) {
        const allowedItemKeys = [
          ...this.props.selectedItemAttrs,
          // Add the required attributes for the widget to work
          '@id',
          'title',
        ];
        resultantItem = Object.keys(item)
          .filter((key) => allowedItemKeys.includes(key))
          .reduce((obj, key) => {
            obj[key] = item[key];
            return obj;
          }, {});
      }
      // Add required @id field, just in case
      resultantItem = { ...resultantItem, '@id': item['@id'] };
      value.push(resultantItem);
      if (this.props.return === 'single') {
        this.props.onChange(this.props.id, value[0]);
      } else {
        this.props.onChange(this.props.id, value);
      }
    } else {
      //remove item
      value.splice(index, 1);
      this.props.onChange(this.props.id, value);
    }
  };

  onManualLinkInput = (e) => {
    this.setState({ manualLinkInput: e.target.value });
    if (this.validateManualLink(e.target.value)) {
      this.setState({ validURL: true });
    } else {
      this.setState({ validURL: false });
    }
  };

  validateManualLink = (url) => {
    if (this.props.allowExternals) {
      return isUrl(url);
    } else {
      return isInternalURL(url);
    }
  };

  onSubmitManualLink = () => {
    if (this.validateManualLink(this.state.manualLinkInput)) {
      if (isInternalURL(this.state.manualLinkInput)) {
        const link = this.state.manualLinkInput;
        // convert it into an internal on if possible
        this.props
          .searchContent(
            '/',
            {
              'path.query': flattenToAppURL(this.state.manualLinkInput),
              'path.depth': '0',
              sort_on: 'getObjPositionInParent',
              metadata_fields: '_all',
              b_size: 1000,
            },
            `${this.props.block}-${this.props.mode}`,
          )
          .then((resp) => {
            if (resp.items?.length > 0) {
              this.onChange(resp.items[0]);
            } else {
              this.props.onChange(this.props.id, [
                {
                  '@id': flattenToAppURL(link),
                  title: removeProtocol(link),
                },
              ]);
            }
          });
      } else {
        this.props.onChange(this.props.id, [
          {
            '@id': normalizeUrl(this.state.manualLinkInput),
            title: removeProtocol(this.state.manualLinkInput),
          },
        ]);
      }
      this.setState({ validURL: true, manualLinkInput: '' });
    }
  };

  onKeyDownManualLink = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.onSubmitManualLink();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      // TODO: Do something on ESC key
    }
  };

  showObjectBrowser = (ev) => {
    ev.preventDefault();
    this.props.openObjectBrowser({
      mode: this.props.mode,
      currentPath: this.props.initialPath || this.props.location.pathname,
      propDataName: 'value',
      onSelectItem: (url, item) => {
        this.onChange(item);
      },
      selectableTypes:
        this.props.widgetOptions?.pattern_options?.selectableTypes ||
        this.props.selectableTypes,
      maximumSelectionSize:
        this.props.widgetOptions?.pattern_options?.maximumSelectionSize ||
        this.props.maximumSelectionSize,
    });
  };

  handleSelectedItemsRefClick = (e) => {
    if (this.props.isDisabled) {
      return;
    }

    if (
      e.target.contains(this.selectedItemsRef.current) ||
      e.target.contains(this.placeholderRef.current)
    ) {
      this.showObjectBrowser(e);
    }
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const {
      id,
      description,
      fieldSet,
      value,
      mode,
      allowExternals,
      onChange,
      isDisabled,
      isObjectBrowserOpen,
    } = this.props;

    let items = compact(!Array.isArray(value) && value ? [value] : value || []);

    let icon = navTreeSVG;
    let iconAction =
      mode === 'multiple' || items.length === 0
        ? this.showObjectBrowser
        : (e) => {
            e.preventDefault();
            onChange(id, this.props.return === 'single' ? null : []);
          };

    const isMultiple = mode === 'multiple' || this.props.multiple;

    let WidgetBody;
    if (isMultiple) {
      if (allowExternals) {
        WidgetBody = MultipleWithText;
      } else {
        WidgetBody = MultipleNoText;
      }
    } else {
      WidgetBody = SingleInput;
    }

    const descriptionText = description ? 'help text' : 'text';

    return (
      <FormFieldWrapper {...this.props} className={` ${descriptionText}`}>
        <div className="objectbrowser-field">
          {/* TODO: Is there a prop to get this "full width, no margin" styling? */}
          <Grid style={{ margin: '0', width: '100%' }} stretched>
            <Grid.Row>
              <Grid.Column width="8">
                <WidgetBody
                  id={id}
                  onChange={onChange}
                  value={items}
                  readOnly={!isMultiple && !allowExternals}
                />
              </Grid.Column>
              <Grid.Column width="4">
                <Button
                  aria-label={this.props.intl.formatMessage(
                    messages.openObjectBrowser,
                  )}
                  aria-expanded={isObjectBrowserOpen}
                  aria-describedby={`field-${id}`}
                  aria-controls={`field-${id}`}
                  onClick={iconAction}
                  className="action"
                  disabled={isDisabled}
                >
                  <Icon name={icon} size="18px" />
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </FormFieldWrapper>
    );
  }
}

const ObjectBrowserWidgetMode = (mode) =>
  compose(
    injectIntl,
    withObjectBrowser,
    withRouter,
    connect(null, { searchContent }),
  )((props) => <ObjectBrowserWidgetComponent {...props} mode={mode} />);
export { ObjectBrowserWidgetMode };
export default compose(
  injectIntl,
  withObjectBrowser,
  withRouter,
  connect(null, { searchContent }),
)(ObjectBrowserWidgetComponent);

// function OldBody() {
//   <div
//   className="objectbrowser-field"
//   aria-labelledby={`fieldset-${
//     fieldSet || 'default'
//   }-field-label-${id}`}
// >
//   <div
//     className="selected-values"
//     onClick={this.handleSelectedItemsRefClick}
//     onKeyDown={this.handleSelectedItemsRefClick}
//     role="searchbox"
//     tabIndex={0}
//     ref={this.selectedItemsRef}
//   >
//     {items.map((item) => this.renderLabel(item))}

//     {items.length === 0 && this.props.mode === 'multiple' && (
//       <div className="placeholder" ref={this.placeholderRef}>
//         {this.props.placeholder ??
//           this.props.intl.formatMessage(messages.placeholder)}
//       </div>
//     )}
//     {this.props.allowExternals &&
//       items.length === 0 &&
//       this.props.mode !== 'multiple' && (
//         <input
//           onKeyDown={this.onKeyDownManualLink}
//           onChange={this.onManualLinkInput}
//           value={this.state.manualLinkInput}
//           placeholder={
//             this.props.placeholder ??
//             this.props.intl.formatMessage(messages.placeholder)
//           }
//         />
//       )}
//   </div>
//   {this.state.manualLinkInput && isEmpty(items) && (
//     <Button.Group>
//       <Button
//         basic
//         className="cancel"
//         onClick={(e) => {
//           e.stopPropagation();
//           this.setState({ manualLinkInput: '' });
//         }}
//       >
//         <Icon name={clearSVG} size="18px" color="#e40166" />
//       </Button>
//       <Button
//         basic
//         primary
//         disabled={!this.state.validURL}
//         onClick={(e) => {
//           e.stopPropagation();
//           this.onSubmitManualLink();
//         }}
//       >
//         <Icon name={aheadSVG} size="18px" />
//       </Button>
//     </Button.Group>
//   )}
//   {!this.state.manualLinkInput && (
//     <Button
//       aria-label={this.props.intl.formatMessage(
//         messages.openObjectBrowser,
//       )}
//       onClick={iconAction}
//       className="action"
//       disabled={isDisabled}
//     >
//       <Icon name={icon} size="18px" />
//     </Button>
//   )}
// </div>
// }
