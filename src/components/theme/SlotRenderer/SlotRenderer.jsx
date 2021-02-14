import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import Registry from '@plone/volto/registry';

const SlotRenderer = ({ name }) => {
  const pathname = useLocation().pathname;
  const { slots } = Registry;
  const slotData = useSelector((state) => state.slots?.data || {});

  if (!slots[name]) {
    return null;
  }

  const currentSlot = slots[name];
  const active = currentSlot.items?.filter((slot) =>
    slot.available({ pathname, slotData }),
  );

  return active.map(({ component, props }) => {
    // TODO: use id from slot fill definition?
    const id = uuid();
    const SlotFill = component;
    return <SlotFill {...props} slotName={name} key={id} id={id} />;
  });
};

export default SlotRenderer;
