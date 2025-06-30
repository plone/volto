import { Popover } from '@plone/components';
import { Link } from '@plone/components/quanta';
import ChevronrightSVG from '@plone/components/icons/chevron-right.svg?react';
import PopoverListItem from '../PopoverListItem';

interface Props {
  path: string;
  addableTypes: {
    '@id': string;
    id: string;
    title: string;
  }[];
}

export const AddContentPopover = ({ path, addableTypes }: Props) => {
  // const page = addableTypes.find((type) => type.id === 'Document');

  return (
    <Popover className="react-aria-Popover add-content-popover">
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
    </Popover>
  );
};
