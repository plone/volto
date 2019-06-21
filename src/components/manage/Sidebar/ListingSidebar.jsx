import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ListingSidebar extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    tile: PropTypes.string.isRequired,
    // intl: intlShape.isRequired,
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
      query: props.data.query || '',
    };
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
    const { query } = this.state;
    // let { query } = this.state;
    // if (query === '') {
    //   this.setState(
    //     {
    //       items: this.folderItems,
    //     },
    //     this.props.resetSearchContent,
    //   );
    // } else {
    //   const options = {
    //     ...JSON.parse(query),
    //     fullobjects: 1,
    //   };
    //   this.props.searchContent('', options, this.props.tile);
    // }
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      query,
    });
  };

  render() {
    return (
      <div className="listing-sidebar">
        <form className="query-form" onSubmit={this.onSubmit}>
          <input
            name="query"
            className="query"
            placeholder="querystring"
            onChange={this.onChange}
            value={this.state.query}
          />
        </form>
      </div>
    );
  }
}
