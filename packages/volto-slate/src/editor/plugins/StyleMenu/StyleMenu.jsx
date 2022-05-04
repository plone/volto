import React, { useState } from 'react';
import { useSlate } from 'slate-react';
import loadable from '@loadable/component';
import { useIntl, defineMessages } from 'react-intl';
import { isBlockStyleActive, isInlineStyleActive, toggleStyle } from './utils';
import config from '@plone/volto/registry';

const Select = loadable(() => import('react-select'));

const messages = defineMessages({
  allStylesApplied: {
    id: 'All Styles Applied',
    defaultMessage: 'All Styles Applied',
  },
  noStyle: {
    id: 'No Style',
    defaultMessage: 'No Style',
  },
  fontStyle: {
    id: 'Font Style',
    defaultMessage: 'Font Style',
  },
  paragraphStyle: {
    id: 'Paragraph Style',
    defaultMessage: 'Paragraph Style',
  },
});

// const brownColor = '#826A6A';

const selectStyles = {
  valueContainer: (provided, state) => {
    return {
      ...provided,
      padding: '0px',
      paddingLeft: '0px',
      paddingTop: '0px',
      paddingRight: '0px',
      paddingDown: '0px',
      fontSize: '1rem',
      position: 'static',
    };
  },
  input: (provided, state) => {
    return {
      ...provided,
      display: 'none',
    };
  },
  dropdownIndicator: (provided, state) => {
    return {
      ...provided,
      padding: '0px',
      paddingLeft: '0px',
      paddingTop: '0px',
      paddingRight: '0px',
      paddingDown: '0px',
    };
  },
  indicatorsContainer: (provided, state) => {
    return {
      ...provided,
      padding: '0px',
      paddingLeft: '0px',
      paddingTop: '0px',
      paddingRight: '0px',
      paddingDown: '0px',
    };
  },
  clearIndicator: (provided, state) => {
    return {
      ...provided,
      padding: '0px',
      paddingLeft: '0px',
      paddingTop: '0px',
      paddingRight: '0px',
      paddingDown: '0px',
    };
  },
  control: (provided, state) => {
    return {
      ...provided,
      minHeight: 'auto',
      borderWidth: 'unset',
      cursor: 'pointer',
      marginTop: '0.25rem',
      // borderColor: state.isFocused ? brownColor : '#f3f3f3',
      // boxShadow: 'unset',
    };
  },
  container: (provided, state) => {
    return {
      ...provided,
      marginLeft: '3px',
      width: '15rem',
      // backgroundColor: state.isFocused ? '#f3f3f3' : 'unset',
    };
  },
  singleValue: (provided, state) => {
    return {
      paddingLeft: '3px',
      fontSize: '1rem',
      // color: brownColor,
    };
  },
  option: (provided, state) => {
    return {
      ...provided,
      fontSize: '1rem',
      cursor: 'pointer',
      // color: state.isSelected ? 'white' : brownColor,
    };
  },
  noOptionsMessage: (provided, state) => {
    return {
      ...provided,
      fontSize: '1rem',
    };
  },
  group: (provided, state) => {
    return {
      ...provided,
      fontSize: '1rem',
    };
  },
};

const StylingsButton = (props) => {
  const editor = useSlate();
  const intl = useIntl();
  const [open, setOpen] = useState(false);

  // Converting the settings to a format that is required by react-select.
  const rawOpts = [
    ...config.settings.slate.styleMenu.inlineStyles.map((def) => {
      return { value: def.cssClass, label: def.label, isBlock: false };
    }),
    ...config.settings.slate.styleMenu.blockStyles.map((def) => {
      return { value: def.cssClass, label: def.label, isBlock: true };
    }),
  ];

  // TODO: i18n for the two strings used below
  const opts = [
    {
      label: intl.formatMessage(messages.paragraphStyle),
      options: rawOpts.filter((x) => x.isBlock),
    },
    {
      label: intl.formatMessage(messages.fontStyle),
      options: rawOpts.filter((x) => !x.isBlock),
    },
  ];

  // Calculating the initial selection.
  const toSelect = [];
  // block styles
  for (const val of opts[0].options) {
    const ia = isBlockStyleActive(editor, val.value);
    if (ia) {
      toSelect.push(val);
    }
  }
  // inline styles
  for (const val of opts[1].options) {
    const ia = isInlineStyleActive(editor, val.value);
    if (ia) {
      toSelect.push(val);
    }
  }

  return rawOpts.length > 0 ? (
    <Select
      options={opts}
      value={toSelect}
      menuIsOpen={open}
      onBlur={() => {
        setOpen(false);
      }}
      isMulti={true}
      styles={selectStyles}
      placeholder={intl.formatMessage(messages.noStyle)}
      hideSelectedOptions={false}
      noOptionsMessage={({ inputValue }) =>
        intl.formatMessage(messages.allStylesApplied)
      }
      components={{
        // Shows the most relevant part of the selection as a simple string of text.
        // TODO: show all the styles selected with commas between them and
        // ellipsis just at the end of the MultiValue right side limit
        MultiValue: (props) => {
          const val = props.getValue();

          if (props.index === 0) {
            const cond = val.length > 1;
            const lbl = val[props.index].label + '...';
            const lbl2 = val[props.index].label;
            return <>{cond ? lbl : lbl2}</>;
          }

          return '';
        },
        Control: (props) => {
          const {
            children,
            cx,
            getStyles,
            className,
            isDisabled,
            isFocused,
            innerRef,
            innerProps,
            menuIsOpen,
          } = props;
          return (
            <div
              ref={innerRef}
              role="presentation"
              style={getStyles('control', props)}
              className={cx(
                {
                  control: true,
                  'control--is-disabled': isDisabled,
                  'control--is-focused': isFocused,
                  'control--menu-is-open': menuIsOpen,
                },
                className,
              )}
              {...innerProps}
              // The only difference from the initial React-Select's Control
              // component:
              onClick={() => {
                setOpen(!open);
              }}
            >
              {children}
            </div>
          );
        },
      }}
      theme={(theme) => {
        return {
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#826A6AFF', // 100% opaque @brown
            primary75: '#826A6Abf', // 75% opaque @brown
            primary50: '#826A6A7f', // 50% opaque @brown
            primary25: '#826A6A40', // 25% opaque @brown
          },
        };
      }}
      onChange={(selItem, meta) => {
        // console.log('meta', meta);
        for (const item of rawOpts) {
          const isRequested = selItem.includes(item);
          toggleStyle(editor, {
            cssClass: item.value,
            isBlock: item.isBlock,
            isRequested,
          });
        }
      }}
    ></Select>
  ) : (
    ''
  );
};

export default StylingsButton;
