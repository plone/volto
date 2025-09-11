import { useTranslation } from 'react-i18next';
import { getLocalizedMonth, getLocalizedWeekday } from '../utils';
import { Heading } from 'react-aria-components';
import type { PropsWithChildren } from 'react';

interface SelectedDatesProps {
  rruleDates: Date[];
  editMode?: boolean;
}

const SelectedDateListItem = ({ children }: PropsWithChildren) => {
  return (
    <li className="table-row not-last:border-b-1 not-last:border-solid not-last:border-gray-400">
      {children}
    </li>
  );
};

const SelectedDates = ({
  rruleDates,
  editMode = false,
}: SelectedDatesProps) => {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;

  const shownOccurrences = editMode
    ? rruleDates.slice(0, 100)
    : rruleDates.slice(0, 30);
  const hiddenOccurrences =
    rruleDates.length > 0
      ? editMode
        ? rruleDates.slice(100, rruleDates.length)
        : rruleDates.slice(30, rruleDates.length)
      : null;

  return (
    <div
      className="w-full border-1 border-solid border-gray-400 p-4"
      role="region"
      aria-live="polite"
    >
      <Heading level={3} className="mb-2 text-lg font-semibold">
        {t('cmsui.recurrence.selected_dates')}
      </Heading>
      <ul className="table w-full border-collapse">
        {shownOccurrences.map((date, index) => (
          <SelectedDateListItem key={date.toString()}>
            <div className="table-cell w-4/5 py-1">
              {getLocalizedWeekday(date.getDay() - 1, currentLocale, 'long')},{' '}
              {getLocalizedMonth(date.getMonth(), currentLocale, 'long')}{' '}
              {date.getDate()}, {date.getFullYear()}
            </div>
            {editMode && (
              <div className="table-cell">
                {index === 0 && t('cmsui.recurrence.start_recurrence')}
              </div>
            )}
          </SelectedDateListItem>
        ))}
        {hiddenOccurrences && hiddenOccurrences?.length > 0 && (
          <SelectedDateListItem>
            <div className="table-cell w-4/5 py-1">
              ...{hiddenOccurrences.length} {t('cmsui.recurrence.other_dates')}
            </div>
          </SelectedDateListItem>
        )}
      </ul>
    </div>
  );
};

export default SelectedDates;
