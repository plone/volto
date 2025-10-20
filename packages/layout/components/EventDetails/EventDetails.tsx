import EventDate from '../EventDate/EventDate';
import { flattenToAppURL } from '@plone/helpers';
import { Link } from '@plone/components/quanta';
import RRuleLib from 'rrule';
import type { EventCT, RootData } from '@plone/types';
import { getDate } from '../../helpers';
import { Icon } from '@plone/components';
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
            <dt>{t('layout.views.event.all-dates')}</dt>
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
                {t('layout.views.event.visit-website')}
              </Link>
            </dd>
          </>
        )}
      </dl>
      <span className="download-event">
        <Icon size="xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
          >
            <g fillRule="evenodd">
              <path d="M20.9997,2.9997 L20.9997,7.0007 L15.0007,7.0007 L15.0007,2.9997 L8.9997,2.9997 L8.9997,7.0007 L5.0007,7.0007 L5.0007,12.9997 L5.0007,15.0007 L5.0007,30.9997 L30.9997,30.9997 L30.9997,15.0007 L30.9997,12.9997 L30.9997,7.0007 L26.9997,7.0007 L26.9997,2.9997 L20.9997,2.9997 Z M23.0007,7.9997 L23.0007,5.0007 L25.0007,5.0007 L25.0007,7.9997 L25.0007,8.9987 L23.0007,8.9987 L23.0007,7.9997 Z M10.9997,7.9997 L10.9997,5.0007 L12.9997,5.0007 L12.9997,7.9997 L12.9997,8.9987 L10.9997,8.9987 L10.9997,7.9997 Z M26.9997,10.9997 L26.9997,8.9987 L28.9997,8.9987 L28.9997,12.9997 L7.0007,12.9997 L7.0007,8.9987 L8.9997,8.9987 L8.9997,10.9997 L15.0007,10.9997 L15.0007,8.9987 L20.9997,8.9987 L20.9997,10.9997 L26.9997,10.9997 Z M7.0007,28.9997 L29.0017,28.9997 L29.0017,15.0007 L7.0007,15.0007 L7.0007,28.9997 Z" />
              <polygon points="9 19 11 19 11 17 9 17" />
              <polygon points="13 19 15 19 15 17 13 17" />
              <polygon points="17 19 19 19 19 17 17 17" />
              <polygon points="21 19 23 19 23 17 21 17" />
              <polygon points="25 19 27 19 27 17 25 17" />
              <polygon points="9 23 11 23 11 21 9 21" />
              <polygon points="13 23 15 23 15 21 13 21" />
              <polygon points="17 23 19 23 19 21 17 21" />
              <polygon points="21 23 23 23 23 21 21 21" />
              <polygon points="25 23 27 23 27 21 25 21" />
              <polygon points="9 27 11 27 11 25 9 25" />
              <polygon points="13 27 15 27 15 25 13 25" />
              <polygon points="17 27 19 27 19 25 17 25" />
              <polygon points="21 27 23 27 23 25 21 25" />
              <polygon points="25 27 27 27 27 25 25 25" />
            </g>
          </svg>
        </Icon>
        <Link
          href={`${flattenToAppURL(content['@id'])}/ics_view`}
          target="_blank"
          rel="noreferrer"
        >
          {t('layout.views.event.download-event')}
        </Link>
      </span>
    </aside>
  );
}

export const Recurrence = ({ recurrence, start, locale }: RecurrenceProps) => {
  const { RRule, rrulestr } = RRuleLib;

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
