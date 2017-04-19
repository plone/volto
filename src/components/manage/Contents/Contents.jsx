/**
 * Contents component.
 * @module components/manage/Contents/Contents
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import { Dropdown, Header, Menu, Icon, Input, Table } from 'semantic-ui-react';
import { Link } from 'react-router';

import { searchContent } from '../../../actions';
import { getBaseUrl } from '../../../helpers';

/**
 * ContentsComponent class.
 * @class ContentsComponent
 * @extends Component
 */
@connect(
  (state, props) => ({
    loaded: state.search.loaded,
    items: state.search.items,
    pathname: props.location.pathname,
  }),
  dispatch => bindActionCreators({ searchContent }, dispatch),
)
export default class ContentsComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    searchContent: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        '@type': PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
    pathname: PropTypes.string.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    items: [],
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.searchContent(getBaseUrl(this.props.pathname), {
      'path.depth': 1,
      sort_on: 'getObjPositionInParent',
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (!this.props.loaded) {
      return <span />;
    }

    return (
      <div id="page-contents">
        <Helmet title="Contents" />
        <div className="container">
          <article id="content">
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
                  <Menu.Item><Icon name="cut" /> Cut</Menu.Item>
                  <Menu.Item><Icon name="copy" /> Copy</Menu.Item>
                  <Menu.Item><Icon name="paste" /> Paste</Menu.Item>
                  <Menu.Item><Icon name="trash" /> Delete</Menu.Item>
                  <Dropdown
                    item
                    trigger={<span><Icon name="write" /> Batch</span>}
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
                      <input
                        className="prompt"
                        type="text"
                        placeholder="Filter..."
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
                        trigger={<Icon name="minus square" color="blue" />}
                        icon={null}
                      >
                        <Dropdown.Menu>
                          <Dropdown.Header content="Select..." />
                          <Dropdown.Item>
                            <Icon name="check square" color="blue" /> All
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Icon name="square outline" /> None
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Header content="12 selected" />
                          <Input
                            icon="search"
                            iconPosition="left"
                            className="search"
                            placeholder="Filter..."
                          />
                          <Dropdown.Menu scrolling>
                            <Dropdown.Item>
                              <Icon name="delete" /> My first blog entry!
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Icon name="delete" /> My first blog entry!
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Icon name="delete" /> My first blog entry!
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Icon name="delete" /> My first blog entry!
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Icon name="delete" /> My first blog entry!
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Icon name="delete" /> My first blog entry!
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Icon name="delete" /> My first blog entry!
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Icon name="delete" /> My first blog entry!
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Icon name="delete" /> My first blog entry!
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Icon name="delete" /> My first blog entry!
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Icon name="delete" /> My first blog entry!
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Table.HeaderCell>
                    <Table.HeaderCell width="6">Title</Table.HeaderCell>
                    <Table.HeaderCell width="5">Type</Table.HeaderCell>
                    <Table.HeaderCell width="5">Review state</Table.HeaderCell>
                    <Table.HeaderCell textAlign="right">
                      <Dropdown icon="ellipsis vertical">
                        <Dropdown.Menu className="left">
                          <Dropdown.Header content="Select columns to show" />
                          <Dropdown.Item>
                            <Icon name="square outline" /> ID
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Icon name="check square" color="blue" /> Title
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Icon name="check square" color="blue" /> Type
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Icon name="check square" color="blue" />
                            {' '}
                            Review state
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Icon name="square outline" /> Created on
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Icon name="square outline" /> Tags
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Icon name="square outline" /> Object Size
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Icon name="square outline" /> Creator
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.items.map(item => (
                    <Table.Row key={item['@id']}>
                      <Table.Cell verticalAlign="bottom">
                        <Icon name="check square" color="blue" />
                      </Table.Cell>
                      <Table.Cell>
                        <Link to="/"><Icon name="folder" /> {item.title}</Link>
                      </Table.Cell>
                      <Table.Cell>{item['@type']}</Table.Cell>
                      <Table.Cell>{item.review_state}</Table.Cell>
                      <Table.Cell textAlign="right">
                        <Dropdown icon="ellipsis vertical">
                          <Dropdown.Menu className="left">
                            <Dropdown.Item text="Edit" />
                            <Dropdown.Item text="View" />
                            <Dropdown.Divider />
                            <Dropdown.Item text="Cut" />
                            <Dropdown.Item text="Copy" />
                            <Dropdown.Item text="Delete" />
                            <Dropdown.Divider />
                            <Dropdown.Item text="Move to top of folder" />
                            <Dropdown.Item text="Move to bottom of folder" />
                          </Dropdown.Menu>
                        </Dropdown>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </section>
          </article>
        </div>
      </div>
    );
  }
}
