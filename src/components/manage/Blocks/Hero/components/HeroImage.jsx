import React from 'react';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Dimmer, Loader, Message } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  browse: {
    id: 'Browse',
    defaultMessage: 'Browse',
  },
  uploading: {
    id: 'Uploading image',
    defaultMessage: 'Uploading image',
  },
});

const HeroImage = ({
  data,
  isEditMode,
  editable,
  onUploadImage,
  placeholder,
  uploading,
  variation,
}) => {
  const intl = useIntl();
  return (
    <>
      {data.url ? (
        <img
          className="hero-image"
          src={`${flattenToAppURL(data.url)}/@@images/image`}
          alt=""
          style={{
            opacity:
              variation.id === 'heroImageBackground' ? data.opacity || 1 : 1,
          }}
          loading={isEditMode ? 'eager' : 'lazy'}
        />
      ) : (
        isEditMode && (
          <div className="image-add">
            <Message className="image-message">
              {uploading && (
                <Dimmer active>
                  <Loader indeterminate>
                    {intl.formatMessage(messages.uploading)}
                  </Loader>
                </Dimmer>
              )}
              <center>
                <h4>{intl.formatMessage(messages.image)}</h4>
                {editable && (
                  <>
                    <p>{placeholder}</p>
                    <p>
                      <label className="ui button file">
                        {intl.formatMessage(messages.browse)}
                        <input
                          type="file"
                          onChange={onUploadImage}
                          style={{ display: 'none' }}
                        />
                      </label>
                    </p>
                  </>
                )}
              </center>
            </Message>
          </div>
        )
      )}
    </>
  );
};

export default HeroImage;
