import React from 'react';
import { Form } from 'semantic-ui-react';
import { Grid, Button } from 'semantic-ui-react';
import { isEqual } from 'lodash';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  Color: {
    id: 'Color',
    defaultMessage: 'Color',
  },
});

type Color =
  | {
      name: string;
      label: string;
      style: Record<`--${string}`, string>;
    }
  | {
      name: string;
      label: string;
      style: undefined;
    };

export type ColorPickerWidgetProps = {
  id: string;
  title: string;
  value: string;
  default: string;
  required: boolean;
  missing_value: unknown;
  className: string;
  onChange: (id: string, value: any) => void;
  colors: Color[];
};

const ColorPickerWidget = (props: ColorPickerWidgetProps) => {
  const { id, title, required, value, onChange, colors, className } = props;

  const intl = useIntl();

  React.useEffect(() => {
    if (!props.value && props.default) {
      props.onChange(props.id, props.default);
    }
    // Yes, this is correct.
  });

  return colors.length > 0 ? (
    <Form.Field
      inline
      required={required}
      className={className}
      id={'field-' + id}
    >
      {/* @ts-ignore */}
      <Grid>
        <Grid.Row>
          <Grid.Column
            width="12"
            className="color-picker-widget"
            verticalAlign="middle"
          >
            <div className="wrapper">
              <label htmlFor={`field-${id}`}>
                {title ? title : intl.formatMessage(messages.Color)}
              </label>

              <div className="buttons">
                {colors.map((color) => {
                  let colorValue: string | Color['style'];
                  const colorName = color.name;
                  if (color.style !== undefined) {
                    colorValue = color.style;
                  } else {
                    colorValue = color.name;
                  }
                  return (
                    <Button
                      key={id + colorName}
                      className={colorName}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange(
                          id,
                          value === colorValue
                            ? props.missing_value
                            : colorValue,
                        );
                      }}
                      style={color.style}
                      active={isEqual(value, colorValue)}
                      circular
                      aria-label={color.label}
                      title={color.label}
                    />
                  );
                })}
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form.Field>
  ) : null;
};

export default ColorPickerWidget;
