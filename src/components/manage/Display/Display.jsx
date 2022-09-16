import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import { getSchema, updateContent, getContent } from '@plone/volto/actions';
import { getLayoutFieldname } from '@plone/volto/helpers';
import { FormFieldWrapper, Icon } from '@plone/volto/components';
import { defineMessages, injectIntl } from 'react-intl';
import config from '@plone/volto/registry';

import downSVG from '@plone/volto/icons/down-key.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import checkSVG from '@plone/volto/icons/check.svg';

const messages = defineMessages({
  Viewmode: {
    id: 'Viewmode',
    defaultMessage: 'View',
  },
});

const Option = injectLazyLibs('reactSelect')((props) => {
  const { Option } = props.reactSelect.components;
  return (
    <Option {...props}>
      <div>{props.label}</div>
      {props.isFocused && !props.isSelected && (
        <Icon name={checkSVG} size="18px" color="#b8c6c8" />
      )}
      {props.isSelected && <Icon name={checkSVG} size="18px" color="#007bc1" />}
    </Option>
  );
});

const DropdownIndicator = injectLazyLibs('reactSelect')((props) => {
  const { DropdownIndicator } = props.reactSelect.components;
  return (
    <DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? (
        <Icon name={upSVG} size="24px" color="#007bc1" />
      ) : (
        <Icon name={downSVG} size="24px" color="#007bc1" />
      )}
    </DropdownIndicator>
  );
});

const selectTheme = (theme) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary25: 'hotpink',
    primary: '#b8c6c8',
  },
});

const customSelectStyles = {
  control: (styles, state) => ({
    ...styles,
    border: 'none',
    borderBottom: '2px solid #b8c6c8',
    boxShadow: 'none',
    borderBottomStyle: state.menuIsOpen ? 'dotted' : 'solid',
  }),
  menu: (styles, state) => ({
    ...styles,
    top: null,
    marginTop: 0,
    boxShadow: 'none',
    borderBottom: '2px solid #b8c6c8',
  }),
  menuList: (styles, state) => ({
    ...styles,
    maxHeight: '400px',
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    width: null,
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: 0,
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: null,
    minHeight: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 12px',
    color: state.isSelected
      ? '#007bc1'
      : state.isFocused
      ? '#4a4a4a'
      : 'inherit',
    ':active': {
      backgroundColor: null,
    },
    span: {
      flex: '0 0 auto',
    },
    svg: {
      flex: '0 0 auto',
    },
  }),
};

/**
 * Display container class.
 * @class Display
 * @extends Component
 */
class DisplaySelect extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getSchema: PropTypes.func.isRequired,
    updateContent: PropTypes.func.isRequired,
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
    layouts: [],
    layout: '',
  };

  state = {
    selectedOption: {
      value: this.props.layout,
      label:
        this.props.intl.formatMessage({
          id: config.views.layoutViewsNamesMapping?.[this.props.layout],
          defaultMessage:
            config.views.layoutViewsNamesMapping?.[this.props.layout],
        }) || this.props.layout,
    },
  };

  componentDidMount() {
    this.props.getSchema(this.props.type);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
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
  setLayout = (selectedOption) => {
    this.props.updateContent(this.props.pathname, {
      layout: selectedOption.value,
    });
    this.setState({ selectedOption });
  };

  selectValue = (option) => (
    <Fragment>
      <span className="Select-value-label">{option.label}</span>
    </Fragment>
  );

  optionRenderer = (option) => (
    <Fragment>
      <span style={{ marginRight: 'auto' }}>{option.label}</span>
      <Icon name={checkSVG} size="24px" />
    </Fragment>
  );

  render() {
    const { selectedOption } = this.state;
    const Select = this.props.reactSelect.default;
    const layoutsNames = config.views.layoutViewsNamesMapping;
    const layoutOptions = this.props.layouts
      .filter(
        (layout) =>
          Object.keys(config.views.contentTypesViews).includes(layout) ||
          Object.keys(config.views.layoutViews).includes(layout),
      )
      .map((item) => ({
        value: item,
        label:
          this.props.intl.formatMessage({
            id: layoutsNames[item],
            defaultMessage: layoutsNames[item],
          }) || item,
      }));

    return layoutOptions?.length > 1 ? (
      <FormFieldWrapper
        id="display-select"
        title={this.props.intl.formatMessage(messages.Viewmode)}
        {...this.props}
      >
        <Select
          name="display-select"
          className="react-select-container"
          classNamePrefix="react-select"
          options={layoutOptions}
          styles={customSelectStyles}
          theme={selectTheme}
          components={{ DropdownIndicator, Option }}
          onChange={this.setLayout}
          defaultValue={selectedOption}
          isSearchable={false}
        />
      </FormFieldWrapper>
    ) : null;
  }
}

export default compose(
  injectIntl,
  injectLazyLibs('reactSelect'),
  connect(
    (state) => ({
      loaded: state.content.update.loaded,
      layouts: state.schema.schema ? state.schema.schema.layouts : [],
      layout: state.content.data
        ? state.content.data[getLayoutFieldname(state.content.data)]
        : '',
      layout_fieldname: state.content.data
        ? getLayoutFieldname(state.content.data)
        : '',
      type: state.content.data ? state.content.data['@type'] : '',
    }),
    { getSchema, updateContent, getContent },
  ),
)(DisplaySelect);
