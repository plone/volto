/**
 * Link Form.
 * @module components/manage/AnchorPlugin/components/LinkButton/LinkForm
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
import linkSVG from '@plone/volto/icons/link.svg';
import fileSVG from '@plone/volto/icons/file.svg';
import imageSVG from '@plone/volto/icons/image.svg';

import { useIntl, defineMessages, injectIntl } from 'react-intl';

import uniqBy from 'lodash/uniqBy';

import jwtDecode from 'jwt-decode';
import { Button } from 'semantic-ui-react';

import PropTypes from 'prop-types';

import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import Icon from '@plone/volto/components/theme/Icon/Icon';

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

const styles = {
  control: (styles) => ({
    ...styles,
    width: '220px',
    border: 'none',
    boxShadow: 'none',
    fontSize: '14px',
    cursor: 'text',
  }),
  menu: (styles) => ({
    ...styles,
    width: '300px',
    top: null,
    left: '-31px',
    marginTop: 0,
    zIndex: 2,
    borderBottom: '1px solid #c7d5d8',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  }),
  menuList: (styles) => ({
    ...styles,
    maxHeight: 'unset',
    paddingBlock: 0,
  }),
  placeholder: (styles) => ({
    ...styles,
    fontSize: '14px',
    fontWeight: '500',
  }),
  option: (styles) => ({
    ...styles,
    minHeight: '30px',
    display: 'flex',
    alignItems: 'center',
    padding: '6px 10px',
    paddingLeft: '15px',
    color: '#4a4a4a',
    fontSize: '14px',
    backgroundColor: null,
    ':hover': { backgroundColor: '#f4f5f7' },
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    fontSize: '14px',
  }),
};

const LinkForm = ({
  data,
  reactSelect,
  placeholder,
  filterSuggestionByType,
  onChangeValue,
  onOverrideContent,
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

  const subrequests = useSelector((state) => state.search.subrequests);
  const token = useSelector((state) => state.userSession.token, shallowEqual);
  const userId = token ? jwtDecode(token).sub : '';

  const Select = reactSelect.default;

  useEffect(() => {
    dispatch(
      searchContent(
        '/',
        {
          Creator: userId,
          sort_on: 'modified',
          sort_order: 'descending',
          metadata_fields: '_all',
          b_size: 1000,
        },
        'latestContent',
      ),
    );

    dispatch(
      searchContent(
        contextUrl,
        {
          'path.depth': 1,
          sort_on: 'getObjPositionInParent',
          metadata_fields: '_all',
          b_size: 1000,
        },
        'crtFolderContent',
      ),
    );

    dispatch(
      searchContent(
        '/',
        {
          sort_on: 'getObjPositionInParent',
          metadata_fields: '_all',
          b_size: 1000,
        },
        'allFoldersContent',
      ),
    );
  }, [dispatch, contextUrl, userId]);

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

  const filterOption = (option, inputValue) => {
    const label = option.label.toLowerCase();
    const searchInput = inputValue.toLowerCase();
    return label.includes(searchInput);
  };

  /**
   * Map suggestion icons by suggestion type
   * @param {string} iconType
   * @returns iconSVG
   */
  const formatIconByType = (iconType) => {
    if (iconType === 'Document') {
      return fileSVG;
    }

    if (iconType === 'Image') {
      return imageSVG;
    }

    return linkSVG;
  };

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
        path: item.getPath.split('/').filter(Boolean).slice(1, -1).join('/'),
        icon: formatIconByType(item['@type']),
      }));

    return suggestions
      ?.filter((option) => link === '' || filterOption(option, link))
      ?.slice(0, 5);
  }, [filterSuggestionByType, link, content]);

  const formatOptionLabel = ({ label, path, src, icon }) => (
    <div className="link-suggestion-container">
      <div className="link-suggestion-preview">
        <Icon name={icon} size="24px" />
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
    }
  };

  const onChange = (url) => {
    setLink(url.value);
    onChangeValue(addAppURL(url.value));
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
          styles={styles}
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
