import React from 'react';
import { Link, ChevronrightIcon, Popover } from '@plone/components';

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
    <Popover className="react-aria-Popover add-content-popover scroll">
      <ul className="add-content-list">
        {addableTypes.map((type) => (
          <li key={type.id} className="add-content-list-item">
            <Link href={`${path}/add?type=${encodeURIComponent(type.id)}`}>
              {type.title}
              <ChevronrightIcon />
            </Link>
          </li>
        ))}
      </ul>
    </Popover>
  );
};
