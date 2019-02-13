/**
 * View rss tile.
 * @module components/manage/Tiles/Rss/View
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Feed, Image } from 'semantic-ui-react';
import { settings } from '~/config';
import Parser from 'rss-parser';

/**
 * View rss tile class.
 * @class View
 * @extends Component
 */
class View extends Component {
constructor(props){
  super(props);
  this.state = {
feed: {},
  };
}

componentDidMount() {
  (async () => {
    const parser = new Parser();
    const myfeed = await parser.parseURL(this.props.data.url);
    this.setState({
      feed: myfeed,
    });
  })()
}

render(){
return (
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
              <Image
                src={
                  this.state.feed.image.url
                }
                alt=""
              />
            </Feed.Event>
          )}
          <Feed.Event>
            <Feed.Date>
              {this.state.feed.lastBuildDate}
            </Feed.Date>
          </Feed.Event>
          <Feed.Event>
            {this.state.feed.feedUrl}
          </Feed.Event>
          {this.state.feed.items !== 'undefined' ? (
            <Feed.Event>
              {this.state.feed.items.forEach(item => (
                <div>
                  <Feed.Event>
                    {item.title}
                  </Feed.Event>
                  <Feed.Event>
                    {item.author}
                  </Feed.Event>
                </div>
              ))}
            </Feed.Event>
          ) : (
              null
            )}
        </Feed>
      </Card>
    ) : (
        <Container>
          <center>
            Please Enter Correct Rss Url
      </center>
        </Container>
      )}
  </p>
)
}
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
