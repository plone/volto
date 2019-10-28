import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Input } from 'semantic-ui-react';

const SidebarTextWidget = ({
  id,
  title,
  value,
  required,
  description,
  onChange,
  fieldSet,
}) => {
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [value]);

  return (
    <Form.Field
      inline
      required={required}
      className={description ? 'help' : ''}
      id={`${fieldSet || 'field'}-${id}`}
    >
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor={`field-${id}`}>{title}</label>
            </div>
          </Grid.Column>
          <Grid.Column width="8">
            <Input
              ref={inputRef}
              id={`field-${id}`}
              name={id}
              value={value || ''}
              onChange={({ target }) =>
                onChange(id, target.value === '' ? undefined : target.value)
              }
            />
          </Grid.Column>
        </Grid.Row>
        {description && (
          <Grid.Row stretched>
            <Grid.Column stretched width="12">
              <p className="help">{description}</p>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </Form.Field>
  );
};

SidebarTextWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SidebarTextWidget;
