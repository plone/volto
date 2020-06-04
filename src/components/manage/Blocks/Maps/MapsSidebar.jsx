import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import { Grid, Segment, Button } from 'semantic-ui-react';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import { Icon, TextWidget } from '@plone/volto/components';
import { AlignBlock } from '@plone/volto/helpers';

import globeSVG from '@plone/volto/icons/globe.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
  openLinkInNewTab: {
    id: 'Open in a new tab',
    defaultMessage: 'Open in a new tab',
  },
  MapsURL: {
    id: 'Maps URL',
    defaultMessage: 'Maps URL',
  },
});

const MapsSidebar = ({
  data,
  block,
  onChangeBlock,
  openObjectBrowser,
  required = false,
  resetSubmitUrl,
  intl,
  onCopy,
}) => {
  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="Map" defaultMessage="Map" />
        </h2>
        <Button onClick={onCopy}>Copy</Button>
      </header>

      {!data.url && (
        <>
          <Segment className="sidebar-metadata-container" secondary>
            <FormattedMessage
              id="No map selected"
              defaultMessage="No map selected"
            />
            <Icon name={globeSVG} size="100px" color="#b8c6c8" />
          </Segment>
        </>
      )}
      {data.url && (
        <>
          <Segment className="form sidebar-image-data">
            {data.url && (
              <TextWidget
                id="external"
                title={intl.formatMessage(messages.MapsURL)}
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
        </>
      )}
    </Segment.Group>
  );
};

MapsSidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  openObjectBrowser: PropTypes.func.isRequired,
  resetSubmitUrl: PropTypes.func.isRequired,
};

export default injectIntl(MapsSidebar);
