import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { Grid, Button } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  Color: {
    id: 'Color',
    defaultMessage: 'Color',
  },
});

const ColorPickerWidget = (props) => {
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
                  return (
                    <Button
                      key={id + color.name}
                      className={color.name}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onChange(
                          id,
                          value === color.name
                            ? props.missing_value
                            : color.name,
                        );
                      }}
                      active={value === color.name}
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

ColorPickerWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  colors: PropTypes.array,
};

ColorPickerWidget.defaultProps = {
  required: false,
  value: null,
  onChange: null,
  colors: [],
};

export default ColorPickerWidget;
