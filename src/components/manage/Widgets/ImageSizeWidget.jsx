import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Button, Grid } from 'semantic-ui-react';
import { FormFieldWrapper } from '@plone/volto/components';

const messages = defineMessages({
  small: {
    id: 'Left',
    defaultMessage: 'Left',
  },
  medium: {
    id: 'Right',
    defaultMessage: 'Right',
  },
  large: {
    id: 'Center',
    defaultMessage: 'Center',
  },
});

const ImageSizeWidget = (props) => {
  const { onChangeBlock, data = {}, block, disabled, intl } = props;

  /**
   * Image size handler
   * @method onImageSize
   * @param {string} size Size option
   * @returns {undefined}
   */
  function onImageSize(size) {
    onChangeBlock(block, {
      ...data,
      size,
    });
  }

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
                onClick={() => onImageSize('s')}
                active={data?.size === 's'}
                disabled={disabled}
              >
                <div className="image-sizes-text">S</div>
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                aria-label={intl.formatMessage(messages.medium)}
                onClick={() => onImageSize('m')}
                active={data?.size === 'm'}
                disabled={disabled}
              >
                <div className="image-sizes-text">M</div>
              </Button>
            </Button.Group>
            <Button.Group>
              <Button
                icon
                basic
                aria-label={intl.formatMessage(messages.large)}
                onClick={() => onImageSize('l')}
                active={data?.size === 'l' || data?.size === undefined}
                disabled={disabled}
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
  onChangeBlock: PropTypes.func.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
ImageSizeWidget.defaultProps = {
  onChangeBlock: () => {},
  onBlur: () => {},
  onClick: () => {},
};

export default injectIntl(ImageSizeWidget);
