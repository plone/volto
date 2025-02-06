import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import { useIntl } from 'react-intl';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';

export interface CheckboxWidgetProps {
  id: string;
  title: string;
  description?: string;
  required?: boolean;
  error?: string[];
  value?: boolean;
  isDisabled?: boolean;
  onChange?: (id: string, checked: boolean) => void;
}

const CheckboxWidget: React.FC<CheckboxWidgetProps> = (
  props: CheckboxWidgetProps,
) => {
  const { id, title, value, onChange, isDisabled, description } = props;
  const intl = useIntl();

  return (
    <FormFieldWrapper {...props} columns={1}>
      <div className="wrapper">
        <Checkbox
          name={`field-${id}`}
          checked={value}
          disabled={isDisabled}
          onChange={(_, data) =>
            onChange && onChange(id, data.checked ?? false)
          }
          label={
            <label htmlFor={`field-${id}`}>
              {intl.formatMessage({ id: title, defaultMessage: title })}
            </label>
          }
        />
        {description && (
          <p>
            {intl.formatMessage({
              id: description,
              defaultMessage: description,
            })}
          </p>
        )}
      </div>
    </FormFieldWrapper>
  );
};

export default CheckboxWidget;
