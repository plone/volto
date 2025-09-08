import { Popover } from '@plone/components';
import { Link } from '@plone/components/quanta';
import ChevronrightSVG from '@plone/components/icons/chevron-right.svg?react';
import { useTranslation } from 'react-i18next';
import PopoverListItem from '../PopoverListItem';

interface Props {
  path: string;
  addableTypes: {
    '@id': string;
    id: string;
    title: string;
  }[];
  content: { title: string };
}

export const AddContentPopover = ({ path, content, addableTypes }: Props) => {
  // const page = addableTypes.find((type) => type.id === 'Document');
  const { t } = useTranslation();

  return (
    <Popover className="q react-aria-Popover add-content-popover">
      <fieldset>
        <legend>
          {t('contents.actions.add')} - {content.title}
        </legend>

        <ul className="popover-list">
          {addableTypes.map((type) => (
            <PopoverListItem
              key={type.id}
              className="border-quanta-smoke [&+li]:border-t"
            >
              <Link
                href={`/@@add${path}?type=${encodeURIComponent(type.id)}`}
                className="text-quanta-sapphire hover:text-quanta-royal flex items-center decoration-transparent"
              >
                {type.title}
                <ChevronrightSVG className="ms-auto" />
              </Link>
            </PopoverListItem>
          ))}
        </ul>
      </fieldset>
    </Popover>
  );
};
