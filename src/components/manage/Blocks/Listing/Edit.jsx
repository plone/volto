/**
 * Edit listing block.
 * @module components/manage/Blocks/Listing/Edit
 */

import get from 'lodash/get';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { List, Image } from 'semantic-ui-react';
import { settings } from '~/config';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchContent, resetSearchContent } from '../../../../actions';
import SidebarPortal from '../../Sidebar/SidebarPortal';
import ListingSidebar from './ListingSidebar';

@connect(
  (state, props) => ({
    items: get(state.search.subrequests, [props.block, 'items'], []),
  }),
  dispatch =>
    bindActionCreators(
      {
        searchContent,
        resetSearchContent,
      },
      dispatch,
    ),
)
/**
 * Edit listing block class.
 * @class Edit
 * @extends Component
 */
export default class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    index: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    block: PropTypes.string.isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    searchContent: PropTypes.func.isRequired,
    resetSearchContent: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.any),
    properties: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  /**
   * Component did mount. Search items if the query is set.
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { data, searchContent, selected, block } = this.props;
    if (selected) {
      this.node.focus();
    }
    if (data.query) {
      try {
        const options = {
          ...JSON.parse(data.query),
          fullobjects: 1,
        };
        searchContent('', options, block);
      } catch (err) {
        console.error('Listing Block Edit - componentDidMount: ', err.message);
      }
    }
  }

  /**
   * Component did update. Here we fetch new content if needed.
   * @method componentDidUpdate
   * @param {Object} prevProps Props before update
   * @returns {undefined}
   */
  componentDidUpdate(prevProps) {
    const {
      data,
      /* resetSearchContent, */ searchContent,
      selected,
      block,
    } = this.props;
    if (!prevProps.selected && selected) {
      this.node.focus();
    }
    if (prevProps.data.query !== data.query) {
      if (!data.query) {
        // resetSearchContent(block);
        return;
      }
      try {
        const options = {
          ...JSON.parse(data.query),
          fullobjects: 1,
        };
        searchContent('', options, block);
      } catch (err) {
        console.error('Listing Block Edit - componentDidUpdate: ', err.message);
      }
    }
  }

  /**
   * Component will unmount. Reset loaded content.
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    this.props.resetSearchContent(this.props.block);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const {
      data,
      items,
      onChangeBlock,
      properties,
      selected,
      block,
    } = this.props;

    const folderItems = properties ? properties.items || [] : [];
    let listingItems = folderItems;
    try {
      JSON.parse(data.query);
      listingItems = items;
    } catch (err) {}

    return (
      <div
        ref={node => {
          this.node = node;
        }}
      >
        <FormattedMessage id="Results preview" defaultMessage="Results preview">
          {message => <p className="items-preview">{message}</p>}
        </FormattedMessage>
        {listingItems.length > 0 ? (
          <List>
            {listingItems.map(item => {
              const image = get(item, 'image.scales.mini.download', '').replace(
                settings.apiPath,
                '',
              );
              const url = item['@id'].replace(settings.apiPath, '');
              return (
                <List.Item key={item.UID}>
                  {image && <Image avatar src={image} alt={item.title} />}
                  <List.Content>
                    <List.Header>
                      <Link to={url}>{item.title}</Link>
                    </List.Header>
                    <List.Description>{item.description}</List.Description>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        ) : (
          <div className="block listing">
            <FormattedMessage
              id="No results found."
              defaultMessage="No results found."
            />
          </div>
        )}
        <SidebarPortal selected={selected}>
          <ListingSidebar
            data={data}
            block={block}
            onChangeBlock={onChangeBlock}
          />
        </SidebarPortal>
      </div>
    );
  }
}
