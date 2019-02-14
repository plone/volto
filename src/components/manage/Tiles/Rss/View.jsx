/**
 * View rss tile.
 * @module components/manage/Tiles/Rss/View
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Feed, Image } from 'semantic-ui-react';
import Parser from 'rss-parser';

/**
 * View rss tile class.
 * @class View
 * @extends Component
 */
class View extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.state = {
      feed: {},
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const parser = new Parser();
    if (this.props.data.url) {
      parser.parseURL(this.props.data.url, (err, feed) => {
        this.setState({
          feed,
        });
      });
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      Boolean(this.state.feed) && (
        <p
          className={['tile', 'image', 'align', this.props.data.align]
            .filter(e => !!e)
            .join(' ')}
        >
          {this.props.data.url.match('.rss') ? (
            <Card>
              <Feed>
                {this.state.feed.image && (
                  <Feed.Event>
                    <Image src={this.state.feed.image.url} alt="" />
                  </Feed.Event>
                )}
                <Feed.Event>
                  <Feed.Date>{this.state.feed.lastBuildDate}</Feed.Date>
                </Feed.Event>
                <Feed.Event>{this.state.feed.feedUrl}</Feed.Event>
                {this.state.feed.items && (
                  <Feed.Event>
                    {this.state.feed.items.forEach(item => (
                      <div>
                        <Feed.Event>{item.title}</Feed.Event>
                        <Feed.Event>{item.author}</Feed.Event>
                      </div>
                    ))}
                  </Feed.Event>
                )}
              </Feed>
            </Card>
          ) : (
            <Container>
              <center>Please Enter Correct Rss Url</center>
            </Container>
          )}
        </p>
      )
    );
  }
}

export default View;
