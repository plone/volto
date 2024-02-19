import React from 'react';
import { Dialog, Heading, Popover, Switch } from 'react-aria-components';

interface Props {
  addableTypes: {
    '@id': string;
    id: string;
    title: string;
  }[];
}

export const AddContentPopover = ({ addableTypes }: Props) => {
  const page = addableTypes.find((type) => type.id === 'Document');

  return (
    <Popover>
      <Dialog>
        <div className="flex-wrapper">Link ai CT</div>
      </Dialog>
    </Popover>
  );
};
