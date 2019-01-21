/**
 * View rss tile.
 * @module components/manage/Tiles/Rss/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Feed } from 'semantic-ui-react';
import { settings } from '~/config';
import Parser from 'rss-parser';

/**
 * View rss tile class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => {
const parser = new Parser();
let myFeed;
(async () => {

  const feed = await parser.parseURL(data.url);
  myFeed = feed;
  console.log(myFeed.title);



})();
//console.log(myFeed.title);
return (
  <p
    className={['tile', 'image', 'align', data.align]
      .filter(e => !!e)
      .join(' ')}
  >
    {data.url.match('.rss') ? (
      <Card>
        <Feed>
          <Feed.Event>
            <Feed.Label>
              <img src={
                data.url.includes(settings.apiPath)
                  ? `${data.url}/@@images/image`
                  : data.url
              }
              alt ="" />
            </Feed.Label>
            {/*{myFeed.title}*/}
          </Feed.Event>
          <Feed.Event>
           {/* {myFeed.link}*/}
          </Feed.Event>
          <Feed.Event>
            <Feed.Date>
             {/* {myFeed.lastBuildDate}*/}
            </Feed.Date>
          </Feed.Event>
          <Feed.Event>
           {/* {myFeed.feedUrl}*/}
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

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
