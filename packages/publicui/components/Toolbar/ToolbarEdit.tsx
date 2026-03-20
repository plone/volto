import { Link } from 'react-aria-components';
import Pencil from '@plone/components/icons/pencil.svg?react';

export const ToolbarEdit = ({ location }: { location: Location }) => {
  return (
    <Link
      className="primary"
      aria-label="Edit"
      href={`/@@edit${location.pathname.replace(/^\/$/, '')}`}
    >
      <Pencil />
    </Link>
  );
};
