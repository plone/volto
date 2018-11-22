/**
 * View summary box tile.
 * @module components/manage/Tiles/SummaryBox/View
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { get } from 'lodash';
import { Card, Image } from 'semantic-ui-react';

import { getContent, resetContent } from '../../../../actions';

/**
 * Summary box view component.
 * @class View
 * @extends Component
 */
export class View extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    tile: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    getContent: PropTypes.func.isRequired,
    resetContent: PropTypes.func.isRequired,
    contentSubrequests: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    contentSubrequests: {},
  };

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { selectedItem } = this.props.data;
    if (selectedItem) {
      // Use subrequests to fetch tile data
      this.props.getContent(selectedItem, undefined, this.props.tile);
    }
  }

  /**
   * Component will unmount. Reset loaded content.
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    this.props.resetContent(this.props.tile);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { contentSubrequests, tile } = this.props;

    // Using null as default for consistency with content reducer
    // see reducers/content/content.js, look for action GET_CONTENT_PENDING
    const data = get(contentSubrequests, [tile, 'data'], null);
    if (data && Object.keys(data).length) {
      const image = get(data, 'image.scales.mini.download', undefined);

      return (
        <Card>
          {image && <Image src={image} alt={data.title} />}
          <Card.Content>
            <Card.Header>{data.title}</Card.Header>
            <Card.Description>{data.description}</Card.Description>
          </Card.Content>
        </Card>
      );
    }
    return null;
  }
}

export default connect(
  state => ({
    contentSubrequests: state.content.subrequests,
  }),
  dispatch =>
    bindActionCreators(
      {
        getContent,
        resetContent,
      },
      dispatch,
    ),
)(View);
