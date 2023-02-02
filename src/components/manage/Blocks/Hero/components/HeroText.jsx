import React from 'react';
import { LinkMore } from '@plone/volto/components';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';
import TextLineEdit from '@plone/volto/components/manage/TextLineEdit/TextLineEdit';

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
          <>
            <TextLineEdit
              {...props}
              renderTag="h2"
              renderClassName="title-editor"
              fieldDataName="title"
              placeholder={intl.formatMessage(messages.title)}
              properties={properties}
              data={data}
            />
            <TextLineEdit
              {...props}
              renderTag="p"
              renderClassName="description-editor"
              fieldDataName="description"
              placeholder={intl.formatMessage(messages.description)}
              properties={properties}
              data={data}
            />
          </>
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
