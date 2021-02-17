import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { SlotRenderer } from '@plone/volto/components';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';
import { slotIsAvailable } from '@plone/volto/helpers';
// import { isEmpty } from 'lodash';

const ContentContainer = ({ children, content }) => {
  const pathname = useLocation().pathname;
  const { slots } = config;
  const slotData = useSelector((state) => state.slots?.data || {});

  const isSlotAvailable = (name) => {
    if (!slots[name]) {
      return null;
    }
    const props = { pathname, slotData, slotName: name, slots };
    return slots[name].available
      ? slots[name].available(props)
      : slotIsAvailable(props);
  };

  const hasLeftSlot = isSlotAvailable('asideLeftSlot');
  const hasRightSlot = isSlotAvailable('asideRightSlot');

  const contentWidth = () => {
    if (hasLeftSlot && hasRightSlot) {
      return 6;
    } else if (hasLeftSlot || hasRightSlot) {
      return 9;
    } else {
      return 12;
    }
  };

  return (
    <>
      {hasLeftSlot || hasRightSlot ? (
        <Grid stackable as={Container}>
          {hasLeftSlot && (
            <Grid.Column as="aside" className="aside-left-slot" width={3}>
              <SlotRenderer name="asideLeftSlot" metadata={content} />
            </Grid.Column>
          )}
          <Grid.Column className="content-body" width={contentWidth()}>
            {children}
          </Grid.Column>
          {hasRightSlot && (
            <Grid.Column as="aside" className="aside-right-slot" width={3}>
              <SlotRenderer name="asideRightSlot" metadata={content} />
            </Grid.Column>
          )}
        </Grid>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default ContentContainer;
