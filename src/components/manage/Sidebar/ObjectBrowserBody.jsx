import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import { Input, Segment, Breadcrumb } from 'semantic-ui-react';

import { join } from 'lodash';

// These absolute imports (without using the corresponding centralized index.js) are required
// to cut circular import problems, this file should never use them. This is because of
// the very nature of the functionality of the component and its relationship with others
import { searchContent } from '@plone/volto/actions/search/search';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers/Url/Url';
import { usePrevious } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import backSVG from '@plone/volto/icons/back.svg';
import folderSVG from '@plone/volto/icons/folder.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import searchSVG from '@plone/volto/icons/zoom.svg';
import linkSVG from '@plone/volto/icons/link.svg';
import homeSVG from '@plone/volto/icons/home.svg';

import ObjectBrowserNav from '@plone/volto/components/manage/Sidebar/ObjectBrowserNav';

const messages = defineMessages({
  SearchInputPlaceholder: {
    id: 'Search content',
    defaultMessage: 'Search content',
  },
  SelectedItems: {
    id: 'Selected items',
    defaultMessage: 'Selected items',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  search: {
    id: 'Search SVG',
    defaultMessage: 'Search SVG',
  },
  of: { id: 'Selected items - x of y', defaultMessage: 'of' },
});

function getParentURL(url) {
  return flattenToAppURL(`${join(url.split('/').slice(0, -1), '/')}`) || '/';
}

const ObjectBrowserBody = (props) => {
  const {
    mode,
    contextURL,
    data,
    block,
    dataName,
    onChangeBlock,
    maximumSelectionSize,
    closeObjectBrowser,
  } = props;

  const intl = useIntl();
  const dispatch = useDispatch();

  const searchSubrequests = useSelector((state) => state.search.subrequests);

  const [currentFolder, setCurrentFolder] = useState(
    mode === 'multiple' ? '/' : contextURL || '/',
  );

  const [, setCurrentImageFolder] = useState(
    mode === 'multiple'
      ? '/'
      : mode === 'image' && data?.url
      ? getParentURL(data.url)
      : '/',
  );

  const [, setCurrentLinkFolder] = useState(
    mode === 'multiple'
      ? '/'
      : mode === 'link' && data?.href
      ? getParentURL(data.href)
      : '/',
  );

  const [parentFolder, setParentFolder] = useState('');

  const [selectedImage, setSelectedImage] = useState(
    mode === 'multiple'
      ? ''
      : mode === 'image' && data?.url
      ? flattenToAppURL(data.url)
      : '',
  );

  const [selectedHref, setSelectedHref] = useState(
    mode === 'multiple'
      ? ''
      : mode === 'link' && data?.href
      ? flattenToAppURL(data.href)
      : '',
  );

  const [searchableTypes] = useState(
    mode === 'image'
      ? props.searchableTypes || config.settings.imageObjects
      : props.searchableTypes,
  );

  const [showSearchInput, setshowSearchInput] = useState(false);

  const searchInputRef = useRef();
  const prevshowsearchinput = usePrevious(showSearchInput);

  const initialSearch = useCallback(
    (mode) => {
      const currentSelected =
        mode === 'multiple'
          ? ''
          : mode === 'image'
          ? selectedImage
          : selectedHref;
      if (currentSelected && isInternalURL(currentSelected)) {
        dispatch(
          searchContent(
            getParentURL(currentSelected),
            {
              'path.depth': 1,
              sort_on: 'getObjPositionInParent',
              metadata_fields: '_all',
              b_size: 1000,
            },
            `${block}-${mode}`,
          ),
        );
      } else {
        dispatch(
          searchContent(
            currentFolder,
            {
              'path.depth': 1,
              sort_on: 'getObjPositionInParent',
              metadata_fields: '_all',
              b_size: 1000,
            },
            `${block}-${mode}`,
          ),
        );
      }
    },
    [dispatch, block, selectedHref, currentFolder, selectedImage],
  );

  useEffect(() => {
    initialSearch(mode);
  }, [initialSearch, mode]);

  useEffect(() => {
    if (searchInputRef?.current) searchInputRef.current.focus();
  }, [showSearchInput]);

  const navigateTo = (id) => {
    dispatch(
      searchContent(
        id,
        {
          'path.depth': 1,
          sort_on: 'getObjPositionInParent',
          metadata_fields: '_all',
          b_size: 1000,
        },
        `${block}-${mode}`,
      ),
    );
    const parent = `${join(id.split('/').slice(0, -1), '/')}` || '/';
    setParentFolder(parent);
    setCurrentFolder(id || '/');
  };

  const toggleSearchInput = () => setshowSearchInput(!prevshowsearchinput);

  const onSearch = (e) => {
    const text = flattenToAppURL(e.target.value);
    if (text.startsWith('/')) {
      setCurrentFolder(text);

      dispatch(
        searchContent(
          text,
          {
            'path.depth': 1,
            sort_on: 'getObjPositionInParent',
            metadata_fields: '_all',
            portal_type: searchableTypes,
          },
          `${block}-${mode}`,
        ),
      );
    } else {
      text.length > 2
        ? dispatch(
            searchContent(
              '/',
              {
                SearchableText: `${text}*`,
                metadata_fields: '_all',
                portal_type: searchableTypes,
              },
              `${block}-${mode}`,
            ),
          )
        : dispatch(
            searchContent(
              '/',
              {
                'path.depth': 1,
                sort_on: 'getObjPositionInParent',
                metadata_fields: '_all',
                portal_type: searchableTypes,
              },
              `${block}-${mode}`,
            ),
          );
    }
  };

  const onSelectItem = (item) => {
    const url = item['@id'];
    const updateState = (mode) => {
      switch (mode) {
        case 'image':
          setSelectedImage(url);
          setCurrentImageFolder(getParentURL(url));
          break;
        case 'link':
          setSelectedHref(url);
          setCurrentLinkFolder(getParentURL(url));
          break;
        default:
          break;
      }
    };

    if (dataName) {
      onChangeBlock(block, {
        ...data,
        [dataName]: url,
      });
    } else if (props.onSelectItem) {
      props.onSelectItem(url, item);
    } else if (mode === 'image') {
      onChangeBlock(block, {
        ...data,
        url: flattenToAppURL(item.getURL),
        alt: '',
      });
    } else if (mode === 'link') {
      onChangeBlock(block, {
        ...data,
        href: flattenToAppURL(url),
      });
    }
    updateState(mode);
  };

  const isSelectable = (item) => {
    return props.selectableTypes.length > 0
      ? props.selectableTypes.indexOf(item['@type']) >= 0
      : true;
  };

  const handleClickOnItem = (item) => {
    if (mode === 'image') {
      if (item.is_folderish) {
        navigateTo(item['@id']);
      }
      if (config.settings.imageObjects.includes(item['@type'])) {
        onSelectItem(item);
      }
    } else {
      if (isSelectable(item)) {
        if (
          !maximumSelectionSize ||
          mode === 'multiple' ||
          !data ||
          data.length < maximumSelectionSize
        ) {
          onSelectItem(item);
          let length = data ? data.length : 0;

          let stopSelecting =
            mode !== 'multiple' ||
            (maximumSelectionSize > 0 && length + 1 >= maximumSelectionSize);

          if (stopSelecting) {
            closeObjectBrowser();
          }
        } else {
          closeObjectBrowser();
        }
      } else {
        navigateTo(item['@id']);
      }
    }
  };

  const handleDoubleClickOnItem = (item) => {
    if (mode === 'image') {
      if (item.is_folderish) {
        navigateTo(item['@id']);
      }
      if (config.settings.imageObjects.includes(item['@type'])) {
        onSelectItem(item);
        closeObjectBrowser();
      }
    } else {
      if (isSelectable(item)) {
        if (data.length < maximumSelectionSize) {
          onSelectItem(item);
        }
        closeObjectBrowser();
      } else {
        navigateTo(item['@id']);
      }
    }
  };

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <div className="vertical divider" />
        {currentFolder === '/' ? (
          <>
            {mode === 'image' ? (
              <Icon name={folderSVG} size="24px" />
            ) : (
              <Icon name={linkSVG} size="24px" />
            )}
          </>
        ) : (
          <button
            aria-label={intl.formatMessage(messages.back)}
            onClick={() => navigateTo(parentFolder)}
          >
            <Icon name={backSVG} size="24px" />
          </button>
        )}
        {showSearchInput ? (
          <Input
            className="search"
            ref={searchInputRef}
            onChange={onSearch}
            placeholder={intl.formatMessage(messages.SearchInputPlaceholder)}
          />
        ) : mode === 'image' ? (
          <h2>
            <FormattedMessage id="Choose Image" defaultMessage="Choose Image" />
          </h2>
        ) : (
          <h2>
            <FormattedMessage
              id="Choose Target"
              defaultMessage="Choose Target"
            />
          </h2>
        )}

        <button
          aria-label={intl.formatMessage(messages.search)}
          onClick={toggleSearchInput}
        >
          <Icon name={searchSVG} size="24px" />
        </button>
        <button className="clearSVG" onClick={closeObjectBrowser}>
          <Icon name={clearSVG} size="24px" />
        </button>
      </header>
      <Segment secondary className="breadcrumbs" vertical>
        <Breadcrumb>
          {currentFolder !== '/' ? (
            currentFolder.split('/').map((item, index, items) => {
              return (
                <React.Fragment key={`divider-${item}-${index}`}>
                  {index === 0 ? (
                    <Breadcrumb.Section onClick={() => navigateTo('/')}>
                      <Icon className="home-icon" name={homeSVG} size="18px" />
                    </Breadcrumb.Section>
                  ) : (
                    <>
                      <Breadcrumb.Divider key={`divider-${item.url}`} />
                      <Breadcrumb.Section
                        onClick={() =>
                          navigateTo(items.slice(0, index + 1).join('/'))
                        }
                      >
                        {item}
                      </Breadcrumb.Section>
                    </>
                  )}
                </React.Fragment>
              );
            })
          ) : (
            <Breadcrumb.Section onClick={() => navigateTo('/')}>
              <Icon className="home-icon" name={homeSVG} size="18px" />
            </Breadcrumb.Section>
          )}
        </Breadcrumb>
      </Segment>
      {mode === 'multiple' && (
        <Segment className="infos">
          {intl.formatMessage(messages.SelectedItems)}: {data?.length}
          {maximumSelectionSize > 0 && (
            <>
              {' '}
              {intl.formatMessage(messages.of)} {maximumSelectionSize}
            </>
          )}
        </Segment>
      )}
      <ObjectBrowserNav
        currentSearchResults={searchSubrequests[`${block}-${mode}`]}
        selected={
          mode === 'multiple'
            ? data
            : [
                {
                  '@id': mode === 'image' ? selectedImage : selectedHref,
                },
              ]
        }
        handleClickOnItem={handleClickOnItem}
        handleDoubleClickOnItem={handleDoubleClickOnItem}
        mode={mode}
        navigateTo={navigateTo}
        isSelectable={isSelectable}
      />
    </Segment.Group>
  );
};

ObjectBrowserBody.propTypes = {
  block: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
  searchSubrequests: PropTypes.objectOf(PropTypes.any).isRequired,
  searchContent: PropTypes.func.isRequired,
  closeObjectBrowser: PropTypes.func.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  onSelectItem: PropTypes.func,
  dataName: PropTypes.string,
  maximumSelectionSize: PropTypes.number,
  contextURL: PropTypes.string,
  searchableTypes: PropTypes.arrayOf(PropTypes.string),
};

ObjectBrowserBody.defaultProps = {
  image: '',
  href: '',
  onSelectItem: null,
  dataName: null,
  selectableTypes: [],
  searchableTypes: null,
  maximumSelectionSize: null,
};

export default ObjectBrowserBody;
