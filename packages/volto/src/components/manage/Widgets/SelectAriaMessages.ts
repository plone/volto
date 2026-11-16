export interface AriaGuidanceProps {
  'aria-label'?: string;
  context: 'menu' | 'input' | 'value';
  isSearchable?: boolean;
  isMulti?: boolean;
  isDisabled?: boolean;
  tabSelectsValue?: boolean;
}

export interface AriaOnChangeProps {
  action: string;
  label?: string;
  isDisabled?: boolean;
}

export interface AriaOnFilterProps {
  inputValue: string;
  resultsMessage: string;
}

export interface AriaOnFocusProps {
  context: 'menu' | 'value';
  focused?: Record<string, unknown>;
  options?: Record<string, unknown>[];
  label?: string;
  selectValue?: Record<string, unknown>[];
  isDisabled?: boolean;
  isSelected?: boolean;
}

export const SELECT_ARIA_MESSAGES = {
  guidance: (props: AriaGuidanceProps): string => {
    const {
      isSearchable,
      isMulti,
      isDisabled,
      tabSelectsValue,
      context,
      'aria-label': ariaLabel,
    } = props;
    switch (context) {
      case 'menu':
        return `Use Up and Down arrow keys to choose options${
          isDisabled
            ? ''
            : ', press Enter to select the currently focused option'
        }, press Escape to exit the menu${
          tabSelectsValue
            ? ', press Tab to select the option and exit the menu'
            : ''
        }.`;
      case 'input':
        return `${ariaLabel || 'Select'} is focused${
          isSearchable ? ', type to refine list' : ''
        }, press Down arrow to open the menu${
          isMulti ? ', press Left arrow to focus selected values' : ''
        }.`;
      case 'value':
        return 'Use Left and Right arrow keys to toggle between focused values, press Backspace to remove the currently focused value.';
      default:
        return '';
    }
  },

  onChange: (props: AriaOnChangeProps): string => {
    const { action, label = '', isDisabled } = props;
    switch (action) {
      case 'deselect-option':
      case 'pop-value':
      case 'remove-value':
        return `Option ${label}, deselected.`;
      case 'select-option':
        return isDisabled
          ? `Option ${label} is disabled. Select another option.`
          : `Option ${label}, selected.`;
      default:
        return '';
    }
  },

  onFocus: (props: AriaOnFocusProps): string => {
    const {
      context,
      focused = {},
      options,
      label = '',
      selectValue,
      isDisabled,
      isSelected,
    } = props;

    const getArrayIndex = (
      arr: Record<string, unknown>[] | undefined,
      item: Record<string, unknown>,
    ): string =>
      arr && arr.length ? `${arr.indexOf(item) + 1} of ${arr.length}` : '';

    if (context === 'value' && selectValue) {
      return `Value ${label} focused, ${getArrayIndex(selectValue, focused)}.`;
    }

    if (context === 'menu') {
      const disabled = isDisabled ? ' disabled' : '';
      const status = `${isSelected ? 'selected' : 'focused'}${disabled}`;
      return `Option ${label} ${status}, ${getArrayIndex(options, focused)}.`;
    }
    return '';
  },

  onFilter: (props: AriaOnFilterProps): string => {
    const { inputValue, resultsMessage } = props;
    const trimmedResults =
      resultsMessage.lastIndexOf('.') === resultsMessage.length - 1
        ? resultsMessage.slice(0, -1)
        : resultsMessage;
    return `${trimmedResults}${
      inputValue ? ' for search term ' + inputValue : ''
    }.`;
  },
};
