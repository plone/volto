import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Grid, Segment, Button, Form } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { CheckboxWidget, Icon, TextWidget } from '@plone/volto/components';
import { AlignBlock } from '@plone/volto/helpers';

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
});

const VideoSidebar = ({
  data,
  block,
  onChangeBlock,
  openObjectBrowser,
  required = false,
  resetSubmitUrl,
  intl,
  onCopy,
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
        <Button onClick={onCopy}>Copy Block</Button>
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
