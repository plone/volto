import React from 'react';
import loadable from '@loadable/component';

import { Icon } from '@plone/volto/components';

import downSVG from '@plone/volto/icons/down-key.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import checkSVG from '@plone/volto/icons/check.svg';

const ReactSelect = loadable.lib(() => import('react-select'));

export const Option = (props) => {
  return (
    <ReactSelect>
      {({ components }) => (
        <components.Option {...props}>
          <div>{props.label}</div>
          {props.isFocused && !props.isSelected && (
            <Icon name={checkSVG} size="24px" color="#b8c6c8" />
          )}
          {props.isSelected && (
            <Icon name={checkSVG} size="24px" color="#007bc1" />
          )}
        </components.Option>
      )}
    </ReactSelect>
  );
};

export const DropdownIndicator = (props) => {
  return (
    <ReactSelect>
      {({ components }) => (
        <components.DropdownIndicator {...props}>
          {props.selectProps.menuIsOpen ? (
            <Icon name={upSVG} size="24px" color="#007bc1" />
          ) : (
            <Icon name={downSVG} size="24px" color="#007bc1" />
          )}
        </components.DropdownIndicator>
      )}
    </ReactSelect>
  );
};

export const selectTheme = (theme) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary25: 'hotpink',
    primary: '#b8c6c8',
  },
});

export const customSelectStyles = {
  control: (styles, state) => ({
    ...styles,
    border: 'none',
    borderBottom: '1px solid #c7d5d8',
    boxShadow: 'none',
    borderBottomStyle: state.menuIsOpen ? 'dotted' : 'solid',
    minHeight: '60px',
  }),
  menu: (styles, state) => ({
    ...styles,
    top: null,
    marginTop: 0,
    boxShadow: 'none',
    borderBottom: '1px solid #c7d5d8',
    zIndex: 2,
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    width: null,
  }),
  valueContainer: (styles) => ({
    ...styles,
    paddingLeft: 0,
  }),
  dropdownIndicator: (styles) => ({
    paddingRight: 0,
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: null,
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 12px',
    color: state.isSelected
      ? '#007bc1'
      : state.isFocused
      ? '#4a4a4a'
      : 'inherit',
    ':active': {
      backgroundColor: null,
    },
  }),
};
