import { useState, type PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocalizedMonth, getLocalizedWeekday } from '../utils';
import { Heading } from 'react-aria-components';
import DeleteIcon from '@plone/components/icons/bin.svg?react';
import AddIcon from '@plone/components/icons/add.svg?react';
import { Button } from '@plone/components/quanta';

interface SelectedDatesProps {
  rruleDates: Date[];
  exdates?: Date[];
  editMode?: boolean;
  excludeDate?: (d: Date) => void;
  onToggleDate?: (d: Date) => void;
}

const SelectedDateListItem = ({ children }: PropsWithChildren) => {
  return (
    <li
      className={`
        table-row items-center
        not-last:border-b not-last:border-solid not-last:border-gray-400
      `}
    >
      {children}
    </li>
  );
};

const PAGE_SIZE = 20;
const INITIAL_COUNT = 20;

const SelectedDates = ({
  rruleDates,
  exdates = [],
  editMode = false,
  excludeDate,
  onToggleDate,
}: SelectedDatesProps) => {
  const { t, i18n } = useTranslation();
  const currentLocale = i18n.language;

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const shownOccurrences = rruleDates.slice(0, visibleCount);
  const remainingCount = rruleDates.length - visibleCount;

  return (
    <div
      className="w-full border border-solid border-gray-400 p-4"
      role="region"
      aria-live="polite"
    >
      <Heading level={3} className="mb-2 text-lg font-semibold">
        {t('cmsui.recurrence.selected_dates')}
      </Heading>
      {shownOccurrences.length > 0 ? (
        <ul className="table w-full border-collapse">
          {shownOccurrences.map((d, index) => {
            const isExcluded = exdates.some((e) => e.getTime() === d.getTime());
            const date = `${getLocalizedWeekday(d.getDay() - 1, currentLocale, 'long')},
                ${getLocalizedMonth(d.getMonth() + 1, currentLocale, 'long')}
                ${d.getDate()}, ${d.getFullYear()}`;
            const handleToggle = onToggleDate
              ? () => onToggleDate(d)
              : excludeDate
                ? () => excludeDate(d)
                : undefined;

            return (
              <SelectedDateListItem key={date.toString()}>
                <div
                  className={`
                    table-cell w-4/5 py-1
                    ${isExcluded ? 'line-through opacity-40' : ''}
                  `}
                >
                  {date}
                </div>
                {editMode && (
                  <div className="table-cell w-auto pe-2.5 text-nowrap">
                    {index === 0 && t('cmsui.recurrence.start_recurrence')}
                  </div>
                )}
                {editMode && handleToggle && (
                  <div className="table-cell align-middle">
                    <Button
                      className={`cursor-pointer rounded-sm! p-0!`}
                      onClick={handleToggle}
                    >
                      {isExcluded ? (
                        <AddIcon />
                      ) : (
                        <DeleteIcon className={'fill-quanta-candy!'} />
                      )}
                    </Button>
                  </div>
                )}
              </SelectedDateListItem>
            );
          })}
          {remainingCount > 0 && (
            <SelectedDateListItem>
              <div className="table-cell w-4/5 py-1">
                <Button
                  className={`
                    cursor-pointer bg-transparent px-0 underline
                    hover:bg-transparent hover:shadow-none
                    focus:shadow-none
                    active:shadow-none
                    pressed:bg-transparent pressed:text-quanta-royal pressed:shadow-none
                  `}
                  onPress={() => setVisibleCount((n) => n + PAGE_SIZE)}
                  variant="primary"
                >
                  {t('cmsui.recurrence.show_more_dates', {
                    count: Math.min(remainingCount, PAGE_SIZE),
                  })}
                </Button>
              </div>
            </SelectedDateListItem>
          )}
        </ul>
      ) : (
        <div className="mt-3">{t('cmsui.recurrence.no_occurrences')}</div>
      )}
    </div>
  );
};

export default SelectedDates;
