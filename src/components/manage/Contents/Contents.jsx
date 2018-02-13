/**
 * Contents component.
 * @module components/manage/Contents/Contents
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { Confirm, Dropdown, Menu, Icon, Input, Table } from 'semantic-ui-react';
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
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

import {
  searchContent,
  cut,
  copy,
  copyContent,
  deleteContent,
  moveContent,
  orderContent,
  sortContent,
  addMessage,
} from '../../../actions';
import { getBaseUrl } from '../../../helpers';
import Indexes from '../../../constants/Indexes';
import {
  ContentsIndexHeader,
  ContentsItem,
  ContentsRenameModal,
  ContentsUploadModal,
  ContentsWorkflowModal,
  ContentsTagsModal,
  ContentsPropertiesModal,
  Pagination,
} from '../../../components';

const defaultIndexes = ['ModificationDate', 'EffectiveDate', 'review_state'];
const messages = defineMessages({
  contents: {
    id: 'Contents',
    defaultMessage: 'Contents',
  },
  deleteConfirm: {
    id: 'Do you really want to delete the following items?',
    defaultMessage: 'Do you really want to delete the following items?',
  },
  filter: {
    id: 'Filter…',
    defaultMessage: 'Filter…',
  },
  rearrangeBy: {
    id: 'Rearrange items by…',
    defaultMessage: 'Rearrange items by…',
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
});

@DragDropContext(HTML5Backend)
@injectIntl
@connect(
  (state, props) => ({
    items: state.search.items,
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
    editRequest: state.content.edit,
  }),
  dispatch =>
    bindActionCreators(
      {
        searchContent,
        cut,
        copy,
        copyContent,
        deleteContent,
        moveContent,
        orderContent,
        sortContent,
        addMessage,
      },
      dispatch,
    ),
)
/**
 * Component to list the folder contents.
 * @class ContentsComponent
 * @extends Component
 */
export default class ContentsComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    /**
     * Action which was executed (cut, copy or none)
     */
    action: PropTypes.string,
    /**
     * Source id's of the action
     */
    source: PropTypes.arrayOf(PropTypes.string),
    /**
     * Action to search content
     */
    searchContent: PropTypes.func.isRequired,
    /**
     * Action to cut an object
     */
    cut: PropTypes.func.isRequired,
    /**
     * Action to copy an object
     */
    copy: PropTypes.func.isRequired,
    /**
     * Action to copy content
     */
    copyContent: PropTypes.func.isRequired,
    /**
     * Action to delete content
     */
    deleteContent: PropTypes.func.isRequired,
    /**
     * Action to move content
     */
    moveContent: PropTypes.func.isRequired,
    /**
     * Action to order content
     */
    orderContent: PropTypes.func.isRequired,
    /**
     * Action to sort content
     */
    sortContent: PropTypes.func.isRequired,
    /**
     * Action to display a notification message
     */
    addMessage: PropTypes.func.isRequired,
    /**
     * Clipboard request status
     */
    clipboardRequest: PropTypes.shape({
      /**
       * Loading status
       */
      loading: PropTypes.bool,
      /**
       * Loaded status
       */
      loaded: PropTypes.bool,
    }).isRequired,
    /**
     * Delete request status
     */
    deleteRequest: PropTypes.shape({
      /**
       * Loading status
       */
      loading: PropTypes.bool,
      /**
       * Loaded status
       */
      loaded: PropTypes.bool,
    }).isRequired,
    /**
     * Edit request status
     */
    editRequest: PropTypes.shape({
      /**
       * Loading status
       */
      loading: PropTypes.bool,
      /**
       * Loaded status
       */
      loaded: PropTypes.bool,
    }).isRequired,
    /**
     * Search request status
     */
    searchRequest: PropTypes.shape({
      /**
       * Loading status
       */
      loading: PropTypes.bool,
      /**
       * Loaded status
       */
      loaded: PropTypes.bool,
    }).isRequired,
    /**
     * Items in the content listing
     */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Id of the item
         */
        '@id': PropTypes.string,
        /**
         * Type of the item
         */
        '@type': PropTypes.string,
        /**
         * Title of the item
         */
        title: PropTypes.string,
        /**
         * Description of the item
         */
        description: PropTypes.string,
      }),
    ),
    /**
     * Total number of items
     */
    total: PropTypes.number.isRequired,
    /**
     * Pathname of the current location
     */
    pathname: PropTypes.string.isRequired,
    /**
     * i18n object
     */
    intl: intlShape.isRequired,
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
    };
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.fetchContents();
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (
      (this.props.clipboardRequest.loading &&
        nextProps.clipboardRequest.loaded) ||
      (this.props.deleteRequest.loading && nextProps.deleteRequest.loaded) ||
      (this.props.editRequest.loading && nextProps.editRequest.loaded) ||
      this.props.pathname !== nextProps.pathname
    ) {
      this.fetchContents(nextProps.pathname);
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
    this.setState(
      {
        filter: value,
      },
      () => this.fetchContents(),
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
   * @param {number} itemIndex Item index
   * @param {number} delta Delta
   * @returns {undefined}
   */
  onOrderItem(itemIndex, delta) {
    this.props.orderContent(
      getBaseUrl(this.props.pathname),
      this.state.items[itemIndex]['@id'].replace(/^.*\//, ''),
      delta,
      map(this.state.items, item => item['@id'].replace(/^.*\//, '')),
    );
    this.setState({
      items: move(this.state.items, itemIndex, itemIndex + delta),
    });
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
    this.onOrderItem(value, -value);
  }

  /**
   * On move to bottom
   * @method onMoveToBottom
   * @param {object} event Event object
   * @param {string} value Item index
   * @returns {undefined}
   */
  onMoveToBottom(event, { value }) {
    this.onOrderItem(value, this.state.items.length - 1 - value);
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
      sort_on: 'getObjPositionInParent',
      metadata_fields: '_all',
      SearchableText: this.state.filter ? `${this.state.filter}*` : '',
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
    this.props.addMessage(
      null,
      this.props.intl.formatMessage(messages.messageCut),
      'success',
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
    this.props.addMessage(
      null,
      this.props.intl.formatMessage(messages.messageCopied),
      'success',
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
    this.props.addMessage(
      null,
      this.props.intl.formatMessage(messages.messagePasted),
      'success',
    );
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const selected = this.state.selected.length > 0;
    return (
      <div id="page-contents">
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
            <h1>
              <FormattedMessage id="Contents" defaultMessage="Contents" />
            </h1>
            <section id="content-core">
              <Menu stackable>
                <Menu.Menu>
                  <Menu.Item onClick={this.upload}>
                    <Icon name="upload" />{' '}
                    <FormattedMessage id="Upload" defaultMessage="Upload" />
                  </Menu.Item>
                </Menu.Menu>
                <Menu.Menu position="right">
                  <Menu.Item onClick={this.cut} disabled={!selected}>
                    <Icon name="cut" />{' '}
                    <FormattedMessage id="Cut" defaultMessage="Cut" />
                  </Menu.Item>
                  <Menu.Item onClick={this.copy} disabled={!selected}>
                    <Icon name="copy" />{' '}
                    <FormattedMessage id="Copy" defaultMessage="Copy" />
                  </Menu.Item>
                  <Menu.Item onClick={this.paste} disabled={!this.props.action}>
                    <Icon name="paste" />{' '}
                    <FormattedMessage id="Paste" defaultMessage="Paste" />
                  </Menu.Item>
                  <Menu.Item onClick={this.delete} disabled={!selected}>
                    <Icon name="trash" />{' '}
                    <FormattedMessage id="Delete" defaultMessage="Delete" />
                  </Menu.Item>
                  <Dropdown
                    item
                    trigger={
                      <span>
                        <Icon name="write" />{' '}
                        <FormattedMessage id="Batch" defaultMessage="Batch" />
                      </span>
                    }
                    disabled={!selected}
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={this.rename}>
                        <Icon name="text cursor" />{' '}
                        <FormattedMessage id="Rename" defaultMessage="Rename" />
                      </Dropdown.Item>
                      <Dropdown.Item onClick={this.tags}>
                        <Icon name="tags" />{' '}
                        <FormattedMessage id="Tags" defaultMessage="Tags" />
                      </Dropdown.Item>
                      <Dropdown.Item onClick={this.workflow}>
                        <Icon name="random" />{' '}
                        <FormattedMessage id="State" defaultMessage="State" />
                      </Dropdown.Item>
                      <Dropdown.Item onClick={this.properties}>
                        <Icon name="edit" />{' '}
                        <FormattedMessage
                          id="Properties"
                          defaultMessage="Properties"
                        />
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
              <Table selectable compact singleLine>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <Dropdown
                        trigger={<Icon name="sort content ascending" />}
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
                              'Type',
                            ],
                            index => (
                              <Dropdown.Item key={index}>
                                <Icon name="dropdown" />
                                {Indexes[index].label}
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={this.onSortItems}
                                    value={`${index}|ascending`}
                                  >
                                    <Icon name="sort alphabet ascending" />{' '}
                                    <FormattedMessage
                                      id="Ascending"
                                      defaultMessage="Ascending"
                                    />
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={this.onSortItems}
                                    value={`${index}|descending`}
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
                              this.state.selected.length > 0 ? 'blue' : 'black'
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
                            <FormattedMessage id="None" defaultMessage="None" />
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
                      <Dropdown icon="ellipsis vertical">
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
                                {this.state.index.values[index].label}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown.Menu>
                      </Dropdown>
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
            </section>
          </article>
        </div>
      </div>
    );
  }
}
