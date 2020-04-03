/**
 * EventView view component.
 * @module components/theme/View/EventView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet, flattenHTMLToAppURL } from '@plone/volto/helpers';
import { Container, Image, Segment, Header, List } from 'semantic-ui-react';

import {
  When,
  Recurrence,
} from '@plone/volto/components/theme/View/EventDatesInfo';

/**
 * EventView view component class.
 * @function EventView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const EventView = ({ content }) => (
  <Container className="view-wrapper event-view">
    <Helmet title={content.title} />
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
    <Segment floated="right">
      {/* TODO I18N INTL */}
      {content.subjects.length > 0 && (
        <>
          <Header dividing sub>
            What
          </Header>
          <List items={content.subjects} />
        </>
      )}
      <Header dividing sub>
        When
      </Header>
      <When
        start={content.start}
        end={content.end}
        whole_day={content.whole_day}
        open_end={content.open_end}
      />
      {content.recurrence && (
        <>
          <Header dividing sub>
            All dates
          </Header>
          <Recurrence recurrence={content.recurrence} start={content.start} />
        </>
      )}
      {content.location && (
        <>
          <Header dividing sub>
            Where
          </Header>
          <p>{content.location}</p>
        </>
      )}
      {content.contact_name && (
        <>
          <Header dividing sub>
            Contact Name
          </Header>
          <p>
            {content.contact_email ? (
              <a href={`mailto:${content.contact_email}`}>
                {content.contact_name}
              </a>
            ) : (
              content.contact_name
            )}
          </p>
        </>
      )}
      {content.contact_phone && (
        <>
          <Header dividing sub>
            Contact Phone
          </Header>
          <p>{content.contact_phone}</p>
        </>
      )}
      {content.attendees.length > 0 && (
        <>
          <Header dividing sub>
            Attendees
          </Header>
          <List items={content.attendees} />
        </>
      )}
      {content.event_url && (
        <>
          <Header dividing sub>
            Web
          </Header>
          <p>
            <a href={content.event_url}>Visit external website</a>
          </p>
        </>
      )}
    </Segment>
    {content.text && (
      <div
        dangerouslySetInnerHTML={{
          __html: flattenHTMLToAppURL(content.text.data),
        }}
      />
    )}
  </Container>
);

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
