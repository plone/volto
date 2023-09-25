/**
 * Contents component.
 * @module components/manage/Contents/Contents
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Portal } from 'react-portal';
import { Link } from 'react-router-dom';
import {
  Button,
  Confirm,
  Container as SemanticContainer,
  Divider,
  Dropdown,
  Menu,
  Input,
  Segment,
  Table,
  Loader,
  Dimmer,
} from 'semantic-ui-react';
import {
  concat,
  filter,
  find,
  indexOf,
  keys,
  map,
  mapValues,
  pull,
} from 'lodash';
import move from 'lodash-move';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { asyncConnect } from '@plone/volto/helpers';
import { flattenToAppURL } from '@plone/volto/helpers';

import {
  searchContent,
  cut,
  copy,
  copyContent,
  deleteContent,
  listActions,
  moveContent,
  orderContent,
  sortContent,
  updateColumnsContent,
  linkIntegrityCheck,
  getContent,
} from '@plone/volto/actions';
import Indexes, { defaultIndexes } from '@plone/volto/constants/Indexes';
import {
  ContentsBreadcrumbs,
  ContentsIndexHeader,
  ContentsItem,
  ContentsRenameModal,
  ContentsUploadModal,
  ContentsWorkflowModal,
  ContentsTagsModal,
  ContentsPropertiesModal,
  Pagination,
  Popup,
  Toolbar,
  Toast,
  Icon,
  Unauthorized,
} from '@plone/volto/components';

import { Helmet, getBaseUrl } from '@plone/volto/helpers';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import config from '@plone/volto/registry';

import backSVG from '@plone/volto/icons/back.svg';
import cutSVG from '@plone/volto/icons/cut.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';
import copySVG from '@plone/volto/icons/copy.svg';
import tagSVG from '@plone/volto/icons/tag.svg';
import renameSVG from '@plone/volto/icons/rename.svg';
import semaphoreSVG from '@plone/volto/icons/semaphore.svg';
import uploadSVG from '@plone/volto/icons/upload.svg';
import propertiesSVG from '@plone/volto/icons/properties.svg';
import pasteSVG from '@plone/volto/icons/paste.svg';
import zoomSVG from '@plone/volto/icons/zoom.svg';
import checkboxUncheckedSVG from '@plone/volto/icons/checkbox-unchecked.svg';
import checkboxCheckedSVG from '@plone/volto/icons/checkbox-checked.svg';
import checkboxIndeterminateSVG from '@plone/volto/icons/checkbox-indeterminate.svg';
import configurationSVG from '@plone/volto/icons/configuration-app.svg';
import sortDownSVG from '@plone/volto/icons/sort-down.svg';
import sortUpSVG from '@plone/volto/icons/sort-up.svg';
import downKeySVG from '@plone/volto/icons/down-key.svg';
import moreSVG from '@plone/volto/icons/more.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  contents: {
    id: 'Contents',
    defaultMessage: 'Contents',
  },
  copy: {
    id: 'Copy',
    defaultMessage: 'Copy',
  },
  cut: {
    id: 'Cut',
    defaultMessage: 'Cut',
  },
  error: {
    id: "You can't paste this content here",
    defaultMessage: "You can't paste this content here",
  },
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
  deleteConfirmSingleItem: {
    id: 'Delete this item?',
    defaultMessage: 'Delete this item?',
  },
  deleteConfirmMultipleItems: {
    id: 'Delete selected items?',
    defaultMessage: 'Delete selected items?',
  },
  deleteError: {
    id: 'The item could not be deleted.',
    defaultMessage: 'The item could not be deleted.',
  },
  loading: {
    id: 'loading',
    defaultMessage: 'Loading',
  },
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
  filter: {
    id: 'Filter…',
    defaultMessage: 'Filter…',
  },
  messageCopied: {
    id: 'Item(s) copied.',
    defaultMessage: 'Item(s) copied.',
  },
  messageCut: {
    id: 'Item(s) cut.',
    defaultMessage: 'Item(s) cut.',
  },
  messageUpdate: {
    id: 'Item(s) has been updated.',
    defaultMessage: 'Item(s) has been updated.',
  },
  messageReorder: {
    id: 'Item succesfully moved.',
    defaultMessage: 'Item successfully moved.',
  },
  messagePasted: {
    id: 'Item(s) pasted.',
    defaultMessage: 'Item(s) pasted.',
  },
  messageWorkflowUpdate: {
    id: 'Item(s) state has been updated.',
    defaultMessage: 'Item(s) state has been updated.',
  },
  paste: {
    id: 'Paste',
    defaultMessage: 'Paste',
  },
  properties: {
    id: 'Properties',
    defaultMessage: 'Properties',
  },
  rearrangeBy: {
    id: 'Rearrange items by…',
    defaultMessage: 'Rearrange items by…',
  },
  rename: {
    id: 'Rename',
    defaultMessage: 'Rename',
  },
  select: {
    id: 'Select…',
    defaultMessage: 'Select…',
  },
  selected: {
    id: '{count} selected',
    defaultMessage: '{count} selected',
  },
  selectColumns: {
    id: 'Select columns to show',
    defaultMessage: 'Select columns to show',
  },
  sort: {
    id: 'sort',
    defaultMessage: 'sort',
  },
  state: {
    id: 'State',
    defaultMessage: 'State',
  },
  tags: {
    id: 'Tags',
    defaultMessage: 'Tags',
  },
  upload: {
    id: 'Upload',
    defaultMessage: 'Upload',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
  publicationDate: {
    id: 'Publication date',
    defaultMessage: 'Publication date',
  },
  createdOn: {
    id: 'Created on',
    defaultMessage: 'Created on',
  },
  expirationDate: {
    id: 'Expiration date',
    defaultMessage: 'Expiration date',
  },
  id: {
    id: 'ID',
    defaultMessage: 'ID',
  },
  uid: {
    id: 'UID',
    defaultMessage: 'UID',
  },
  reviewState: {
    id: 'Review state',
    defaultMessage: 'Review state',
  },
  folder: {
    id: 'Folder',
    defaultMessage: 'Folder',
  },
  excludedFromNavigation: {
    id: 'Excluded from navigation',
    defaultMessage: 'Excluded from navigation',
  },
  objectSize: {
    id: 'Object Size',
    defaultMessage: 'Object Size',
  },
  lastCommentedDate: {
    id: 'Last comment date',
    defaultMessage: 'Last comment date',
  },
  totalComments: {
    id: 'Total comments',
    defaultMessage: 'Total comments',
  },
  creator: {
    id: 'Creator',
    defaultMessage: 'Creator',
  },
  endDate: {
    id: 'End Date',
    defaultMessage: 'End Date',
  },
  startDate: {
    id: 'Start Date',
    defaultMessage: 'Start Date',
  },
  all: {
    id: 'All',
    defaultMessage: 'All',
  },
});

/**
 * Contents class.
 * @class Contents
 * @extends Component
 */
class Contents extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    action: PropTypes.string,
    source: PropTypes.arrayOf(PropTypes.string),
    searchContent: PropTypes.func.isRequired,
    cut: PropTypes.func.isRequired,
    copy: PropTypes.func.isRequired,
    copyContent: PropTypes.func.isRequired,
    deleteContent: PropTypes.func.isRequired,
    moveContent: PropTypes.func.isRequired,
    orderContent: PropTypes.func.isRequired,
    sortContent: PropTypes.func.isRequired,
    updateColumnsContent: PropTypes.func.isRequired,
    linkIntegrityCheck: PropTypes.func.isRequired,
    clipboardRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    deleteRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    updateRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    searchRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        '@type': PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
    breadcrumbs: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
    total: PropTypes.number.isRequired,
    pathname: PropTypes.string.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    items: [],
    action: null,
    source: null,
    index: {
      order: keys(Indexes),
      values: mapValues(Indexes, (value, key) => ({
        ...value,
        selected: indexOf(defaultIndexes, key) !== -1,
      })),
      selectedCount: defaultIndexes.length + 1,
    },
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs ContentsComponent
   */
  constructor(props) {
    super(props);
    this.onDeselect = this.onDeselect.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onSelectAll = this.onSelectAll.bind(this);
    this.onSelectIndex = this.onSelectIndex.bind(this);
    this.onSelectNone = this.onSelectNone.bind(this);
    this.onDeleteOk = this.onDeleteOk.bind(this);
    this.onDeleteCancel = this.onDeleteCancel.bind(this);
    this.onUploadOk = this.onUploadOk.bind(this);
    this.onUploadCancel = this.onUploadCancel.bind(this);
    this.onRenameOk = this.onRenameOk.bind(this);
    this.onRenameCancel = this.onRenameCancel.bind(this);
    this.onTagsOk = this.onTagsOk.bind(this);
    this.onTagsCancel = this.onTagsCancel.bind(this);
    this.onPropertiesOk = this.onPropertiesOk.bind(this);
    this.onPropertiesCancel = this.onPropertiesCancel.bind(this);
    this.onWorkflowOk = this.onWorkflowOk.bind(this);
    this.onWorkflowCancel = this.onWorkflowCancel.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangePageSize = this.onChangePageSize.bind(this);
    this.onOrderIndex = this.onOrderIndex.bind(this);
    this.onOrderItem = this.onOrderItem.bind(this);
    this.onSortItems = this.onSortItems.bind(this);
    this.onMoveToTop = this.onMoveToTop.bind(this);
    this.onChangeSelected = this.onChangeSelected.bind(this);
    this.onMoveToBottom = this.onMoveToBottom.bind(this);
    this.cut = this.cut.bind(this);
    this.copy = this.copy.bind(this);
    this.delete = this.delete.bind(this);
    this.upload = this.upload.bind(this);
    this.rename = this.rename.bind(this);
    this.tags = this.tags.bind(this);
    this.properties = this.properties.bind(this);
    this.workflow = this.workflow.bind(this);
    this.paste = this.paste.bind(this);
    this.fetchContents = this.fetchContents.bind(this);
    this.orderTimeout = null;
    this.deleteItemsToShowThreshold = 10;

    this.state = {
      selected: [],
      showDelete: false,
      showUpload: false,
      showRename: false,
      showTags: false,
      showProperties: false,
      showWorkflow: false,
      itemsToDelete: [],
      containedItemsToDelete: [],
      brokenReferences: [],
      showAllItemsToDelete: true,
      items: this.props.items,
      filter: '',
      currentPage: 0,
      pageSize: 50,
      index: this.props.index || {
        order: keys(Indexes),
        values: mapValues(Indexes, (value, key) => ({
          ...value,
          selected: indexOf(defaultIndexes, key) !== -1,
        })),
        selectedCount: defaultIndexes.length + 1,
      },
      sort_on: this.props.sort?.on || 'getObjPositionInParent',
      sort_order: this.props.sort?.order || 'ascending',
      isClient: false,
      linkIntegrityBreakages: [],
    };
    this.filterTimeout = null;
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.fetchContents();
    this.setState({ isClient: true });
  }
  async componentDidUpdate(_, prevState) {
    if (
      this.state.itemsToDelete !== prevState.itemsToDelete &&
      this.state.itemsToDelete.length > 0
    ) {
      const linkintegrityInfo = await this.props.linkIntegrityCheck(
        map(this.state.itemsToDelete, (item) => this.getFieldById(item, 'UID')),
      );
      let containedItems = 0;
      let brokenReferencesCount = 0;

      linkintegrityInfo.forEach((item) => {
        containedItems += item.items_total ?? 0;
        brokenReferencesCount += item.breaches.length;
      });
      this.setState({
        containedItemsToDelete: containedItems,
        brokenReferences: brokenReferencesCount,
        brokenLinksList:
          linkintegrityInfo.length === 1
            ? linkintegrityInfo[0]['@id'] + '/links-to-item'
            : null,
        showAllItemsToDelete:
          this.state.itemsToDelete.length < this.deleteItemsToShowThreshold,
      });
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      (this.props.clipboardRequest.loading &&
        nextProps.clipboardRequest.loaded) ||
      (this.props.deleteRequest.loading && nextProps.deleteRequest.loaded) ||
      (this.props.updateRequest.loading && nextProps.updateRequest.loaded)
    ) {
      this.fetchContents(nextProps.pathname);
    }
    if (this.props.updateRequest.loading && nextProps.updateRequest.loaded) {
      this.props.toastify.toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.messageUpdate)}
        />,
      );
    }
    if (this.props.pathname !== nextProps.pathname) {
      // Refetching content to sync the current object in the toolbar
      this.props.getContent(getBaseUrl(nextProps.pathname));
      this.setState(
        {
          currentPage: 0,
        },
        () =>
          this.setState({ filter: '' }, () =>
            this.fetchContents(nextProps.pathname),
          ),
      );
    }
    if (this.props.searchRequest.loading && nextProps.searchRequest.loaded) {
      this.setState({
        items: nextProps.items,
      });
    }
    if (
      this.props.clipboardRequest.loading &&
      nextProps.clipboardRequest.error
    ) {
      this.props.toastify.toast.error(
        <Toast
          error
          title={this.props.intl.formatMessage(messages.error)}
          content={this.props.intl.formatMessage(messages.error)}
        />,
      );
    }

    if (
      this.props.clipboardRequest.loading &&
      nextProps.clipboardRequest.loaded
    ) {
      this.props.toastify.toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.messagePasted)}
        />,
      );
    }

    if (this.props.deleteRequest.loading && nextProps.deleteRequest.error) {
      this.props.toastify.toast.error(
        <Toast
          error
          title={this.props.intl.formatMessage(messages.deleteError)}
          content={this.props.intl.formatMessage(messages.deleteError)}
        />,
      );
    }

    if (this.props.orderRequest.loading && nextProps.orderRequest.loaded) {
      this.props.toastify.toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.messageReorder)}
        />,
      );
    }
  }

  /**
   * On deselect handler
   * @method onDeselect
   * @param {object} event Event object
   * @param {string} value Value
   * @returns {undefined}
   */
  onDeselect(event, { value }) {
    this.setState({
      selected: pull(this.state.selected, value),
    });
  }

  /**
   * On select handler
   * @method onSelect
   * @param {object} event Event object
   * @returns {undefined}
   */
  onSelect(event, id) {
    if (indexOf(this.state.selected, id) === -1) {
      this.setState({
        selected: concat(this.state.selected, id),
      });
    } else {
      this.setState({
        selected: pull(this.state.selected, id),
      });
    }
  }

  /**
   * On select all handler
   * @method onSelectAll
   * @returns {undefined}
   */
  onSelectAll() {
    this.setState({
      selected: map(this.state.items, (item) => item['@id']),
    });
  }

  /**
   * On select none handler
   * @method onSelectNone
   * @returns {undefined}
   */
  onSelectNone() {
    this.setState({
      selected: [],
    });
  }

  /**
   * On select index
   * @method onSelectIndex
   * @param {object} event Event object.
   * @param {string} value Index value.
   * @returns {undefined}
   */
  onSelectIndex(event, { value }) {
    let newIndex = {
      ...this.state.index,
      selectedCount:
        this.state.index.selectedCount +
        (this.state.index.values[value].selected ? -1 : 1),
      values: mapValues(this.state.index.values, (indexValue, indexKey) => ({
        ...indexValue,
        selected:
          indexKey === value ? !indexValue.selected : indexValue.selected,
      })),
    };
    this.setState({
      index: newIndex,
    });
    this.props.updateColumnsContent(getBaseUrl(this.props.pathname), newIndex);
  }

  /**
   * On change filter
   * @method onChangeFilter
   * @param {object} event Event object.
   * @param {string} value Filter value.
   * @returns {undefined}
   */
  onChangeFilter(event, { value }) {
    const self = this;
    clearTimeout(self.filterTimeout);
    this.setState(
      {
        filter: value,
      },
      () => {
        self.filterTimeout = setTimeout(() => {
          self.fetchContents();
        }, 200);
      },
    );
  }

  /**
   * On change selected values (Filter)
   * @method onChangeSelected
   * @param {object} event Event object.
   * @param {string} value Filter value.
   * @returns {undefined}
   */
  onChangeSelected(event, { value }) {
    event.stopPropagation();
    const { items, selected } = this.state;

    const filteredItems = filter(selected, (selectedItem) =>
      find(items, (item) => item['@id'] === selectedItem)
        .title.toLowerCase()
        .includes(value.toLowerCase()),
    );

    this.setState({
      filteredItems,
      selectedMenuFilter: value,
    });
  }

  /**
   * On change page
   * @method onChangePage
   * @param {object} event Event object.
   * @param {string} value Page value.
   * @returns {undefined}
   */
  onChangePage(event, { value }) {
    this.setState(
      {
        currentPage: value,
      },
      () => this.fetchContents(),
    );
  }

  /**
   * On change page size
   * @method onChangePageSize
   * @param {object} event Event object.
   * @param {string} value Page size value.
   * @returns {undefined}
   */
  onChangePageSize(event, { value }) {
    this.setState(
      {
        pageSize: value,
        currentPage: 0,
      },
      () => this.fetchContents(),
    );
  }

  /**
   * On order index
   * @method onOrderIndex
   * @param {number} index Index
   * @param {number} delta Delta
   * @returns {undefined}
   */
  onOrderIndex(index, delta) {
    this.setState({
      index: {
        ...this.state.index,
        order: move(this.state.index.order, index, index + delta),
      },
    });
    this.props.updateColumnsContent(
      getBaseUrl(this.props.pathname),
      this.state.index,
    );
  }

  /**
   * On order item
   * @method onOrderItem
   * @param {string} id Item id
   * @param {number} itemIndex Item index
   * @param {number} delta Delta
   * @returns {undefined}
   */
  onOrderItem(id, itemIndex, delta, backend) {
    if (backend) {
      this.props.orderContent(
        getBaseUrl(this.props.pathname),
        id.replace(/^.*\//, ''),
        delta,
      );
    } else {
      this.setState({
        items: move(this.state.items, itemIndex, itemIndex + delta),
      });
    }
  }

  /**
   * On sort items
   * @method onSortItems
   * @param {object} event Event object
   * @param {string} value Item index
   * @returns {undefined}
   */
  onSortItems(event, { value }) {
    const values = value.split('|');
    this.setState({
      sort_on: values[0],
      sort_order: values[1],
    });
    this.props.sortContent(
      getBaseUrl(this.props.pathname),
      values[0],
      values[1],
    );
  }

  /**
   * On move to top
   * @method onMoveToTop
   * @param {object} event Event object
   * @param {string} value Item index
   * @returns {undefined}
   */
  onMoveToTop(event, { value }) {
    const id = this.state.items[value]['@id'];
    this.props
      .orderContent(
        getBaseUrl(this.props.pathname),
        id.replace(/^.*\//, ''),
        'top',
      )
      .then(() => {
        this.setState(
          {
            currentPage: 0,
          },
          () => this.fetchContents(),
        );
      });
  }

  /**
   * On move to bottom
   * @method onMoveToBottom
   * @param {object} event Event object
   * @param {string} value Item index
   * @returns {undefined}
   */
  onMoveToBottom(event, { value }) {
    const id = this.state.items[value]['@id'];
    this.props
      .orderContent(
        getBaseUrl(this.props.pathname),
        id.replace(/^.*\//, ''),
        'bottom',
      )
      .then(() => {
        this.setState(
          {
            currentPage: 0,
          },
          () => this.fetchContents(),
        );
      });
  }

  /**
   * On delete ok
   * @method onDeleteOk
   * @returns {undefined}
   */
  onDeleteOk() {
    this.props.deleteContent(this.state.itemsToDelete);
    this.setState({
      showDelete: false,
      itemsToDelete: [],
      selected: [],
    });
  }

  /**
   * On delete cancel
   * @method onDeleteCancel
   * @returns {undefined}
   */
  onDeleteCancel() {
    this.setState({
      showDelete: false,
      itemsToDelete: [],
    });
  }

  /**
   * On upload ok
   * @method onUploadOk
   * @returns {undefined}
   */
  onUploadOk() {
    this.fetchContents();
    this.setState({
      showUpload: false,
    });
  }

  /**
   * On upload cancel
   * @method onUploadCancel
   * @returns {undefined}
   */
  onUploadCancel() {
    this.setState({
      showUpload: false,
    });
  }

  /**
   * On rename ok
   * @method onRenameOk
   * @returns {undefined}
   */
  onRenameOk() {
    this.setState({
      showRename: false,
      selected: [],
    });
  }

  /**
   * On rename cancel
   * @method onRenameCancel
   * @returns {undefined}
   */
  onRenameCancel() {
    this.setState({
      showRename: false,
    });
  }

  /**
   * On tags ok
   * @method onTagsOk
   * @returns {undefined}
   */
  onTagsOk() {
    this.setState({
      showTags: false,
      selected: [],
    });
  }

  /**
   * On tags cancel
   * @method onTagsCancel
   * @returns {undefined}
   */
  onTagsCancel() {
    this.setState({
      showTags: false,
    });
  }

  /**
   * On properties ok
   * @method onPropertiesOk
   * @returns {undefined}
   */
  onPropertiesOk() {
    this.setState({
      showProperties: false,
      selected: [],
    });
  }

  /**
   * On properties cancel
   * @method onPropertiesCancel
   * @returns {undefined}
   */
  onPropertiesCancel() {
    this.setState({
      showProperties: false,
    });
  }

  /**
   * On workflow ok
   * @method onWorkflowOk
   * @returns {undefined}
   */
  onWorkflowOk() {
    this.fetchContents();
    this.setState({
      showWorkflow: false,
      selected: [],
    });
    this.props.toastify.toast.success(
      <Toast
        success
        title={this.props.intl.formatMessage(messages.success)}
        content={this.props.intl.formatMessage(messages.messageWorkflowUpdate)}
      />,
    );
  }

  /**
   * On workflow cancel
   * @method onWorkflowCancel
   * @returns {undefined}
   */
  onWorkflowCancel() {
    this.setState({
      showWorkflow: false,
    });
  }

  /**
   * Get field by id
   * @method getFieldById
   * @param {string} id Id of object
   * @param {string} field Field of object
   * @returns {string} Field of object
   */
  getFieldById(id, field) {
    const item = find(this.state.items, { '@id': id });
    return item ? item[field] : '';
  }

  /**
   * Fetch contents handler
   * @method fetchContents
   * @param {string} pathname Pathname to fetch contents.
   * @returns {undefined}
   */
  fetchContents(pathname) {
    if (this.state.pageSize === this.props.intl.formatMessage(messages.all)) {
      //'All'
      this.props.searchContent(getBaseUrl(pathname || this.props.pathname), {
        'path.depth': 1,
        sort_on: this.state.sort_on,
        sort_order: this.state.sort_order,
        metadata_fields: '_all',
        b_size: 100000000,
        show_inactive: true,
        ...(this.state.filter && { SearchableText: `${this.state.filter}*` }),
      });
    } else {
      this.props.searchContent(getBaseUrl(pathname || this.props.pathname), {
        'path.depth': 1,
        sort_on: this.state.sort_on,
        sort_order: this.state.sort_order,
        metadata_fields: '_all',
        ...(this.state.filter && { SearchableText: `${this.state.filter}*` }),
        b_size: this.state.pageSize,
        b_start: this.state.currentPage * this.state.pageSize,
        show_inactive: true,
      });
    }
  }

  /**
   * Cut handler
   * @method cut
   * @param {Object} event Event object.
   * @param {string} value Value of the event.
   * @returns {undefined}
   */
  cut(event, { value }) {
    this.props.cut(value ? [value] : this.state.selected);
    this.onSelectNone();
    this.props.toastify.toast.success(
      <Toast
        success
        title={this.props.intl.formatMessage(messages.success)}
        content={this.props.intl.formatMessage(messages.messageCut)}
      />,
    );
  }

  /**
   * Copy handler
   * @method copy
   * @param {Object} event Event object.
   * @param {string} value Value of the event.
   * @returns {undefined}
   */
  copy(event, { value }) {
    this.props.copy(value ? [value] : this.state.selected);
    this.onSelectNone();
    this.props.toastify.toast.success(
      <Toast
        success
        title={this.props.intl.formatMessage(messages.success)}
        content={this.props.intl.formatMessage(messages.messageCopied)}
      />,
    );
  }

  /**
   * Delete handler
   * @method delete
   * @param {Object} event Event object.
   * @param {string} value Value of the event.
   * @returns {undefined}
   */
  delete(event, { value }) {
    this.setState({
      showDelete: true,
      itemsToDelete: value ? [value] : this.state.selected,
    });
  }

  /**
   * Upload handler
   * @method upload
   * @returns {undefined}
   */
  upload() {
    this.setState({
      showUpload: true,
    });
  }

  /**
   * Rename handler
   * @method rename
   * @returns {undefined}
   */
  rename() {
    this.setState({
      showRename: true,
    });
  }

  /**
   * Tags handler
   * @method tags
   * @returns {undefined}
   */
  tags() {
    this.setState({
      showTags: true,
    });
  }

  /**
   * Properties handler
   * @method properties
   * @returns {undefined}
   */
  properties() {
    this.setState({
      showProperties: true,
    });
  }

  /**
   * Workflow handler
   * @method workflow
   * @returns {undefined}
   */
  workflow() {
    this.setState({
      showWorkflow: true,
    });
  }

  /**
   * Paste handler
   * @method paste
   * @returns {undefined}
   */
  paste() {
    if (this.props.action === 'copy') {
      this.props.copyContent(
        this.props.source,
        getBaseUrl(this.props.pathname),
      );
    }
    if (this.props.action === 'cut') {
      this.props.moveContent(
        this.props.source,
        getBaseUrl(this.props.pathname),
      );
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const selected = this.state.selected.length > 0;
    const filteredItems = this.state.filteredItems || this.state.selected;
    const path = getBaseUrl(this.props.pathname);
    const folderContentsAction = find(this.props.objectActions, {
      id: 'folderContents',
    });
    const loading =
      (this.props.clipboardRequest?.loading &&
        !this.props.clipboardRequest?.error) ||
      (this.props.deleteRequest?.loading && !this.props.deleteRequest?.error) ||
      (this.props.updateRequest?.loading && !this.props.updateRequest?.error) ||
      (this.props.orderRequest?.loading && !this.props.orderRequest?.error) ||
      (this.props.searchRequest?.loading && !this.props.searchRequest?.error);

    const Container =
      config.getComponent({ name: 'Container' }).component || SemanticContainer;

    return this.props.token && this.props.objectActions?.length > 0 ? (
      <>
        {folderContentsAction ? (
          <Container id="page-contents" className="folder-contents">
            <Dimmer.Dimmable as="div" blurring dimmed={loading}>
              <Dimmer active={loading} inverted>
                <Loader indeterminate size="massive">
                  {this.props.intl.formatMessage(messages.loading)}
                </Loader>
              </Dimmer>

              <Helmet
                title={this.props.intl.formatMessage(messages.contents)}
              />
              <div className="container">
                <article id="content">
                  <Confirm
                    open={this.state.showDelete}
                    confirmButton="Delete"
                    header={
                      this.state.itemsToDelete.length === 1
                        ? this.props.intl.formatMessage(
                            messages.deleteConfirmSingleItem,
                          )
                        : this.props.intl.formatMessage(
                            messages.deleteConfirmMultipleItems,
                          )
                    }
                    content={
                      <div className="content">
                        <p>
                          {this.state.itemsToDelete.length > 1 ? (
                            this.state.containedItemsToDelete > 0 ? (
                              <>
                                <FormattedMessage
                                  id="Some items are also a folder.
                              By deleting them you will delete {containedItemsToDelete} {variation} inside the folders."
                                  defaultMessage="Some items are also a folder.
                              By deleting them you will delete {containedItemsToDelete} {variation} inside the folders."
                                  values={{
                                    containedItemsToDelete: (
                                      <span>
                                        {this.state.containedItemsToDelete}
                                      </span>
                                    ),
                                    variation: (
                                      <span>
                                        {this.state.containedItemsToDelete ===
                                        1 ? (
                                          <FormattedMessage
                                            id="item"
                                            defaultMessage="item"
                                          />
                                        ) : (
                                          <FormattedMessage
                                            id="items"
                                            defaultMessage="items"
                                          />
                                        )}
                                      </span>
                                    ),
                                  }}
                                />
                                {this.state.brokenReferences > 0 && (
                                  <>
                                    <br />
                                    <FormattedMessage
                                      id="Some items are referenced by other contents. By deleting them {brokenReferences} {variation} will be broken."
                                      defaultMessage="Some items are referenced by other contents. By deleting them {brokenReferences} {variation} will be broken."
                                      values={{
                                        brokenReferences: (
                                          <span>
                                            {this.state.brokenReferences}
                                          </span>
                                        ),
                                        variation: (
                                          <span>
                                            {this.state.brokenReferences ===
                                            1 ? (
                                              <FormattedMessage
                                                id="reference"
                                                defaultMessage="reference"
                                              />
                                            ) : (
                                              <FormattedMessage
                                                id="references"
                                                defaultMessage="references"
                                              />
                                            )}
                                          </span>
                                        ),
                                      }}
                                    />
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {this.state.brokenReferences > 0 && (
                                  <>
                                    <FormattedMessage
                                      id="Some items are referenced by other contents. By deleting them {brokenReferences} {variation} will be broken."
                                      defaultMessage="Some items are referenced by other contents. By deleting them {brokenReferences} {variation} will be broken."
                                      values={{
                                        brokenReferences: (
                                          <span>
                                            {this.state.brokenReferences}
                                          </span>
                                        ),
                                        variation: (
                                          <span>
                                            {this.state.brokenReferences ===
                                            1 ? (
                                              <FormattedMessage
                                                id="reference"
                                                defaultMessage="reference"
                                              />
                                            ) : (
                                              <FormattedMessage
                                                id="references"
                                                defaultMessage="references"
                                              />
                                            )}
                                          </span>
                                        ),
                                      }}
                                    />
                                  </>
                                )}
                              </>
                            )
                          ) : this.state.containedItemsToDelete > 0 ? (
                            <>
                              <FormattedMessage
                                id="This item is also a folder.
                            By deleting it you will delete {containedItemsToDelete} {variation} inside the folder."
                                defaultMessage="This item is also a folder.
                            By deleting it you will delete {containedItemsToDelete} {variation} inside the folder."
                                values={{
                                  containedItemsToDelete: (
                                    <span>
                                      {this.state.containedItemsToDelete}
                                    </span>
                                  ),
                                  variation: (
                                    <span>
                                      {this.state.containedItemsToDelete ===
                                      1 ? (
                                        <FormattedMessage
                                          id="item"
                                          defaultMessage="item"
                                        />
                                      ) : (
                                        <FormattedMessage
                                          id="items"
                                          defaultMessage="items"
                                        />
                                      )}
                                    </span>
                                  ),
                                }}
                              />
                              {this.state.brokenReferences > 0 && (
                                <>
                                  <br />
                                  <FormattedMessage
                                    id="This item is referenced by other items. By deleting it {brokenReferences} {variation} will be broken."
                                    defaultMessage="This item is referenced by other items. By deleting it {brokenReferences} {variation} will be broken."
                                    values={{
                                      brokenReferences: (
                                        <span>
                                          {this.state.brokenReferences}
                                        </span>
                                      ),
                                      variation: (
                                        <span>
                                          {this.state.brokenReferences === 1 ? (
                                            <FormattedMessage
                                              id="reference"
                                              defaultMessage="reference"
                                            />
                                          ) : (
                                            <FormattedMessage
                                              id="references"
                                              defaultMessage="references"
                                            />
                                          )}
                                        </span>
                                      ),
                                    }}
                                  />
                                  <div className="broken-links-list-link-wrapper">
                                    <Link
                                      to={flattenToAppURL(
                                        this.state.brokenLinksList,
                                      )}
                                    >
                                      <FormattedMessage
                                        id="View broken links list"
                                        defaultMessage="View broken links list"
                                      />
                                    </Link>
                                  </div>
                                </>
                              )}
                            </>
                          ) : this.state.brokenReferences > 0 ? (
                            <>
                              <FormattedMessage
                                id="This item is referenced by other items. By deleting it {brokenReferences} {variation} will be broken."
                                defaultMessage="This item is referenced by other items. By deleting it {brokenReferences} {variation} will be broken."
                                values={{
                                  brokenReferences: (
                                    <span>{this.state.brokenReferences}</span>
                                  ),
                                  variation: (
                                    <span>
                                      {this.state.brokenReferences === 1 ? (
                                        <FormattedMessage
                                          id="reference"
                                          defaultMessage="reference"
                                        />
                                      ) : (
                                        <FormattedMessage
                                          id="references"
                                          defaultMessage="references"
                                        />
                                      )}
                                    </span>
                                  ),
                                }}
                              />
                              <div className="broken-links-list-link-wrapper">
                                <Link
                                  to={flattenToAppURL(
                                    this.state.brokenLinksList,
                                  )}
                                >
                                  <FormattedMessage
                                    id="View broken links list"
                                    defaultMessage="View broken links list"
                                  />
                                </Link>
                              </div>
                            </>
                          ) : null}
                        </p>
                      </div>
                    }
                    onCancel={this.onDeleteCancel}
                    onConfirm={this.onDeleteOk}
                    size="medium"
                  />
                  <ContentsUploadModal
                    open={this.state.showUpload}
                    onCancel={this.onUploadCancel}
                    onOk={this.onUploadOk}
                    pathname={getBaseUrl(this.props.pathname)}
                  />
                  <ContentsRenameModal
                    open={this.state.showRename}
                    onCancel={this.onRenameCancel}
                    onOk={this.onRenameOk}
                    items={map(this.state.selected, (item) => ({
                      url: item,
                      title: this.getFieldById(item, 'title'),
                      id: this.getFieldById(item, 'id'),
                    }))}
                  />
                  <ContentsTagsModal
                    open={this.state.showTags}
                    onCancel={this.onTagsCancel}
                    onOk={this.onTagsOk}
                    items={map(this.state.selected, (item) => ({
                      url: item,
                      subjects: this.getFieldById(item, 'Subject'),
                    }))}
                  />
                  <ContentsPropertiesModal
                    open={this.state.showProperties}
                    onCancel={this.onPropertiesCancel}
                    onOk={this.onPropertiesOk}
                    items={this.state.selected}
                  />
                  {this.state.showWorkflow && (
                    <ContentsWorkflowModal
                      open={this.state.showWorkflow}
                      onCancel={this.onWorkflowCancel}
                      onOk={this.onWorkflowOk}
                      items={this.state.selected}
                    />
                  )}
                  <section id="content-core">
                    <Segment.Group raised>
                      <Menu secondary attached className="top-menu">
                        <Menu.Menu className="top-menu-menu">
                          <Popup
                            trigger={
                              <Menu.Item
                                icon
                                as={Button}
                                onClick={this.upload}
                                className="upload"
                                aria-label={this.props.intl.formatMessage(
                                  messages.upload,
                                )}
                              >
                                <Icon
                                  name={uploadSVG}
                                  color="#007eb1"
                                  size="24px"
                                  className="upload"
                                />
                              </Menu.Item>
                            }
                            position="top center"
                            content={this.props.intl.formatMessage(
                              messages.upload,
                            )}
                            size="mini"
                          />
                        </Menu.Menu>
                        <Menu.Menu className="top-menu-menu">
                          <Popup
                            trigger={
                              <Menu.Item
                                icon
                                as={Button}
                                onClick={this.rename}
                                disabled={!selected}
                                aria-label={this.props.intl.formatMessage(
                                  messages.rename,
                                )}
                              >
                                <Icon
                                  name={renameSVG}
                                  color={selected ? '#826a6a' : 'grey'}
                                  size="24px"
                                  className="rename"
                                />
                              </Menu.Item>
                            }
                            position="top center"
                            content={this.props.intl.formatMessage(
                              messages.rename,
                            )}
                            size="mini"
                          />
                          <Popup
                            trigger={
                              <Menu.Item
                                icon
                                as={Button}
                                onClick={this.workflow}
                                disabled={!selected}
                                aria-label={this.props.intl.formatMessage(
                                  messages.state,
                                )}
                              >
                                <Icon
                                  name={semaphoreSVG}
                                  color={selected ? '#826a6a' : 'grey'}
                                  size="24px"
                                  className="semaphore"
                                />
                              </Menu.Item>
                            }
                            position="top center"
                            content={this.props.intl.formatMessage(
                              messages.state,
                            )}
                            size="mini"
                          />
                          <Popup
                            trigger={
                              <Menu.Item
                                icon
                                as={Button}
                                onClick={this.tags}
                                disabled={!selected}
                                aria-label={this.props.intl.formatMessage(
                                  messages.tags,
                                )}
                              >
                                <Icon
                                  name={tagSVG}
                                  color={selected ? '#826a6a' : 'grey'}
                                  size="24px"
                                  className="tag"
                                />
                              </Menu.Item>
                            }
                            position="top center"
                            content={this.props.intl.formatMessage(
                              messages.tags,
                            )}
                            size="mini"
                          />

                          <Popup
                            trigger={
                              <Menu.Item
                                icon
                                as={Button}
                                onClick={this.properties}
                                disabled={!selected}
                                aria-label={this.props.intl.formatMessage(
                                  messages.properties,
                                )}
                              >
                                <Icon
                                  name={propertiesSVG}
                                  color={selected ? '#826a6a' : 'grey'}
                                  size="24px"
                                  className="properties"
                                />
                              </Menu.Item>
                            }
                            position="top center"
                            content={this.props.intl.formatMessage(
                              messages.properties,
                            )}
                            size="mini"
                          />
                        </Menu.Menu>
                        <Menu.Menu className="top-menu-menu">
                          <Popup
                            trigger={
                              <Menu.Item
                                icon
                                as={Button}
                                onClick={this.cut}
                                disabled={!selected}
                                aria-label={this.props.intl.formatMessage(
                                  messages.cut,
                                )}
                              >
                                <Icon
                                  name={cutSVG}
                                  color={selected ? '#826a6a' : 'grey'}
                                  size="24px"
                                  className="cut"
                                />
                              </Menu.Item>
                            }
                            position="top center"
                            content={this.props.intl.formatMessage(
                              messages.cut,
                            )}
                            size="mini"
                          />
                          <Popup
                            trigger={
                              <Menu.Item
                                icon
                                as={Button}
                                onClick={this.copy}
                                disabled={!selected}
                                aria-label={this.props.intl.formatMessage(
                                  messages.copy,
                                )}
                              >
                                <Icon
                                  name={copySVG}
                                  color={selected ? '#826a6a' : 'grey'}
                                  size="24px"
                                  className="copy"
                                />
                              </Menu.Item>
                            }
                            position="top center"
                            content={this.props.intl.formatMessage(
                              messages.copy,
                            )}
                            size="mini"
                          />

                          <Popup
                            trigger={
                              <Menu.Item
                                icon
                                as={Button}
                                onClick={this.paste}
                                disabled={!this.props.action}
                                aria-label={this.props.intl.formatMessage(
                                  messages.paste,
                                )}
                              >
                                <Icon
                                  name={pasteSVG}
                                  color={selected ? '#826a6a' : 'grey'}
                                  size="24px"
                                  className="paste"
                                />
                              </Menu.Item>
                            }
                            position="top center"
                            content={this.props.intl.formatMessage(
                              messages.paste,
                            )}
                            size="mini"
                          />

                          <Popup
                            trigger={
                              <Menu.Item
                                icon
                                as={Button}
                                onClick={this.delete}
                                disabled={!selected}
                                aria-label={this.props.intl.formatMessage(
                                  messages.delete,
                                )}
                              >
                                <Icon
                                  name={deleteSVG}
                                  color={selected ? '#e40166' : 'grey'}
                                  size="24px"
                                  className="delete"
                                />
                              </Menu.Item>
                            }
                            position="top center"
                            content={this.props.intl.formatMessage(
                              messages.delete,
                            )}
                            size="mini"
                          />
                        </Menu.Menu>
                        <Menu.Menu
                          position="right"
                          className="top-menu-searchbox"
                        >
                          <div className="ui right aligned category search item">
                            <Input
                              type="text"
                              transparent
                              placeholder={this.props.intl.formatMessage(
                                messages.filter,
                              )}
                              size="small"
                              value={this.state.filter}
                              onChange={this.onChangeFilter}
                            />
                            {this.state.filter && (
                              <Button
                                className="icon icon-container"
                                onClick={() => {
                                  this.onChangeFilter('', { value: '' });
                                }}
                              >
                                <Icon
                                  name={clearSVG}
                                  size="30px"
                                  color="#e40166"
                                />
                              </Button>
                            )}
                            <Icon
                              name={zoomSVG}
                              size="30px"
                              color="#007eb1"
                              className="zoom"
                              style={{ flexShrink: '0' }}
                            />
                            <div className="results" />
                          </div>
                        </Menu.Menu>
                      </Menu>
                      <Segment
                        secondary
                        attached
                        className="contents-breadcrumbs"
                      >
                        <ContentsBreadcrumbs items={this.props.breadcrumbs} />
                        <Dropdown
                          item
                          upward={false}
                          icon={
                            <Icon name={moreSVG} size="24px" color="#826a6a" />
                          }
                          className="right floating selectIndex"
                        >
                          <Dropdown.Menu className="left">
                            <Dropdown.Header
                              content={this.props.intl.formatMessage(
                                messages.selectColumns,
                              )}
                            />
                            <Dropdown.Menu scrolling>
                              {map(
                                filter(
                                  this.state.index.order,
                                  (index) => index !== 'sortable_title',
                                ),
                                (index) => (
                                  <Dropdown.Item
                                    key={index}
                                    value={index}
                                    onClick={this.onSelectIndex}
                                    className="iconAlign"
                                  >
                                    {this.state.index.values[index].selected ? (
                                      <Icon
                                        name={checkboxCheckedSVG}
                                        size="24px"
                                        color="#007eb1"
                                        className={
                                          this.state.index.values[index].label
                                        }
                                      />
                                    ) : (
                                      <Icon
                                        name={checkboxUncheckedSVG}
                                        className={
                                          this.state.index.values[index].label
                                        }
                                        size="24px"
                                      />
                                    )}
                                    <span>
                                      {' '}
                                      {this.props.intl.formatMessage({
                                        id: this.state.index.values[index]
                                          .label,
                                        defaultMessage:
                                          this.state.index.values[index].label,
                                      })}
                                    </span>
                                  </Dropdown.Item>
                                ),
                              )}
                            </Dropdown.Menu>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Segment>
                      <div className="contents-table-wrapper">
                        <Table selectable compact singleLine attached>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>
                                <Popup
                                  menu={true}
                                  position="bottom left"
                                  flowing={true}
                                  basic={true}
                                  on="click"
                                  popper={{
                                    className: 'dropdown-popup',
                                  }}
                                  trigger={
                                    <Icon
                                      name={configurationSVG}
                                      size="24px"
                                      color="#826a6a"
                                      className="dropdown-popup-trigger configuration-svg"
                                    />
                                  }
                                >
                                  <Menu vertical borderless fluid>
                                    <Menu.Header
                                      content={this.props.intl.formatMessage(
                                        messages.rearrangeBy,
                                      )}
                                    />
                                    {map(
                                      [
                                        'id',
                                        'sortable_title',
                                        'EffectiveDate',
                                        'CreationDate',
                                        'ModificationDate',
                                        'portal_type',
                                      ],
                                      (index) => (
                                        <Dropdown
                                          key={index}
                                          item
                                          simple
                                          className={`sort_${index} icon-align`}
                                          icon={
                                            <Icon
                                              name={downKeySVG}
                                              size="24px"
                                              className="left"
                                            />
                                          }
                                          text={this.props.intl.formatMessage({
                                            id: Indexes[index].label,
                                          })}
                                        >
                                          <Dropdown.Menu>
                                            <Dropdown.Item
                                              onClick={this.onSortItems}
                                              value={`${Indexes[index].sort_on}|ascending`}
                                              className={`sort_${Indexes[index].sort_on}_ascending icon-align`}
                                            >
                                              <Icon
                                                name={sortDownSVG}
                                                size="24px"
                                              />{' '}
                                              <FormattedMessage
                                                id="Ascending"
                                                defaultMessage="Ascending"
                                              />
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                              onClick={this.onSortItems}
                                              value={`${Indexes[index].sort_on}|descending`}
                                              className={`sort_${Indexes[index].sort_on}_descending icon-align`}
                                            >
                                              <Icon
                                                name={sortUpSVG}
                                                size="24px"
                                              />{' '}
                                              <FormattedMessage
                                                id="Descending"
                                                defaultMessage="Descending"
                                              />
                                            </Dropdown.Item>
                                          </Dropdown.Menu>
                                        </Dropdown>
                                      ),
                                    )}
                                  </Menu>
                                </Popup>
                              </Table.HeaderCell>
                              <Table.HeaderCell>
                                <Popup
                                  menu={true}
                                  position="bottom left"
                                  flowing={true}
                                  basic={true}
                                  on="click"
                                  popper={{
                                    className: 'dropdown-popup',
                                  }}
                                  trigger={
                                    <Icon
                                      name={
                                        this.state.selected.length === 0
                                          ? checkboxUncheckedSVG
                                          : this.state.selected.length ===
                                            this.state.items.length
                                          ? checkboxCheckedSVG
                                          : checkboxIndeterminateSVG
                                      }
                                      color={
                                        this.state.selected.length > 0
                                          ? '#007eb1'
                                          : '#826a6a'
                                      }
                                      className="dropdown-popup-trigger"
                                      size="24px"
                                    />
                                  }
                                >
                                  <Menu vertical borderless fluid>
                                    <Menu.Header
                                      content={this.props.intl.formatMessage(
                                        messages.select,
                                      )}
                                    />
                                    <Menu.Item onClick={this.onSelectAll}>
                                      <Icon
                                        name={checkboxCheckedSVG}
                                        color="#007eb1"
                                        size="24px"
                                      />{' '}
                                      <FormattedMessage
                                        id="All"
                                        defaultMessage="All"
                                      />
                                    </Menu.Item>
                                    <Menu.Item onClick={this.onSelectNone}>
                                      <Icon
                                        name={checkboxUncheckedSVG}
                                        size="24px"
                                      />{' '}
                                      <FormattedMessage
                                        id="None"
                                        defaultMessage="None"
                                      />
                                    </Menu.Item>
                                    <Divider />
                                    <Menu.Header
                                      content={this.props.intl.formatMessage(
                                        messages.selected,
                                        {
                                          count: this.state.selected.length,
                                        },
                                      )}
                                    />
                                    <Input
                                      icon={<Icon name={zoomSVG} size="24px" />}
                                      iconPosition="left"
                                      className="item search"
                                      placeholder={this.props.intl.formatMessage(
                                        messages.filter,
                                      )}
                                      value={
                                        this.state.selectedMenuFilter || ''
                                      }
                                      onChange={this.onChangeSelected}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                      }}
                                    />
                                    <Menu.Menu scrolling>
                                      {map(filteredItems, (item) => (
                                        <Menu.Item
                                          key={item}
                                          value={item}
                                          onClick={this.onDeselect}
                                        >
                                          <Icon
                                            name={deleteSVG}
                                            color="#e40166"
                                            size="24px"
                                          />{' '}
                                          {this.getFieldById(item, 'title')}
                                        </Menu.Item>
                                      ))}
                                    </Menu.Menu>
                                  </Menu>
                                </Popup>
                              </Table.HeaderCell>
                              <Table.HeaderCell
                                width={Math.ceil(
                                  16 / this.state.index.selectedCount,
                                )}
                              >
                                <FormattedMessage
                                  id="Title"
                                  defaultMessage="Title"
                                />
                              </Table.HeaderCell>
                              {map(
                                this.state.index.order,
                                (index, order) =>
                                  this.state.index.values[index].selected && (
                                    <ContentsIndexHeader
                                      key={index}
                                      width={Math.ceil(
                                        16 / this.state.index.selectedCount,
                                      )}
                                      label={
                                        this.state.index.values[index].label
                                      }
                                      order={order}
                                      onOrderIndex={this.onOrderIndex}
                                    />
                                  ),
                              )}
                              <Table.HeaderCell textAlign="right">
                                <FormattedMessage
                                  id="Actions"
                                  defaultMessage="Actions"
                                />
                              </Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          <Table.Body>
                            {this.state.items.map((item, order) => (
                              <ContentsItem
                                key={item['@id']}
                                item={item}
                                order={order}
                                selected={
                                  indexOf(this.state.selected, item['@id']) !==
                                  -1
                                }
                                onClick={this.onSelect}
                                indexes={filter(
                                  map(this.state.index.order, (index) => ({
                                    id: index,
                                    type: this.state.index.values[index].type,
                                  })),
                                  (index) =>
                                    this.state.index.values[index.id].selected,
                                )}
                                onCut={this.cut}
                                onCopy={this.copy}
                                onDelete={this.delete}
                                onOrderItem={this.onOrderItem}
                                onMoveToTop={this.onMoveToTop}
                                onMoveToBottom={this.onMoveToBottom}
                              />
                            ))}
                          </Table.Body>
                        </Table>
                      </div>

                      <div className="contents-pagination">
                        <Pagination
                          current={this.state.currentPage}
                          total={Math.ceil(
                            this.props.total / this.state.pageSize,
                          )}
                          pageSize={this.state.pageSize}
                          pageSizes={[
                            50,
                            this.props.intl.formatMessage(messages.all),
                          ]}
                          onChangePage={this.onChangePage}
                          onChangePageSize={this.onChangePageSize}
                        />
                      </div>
                    </Segment.Group>
                  </section>
                </article>
              </div>
              {this.state.isClient && (
                <Portal node={document.getElementById('toolbar')}>
                  <Toolbar
                    pathname={this.props.pathname}
                    inner={
                      <Link
                        to={`${path}`}
                        aria-label={this.props.intl.formatMessage(
                          messages.back,
                        )}
                      >
                        <Icon
                          name={backSVG}
                          className="contents circled"
                          size="30px"
                          title={this.props.intl.formatMessage(messages.back)}
                        />
                      </Link>
                    }
                  />
                </Portal>
              )}
            </Dimmer.Dimmable>
          </Container>
        ) : (
          <Unauthorized staticContext={this.props.staticContext} />
        )}
      </>
    ) : (
      <Unauthorized staticContext={this.props.staticContext} />
    );
  }
}

let dndContext;

const DragDropConnector = (props) => {
  const { DragDropContext } = props.reactDnd;
  const HTML5Backend = props.reactDndHtml5Backend.default;

  const DndConnectedContents = React.useMemo(() => {
    if (!dndContext) {
      dndContext = DragDropContext(HTML5Backend);
    }
    return dndContext(Contents);
  }, [DragDropContext, HTML5Backend]);

  return <DndConnectedContents {...props} />;
};

export const __test__ = compose(
  injectIntl,
  injectLazyLibs(['toastify', 'reactDnd']),
  connect(
    (store, props) => {
      return {
        token: store.userSession.token,
        items: store.search.items,
        sort: store.content.update.sort,
        index: store.content.updatecolumns.idx,
        breadcrumbs: store.breadcrumbs.items,
        total: store.search.total,
        searchRequest: {
          loading: store.search.loading,
          loaded: store.search.loaded,
        },
        pathname: props.location.pathname,
        action: store.clipboard.action,
        source: store.clipboard.source,
        clipboardRequest: store.clipboard.request,
        deleteRequest: store.content.delete,
        updateRequest: store.content.update,
        objectActions: store.actions.actions.object,
        orderRequest: store.content.order,
      };
    },
    {
      searchContent,
      cut,
      copy,
      copyContent,
      deleteContent,
      listActions,
      moveContent,
      orderContent,
      sortContent,
      updateColumnsContent,
      linkIntegrityCheck,
      getContent,
    },
  ),
)(Contents);

export default compose(
  injectIntl,
  connect(
    (store, props) => {
      return {
        token: store.userSession.token,
        items: store.search.items,
        sort: store.content.update.sort,
        index: store.content.updatecolumns.idx,
        breadcrumbs: store.breadcrumbs.items,
        total: store.search.total,
        searchRequest: {
          loading: store.search.loading,
          loaded: store.search.loaded,
        },
        pathname: props.location.pathname,
        action: store.clipboard.action,
        source: store.clipboard.source,
        clipboardRequest: store.clipboard.request,
        deleteRequest: store.content.delete,
        updateRequest: store.content.update,
        objectActions: store.actions.actions.object,
        orderRequest: store.content.order,
      };
    },
    {
      searchContent,
      cut,
      copy,
      copyContent,
      deleteContent,
      listActions,
      moveContent,
      orderContent,
      sortContent,
      updateColumnsContent,
      linkIntegrityCheck,
      getContent,
    },
  ),
  asyncConnect([
    {
      key: 'actions',
      // Dispatch async/await to make the operation syncronous, otherwise it returns
      // before the promise is resolved
      promise: async ({ location, store: { dispatch } }) =>
        await dispatch(listActions(getBaseUrl(location.pathname))),
    },
  ]),
  injectLazyLibs(['toastify', 'reactDnd', 'reactDndHtml5Backend']),
)(DragDropConnector);
