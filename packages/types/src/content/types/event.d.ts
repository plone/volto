import type { ContentBase } from '../base';

export interface EventContent extends ContentBase {
  '@type': 'Event';
  start: string;
  end: string;
  whole_day: boolean;
  open_end: boolean;
  recurrence: string;
  location: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  attendees: string[];
  event_url: string;
}

declare module '../index' {
  interface ContentTypeMap {
    Event: EventContent;
  }
}
