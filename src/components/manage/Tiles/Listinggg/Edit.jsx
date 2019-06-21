/**
 * Edit Listing tile.
 * @module components/manage/Tiles/Listing/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Item } from 'semantic-ui-react';
// import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { FormattedMessage } from 'react-intl';
import get from 'lodash/get';
import cx from 'classnames';

import { searchContent, resetSearchContent } from '../../../../actions';

// const messages = defineMessages({
//   no_results_found: {
//     id: 'No results found.',
//     defaultMessage: 'No results found.',
//   },
// });

// @injectIntl
@connect(
  state => ({
    searchSubrequests: state.search.subrequests,
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
 * Edit Listing tile class.
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
    selected: PropTypes.bool.isRequired,
    tile: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    // intl: intlShape.isRequired,
    onChangeTile: PropTypes.func.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    onDeleteTile: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
    searchContent: PropTypes.func.isRequired,
    resetSearchContent: PropTypes.func.isRequired,
    searchSubrequests: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    searchSubrequests: {},
  };

  state = {
    query: '',
  };

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.resetSearchContent(this.props.tile);
    // this.updateContent();
  }

  /**
   * Component did update. Here we fetch new content if needed.
   * @method componentDidUpdate
   * @param {Object} prevProps Props before update
   * @param {Object} prevState State before update
   * @returns {undefined}
   */
  componentDidUpdate(prevProps) {
    // if (!prevProps.selected && this.props.selected && this.queryRef) {
    //   this.queryRef.querySelector('input.query').focus();
    // }
    // if (prevProps.data.selectedItem !== this.props.data.selectedItem) {
    //   this.updateContent();
    // }
  }

  /**
   * Component will unmount. Reset loaded content.
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    this.props.resetSearchContent(this.props.tile);
  }

  /**
   * Change handler
   * @method onChange
   * @param {object} e Change event
   * @returns {undefined}
   */
  onChange = e => {
    const value = e.currentTarget.value;
    this.setState({
      query: value,
    });
  };

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} e Submit event
   * @returns {undefined}
   */
  onSubmit = e => {};

  /**
   * Sets reference to the dropdown element in order to auto-focus it
   * @method handleDropdownRef
   * @param {node} node Dropdown element
   * @returns {undefined}
   */
  // handleDropdownRef = node => {
  //   this.queryRef = node;
  // };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (__SERVER__) {
      return <div />;
    }
    const {
      // intl,
      onSelectTile,
      searchSubrequests,
      selected,
      tile,
    } = this.props;

    // Using null as default for consistency with content reducer
    // see reducers/content/content.js, look for action GET_CONTENT_PENDING
    // const contentData = get(searchSubrequests, [tile, 'data'], null);
    // const image = get(contentData, 'image.scales.mini.download', undefined);

    // the default for items in the search reducers is []
    // see reducers/search/search.js
    const searchItems = get(searchSubrequests, [tile, 'items'], []);

    return (
      <div
        role="presentation"
        onClick={() => onSelectTile(tile)}
        className={cx('tile listing', {
          selected,
        })}
        tabIndex={0}
        onKeyDown={e =>
          this.props.handleKeyDown(
            e,
            this.props.index,
            this.props.tile,
            this.node,
          )
        }
        ref={node => {
          this.node = node;
        }}
      >
        <form className="query-wrapper" onSubmit={this.onSubmit}>
          <input
            name="query"
            className="query"
            placeholder="querystring"
            onChange={this.onChange}
            value={this.state.query}
          />
        </form>
        {/* Show selected item */}
        {/* {contentData && Object.keys(contentData).length > 0 && (
          <Item.Group>
            <Item>
              {image && <Item.Image src={image} alt={contentData.title} />}
              <Item.Content>
                <Item.Header>{contentData.title}</Item.Header>
                <Item.Description>{contentData.description}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        )} */}
        {searchItems.map((item, idx) => (
          <div key={idx}>{item}</div>
        ))}
        {searchItems.length === 0 && (
          <FormattedMessage
            id="No results found."
            defaultMessage="No results found."
          />
        )}
      </div>
    );
  }
}
