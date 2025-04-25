import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Segment, Header, List } from 'semantic-ui-react';
import {
  When,
  Recurrence,
} from '@plone/volto/components/theme/View/EventDatesInfo';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

import calendarSVG from '@plone/volto/icons/calendar.svg';

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
  downloadEvent: {
    id: 'Download Event',
    defaultMessage: 'Download Event',
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

const EventDetails = ({ content, display_as = 'aside' }) => {
  const intl = useIntl();
  return (
    <Segment
      as={display_as}
      {...(display_as === 'aside' ? { floated: 'right' } : {})}
    >
      {content.subjects?.length > 0 && (
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
      {content.attendees?.length > 0 && (
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
      <div className="download-event">
        <Icon name={calendarSVG} />
        <a
          className="ics-download"
          target="_blank"
          rel="noreferrer"
          href={`${flattenToAppURL(content['@id'])}/ics_view`}
        >
          {intl.formatMessage(messages.downloadEvent)}
        </a>
      </div>
    </Segment>
  );
};

export default EventDetails;
