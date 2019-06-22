import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

@injectIntl
/**
 * Listing sidebar class
 * @class ListingSidebar
 * @extends Component
 */
export default class ListingSidebar extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    tile: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onChangeTile: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {object} props Properties
   * @returns {undefined}
   */
  constructor(props) {
    super(props);
    this.state = {
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
    const { data, onChangeTile, tile } = this.props;
    const { query } = this.state;
    onChangeTile(tile, {
      ...data,
      query,
    });
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
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
