import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { Accordion, Grid, Segment } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import {
  CheckboxWidget,
  Icon,
  Image,
  TextWidget,
} from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import AlignBlock from '@plone/volto/components/manage/Sidebar/AlignBlock';

import imageSVG from '@plone/volto/icons/image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const messages = defineMessages({
  Image: {
    id: 'Image',
    defaultMessage: 'Image',
  },
  Origin: {
    id: 'Origin',
    defaultMessage: 'Origin',
  },
  AltText: {
    id: 'Alt text',
    defaultMessage: 'Alt text',
  },
  Align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
  NoImageSelected: {
    id: 'No image set in image content field',
    defaultMessage: 'No image set in image content field',
  },
  externalURL: {
    id: 'External URL',
    defaultMessage: 'External URL',
  },
});

const LeadImageSidebar = ({
  properties,
  data,
  block,
  onChangeBlock,
  openObjectBrowser,
  required = false,
  onChangeField,
  intl,
}) => {
  const [activeAccIndex, setActiveAccIndex] = useState(0);

  function handleAccClick(e, titleProps) {
    const { index } = titleProps;
    const newIndex = activeAccIndex === index ? -1 : index;

    setActiveAccIndex(newIndex);
  }

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Lead Image" defaultMessage="Lead Image" />
        </h2>
      </header>

      {!properties.image && (
        <>
          <Segment className="sidebar-metadata-container" secondary>
            <FormattedMessage
              id="No image set in Lead Image content field"
              defaultMessage="No image set in Lead Image content field"
            />
            <Icon name={imageSVG} size="100px" color="#b8c6c8" />
          </Segment>
        </>
      )}
      {properties.image && (
        <>
          <Segment className="sidebar-metadata-container" secondary>
            {properties.image.filename}
            {properties.image.data && (
              <img
                // TODO understand when this actually happens
                src={`data:${properties.image['content-type']};base64,${properties.image.data}`}
                width={properties.image.width}
                height={properties.image.height}
                alt={data.image_caption || properties.image_caption || ''}
                className="responsive"
                style={{
                  aspectRatio: `${properties.image.width} / ${properties.image.height}`,
                }}
              />
            )}
            {!properties.image.data && (
              <Image
                item={properties}
                imageField="image"
                alt={data.image_caption || properties.image_caption || ''}
                responsive={true}
                sizes="188px"
              />
            )}
          </Segment>
          <Segment className="form sidebar-image-data">
            <TextWidget
              id="alt"
              title={intl.formatMessage(messages.AltText)}
              required={false}
              value={properties.image_caption}
              icon={properties.image_caption ? clearSVG : null}
              iconAction={() => onChangeField('image_caption', '')}
              onChange={(name, value) => {
                onChangeField('image_caption', value);
              }}
            />
            <Form.Field inline required={required}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width="4">
                    <div className="wrapper">
                      <label htmlFor="field-align">
                        <FormattedMessage
                          id="Alignment"
                          defaultMessage="Alignment"
                        />
                      </label>
                    </div>
                  </Grid.Column>
                  <Grid.Column width="8" className="align-tools">
                    <AlignBlock
                      align={data.align}
                      onChangeBlock={onChangeBlock}
                      data={data}
                      block={block}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form.Field>
          </Segment>
          <Accordion fluid styled className="form">
            <Accordion.Title
              active={activeAccIndex === 0}
              index={0}
              onClick={handleAccClick}
            >
              Link Settings
              {activeAccIndex === 0 ? (
                <Icon name={upSVG} size="20px" />
              ) : (
                <Icon name={downSVG} size="20px" />
              )}
            </Accordion.Title>
            <Accordion.Content active={activeAccIndex === 0}>
              <TextWidget
                id="link"
                title={intl.formatMessage(messages.LinkTo)}
                required={false}
                value={flattenToAppURL(data.href)}
                icon={data.href ? clearSVG : navTreeSVG}
                iconAction={
                  data.href
                    ? () => {
                        onChangeBlock(block, {
                          ...data,
                          href: '',
                        });
                      }
                    : () => openObjectBrowser({ mode: 'link' })
                }
                onChange={(name, value) => {
                  onChangeBlock(block, {
                    ...data,
                    href: flattenToAppURL(value),
                  });
                }}
              />
              <CheckboxWidget
                id="openLinkInNewTab"
                title={intl.formatMessage(messages.openLinkInNewTab)}
                value={data.openLinkInNewTab ? data.openLinkInNewTab : false}
                onChange={(name, value) => {
                  onChangeBlock(block, {
                    ...data,
                    openLinkInNewTab: value,
                  });
                }}
              />
            </Accordion.Content>
          </Accordion>
        </>
      )}
    </Segment.Group>
  );
};

LeadImageSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
  onChangeField: PropTypes.func.isRequired,
};

export default injectIntl(LeadImageSidebar);
