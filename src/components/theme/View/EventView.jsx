/**
 * EventView view component.
 * @module components/theme/View/EventView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { hasBlocksData, flattenHTMLToAppURL } from '@plone/volto/helpers';
import { Image, Grid } from 'semantic-ui-react';
import RenderBlocks from '@plone/volto/components/theme/View/RenderBlocks';
import { EventDetails } from '@plone/volto/components';

const EventTextfieldView = ({ content }) => (
  <React.Fragment>
    {content.title && <h1 className="documentFirstHeading">{content.title}</h1>}
    {content.description && (
      <p className="documentDescription">{content.description}</p>
    )}
    {content.image && (
      <Image
        className="document-image"
        src={content.image.scales.thumb.download}
        floated="right"
      />
    )}
    {content.text && (
      <div
        dangerouslySetInnerHTML={{
          __html: flattenHTMLToAppURL(content.text.data),
        }}
      />
    )}
  </React.Fragment>
);

/**
 * EventView view component class.
 * @function EventView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const EventView = (props) => {
  const { content } = props;

  return (
    <div id="page-document" className="ui container view-wrapper event-view">
      <Grid>
        <Grid.Column width={7} className="mobile hidden">
          {hasBlocksData(content) ? (
            <RenderBlocks {...props} />
          ) : (
            <EventTextfieldView {...props} />
          )}
        </Grid.Column>
        <Grid.Column width={5} className="mobile hidden">
          <EventDetails content={content} />
        </Grid.Column>
        <Grid.Column width={12} only="mobile">
          {hasBlocksData(content) ? (
            <>
              <RenderBlocks
                {...props}
                content={{
                  ...content,
                  blocks_layout: {
                    items: props.content.blocks_layout.items.slice(0, 1),
                  },
                }}
              />
              <EventDetails content={content} display_as="div" />
              <RenderBlocks
                {...props}
                content={{
                  ...content,
                  blocks_layout: {
                    items: props.content.blocks_layout.items.slice(1),
                  },
                }}
              />
            </>
          ) : (
            <EventTextfieldView {...props} />
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
EventView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    text: PropTypes.shape({
      data: PropTypes.string,
    }),
    attendees: PropTypes.arrayOf(PropTypes.string).isRequired,
    contact_email: PropTypes.string,
    contact_name: PropTypes.string,
    contact_phone: PropTypes.string,
    end: PropTypes.string.isRequired,
    event_url: PropTypes.string,
    location: PropTypes.string,
    open_end: PropTypes.bool,
    recurrence: PropTypes.any,
    start: PropTypes.string.isRequired,
    subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
    whole_day: PropTypes.bool,
  }).isRequired,
};

export default EventView;
