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
    minHeight: '40px',
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
    padding: '0px',
    paddingLeft: 0,
  }),
  dropdownIndicator: (styles) => ({
    paddingRight: 0,
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: null,
    minHeight: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 12px',
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
