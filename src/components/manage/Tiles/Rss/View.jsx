/**
 * View rss tile.
 * @module components/manage/Tiles/Rss/View
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Feed, Image } from 'semantic-ui-react';
import { settings } from '~/config';
import Parser from 'rss-parser';
import {connect} from 'react-redux';

/**
 * View rss tile class.
 * @class View
 * @extends Component
 */
class View extends Component {
constructor(props){
  super(props);
  this.state = {

  };
}
  render(){
return (
  <p
    className={['tile', 'image', 'align', data.align]
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

const mapStateToProps = state => {
  return {
    url: state.url,
    feed: state.feed,
  };
};

export default connect(mapStateToProps)(View);
