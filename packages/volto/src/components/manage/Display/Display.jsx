import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import { getSchema, updateContent, getContent } from '@plone/volto/actions';
import { getLayoutFieldname } from '@plone/volto/helpers';
import { usePrevious } from '@plone/volto/helpers';
import { FormFieldWrapper, Icon } from '@plone/volto/components';
import { defineMessages, useIntl } from 'react-intl';
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

const DisplaySelect = (props) => {
  const { pathname } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.content.update.loaded);
  const layouts = useSelector((state) =>
    state.schema.schema ? state.schema.schema.layouts : [],
  );
  const layout = useSelector((state) =>
    state.content.data
      ? state.content.data[getLayoutFieldname(state.content.data)]
      : '',
  );
  const [selectedOption, setselectedOption] = useState({
    value: layout,
    label:
      intl.formatMessage({
        id: config.views.layoutViewsNamesMapping?.[layout],
        defaultMessage: config.views.layoutViewsNamesMapping?.[layout],
      }) || layout,
  });

  const type = useSelector((state) =>
    state.content.data ? state.content.data['@type'] : '',
  );
  const prevloaded = usePrevious(loaded);
  const prevpathname = usePrevious(pathname);

  useEffect(() => {
    dispatch(getSchema(type));
  }, [dispatch, type]);
  useEffect(() => {
    if (pathname !== prevpathname) {
      dispatch(getSchema(type));
    }
    if (!prevloaded && loaded) {
      dispatch(getContent(pathname));
    }
  }, [dispatch, type, pathname, prevpathname, prevloaded, loaded]);

  const setLayout = (selectedOption) => {
    dispatch(
      updateContent(pathname, {
        layout: selectedOption.value,
      }),
    );
    setselectedOption(selectedOption);
  };

  const Select = props.reactSelect.default;
  const layoutsNames = config.views.layoutViewsNamesMapping;
  const layoutOptions = layouts
    .filter(
      (layout) =>
        Object.keys(config.views.contentTypesViews).includes(layout) ||
        Object.keys(config.views.layoutViews).includes(layout),
    )
    .map((item) => ({
      value: item,
      label:
        intl.formatMessage({
          id: layoutsNames[item],
          defaultMessage: layoutsNames[item],
        }) || item,
    }));

  return layoutOptions?.length > 1 ? (
    <FormFieldWrapper
      id="display-select"
      title={intl.formatMessage(messages.Viewmode)}
      {...props}
    >
      <Select
        name="display-select"
        className="react-select-container"
        classNamePrefix="react-select"
        options={layoutOptions}
        styles={customSelectStyles}
        theme={selectTheme}
        components={{ DropdownIndicator, Option }}
        onChange={setLayout}
        defaultValue={selectedOption}
        isSearchable={false}
      />
    </FormFieldWrapper>
  ) : null;
};

DisplaySelect.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default compose(injectLazyLibs('reactSelect'))(DisplaySelect);
