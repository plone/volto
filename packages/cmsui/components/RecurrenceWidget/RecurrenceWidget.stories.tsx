import { useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { I18nextProvider } from 'react-i18next';
import { Provider, createStore } from 'jotai';
import { RecurrenceWidget } from './RecurrenceWidget';
import { formAtom } from '../../routes/atoms';
import type { EventContent } from '@plone/types';

const translations = {
  'cmsui.recurrence.editRecurrence': 'Edit recurrence',
  'cmsui.recurrence.repeat': 'Repeat',
  'cmsui.recurrence.interval_label': 'Every',
  'cmsui.recurrence.repeaton_label': 'Repeat on',
  'cmsui.recurrence.ends_label': 'Ends',
  'cmsui.recurrence.on_the_label': 'The',
  'cmsui.recurrence.ofmonth_label': 'of month',
  'cmsui.recurrence.day_label': 'Day',
  'cmsui.recurrence.first_label': 'First',
  'cmsui.recurrence.second_label': 'Second',
  'cmsui.recurrence.third_label': 'Third',
  'cmsui.recurrence.fourth_label': 'Fourth',
  'cmsui.recurrence.last_label': 'Last',
  'cmsui.recurrence.monthdayError': 'Please select a valid day of the month',
  'cmsui.recurrence.bymonthday': 'By month day',
  'cmsui.recurrence.bymonthday_description': 'ex. Day 22 of the month',
  'cmsui.recurrence.byweekday': 'By week day',
  'cmsui.recurrence.byweekday_description':
    'ex. On the third tuesday of the month',
  'cmsui.recurrence.byday': 'By week day of a specific month',
  'cmsui.recurrence.byday_description': 'ex. On the first monday of february',
  'cmsui.recurrence.count': 'After a set number of occurrences',
  'cmsui.recurrence.count_description': 'ex. After 5 occurrences',
  'cmsui.recurrence.count_after': 'After',
  'cmsui.recurrence.count_occurrences': 'occurrence(s)',
  'cmsui.recurrence.infinite_occurences':
    'Set to 0 or leave empty for infinite occurrences',
  'cmsui.recurrence.until': 'On a set date',
  'cmsui.recurrence.until_description': 'on June 15th, 2050',
  'cmsui.recurrence.selected_dates': 'Selected Dates',
  'cmsui.recurrence.start_recurrence': 'Start of recurrence',
  'cmsui.recurrence.no_occurrences': 'No occurrences available',
  'cmsui.recurrence.other_dates': 'more dates',
  'cmsui.recurrence.show_more_dates': 'Show {{count}} more dates',
  'cmsui.recurrence.options.daily': 'Daily',
  'cmsui.recurrence.options.mondayfriday': 'Monday - Friday',
  'cmsui.recurrence.options.weekly': 'Weekly',
  'cmsui.recurrence.options.weekdays': 'Weekdays',
  'cmsui.recurrence.options.monthly': 'Monthly',
  'cmsui.recurrence.options.yearly': 'Yearly',
  'cmsui.recurrence.intervals.interval_daily': 'day(s)',
  'cmsui.recurrence.intervals.interval_weekly': 'week(s)',
  'cmsui.recurrence.intervals.interval_monthly': 'month(s)',
  'cmsui.recurrence.intervals.interval_yearly': 'year(s)',
} as const;

const formatTranslation = (value: string, options?: Record<string, unknown>) =>
  options
    ? value.replace(/{{(.*?)}}/g, (_, match) => {
        const key = String(match).trim();
        const replacement = options[key];
        return replacement === undefined ? '' : String(replacement);
      })
    : value;

const translate = (key: string, options?: Record<string, unknown>) => {
  const template = translations[key as keyof typeof translations];
  if (!template) return key;
  return formatTranslation(template, options);
};

const storyI18n = {
  language: 'en',
  languages: ['en'],
  isInitialized: true,
  initializedStoreOnce: true,
  options: {
    ns: ['translation'],
    defaultNS: 'translation',
    fallbackLng: 'en',
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged',
      bindI18nStore: '',
    },
  },
  reportNamespaces: { addUsedNamespaces: () => {} },
  services: { backendConnector: {} },
  store: { on: () => {}, off: () => {} },
  t: translate,
  getFixedT: () => translate,
  hasLoadedNamespace: () => true,
  changeLanguage: async () => 'en',
  loadNamespaces: (_ns: string | string[], callback?: () => void) => {
    callback?.();
    return Promise.resolve();
  },
  loadLanguages: (
    _lng: string,
    _ns: string | string[],
    callback?: () => void,
  ) => {
    callback?.();
    return Promise.resolve();
  },
  on: () => {},
  off: () => {},
  emit: () => {},
} as const satisfies Record<string, unknown>;

interface StoryFormData {
  start: string;
  end: string;
  recurrence?: string;
  [key: string]: unknown;
}

type RecurrenceWidgetStoryProps = {
  label?: string;
  name?: string;
  value?: any;
  onChange?: (value: string | null) => void;
  formData: StoryFormData;
};

function StoryRecurrenceWidget({
  formData,
  onChange,
  ...widgetProps
}: RecurrenceWidgetStoryProps) {
  const store = useMemo(() => {
    const s = createStore();
    s.set(formAtom, formData as any);
    return s;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (rrule: string | null) => {
    store.set(formAtom, {
      ...(store.get(formAtom) as EventContent),
      recurrence: rrule ?? '',
    });
    onChange?.(rrule);
  };

  return (
    <Provider store={store}>
      <I18nextProvider i18n={storyI18n as any}>
        <div className="min-h-screen bg-quanta-air p-8">
          <div className="max-w-2xl">
            <RecurrenceWidget
              {...(widgetProps as any)}
              onChange={handleChange}
            />
          </div>
        </div>
      </I18nextProvider>
    </Provider>
  );
}

const DEFAULT_FORM_DATA: StoryFormData = {
  start: '2025-06-01T10:00:00',
  end: '2025-12-31T10:00:00',
};

const meta = {
  component:
    RecurrenceWidget as React.ComponentType<RecurrenceWidgetStoryProps>,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { disable: true },
  },
  argTypes: {
    onChange: { action: 'onChange' },
  },
  tags: ['autodocs'],
  args: {
    label: 'Recurrence',
    formData: DEFAULT_FORM_DATA,
  },
} satisfies Meta<RecurrenceWidgetStoryProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <StoryRecurrenceWidget {...args} />,
};

export const WithoutLabel: Story = {
  render: (args) => <StoryRecurrenceWidget {...args} />,
  args: {
    label: undefined,
  },
};

export const WithDailyRecurrence: Story = {
  render: (args) => <StoryRecurrenceWidget {...args} />,
  args: {
    formData: {
      ...DEFAULT_FORM_DATA,
      recurrence: 'RRULE:FREQ=DAILY',
    },
  },
};

export const WithWeeklyRecurrence: Story = {
  render: (args) => <StoryRecurrenceWidget {...args} />,
  args: {
    formData: {
      ...DEFAULT_FORM_DATA,
      recurrence: 'RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR',
    },
  },
};

export const WithWeekdaysRecurrence: Story = {
  render: (args) => <StoryRecurrenceWidget {...args} />,
  args: {
    formData: {
      ...DEFAULT_FORM_DATA,
      recurrence: 'RRULE:FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR',
    },
  },
};

export const WithMonthlyRecurrence: Story = {
  render: (args) => <StoryRecurrenceWidget {...args} />,
  args: {
    formData: {
      ...DEFAULT_FORM_DATA,
      recurrence: 'RRULE:FREQ=MONTHLY;BYMONTHDAY=15',
    },
  },
};

export const WithYearlyRecurrence: Story = {
  render: (args) => <StoryRecurrenceWidget {...args} />,
  args: {
    formData: {
      ...DEFAULT_FORM_DATA,
      recurrence: 'RRULE:FREQ=YEARLY;BYMONTH=6;BYMONTHDAY=1',
    },
  },
};
