import React from 'react';
import { FormFieldWrapper } from '@plone/volto/components';
import { Icon } from '@plone/volto/components';
import { Button } from 'semantic-ui-react';

// The ButtonsWidget
const ButtonsWidget = (props) => {
  const { id, onChange, actions, actionsInfoMap, defaultAction, value } = props;

  React.useEffect(() => {
    if (!props.value && props.default) {
      props.onChange(props.id, props.default);
    }
  });

  return (
    <FormFieldWrapper {...props} className="align-widget">
      <div className="align-buttons">
        {actions.map((action) => (
          <Button.Group key={action}>
            <Button
              icon
              basic
              aria-label={actionsInfoMap[action][1]}
              onClick={() => onChange(id, action)}
              active={(action === defaultAction && !value) || value === action}
            >
              <Icon
                name={actionsInfoMap[action][0]}
                title={actionsInfoMap[action][1] || action}
                size="24px"
              />
            </Button>
          </Button.Group>
        ))}
      </div>
    </FormFieldWrapper>
  );
};

export default ButtonsWidget;
