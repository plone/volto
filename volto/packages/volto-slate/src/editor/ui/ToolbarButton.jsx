import cx from 'classnames';
import React from 'react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { Button } from 'semantic-ui-react';
import { useIntl } from 'react-intl';

const ToolbarButton = React.forwardRef(
  ({ className, active, reversed, icon, style, title = '', ...props }, ref) => {
    const intl = useIntl();
    const i18ntitle =
      typeof title !== 'string' ? intl.formatMessage(title) : title;
    return (
      <div className="button-wrapper">
        <Button
          as="a"
          {...props}
          title={i18ntitle}
          ref={ref}
          style={style}
          className={cx(className)}
          active={active}
          inverted={reversed}
          compact
          toggle
          size="tiny"
          icon={icon && <Icon name={icon} size="24px" />}
        ></Button>
      </div>
    );
  },
);

export default ToolbarButton;
