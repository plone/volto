import React from 'react';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { Icon } from '@plone/volto/components';

import downSVG from '@plone/volto/icons/down-key.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import checkSVG from '@plone/volto/icons/check.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const height = 50; // The height of each option

export const MenuList = injectLazyLibs('reactWindow')((props) => {
  const { FixedSizeList: List } = props.reactWindow;
  const { options, children, maxHeight, getValue } = props;
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * height;

  return (
    <List
      height={maxHeight}
      itemCount={children.length}
      itemSize={height}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => <div style={style}>{children[index]}</div>}
    </List>
  );
});

export const SortableMultiValue = injectLazyLibs([
  'reactSelect',
  'reactSortableHOC',
])((props) => {
  const { MultiValue } = props.reactSelect.components;
  const { SortableElement } = props.reactSortableHOC;
  // this prevents the menu from being opened/closed when the user clicks
  // on a value to begin dragging it. ideally, detecting a click (instead of
  // a drag) would still focus the control and toggle the menu, but that
  // requires some magic with refs that are out of scope for this example
  const onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const innerProps = { ...props.innerProps, onMouseDown };
  const SortableComponent = SortableElement(MultiValue);
  return <SortableComponent {...props} innerProps={innerProps} />;
});

export const SortableMultiValueLabel = injectLazyLibs([
  'reactSelect',
  'reactSortableHOC',
])((props) => {
  const { MultiValueLabel } = props.reactSelect.components;
  const { SortableHandle } = props.reactSortableHOC;
  const SortableComponent = SortableHandle(MultiValueLabel);
  return <SortableComponent {...props} />;
});

export const Option = injectLazyLibs('reactSelect')((props) => {
  const { Option } = props.reactSelect.components;
  return (
    <Option {...props}>
      <div>{props.label}</div>
      {props.isFocused && !props.isSelected && (
        <Icon name={checkSVG} size="24px" color="#b8c6c8" />
      )}
      {props.isSelected && <Icon name={checkSVG} size="24px" color="#007bc1" />}
    </Option>
  );
});

export const DropdownIndicator = injectLazyLibs('reactSelect')((props) => {
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

export const ClearIndicator = injectLazyLibs('reactSelect')((props) => {
  const { ClearIndicator } = props.reactSelect.components;
  return (
    <ClearIndicator {...props}>
      <Icon name={clearSVG} size="18px" color="#e40166" />
    </ClearIndicator>
  );
});

export const Group = injectLazyLibs('reactSelect')((props) => {
  const { Group } = props.reactSelect.components;
  return <Group {...props}></Group>;
});

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
  clearIndicator: (styles) => ({
    color: '#e40166',
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
    svg: {
      flex: '0 0 auto',
    },
  }),
};
