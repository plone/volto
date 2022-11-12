import React from 'react';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { Icon } from '@plone/volto/components';

import downSVG from '@plone/volto/icons/down-key.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
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

export const SelectContainer = injectLazyLibs('reactSelect')(
  ({ children, ...props }) => {
    const { SelectContainer } = props.reactSelect.components;
    return (
      <SelectContainer
        {...props}
        className={props.cx(
          {
            '--is-focused': props.isFocused,
            '--has-value': props.hasValue,
            '--has-placeholder': props.selectProps.placeholder,
            '--has-error': props.selectProps.hasError?.length,
            '--is-multi': props.selectProps.isMulti,
          },
          props.className,
        )}
      >
        {children}
      </SelectContainer>
    );
  },
);

export const MultiValueRemove = injectLazyLibs('reactSelect')((props) => {
  const { MultiValueRemove } = props.reactSelect.components;
  return (
    <MultiValueRemove {...props}>
      <Icon name={clearSVG} size="12px" color="#4A5B68" />
    </MultiValueRemove>
  );
});

export const ClearIndicator = injectLazyLibs('reactSelect')((props) => {
  const { ClearIndicator } = props.reactSelect.components;
  return (
    <ClearIndicator {...props}>
      <Icon name={clearSVG} size="12px" color="#4A5B68" />
    </ClearIndicator>
  );
});

export const Option = injectLazyLibs('reactSelect')((props) => {
  const { Option } = props.reactSelect.components;
  return (
    <Option {...props}>
      <div className="label">{props.label}</div>
      {/* {props.isFocused && !props.isSelected && (
            <Icon name={checkSVG} size="24px" color="#b8c6c8" />
          )}
          {props.isSelected && (
            <Icon name={checkSVG} size="24px" color="#007bc1" />
          )} */}
    </Option>
  );
});

export const DropdownIndicator = injectLazyLibs('reactSelect')((props) => {
  const { DropdownIndicator } = props.reactSelect.components;
  return (
    <DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? (
        <Icon name={upSVG} size="18px" color="#007bc1" />
      ) : (
        <Icon name={downSVG} size="18px" color="#007bc1" />
      )}
    </DropdownIndicator>
  );
});

export const Group = injectLazyLibs('reactSelect')((props) => {
  const { Group } = props.reactSelect.components;
  return <Group {...props}></Group>;
});

export const selectTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: 'hotpink',
    primary: '#b8c6c8',
  },
});

export const customSelectStyles = {
  control: (styles, state) => {
    return {
      ...styles,
      backgroundColor:
        state.isFocused || state.isDisabled ? '#fff !important' : null,
      boxShadow: state.isDisabled
        ? 'inset 0 0 0 1px #E4E8EC !important'
        : state.isFocused
        ? 'inset 0 0 0 2px #349ef4 !important'
        : null,
      outline: 0,
      borderRadius: '6px',
    };
  },
  input: (styles, state) => ({
    ...styles,
    padding: 0,
    margin: 0,
    marginLeft: '3px',
  }),
  menu: (styles, state) => ({
    ...styles,
    top: null,
    marginTop: 0,
    zIndex: 2,
    backgroundColor: '#FFFFFF',
    boxShadow:
      '0px 3px 6px rgba(2, 19, 34, 0.12), 0px 2px 4px rgba(2, 19, 34, 0.06)',
    borderRadius: '6px',
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    width: null,
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: 0,
  }),
  dropdownIndicator: (styles) => ({
    paddingRight: 0,
    maxHeight: '21px',
    display: 'flex',
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: state.isSelected ? '#d2d9df' : null,
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
  multiValue: (base) => ({
    ...base,
    border: '1px solid #C3CDD5',
    borderRadius: '40px',
    backgroundColor: '#fff',
    margin: '0 4px 0 0',
  }),
  multiValueLabel: (base) => ({
    ...base,
    borderRadius: '40px',
    backgroundColor: '#fff',
    padding: '5px 3px 5px 9px',
  }),
  multiValueRemove: (base) => ({
    ...base,
    ':hover': {
      cursor: 'pointer',
      border: 'none',
      backgroundColor: 'transparent',
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    cursor: 'pointer',
  }),
};
