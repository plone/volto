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

import {
  getSummaryBoxContent,
  resetSummaryBoxContent,
} from '../../../../actions';

const parseContent = content => ({
  url: content['@id'],
  image: get(content, 'image.scales.mini.download', undefined),
  title: content.title,
  description: content.description,
});

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
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    getSummaryBoxContent: PropTypes.func.isRequired,
    resetSummaryBoxContent: PropTypes.func.isRequired,
    content: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    content: {},
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs SummaryBoxEditor
   */
  constructor(props) {
    super(props);

    this.state = parseContent(props.content);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { selectedItem } = this.props.data;
    if (selectedItem) {
      this.props.getSummaryBoxContent(selectedItem);
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Props that will be received
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.content).length) {
      this.setState(parseContent(nextProps.content));
    }
  }

  /**
   * Component will unmount. Reset loaded content.
   * @method componentWillUnmount
   * @returns {undefined}
   */
  componentWillUnmount() {
    this.props.resetSummaryBoxContent();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { url, image, title, description } = this.state;

    return (
      url && (
        <Card floated="left">
          {image && <Image clearing src={image} alt={title} />}
          <Card.Content>
            <Card.Header>{title}</Card.Header>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
        </Card>
      )
    );
  }
}

export default connect(
  state => ({
    content: state.summaryBox.content,
  }),
  dispatch =>
    bindActionCreators(
      {
        getSummaryBoxContent,
        resetSummaryBoxContent,
      },
      dispatch,
    ),
)(View);
