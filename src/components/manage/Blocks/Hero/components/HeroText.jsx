import React from 'react';
import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';

import {
  BlocksFormFocusTrap,
  TextLineInput,
  LinkMore,
} from '@plone/volto/components';

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
});

const HeroText = (props) => {
  const { data, isEditMode, withBackgroundImage, properties } = props;

  const intl = useIntl();

  return (
    <div
      className={cx(
        'hero-body',
        withBackgroundImage && data.url ? 'withBackgroundImage' : '',
      )}
    >
      <div className="hero-text">
        {isEditMode ? (
          <BlocksFormFocusTrap {...props} fields={['title', 'description']}>
            {({ getFocusTrapProps }) => (
              <>
                <TextLineInput
                  id="title"
                  as="h2"
                  className="title-editor"
                  fieldDataName="title"
                  placeholder={intl.formatMessage(messages.title)}
                  properties={properties}
                  value={data.title}
                  {...getFocusTrapProps(0)}
                />
                <TextLineInput
                  id="description"
                  as="p"
                  className="description-editor"
                  value={data.description}
                  placeholder={intl.formatMessage(messages.description)}
                  {...getFocusTrapProps(1)}
                />
              </>
            )}
          </BlocksFormFocusTrap>
        ) : (
          <>
            {data.title && <h1>{data.title}</h1>}
            {data.description && <p>{data.description}</p>}
          </>
        )}
      </div>
      <LinkMore data={data} isEditMode={isEditMode} />
    </div>
  );
};

export default HeroText;
