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
import { Link } from 'react-router';
import { concat, find, indexOf, keys, map, mapValues, pull } from 'lodash';
import moment from 'moment';

import {
  searchContent,
  cut,
  copy,
  copyContent,
  deleteContent,
  moveContent,
} from '../../../actions';
import { getIcon, getBaseUrl } from '../../../helpers';
import Indexes from '../../../constants/Indexes';
import { Pagination } from '../../../components';

const defaultIndexes = ['ModificationDate', 'EffectiveDate', 'review_state'];

/**
 * ContentsComponent class.
 * @class ContentsComponent
 * @extends Component
 */
@connect(
  (state, props) => ({
    items: state.search.items,
    total: state.search.total,
    pathname: props.location.pathname,
    action: state.clipboard.action,
    source: state.clipboard.source,
    clipboardRequest: state.clipboard.request,
    deleteRequest: state.content.delete,
  }),
  dispatch =>
    bindActionCreators(
      { searchContent, cut, copy, copyContent, deleteContent, moveContent },
      dispatch,
    ),
)
export default class ContentsComponent extends Component {
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
    clipboardRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    deleteRequest: PropTypes.shape({
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
   * @constructs WysiwygEditor
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
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangePageSize = this.onChangePageSize.bind(this);
    this.cut = this.cut.bind(this);
    this.copy = this.copy.bind(this);
    this.delete = this.delete.bind(this);
    this.paste = this.paste.bind(this);
    this.fetchContents = this.fetchContents.bind(this);
    this.state = {
      selected: [],
      showDelete: false,
      itemsToDelete: [],
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
      this.props.pathname !== nextProps.pathname
    ) {
      this.fetchContents(nextProps.pathname);
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
      selected: map(this.props.items, item => item['@id']),
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
        selectedCount: this.state.index.selectedCount +
          (this.state.index.values[value].selected ? -1 : 1),
        values: mapValues(this.state.index.values, (indexValue, indexKey) => ({
          ...indexValue,
          selected: indexKey === value
            ? !indexValue.selected
            : indexValue.selected,
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
   * Get title by id
   * @method getTitleById
   * @param {string} id Id of object
   * @returns {string} Title of object
   */
  getTitleById(id) {
    return find(this.props.items, { '@id': id }).title || id;
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
    return (
      <div id="page-contents">
        <Helmet title="Contents" />
        <div className="container">
          <article id="content">
            <Confirm
              open={this.state.showDelete}
              header="Do you really want to delete the following items?"
              content={
                <div className="content">
                  <ul className="content">
                    {map(this.state.itemsToDelete, item => (
                      <li key={item}>{this.getTitleById(item)}</li>
                    ))}
                  </ul>
                </div>
              }
              onCancel={this.onDeleteCancel}
              onConfirm={this.onDeleteOk}
            />
            <h1>Contents</h1>
            <section id="content-core">
              <Menu stackable>
                <Menu.Menu>
                  <Menu.Item>
                    <Icon name="sort content ascending" /> Rearrange
                  </Menu.Item>
                  <Menu.Item><Icon name="upload" /> Upload</Menu.Item>
                </Menu.Menu>
                <Menu.Menu position="right">
                  <Menu.Item onClick={this.cut} disabled={!selected}>
                    <Icon name="cut" /> Cut
                  </Menu.Item>
                  <Menu.Item onClick={this.copy} disabled={!selected}>
                    <Icon name="copy" /> Copy
                  </Menu.Item>
                  <Menu.Item onClick={this.paste} disabled={!this.props.action}>
                    <Icon name="paste" /> Paste
                  </Menu.Item>
                  <Menu.Item onClick={this.delete} disabled={!selected}>
                    <Icon name="trash" /> Delete
                  </Menu.Item>
                  <Dropdown
                    item
                    trigger={<span><Icon name="write" /> Batch</span>}
                    disabled={!selected}
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Icon name="text cursor" /> Rename
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Icon name="tags" /> Tags
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Icon name="random" /> State
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <Icon name="edit" /> Properties
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="ui right aligned category search item">
                    <div className="ui transparent icon input">
                      <Input
                        className="prompt"
                        type="text"
                        placeholder="Filter..."
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
                        trigger={
                          <Icon
                            name={
                              this.state.selected.length === 0
                                ? 'square outline'
                                : this.state.selected.length ===
                                    this.props.items.length
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
                          <Dropdown.Header content="Select..." />
                          <Dropdown.Item onClick={this.onSelectAll}>
                            <Icon name="check square" color="blue" /> All
                          </Dropdown.Item>
                          <Dropdown.Item onClick={this.onSelectNone}>
                            <Icon name="square outline" /> None
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Header
                            content={`${this.state.selected.length} selected`}
                          />
                          <Input
                            icon="search"
                            iconPosition="left"
                            className="search"
                            placeholder="Filter..."
                          />
                          <Dropdown.Menu scrolling>
                            {map(this.state.selected, item => (
                              <Dropdown.Item
                                key={item}
                                value={item}
                                onClick={this.onDeselect}
                              >
                                <Icon name="delete" /> {this.getTitleById(item)}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Table.HeaderCell>
                    <Table.HeaderCell
                      width={Math.ceil(16 / this.state.index.selectedCount)}
                    >
                      Title
                    </Table.HeaderCell>
                    {map(
                      this.state.index.order,
                      index =>
                        this.state.index.values[index].selected &&
                        <Table.HeaderCell
                          key={index}
                          width={Math.ceil(16 / this.state.index.selectedCount)}
                        >
                          {this.state.index.values[index].label}
                        </Table.HeaderCell>,
                    )}
                    <Table.HeaderCell textAlign="right">
                      <Dropdown icon="ellipsis vertical">
                        <Dropdown.Menu className="left">
                          <Dropdown.Header content="Select columns to show" />
                          <Dropdown.Menu scrolling>
                            {map(this.state.index.order, index => (
                              <Dropdown.Item
                                key={index}
                                value={index}
                                onClick={this.onSelectIndex}
                              >
                                {this.state.index.values[index].selected
                                  ? <Icon name="check square" color="blue" />
                                  : <Icon name="square outline" />}
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
                  {this.props.items.map(item => (
                    <Table.Row key={item['@id']}>
                      <Table.Cell verticalAlign="bottom">
                        <Icon
                          name={
                            indexOf(this.state.selected, item['@id']) === -1
                              ? 'square outline'
                              : 'check square'
                          }
                          color={
                            indexOf(this.state.selected, item['@id']) === -1
                              ? 'black'
                              : 'blue'
                          }
                          value={item['@id']}
                          onClick={this.onSelect}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          to={`${item['@id']}${item.is_folderish ? '/contents' : ''}`}
                        >
                          <Icon
                            name={getIcon(item['@type'], item.is_folderish)}
                          />
                          {' '}
                          {item.title}
                        </Link>
                      </Table.Cell>
                      {map(
                        this.state.index.order,
                        index =>
                          this.state.index.values[index].selected &&
                          <Table.Cell key={index}>
                            {this.state.index.values[index].type ===
                              'boolean' && (item[index] ? 'Yes' : 'No')}
                            {this.state.index.values[index].type === 'string' &&
                              item[index]}
                            {this.state.index.values[index].type === 'date' &&
                              <span
                                title={
                                  item[index] !== 'None'
                                    ? moment(item[index]).format('LLLL')
                                    : 'None'
                                }
                              >
                                {item[index] !== 'None'
                                  ? moment(item[index]).fromNow()
                                  : 'None'}
                              </span>}
                          </Table.Cell>,
                      )}
                      <Table.Cell textAlign="right">
                        <Dropdown icon="ellipsis vertical">
                          <Dropdown.Menu className="left">
                            <Link className="item" to={`${item['@id']}/edit`}>
                              <Icon name="write" /> Edit
                            </Link>
                            <Link className="item" to={item['@id']}>
                              <Icon name="eye" /> View
                            </Link>
                            <Dropdown.Divider />
                            <Dropdown.Item
                              onClick={this.cut}
                              value={item['@id']}
                            >
                              <Icon name="cut" /> Cut
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={this.copy}
                              value={item['@id']}
                            >
                              <Icon name="copy" /> Copy
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={this.delete}
                              value={item['@id']}
                            >
                              <Icon name="trash" /> Delete
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                              <Icon name="long arrow up" />
                              {' '}
                              Move to top of folder
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Icon name="long arrow down" />
                              {' '}
                              Move to bottom of folder
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Table.Cell>
                    </Table.Row>
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
