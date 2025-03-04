import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Button, Grid } from 'semantic-ui-react';
import { FormFieldWrapper } from '@plone/volto/components';

const messages = defineMessages({
  small: {
    id: 'Small',
    defaultMessage: 'Small',
  },
  medium: {
    id: 'Medium',
    defaultMessage: 'Medium',
  },
  large: {
    id: 'Large',
    defaultMessage: 'Large',
  },
});

const ImageSizeWidget = (props) => {
  const { onChange, id, disabled, intl, value, isDisabled } = props;

  return (
    <FormFieldWrapper {...props}>
      <Grid>
        <Grid.Row>
          <Grid.Column width="8" className="field-image_size">
            <Button.Group>
              <Button
                icon
                basic
                aria-label={intl.formatMessage(messages.small)}
                onClick={() => onChange(id, 's')}
                active={value === 's'}
                disabled={disabled || isDisabled}
              >
                <div className="image-sizes-text">S</div>
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                aria-label={intl.formatMessage(messages.medium)}
                onClick={() => onChange(id, 'm')}
                active={value === 'm'}
                disabled={disabled || isDisabled}
              >
                <div className="image-sizes-text">M</div>
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                aria-label={intl.formatMessage(messages.large)}
                onClick={() => onChange(id, 'l')}
                active={value === 'l' || value === undefined}
                disabled={disabled || isDisabled}
              >
                <div className="image-sizes-text">L</div>
              </Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </FormFieldWrapper>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ImageSizeWidget.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  id: PropTypes.string.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
ImageSizeWidget.defaultProps = {
  onChange: () => {},
};

export default injectIntl(ImageSizeWidget);
