/**
 * EventView view component.
 * @module components/theme/View/EventView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { flattenHTMLToAppURL } from '@plone/volto/helpers';
import { Container, Image, Segment, Header, List } from 'semantic-ui-react';

import {
  When,
  Recurrence,
} from '@plone/volto/components/theme/View/EventDatesInfo';

const messages = defineMessages({
  what: {
    id: 'event_what',
    defaultMessage: 'What',
  },
  when: {
    id: 'event_when',
    defaultMessage: 'When',
  },
  allDates: {
    id: 'event_alldates',
    defaultMessage: 'All dates',
  },
  where: {
    id: 'event_where',
    defaultMessage: 'Where',
  },
  contactName: {
    id: 'event_contactname',
    defaultMessage: 'Contact Name',
  },
  contactPhone: {
    id: 'event_contactphone',
    defaultMessage: 'Contact Phone',
  },
  attendees: {
    id: 'event_attendees',
    defaultMessage: 'Attendees',
  },
  website: {
    id: 'event_website',
    defaultMessage: 'Website',
  },
  visitWebsite: {
    id: 'visit_external_website',
    defaultMessage: 'Visit external website',
  },
});

/**
 * EventView view component class.
 * @function EventView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const EventView = ({ intl, content }) => (
  <Container className="view-wrapper event-view">
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
      {content.subjects.length > 0 && (
        <>
          <Header dividing sub>
            {intl.formatMessage(messages.what)}
          </Header>
          <List items={content.subjects} />
        </>
      )}
      <Header dividing sub>
        {intl.formatMessage(messages.when)}
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
            {intl.formatMessage(messages.allDates)}
          </Header>
          <Recurrence recurrence={content.recurrence} start={content.start} />
        </>
      )}
      {content.location && (
        <>
          <Header dividing sub>
            {intl.formatMessage(messages.where)}
          </Header>
          <p>{content.location}</p>
        </>
      )}
      {content.contact_name && (
        <>
          <Header dividing sub>
            {intl.formatMessage(messages.contactName)}
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
            {intl.formatMessage(messages.contactPhone)}
          </Header>
          <p>{content.contact_phone}</p>
        </>
      )}
      {content.attendees.length > 0 && (
        <>
          <Header dividing sub>
            {intl.formatMessage(messages.attendees)}
          </Header>
          <List items={content.attendees} />
        </>
      )}
      {content.event_url && (
        <>
          <Header dividing sub>
            {intl.formatMessage(messages.website)}
          </Header>
          <p>
            <a
              href={content.event_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {intl.formatMessage(messages.visitWebsite)}
            </a>
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

export default injectIntl(EventView);
