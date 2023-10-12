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
    minHeight: '37px',
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
    padding: '8px',
  }),
  dropdownIndicator: (styles) => ({
    paddingRight: 0,
    paddingTop: '4px',
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: null,
    minHeight: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 6px',
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
      height: '18px !important',
      width: '18px !important',
    },
  }),
};

export const sortOnSelectStyles = {
  control: (styles, state) => ({
    ...styles,
    border: '1px solid #c7d5d8',
    borderRadius: '5px',
    boxShadow: 'none',
    minHeight: '20px',
    width: '170px',
  }),
  menu: (styles, state) => ({
    ...styles,
    top: null,
    marginTop: 0,
    boxShadow: 'none',
    border: '1px solid #c7d5d8',
    zIndex: 2,
    width: '170px',
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    width: null,
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    padding: '3px',
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: null,
    minHeight: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '6px 6px',
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
      height: '18px !important',
      width: '18px !important',
    },
  }),
};
