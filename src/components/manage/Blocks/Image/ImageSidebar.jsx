import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Grid, Segment, Form, Button } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import {
  CheckboxWidget,
  Icon,
  FormFieldWrapper,
  TextWidget,
} from '@plone/volto/components';
import {
  AlignBlock,
  flattenToAppURL,
  isInternalURL,
} from '@plone/volto/helpers';

import imageSVG from '@plone/volto/icons/image.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import ImageSizeWidget from '@plone/volto/components/manage/Blocks/Image/ImageSizeWidget';

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
    id: 'No image selected',
    defaultMessage: 'No image selected',
  },
  externalURL: {
    id: 'External URL',
    defaultMessage: 'External URL',
  },
  size: {
    id: 'Size',
    defaultMessage: 'Size',
  },
});

const ImageSidebar = ({
  data,
  block,
  onChangeBlock,
  openObjectBrowser,
  required = false,
  resetSubmitUrl,
  onCopy,
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
          <FormattedMessage id="Image" defaultMessage="Image" />
        </h2>
        <Button onClick={onCopy}>Copy</Button>
      </header>

      {!data.url && (
        <>
          <Segment className="sidebar-metadata-container" secondary>
            <FormattedMessage
              id="No image selected"
              defaultMessage="No image selected"
            />
            <Icon name={imageSVG} size="100px" color="#b8c6c8" />
          </Segment>
        </>
      )}
      {data.url && (
        <>
          <Segment className="sidebar-metadata-container" secondary>
            {data.url.split('/').slice(-1)[0]}
            {isInternalURL(data.url) && (
              <img
                src={`${flattenToAppURL(data.url)}/@@images/image/mini`}
                alt={data.alt}
              />
            )}
            {!isInternalURL(data.url) && (
              <img src={data.url} alt={data.alt} style={{ width: '50%' }} />
            )}
          </Segment>
          <Segment className="form sidebar-image-data">
            {isInternalURL(data.url) && (
              <TextWidget
                id="Origin"
                title={intl.formatMessage(messages.Origin)}
                required={false}
                value={data.url.split('/').slice(-1)[0]}
                icon={data.url ? clearSVG : navTreeSVG}
                iconAction={
                  data.url
                    ? () => {
                        resetSubmitUrl();
                        onChangeBlock(block, {
                          ...data,
                          url: '',
                        });
                      }
                    : () => openObjectBrowser()
                }
                onChange={() => {}}
              />
            )}
            {!isInternalURL(data.url) && (
              <TextWidget
                id="external"
                title={intl.formatMessage(messages.externalURL)}
                required={false}
                value={data.url}
                icon={clearSVG}
                iconAction={() => {
                  resetSubmitUrl();

                  onChangeBlock(block, {
                    ...data,
                    url: '',
                  });
                }}
                onChange={() => {}}
              />
            )}
            <TextWidget
              id="alt"
              title={intl.formatMessage(messages.AltText)}
              required={false}
              value={data.alt}
              icon={data.alt ? clearSVG : null}
              iconAction={() =>
                onChangeBlock(block, {
                  ...data,
                  alt: '',
                })
              }
              onChange={(name, value) => {
                onChangeBlock(block, {
                  ...data,
                  alt: value,
                });
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
                      onChangeBlock={(block, data) => {
                        onChangeBlock(block, {
                          ...data,
                          size: data.size,
                        });
                      }}
                      data={data}
                      block={block}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form.Field>
            <FormFieldWrapper
              id="image_size"
              title={intl.formatMessage(messages.size)}
            >
              <ImageSizeWidget
                onChangeBlock={onChangeBlock}
                data={data}
                block={block}
              />
            </FormFieldWrapper>
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
                value={data.href}
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
                    href: value,
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

ImageSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
  resetSubmitUrl: PropTypes.func.isRequired,
};

export default injectIntl(ImageSidebar);
