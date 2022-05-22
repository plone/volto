import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { Accordion, Grid, Segment } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { CheckboxWidget, Icon, TextWidget } from '@plone/volto/components';
import AlignBlock from '@plone/volto/components/manage/Sidebar/AlignBlock';
import { flattenToAppURL, isInternalURL } from '@plone/volto/helpers';
import videoSVG from '@plone/volto/icons/videocamera.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import navTreeSVG from '@plone/volto/icons/nav.svg';

const messages = defineMessages({
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
  videoURL: {
    id: 'Video URL',
    defaultMessage: 'Video URL',
  },
  Preview_image: {
    id: 'Preview Image URL',
    defaultMessage: 'Preview Image URL',
  },
});

const VideoSidebar = ({
  data,
  block,
  onChangeBlock,
  openObjectBrowser,
  required = false,
  resetSubmitUrl,
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
          <FormattedMessage id="Video" defaultMessage="Video" />
        </h2>
      </header>

      {!data.url && (
        <>
          <Segment className="sidebar-metadata-container" secondary>
            <FormattedMessage
              id="No video selected"
              defaultMessage="No video selected"
            />
            <Icon name={videoSVG} size="100px" color="#b8c6c8" />
          </Segment>
        </>
      )}
      {data.url && (
        <>
          <Segment className="form sidebar-image-data">
            {data.url && (
              <>
                <TextWidget
                  id="external"
                  title={intl.formatMessage(messages.videoURL)}
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
                <TextWidget
                  id="video-preview-image"
                  title={intl.formatMessage(messages.Preview_image)}
                  required={false}
                  value={
                    isInternalURL(data.preview_image)
                      ? data.preview_image
                          ?.replace(/\/$/, '')
                          .split('/')
                          .slice(-1)[0]
                      : data.preview_image
                  }
                  icon={data.preview_image ? clearSVG : navTreeSVG}
                  iconAction={
                    data.preview_image
                      ? () => {
                          onChangeBlock(block, {
                            ...data,
                            preview_image: '',
                          });
                        }
                      : () =>
                          openObjectBrowser({
                            mode: 'image',
                            dataName: 'preview_image',
                          })
                  }
                  onChange={(id, value) => {
                    onChangeBlock(block, {
                      ...data,
                      preview_image: value,
                    });
                  }}
                />
              </>
            )}
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
          {data.url.match('.mp4') && (
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
          )}
        </>
      )}
    </Segment.Group>
  );
};

VideoSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
  resetSubmitUrl: PropTypes.func.isRequired,
};

export default injectIntl(VideoSidebar);
