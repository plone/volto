import EventDate from '../EventDate/EventDate';
import { flattenToAppURL } from '@plone/helpers';
import { Link } from '@plone/components/quanta';
import * as RRuleLib from 'rrule';
import type * as RRuleTypes from 'rrule';
import type { EventCT, RootData } from '@plone/types';
import { getDate } from '../../helpers';
import Calendar from '@plone/components/icons/calendar.svg?react';
import { useTranslation } from 'react-i18next';

interface EventDetailsProps {
  data?: RootData<EventCT>;
}

interface RecurrenceProps {
  recurrence: string;
  start: string;
  locale: string;
}

export default function EventDetails({ data }: EventDetailsProps) {
  const { t } = useTranslation();

  if (!data) return;

  const { content, locale } = data;

  return (
    <aside className="segment">
      <dl>
        {content.subjects?.length > 0 && (
          <>
            <dt>{t('layout.views.event.what')}</dt>
            <dd>
              <ul>
                {content.subjects.map((subject, index) => (
                  <li key={index}>{subject}</li>
                ))}
              </ul>
            </dd>
          </>
        )}
        <dt>{t('layout.views.event.when')}</dt>
        <EventDate content={content} locale={locale} />
        {content.recurrence && (
          <>
            <dt>{t('layout.views.event.allDates')}</dt>
            <Recurrence
              recurrence={content.recurrence}
              start={content.start}
              locale={locale}
            />
          </>
        )}
        {content.location && (
          <>
            <dt>{t('layout.views.event.where')}</dt>
            <dd>{content.location}</dd>
          </>
        )}
        {content.contact_name && (
          <>
            <dt>{t('layout.views.event.contact.name')}</dt>
            <dd>
              {content.contact_email ? (
                <Link href={`mailto:${content.contact_email}`}>
                  {content.contact_name}
                </Link>
              ) : (
                content.contact_name
              )}
            </dd>
          </>
        )}
        {content.contact_phone && (
          <>
            <dt>{t('layout.views.event.contact.phone')}</dt>
            <dd>{content.contact_phone}</dd>
          </>
        )}
        {content.attendees?.length > 0 && (
          <>
            <dt>{t('layout.views.event.attendees')}</dt>
            <dd>
              <ul>
                {content.attendees.map((attendee, index) => (
                  <li key={index}>{attendee}</li>
                ))}
              </ul>
            </dd>
          </>
        )}
        {content.event_url && (
          <>
            <dt>{t('layout.views.event.website')}</dt>
            <dd>
              <Link
                href={content.event_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('layout.views.event.visitWebsite')}
              </Link>
            </dd>
          </>
        )}
      </dl>
      <span className="download-event">
        <Calendar />
        <Link
          href={`${flattenToAppURL(content['@id'])}/ics_view`}
          target="_blank"
          rel="noreferrer"
        >
          {t('layout.views.event.downloadEvent')}
        </Link>
      </span>
    </aside>
  );
}

export const Recurrence = ({ recurrence, start, locale }: RecurrenceProps) => {
  const { RRule, rrulestr } = ((RRuleLib as any).default ||
    RRuleLib) as typeof RRuleTypes;

  const newRecurrence = !recurrence.includes('DTSTART')
    ? RRule.optionsToString({ dtstart: new Date(start) }) + '\n' + recurrence
    : recurrence;

  const rule = rrulestr(newRecurrence, { unfold: true, forceset: true });
  const ruleItems = rule.all().map((date) => getDate(date, locale));

  return (
    <dd>
      <ul>
        {ruleItems.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul>
    </dd>
  );
};
