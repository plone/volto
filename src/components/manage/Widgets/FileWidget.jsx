/**
 * FileWidget component.
 * @module components/manage/Widgets/FileWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Input, Label, Button } from 'semantic-ui-react';
import { map } from 'lodash';
import { readAsDataURL } from 'promise-file-reader';

import deleteSVG from '../../../icons/delete.svg';
import { Icon } from '../../../components';

/**
 * FileWidget component class.
 * @function FileWidget
 * @returns {string} Markup of the component.
 */
const FileWidget = ({
  id,
  title,
  required,
  description,
  error,
  value,
  onChange,
  fieldSet,
}) => {
  const fileInput = React.useRef(null);

  return (
    <Form.Field
      inline
      required={required}
      error={error.length > 0}
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
              id={`field-${id}`}
              name={id}
              type="file"
              ref={fileInput}
              onChange={({ target }) => {
                const file = target.files[0];
                readAsDataURL(file).then(data => {
                  const fields = data.match(/^data:(.*);(.*),(.*)$/);
                  onChange(id, {
                    data: fields[3],
                    encoding: fields[2],
                    'content-type': fields[1],
                    filename: file.name,
                  });
                });
              }}
            />
            <div className="field-file-name">
              {value && value.filename}
              {value && (
                <Button
                  icon
                  basic
                  className="delete-button"
                  aria-label="delete file"
                  onClick={() => {
                    onChange(id, null);
                    fileInput.current.inputRef.value = null;
                  }}
                >
                  <Icon name={deleteSVG} size="20px" />
                </Button>
              )}
            </div>
            {map(error, message => (
              <Label key={message} basic color="red" pointing>
                {message}
              </Label>
            ))}
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

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
FileWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.shape({
    '@type': PropTypes.string,
    title: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
FileWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: null,
};

export default FileWidget;
