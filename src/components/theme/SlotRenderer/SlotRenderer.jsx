import React from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { slots } from '~/config';

export default ({ name }) => {
  const pathname = useLocation().pathname;

  if (!slots[name]) {
    return null;
  }

  const currentSlot = slots[name];
  const active = currentSlot.filter((slot) => matchPath(pathname, slot.path));

  return active.map(({ component, props }) => {
    const id = uuid();
    const Slot = component;
    return <Slot {...props} key={id} id={id} />;
  });
};
