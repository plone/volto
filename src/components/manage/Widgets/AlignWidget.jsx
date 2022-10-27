import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { FormFieldWrapper } from '@plone/volto/components';
import { Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';
import imageLeftSVG from '@plone/volto/icons/image-left.svg';
import imageRightSVG from '@plone/volto/icons/image-right.svg';
import imageFitSVG from '@plone/volto/icons/image-fit.svg';
import imageNarrowSVG from '@plone/volto/icons/image-narrow.svg';
import imageWideSVG from '@plone/volto/icons/image-wide.svg';
import imageFullSVG from '@plone/volto/icons/image-full.svg';

const messages = defineMessages({
  left: {
    id: 'Left',
    defaultMessage: 'Left',
  },
  right: {
    id: 'Right',
    defaultMessage: 'Right',
  },
  center: {
    id: 'Center',
    defaultMessage: 'Center',
  },
  narrow: {
    id: 'Narrow',
    defaultMessage: 'Narrow',
  },
  wide: {
    id: 'Wide',
    defaultMessage: 'Wide',
  },
  full: {
    id: 'Full',
    defaultMessage: 'Full',
  },
});

export const defaultActionsInfo = ({ intl }) => ({
  left: [imageLeftSVG, intl.formatMessage(messages.left)],
  right: [imageRightSVG, intl.formatMessage(messages.right)],
  center: [imageFitSVG, intl.formatMessage(messages.center)],
  narrow: [imageNarrowSVG, intl.formatMessage(messages.narrow)],
  wide: [imageWideSVG, intl.formatMessage(messages.wide)],
  full: [imageFullSVG, intl.formatMessage(messages.full)],
});

const AlignWidget = (props) => {
  const intl = useIntl();

  const {
    id,
    onChange,
    actions = ['left', 'right', 'center', 'full'],
    actionsInfoMap = {},
    value,
  } = props;

  React.useEffect(() => {
    if (!props.value && props.default) {
      props.onChange(props.id, props.default);
    }
  });

  const actionsInfo = {
    ...defaultActionsInfo({ intl }),
    ...actionsInfoMap,
  };

  return (
    <FormFieldWrapper {...props} className="align-widget">
      <div className="align-buttons">
        {actions.map((action) => (
          <Button.Group key={action}>
            <Button
              icon
              basic
              aria-label={actionsInfo[action][1]}
              onClick={() => onChange(id, action)}
              active={(action === 'center' && !value) || value === action}
            >
              <Icon
                name={actionsInfo[action][0]}
                title={actionsInfo[action][1] || action}
                size="24px"
              />
            </Button>
          </Button.Group>
        ))}
      </div>
    </FormFieldWrapper>
  );
};

export default AlignWidget;
