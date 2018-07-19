/**
 * Social sharing component.
 * @module components/theme/SocialSharing/SocialSharing
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'semantic-ui-react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';

/**
 * Social sharing component class.
 * @function SocialSharing
 * @param {string} url Url to share.
 * @param {string} title Title of the content.
 * @param {string} description Description of the content.
 * @returns {string} Markup of the component.
 */
const SocialSharing = ({ url, title, description }) => (
  <Container style={{ clear: 'both' }}>
    <br />
    <FacebookShareButton url={url} quote={title}>
      <Button color="facebook" size="mini">
        Facebook
      </Button>
    </FacebookShareButton>
    <TwitterShareButton url={url} title={title} description={description}>
      <Button color="twitter" size="mini">
        Twitter
      </Button>
    </TwitterShareButton>
    <br />
    <br />
  </Container>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
SocialSharing.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default SocialSharing;
