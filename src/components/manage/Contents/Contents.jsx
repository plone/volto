/**
 * Contents component.
 * @module components/manage/Contents/Contents
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Portal } from 'react-portal';
import { Helmet } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  Confirm,
  Container,
  Dropdown,
  Menu,
  Icon,
  Input,
  Segment,
  Table,
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
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import {
  searchContent,
  cut,
  copy,
  copyContent,
  deleteContent,
  moveContent,
  orderContent,
  sortContent,
} from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';
import Indexes from '@plone/volto/constants/Indexes';
import {
  ContentsIndexHeader,
  ContentsItem,
  ContentsRenameModal,
  ContentsUploadModal,
  ContentsWorkflowModal,
  ContentsTagsModal,
  ContentsPropertiesModal,
  Pagination,
  Toolbar,
  Toast,
  Icon as IconNext,
} from '@plone/volto/components';
import { toast } from 'react-toastify';

import backSVG from '@plone/volto/icons/back.svg';

const defaultIndexes = ['ModificationDate', 'EffectiveDate', 'review_state'];

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
  delete: {
    id: 'Delete',
    defaultMessage: 'Delete',
  },
  deleteConfirm: {
    id: 'Do you really want to delete the following items?',
    defaultMessage: 'Do you really want to delete the following items?',
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
  messagePasted: {
    id: 'Item(s) pasted.',
    defaultMessage: 'Item(s) pasted.',
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
    this.state = {
      selected: [],
      showDelete: false,
      showUpload: false,
      showRename: false,
      showTags: false,
      showProperties: false,
      showWorkflow: false,
      itemsToDelete: [],
      items: this.props.items,
      filter: '',
      currentPage: 0,
      pageSize: 15,
      index: {
        order: keys(Indexes),
        values: mapValues(Indexes, (value, key) => ({
          ...value,
          selected: indexOf(defaultIndexes, key) !== -1,
        })),
        selectedCount: defaultIndexes.length + 1,
      },
      sort_on: 'getObjPositionInParent',
      sort_order: 'ascending',
    };
    this.filterTimeout = null;
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  UNSAFE_componentWillMount() {
    this.fetchContents();
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
    if (this.props.pathname !== nextProps.pathname) {
      this.setState(
        {
          currentPage: 0,
        },
        () => this.fetchContents(nextProps.pathname),
      );
    }
    if (this.props.searchRequest.loading && nextProps.searchRequest.loaded) {
      this.setState({
        items: nextProps.items,
      });
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
  onSelect(event) {
    const id = event.target.getAttribute('value');
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
      selected: map(this.state.items, item => item['@id']),
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
    this.setState({
      index: {
        ...this.state.index,
        selectedCount:
          this.state.index.selectedCount +
          (this.state.index.values[value].selected ? -1 : 1),
        values: mapValues(this.state.index.values, (indexValue, indexKey) => ({
          ...indexValue,
          selected:
            indexKey === value ? !indexValue.selected : indexValue.selected,
        })),
      },
    });
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
    this.onOrderItem(this.state.items[value]['@id'], value, -value, false);
    this.onOrderItem(this.state.items[value]['@id'], value, -value, true);
  }

  /**
   * On move to bottom
   * @method onMoveToBottom
   * @param {object} event Event object
   * @param {string} value Item index
   * @returns {undefined}
   */
  onMoveToBottom(event, { value }) {
    this.onOrderItem(
      this.state.items[value]['@id'],
      value,
      this.state.items.length - 1 - value,
      false,
    );
    this.onOrderItem(
      this.state.items[value]['@id'],
      value,
      this.state.items.length - 1 - value,
      true,
    );
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
    this.props.searchContent(getBaseUrl(pathname || this.props.pathname), {
      'path.depth': 1,
      sort_on: this.state.sort_on,
      sort_order: this.state.sort_order,
      metadata_fields: '_all',
      ...(this.state.filter && { SearchableText: `${this.state.filter}*` }),
      b_size: this.state.pageSize,
      b_start: this.state.currentPage * this.state.pageSize,
    });
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
    toast.success(
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
    toast.success(
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
    toast.success(
      <Toast
        success
        title={this.props.intl.formatMessage(messages.success)}
        content={this.props.intl.formatMessage(messages.messagePasted)}
      />,
    );
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const selected = this.state.selected.length > 0;
    const path = getBaseUrl(this.props.pathname);

    return (
      <Container id="page-contents">
        <Helmet title={this.props.intl.formatMessage(messages.contents)} />
        <div className="container">
          <article id="content">
            <Confirm
              open={this.state.showDelete}
              header={this.props.intl.formatMessage(messages.deleteConfirm)}
              content={
                <div className="content">
                  <ul className="content">
                    {map(this.state.itemsToDelete, item => (
                      <li key={item}>{this.getFieldById(item, 'title')}</li>
                    ))}
                  </ul>
                </div>
              }
              onCancel={this.onDeleteCancel}
              onConfirm={this.onDeleteOk}
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
              items={map(this.state.selected, item => ({
                url: item,
                title: this.getFieldById(item, 'title'),
                id: this.getFieldById(item, 'id'),
              }))}
            />
            <ContentsTagsModal
              open={this.state.showTags}
              onCancel={this.onTagsCancel}
              onOk={this.onTagsOk}
              items={map(this.state.selected, item => ({
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
                <Menu stackable attached>
                  <Menu.Menu>
                    <Menu.Item onClick={this.upload}>
                      <Icon
                        name="upload"
                        title={this.props.intl.formatMessage(messages.upload)}
                      />
                    </Menu.Item>
                  </Menu.Menu>
                  <Menu.Menu>
                    <Menu.Item onClick={this.rename} disabled={!selected}>
                      <Icon
                        name="text cursor"
                        title={this.props.intl.formatMessage(messages.rename)}
                      />
                    </Menu.Item>
                    <Menu.Item onClick={this.workflow} disabled={!selected}>
                      <Icon
                        name="random"
                        title={this.props.intl.formatMessage(messages.state)}
                      />
                    </Menu.Item>
                    <Menu.Item onClick={this.tags} disabled={!selected}>
                      <Icon
                        name="tags"
                        title={this.props.intl.formatMessage(messages.tags)}
                      />
                    </Menu.Item>
                    <Menu.Item onClick={this.properties} disabled={!selected}>
                      <Icon
                        name="setting"
                        title={this.props.intl.formatMessage(
                          messages.properties,
                        )}
                      />
                    </Menu.Item>
                  </Menu.Menu>
                  <Menu.Menu>
                    <Menu.Item onClick={this.cut} disabled={!selected}>
                      <Icon
                        name="cut"
                        title={this.props.intl.formatMessage(messages.cut)}
                      />
                    </Menu.Item>
                    <Menu.Item onClick={this.copy} disabled={!selected}>
                      <Icon
                        name="copy"
                        title={this.props.intl.formatMessage(messages.copy)}
                      />
                    </Menu.Item>
                    <Menu.Item
                      onClick={this.paste}
                      disabled={!this.props.action}
                    >
                      <Icon
                        name="paste"
                        title={this.props.intl.formatMessage(messages.paste)}
                      />
                    </Menu.Item>
                    <Menu.Item onClick={this.delete} disabled={!selected}>
                      <Icon
                        name="trash"
                        title={this.props.intl.formatMessage(messages.delete)}
                      />
                    </Menu.Item>
                  </Menu.Menu>
                  <Menu.Menu position="right">
                    <div className="ui right aligned category search item">
                      <div className="ui transparent icon input">
                        <Input
                          className="prompt"
                          type="text"
                          placeholder={this.props.intl.formatMessage(
                            messages.filter,
                          )}
                          value={this.state.filter}
                          onChange={this.onChangeFilter}
                        />
                        <i className="search link icon" />
                      </div>
                      <div className="results" />
                    </div>
                  </Menu.Menu>
                </Menu>
                <Segment secondary attached>
                  <Breadcrumb>
                    <Link
                      to="/contents"
                      className="section"
                      title={this.props.intl.formatMessage(messages.home)}
                    >
                      <Icon name="home" />
                    </Link>
                    {this.props.breadcrumbs.map(
                      (breadcrumb, index, breadcrumbs) => [
                        <Breadcrumb.Divider
                          key={`divider-${breadcrumb.url}`}
                        />,
                        index < breadcrumbs.length - 1 ? (
                          <Link
                            key={breadcrumb.url}
                            to={`${breadcrumb.url}/contents`}
                            className="section"
                          >
                            {breadcrumb.title}
                          </Link>
                        ) : (
                          <Breadcrumb.Section key={breadcrumb.url} active>
                            {breadcrumb.title}
                          </Breadcrumb.Section>
                        ),
                      ],
                    )}
                  </Breadcrumb>
                  <Dropdown item icon="ellipsis horizontal" className="right">
                    <Dropdown.Menu className="left">
                      <Dropdown.Header
                        content={this.props.intl.formatMessage(
                          messages.selectColumns,
                        )}
                      />
                      <Dropdown.Menu scrolling>
                        {map(this.state.index.order, index => (
                          <Dropdown.Item
                            key={index}
                            value={index}
                            onClick={this.onSelectIndex}
                          >
                            {this.state.index.values[index].selected ? (
                              <Icon name="check square" color="blue" />
                            ) : (
                              <Icon name="square outline" />
                            )}
                            {this.props.intl.formatMessage({
                              id: this.state.index.values[index].label,
                              defaultMessage: this.state.index.values[index]
                                .label,
                            })}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown.Menu>
                  </Dropdown>
                </Segment>
                <Table selectable compact singleLine attached>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        <Dropdown
                          trigger={<Icon name="sort content ascending" />}
                          className="sort-icon"
                          aria-label={this.props.intl.formatMessage(
                            messages.sort,
                          )}
                          icon={null}
                          simple
                        >
                          <Dropdown.Menu>
                            <Dropdown.Header
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
                              index => (
                                <Dropdown.Item
                                  key={index}
                                  className={`sort_${index}`}
                                >
                                  <Icon name="dropdown" />
                                  <FormattedMessage id={Indexes[index].label} />
                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      onClick={this.onSortItems}
                                      value={`${Indexes[index].sort_on}|ascending`}
                                      className={`sort_${Indexes[index].sort_on}_ascending`}
                                    >
                                      <Icon name="sort alphabet ascending" />{' '}
                                      <FormattedMessage
                                        id="Ascending"
                                        defaultMessage="Ascending"
                                      />
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={this.onSortItems}
                                      value={`${Indexes[index].sort_on}|descending`}
                                      className={`sort_${Indexes[index].sort_on}_descending`}
                                    >
                                      <Icon name="sort alphabet descending" />{' '}
                                      <FormattedMessage
                                        id="Descending"
                                        defaultMessage="Descending"
                                      />
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown.Item>
                              ),
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        <Dropdown
                          trigger={
                            <Icon
                              name={
                                this.state.selected.length === 0
                                  ? 'square outline'
                                  : this.state.selected.length ===
                                    this.state.items.length
                                  ? 'check square'
                                  : 'minus square'
                              }
                              color={
                                this.state.selected.length > 0
                                  ? 'blue'
                                  : 'black'
                              }
                            />
                          }
                          icon={null}
                        >
                          <Dropdown.Menu>
                            <Dropdown.Header
                              content={this.props.intl.formatMessage(
                                messages.select,
                              )}
                            />
                            <Dropdown.Item onClick={this.onSelectAll}>
                              <Icon name="check square" color="blue" />{' '}
                              <FormattedMessage id="All" defaultMessage="All" />
                            </Dropdown.Item>
                            <Dropdown.Item onClick={this.onSelectNone}>
                              <Icon name="square outline" />{' '}
                              <FormattedMessage
                                id="None"
                                defaultMessage="None"
                              />
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Header
                              content={this.props.intl.formatMessage(
                                messages.selected,
                                { count: this.state.selected.length },
                              )}
                            />
                            <Input
                              icon="search"
                              iconPosition="left"
                              className="search"
                              placeholder={this.props.intl.formatMessage(
                                messages.filter,
                              )}
                            />
                            <Dropdown.Menu scrolling>
                              {map(this.state.selected, item => (
                                <Dropdown.Item
                                  key={item}
                                  value={item}
                                  onClick={this.onDeselect}
                                >
                                  <Icon name="delete" />{' '}
                                  {this.getFieldById(item, 'title')}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Table.HeaderCell>
                      <Table.HeaderCell
                        width={Math.ceil(16 / this.state.index.selectedCount)}
                      >
                        <FormattedMessage id="Title" defaultMessage="Title" />
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
                              label={this.state.index.values[index].label}
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
                          indexOf(this.state.selected, item['@id']) !== -1
                        }
                        onClick={this.onSelect}
                        indexes={filter(
                          map(this.state.index.order, index => ({
                            id: index,
                            type: this.state.index.values[index].type,
                          })),
                          index => this.state.index.values[index.id].selected,
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

                <Pagination
                  current={this.state.currentPage}
                  total={Math.ceil(this.props.total / this.state.pageSize)}
                  pageSize={this.state.pageSize}
                  pageSizes={[15, 30, 50]}
                  onChangePage={this.onChangePage}
                  onChangePageSize={this.onChangePageSize}
                />
              </Segment.Group>
            </section>
          </article>
        </div>
        <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
          <Toolbar
            pathname={this.props.pathname}
            hideDefaultViewButtons
            inner={
              <Link
                to={`${path}`}
                aria-label={this.props.intl.formatMessage(messages.back)}
              >
                <IconNext
                  name={backSVG}
                  className="contents circled"
                  size="30px"
                  title={this.props.intl.formatMessage(messages.back)}
                />
              </Link>
            }
          />
        </Portal>
      </Container>
    );
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  injectIntl,
  connect(
    (state, props) => ({
      items: state.search.items,
      breadcrumbs: state.breadcrumbs.items,
      total: state.search.total,
      searchRequest: {
        loading: state.search.loading,
        loaded: state.search.loaded,
      },
      pathname: props.location.pathname,
      action: state.clipboard.action,
      source: state.clipboard.source,
      clipboardRequest: state.clipboard.request,
      deleteRequest: state.content.delete,
      updateRequest: state.content.update,
    }),
    {
      searchContent,
      cut,
      copy,
      copyContent,
      deleteContent,
      moveContent,
      orderContent,
      sortContent,
    },
  ),
)(Contents);
