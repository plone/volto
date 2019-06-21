/**
 * Edit listing tile.
 * @module components/manage/Tiles/Listing/Edit
 */

import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import { Link } from 'react-router-dom';
import { /*intlShape, */ FormattedMessage } from 'react-intl';
import { List, Image } from 'semantic-ui-react';
import { settings } from '~/config';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchContent, resetSearchContent } from '../../../../actions';

@connect(
  (state, props) => ({
    // loaded: get(state.search.subrequests, [props.tile, 'loaded'], false),
    items: get(state.search.subrequests, [props.tile, 'items'], []),
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
 * Edit text tile class.
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
    detached: PropTypes.bool,
    index: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired,
    tile: PropTypes.string.isRequired,
    onAddTile: PropTypes.func.isRequired,
    onChangeTile: PropTypes.func.isRequired,
    onDeleteTile: PropTypes.func.isRequired,
    onMutateTile: PropTypes.func.isRequired,
    onFocusPreviousTile: PropTypes.func.isRequired,
    onFocusNextTile: PropTypes.func.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    // intl: intlShape.isRequired,
    searchContent: PropTypes.func.isRequired,
    resetSearchContent: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(PropTypes.any),
  };

  /**
   * Constructor
   * @method constructor
   * @param {object} props Properties
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
    const items = props.properties ? props.properties.items : [];
    this.folderItems = items || [];
    this.state = {
      items: this.folderItems,
      query: '',
    };
  }

  /**
   * Component did update. Here we fetch new content if needed.
   * @method componentDidUpdate
   * @param {Object} prevProps Props before update
   * @param {Object} prevState State before update
   * @returns {undefined}
   */
  componentDidUpdate(prevProps, prevState) {
    // console.log('props', prevProps, this.props);
    // console.log('state', prevState, this.state);
    const { items } = this.props;
    if (!isEqual(prevProps.items, items)) {
      this.setState({
        items,
      });
    }
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
  onSubmit = e => {
    e.preventDefault();
    let { query } = this.state;
    if (query === '') {
      this.setState(
        {
          items: this.folderItems,
        },
        this.props.resetSearchContent,
      );
    } else {
      const options = {
        ...JSON.parse(query),
        fullobjects: 1,
      };
      this.props.searchContent('', options, this.props.tile);
    }
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      query,
    });
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { items, query } = this.state;

    return (
      <div>
        <form className="query-wrapper" onSubmit={this.onSubmit}>
          <input
            name="query"
            className="query"
            placeholder="query"
            onChange={this.onChange}
            value={query}
          />
        </form>
        {items.length > 0 ? (
          <List className="tile listing">
            {items.map(item => {
              const image = get(item, 'image.scales.mini.download', '').replace(
                settings.apiPath,
                '',
              );
              debugger;
              const url = item['@id'].replace(settings.apiPath, '');
              return (
                <List.Item key="">
                  {image && <Image avatar src={image} alt={item.title} />}
                  <List.Content>
                    <List.Header as="a">
                      <Link to={url}>{item.title}</Link>
                    </List.Header>
                    <List.Description>{item.description}</List.Description>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        ) : (
          <div className="tile listing">
            <FormattedMessage
              id="No results found."
              defaultMessage="No results found."
            />
          </div>
        )}
      </div>
    );
  }
}
