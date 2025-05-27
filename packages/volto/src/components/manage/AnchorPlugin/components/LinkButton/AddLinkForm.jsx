/**
 * AddLink Form.
 * @module components/manage/AnchorPlugin/components/LinkButton/AddLinkForm
 */

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
import expandSVG from '@plone/volto/icons/left-key.svg';

const messages = defineMessages({
  placeholder: {
    id: 'Paste or search for link',
    defaultMessage: 'Paste or search for link',
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
  onClear,
}) => {
  const location = useLocation();
  const contextUrl = getBaseUrl(location.pathname);

  const intl = useIntl();
  const dispatch = useDispatch();

  const linkFormContainer = useRef(null);

  const [link, setLink] = useState(
    isInternalURL(data.url) ? flattenToAppURL(data.url) : data.url || '',
  );
  const [searchTerm, setSearchTerm] = useState('');

  const subrequests = useSelector((state) => state.search.subrequests);
  const token = useSelector((state) => state.userSession.token, shallowEqual);
  const userId = token ? jwtDecode(token).sub : '';

  const Select = reactSelect.default;

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
        path: getBaseUrl(item['@id']),
        icon: getContentIcon(item['@type'], item.is_folderish),
        type: item['@type'],
      }));

    return suggestions.slice(0, 5); // Limitam tot la 5 pentru afișare
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
      setSearchTerm(inputValue); // Actualizează searchTerm pentru a declanșa căutarea backend
    }
  };

  const onChange = (url) => {
    setLink(url.value);
    onChangeValue(addAppURL(url.value));
    setSearchTerm(''); // Golește searchTerm după selecție
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
    setSearchTerm(''); // Golește searchTerm la ștergere
    onClear();
  };

  const onClose = useCallback(
    () => onOverrideContent(undefined),
    [onOverrideContent],
  );

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      onSubmit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
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

  return (
    <div
      className="link-form-container link-searchable-form-container"
      ref={linkFormContainer}
    >
      <Icon name={expandSVG} color="#222" size="26px" />
      <div className="wrapper">
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          inputValue={link}
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
          onKeyDown={onKeyDown}
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
