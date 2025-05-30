import React from 'react';
import { Link, Popover } from '@plone/components';
import ChevronrightSVG from '@plone/components/icons/chevron-right.svg?react';
import './AddContentPopover.css';

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
          <li key={type.id} className="popover-list-item">
            <Link href={`${path}/add?type=${encodeURIComponent(type.id)}`}>
              {type.title}
              <ChevronrightSVG />
            </Link>
          </li>
        ))}
      </ul>
    </Popover>
  );
};
