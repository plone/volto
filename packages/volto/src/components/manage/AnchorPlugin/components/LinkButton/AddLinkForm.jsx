import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { withRouter } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual, connect } from 'react-redux';
import { compose } from 'redux';
import { getContentIcon } from '@plone/volto/helpers/Content/Content';

import { useIntl, defineMessages, injectIntl } from 'react-intl';

import uniqBy from 'lodash/uniqBy';

import jwtDecode from 'jwt-decode';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Image from '@plone/volto/components/theme/Image/Image';
import { searchContent } from '@plone/volto/actions/search/search';
import {
  addAppURL,
  isInternalURL,
  flattenToAppURL,
  URLUtils,
  getBaseUrl,
} from '@plone/volto/helpers/Url/Url';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

import clearSVG from '@plone/volto/icons/clear.svg';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const messages = defineMessages({
  placeholder: {
    id: 'Paste or search for link',
    defaultMessage: 'Paste or search for link',
  },
  openObjectBrowser: {
    id: 'Open object browser',
    defaultMessage: 'Open object browser',
  },
  clear: {
    id: 'Clear',
    defaultMessage: 'Clear',
  },
  submit: {
    id: 'Submit',
    defaultMessage: 'Submit',
  },
});

const LinkForm = ({
  data,
  reactSelect,
  placeholder,
  filterSuggestionByType,
  onChangeValue,
  onOverrideContent,
  objectBrowserPickerType,
  openObjectBrowser,
  onClear,
}) => {
  const location = useLocation();
  const contextUrl = getBaseUrl(location.pathname);

  const intl = useIntl();
  const dispatch = useDispatch();

  const linkFormContainer = useRef(null);
  const selectRef = useRef(null);

  const [link, setLink] = useState(
    isInternalURL(data.url) ? flattenToAppURL(data.url) : data.url || '',
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const subrequests = useSelector((state) => state.search.subrequests);
  const token = useSelector((state) => state.userSession.token, shallowEqual);
  const userId = token ? jwtDecode(token).sub : '';

  const Select = reactSelect.default;

  // Effect to set the initial selected value when data.url changes
  useEffect(() => {
    if (data.url) {
      const initialUrl = isInternalURL(data.url)
        ? flattenToAppURL(data.url)
        : data.url;

      setSelectedValue({ label: initialUrl, value: initialUrl });
      setSearchTerm(initialUrl);
      setLink(initialUrl);
    } else {
      setSelectedValue(null);
      setSearchTerm('');
      setLink('');
    }
  }, [data.url]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const searchParams = searchTerm
        ? { SearchableText: `${searchTerm}*` }
        : {};

      dispatch(
        searchContent(
          '/',
          {
            ...searchParams,
            Creator: userId,
            sort_on: 'modified',
            sort_order: 'descending',
            metadata_fields: '_all',
            b_size: searchTerm ? 10 : 5,
            ...(objectBrowserPickerType ? { portal_type: ['Image'] } : {}),
          },
          'latestContent',
        ),
      );

      dispatch(
        searchContent(
          contextUrl,
          {
            ...searchParams,
            'path.depth': 1,
            sort_on: 'getObjPositionInParent',
            metadata_fields: '_all',
            b_size: searchTerm ? 10 : 5,
            ...(objectBrowserPickerType ? { portal_type: ['Image'] } : {}),
          },
          'crtFolderContent',
        ),
      );

      dispatch(
        searchContent(
          '/',
          {
            ...searchParams,
            sort_on: 'getObjPositionInParent',
            metadata_fields: '_all',
            b_size: searchTerm ? 10 : 5,
            ...(objectBrowserPickerType ? { portal_type: ['Image'] } : {}),
          },
          'allFoldersContent',
        ),
      );
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, contextUrl, userId, searchTerm, objectBrowserPickerType]);

  const content = useMemo(() => {
    const latestContent = subrequests?.['latestContent']?.items || [];
    const crtFolderContent = subrequests?.['crtFolderContent']?.items || [];
    const allFoldersContent = subrequests?.['allFoldersContent']?.items || [];

    const contentOptions = [
      ...latestContent,
      ...crtFolderContent,
      ...allFoldersContent,
    ];

    return uniqBy(contentOptions, '@id');
  }, [subrequests]);

  const filteredSuggestions = useMemo(() => {
    const suggestions = content
      .filter((item) => {
        if (filterSuggestionByType) {
          return item['@type'] === filterSuggestionByType;
        }
        return item;
      })
      .map((item) => ({
        label: item.title,
        value: item['@id'],
        src: `${item['@id']}/@@images/image/preview`,
        path: flattenToAppURL(item['@id']),
        icon: getContentIcon(item['@type'], item.is_folderish),
        type: item['@type'],
      }));

    return suggestions.slice(0, 5); // Limit to 5 for display
  }, [filterSuggestionByType, content]);

  const formatOptionLabel = ({ label, path, src, icon, type }) => (
    <div className="link-suggestion-container">
      <div className="link-suggestion-preview">
        {type === 'Image' ? (
          <Image src={src} alt={label} />
        ) : (
          <div className="icon-wrapper">
            <Icon name={icon} size="20px" />
          </div>
        )}
      </div>
      <div className="link-suggestion-content">
        <div className="link-suggestion-label">{label}</div>
        <div className="link-suggestion-path">{path}</div>
      </div>
    </div>
  );

  const onInputChange = (inputValue, { action }) => {
    if (action === 'input-change') {
      setLink(inputValue);
      setSearchTerm(inputValue);
      setSelectedValue(null);
      // Open menu if typing and there are any suggestions (even if filteredSuggestions is empty for a moment,
      // the backend call will update 'content' and thus 'filteredSuggestions' shortly after)
      setIsMenuOpen(true); // Always open menu when typing
    }
  };

  const onChange = (urlOption) => {
    if (urlOption) {
      setLink(urlOption.value);
      onChangeValue(addAppURL(urlOption.value));
      setSelectedValue(urlOption);
      setSearchTerm(urlOption.label);
      setIsMenuOpen(false);
    } else {
      setLink('');
      onChangeValue('');
      setSelectedValue(null);
      setSearchTerm('');
      setIsMenuOpen(false);
    }
    selectRef.current?.focus();
  };

  const onSubmit = () => {
    const normalizedUrl = URLUtils.checkAndNormalizeUrl(link);

    if (!normalizedUrl.isValid) {
      return;
    }

    const editorStateUrl = isInternalURL(link) ? addAppURL(link) : link;

    onChangeValue(editorStateUrl);
    onClose();
  };

  const clear = () => {
    setLink('');
    setSearchTerm('');
    setSelectedValue(null);
    onClear();
    setIsMenuOpen(false);
    selectRef.current?.focus();
  };

  const onClose = useCallback(
    () => onOverrideContent(undefined),
    [onOverrideContent],
  );

  const handleSelectKeyDown = (e) => {
    // If the menu is open, stop propagation for arrow keys and Enter
    if (
      isMenuOpen &&
      (e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'Enter' ||
        e.key === 'Tab')
    ) {
      e.stopPropagation();
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const onFocus = () => {
    // Open menu if there are any filtered suggestions.
    // This makes sure initial suggestions are shown on focus.
    if (filteredSuggestions.length > 0) {
      setIsMenuOpen(true);
    }
  };

  const onBlur = () => {
    // Close menu when focus leaves, unless an item is being clicked in the menu.
    // react-select handles this internally fairly well.
    // This is a common pattern to ensure the menu closes when appropriate.
    // A small timeout can sometimes be useful if menu items are buttons.
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        linkFormContainer.current &&
        linkFormContainer.current.contains(e.target)
      ) {
        return;
      }

      if (linkFormContainer.current && filterSuggestionByType) {
        return;
      }

      onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onOverrideContent, filterSuggestionByType, onClose]);

  // Focus the select input when the component mounts or becomes visible
  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  }, [selectRef]);

  return (
    <div
      className="link-form-container link-searchable-form-container"
      ref={linkFormContainer}
    >
      <Button
        type="button"
        basic
        icon
        className="nav-button"
        aria-label={intl.formatMessage(messages.openObjectBrowser)}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openObjectBrowser({
            mode: objectBrowserPickerType,
            overlay: true,
            onSelectItem: (url) => {
              onChange({ value: url, label: url });
              onSubmit();
            },
          });
        }}
      >
        <Icon name={navTreeSVG} size="24px" />
      </Button>
      <div className="wrapper">
        <Select
          ref={selectRef}
          className="react-select-container"
          classNamePrefix="react-select"
          inputValue={searchTerm}
          value={selectedValue}
          options={filteredSuggestions}
          formatOptionLabel={formatOptionLabel}
          isSearchable
          placeholder={placeholder || intl.formatMessage(messages.placeholder)}
          noOptionsMessage={() => 'No options'}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          onChange={onChange}
          onInputChange={onInputChange}
          onKeyDown={handleSelectKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          menuIsOpen={isMenuOpen}
          isClearable
        />
        {link.length > 0 && (
          <Button
            type="button"
            basic
            className="cancel"
            aria-label={intl.formatMessage(messages.clear)}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              clear();
            }}
          >
            <Icon name={clearSVG} size="24px" />
          </Button>
        )}
        <Button
          basic
          primary
          disabled={!link.length > 0}
          aria-label={intl.formatMessage(messages.submit)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onSubmit();
          }}
        >
          <Icon name={aheadSVG} size="24px" />
        </Button>
      </div>
    </div>
  );
};

LinkForm.propTypes = {
  onChangeValue: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onOverrideContent: PropTypes.func.isRequired,
  reactSelect: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  filterSuggestionByType: PropTypes.string,
  objectBrowserPickerType: PropTypes.string,
};

LinkForm.defaultProps = {
  placeholder: null,
  filterSuggestionByType: null,
  objectBrowserPickerType: null,
};

export default compose(
  injectIntl,
  withRouter,
  connect(
    (state) => ({
      searchSubrequests: state.search.subrequests,
    }),
    { searchContent },
  ),
  injectLazyLibs('reactSelect'),
  withObjectBrowser,
)(LinkForm);
