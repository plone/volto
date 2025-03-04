import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Container, Segment, Grid, Label } from 'semantic-ui-react';
import { ErrorBoundary } from '@plone/volto/components';
import { getWidget } from '@plone/volto/helpers/Widget/utils';
import config from '@plone/volto/registry';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
  invalidBlock: {
    id: 'Invalid Block',
    defaultMessage: 'Invalid block - Will be removed on saving',
  },
});

const DefaultBlockView = (props) => {
  const { data, block } = props;
  const intl = useIntl();
  const { views } = config.widgets;
  const { blocksConfig = config.blocks.blocksConfig } = props;
  if (!data)
    return <div key={block}>{intl.formatMessage(messages.invalidBlock)}</div>;
  // Compatibility with RenderBlocks non-view

  const blockSchema = blocksConfig?.[data['@type']]?.blockSchema;
  const schema =
    typeof blockSchema === 'function'
      ? blockSchema({ ...props, intl })
      : blockSchema;
  const fieldsets = schema?.fieldsets || [];

  return schema ? (
    <Container className="page-block">
      {fieldsets?.map((fs) => {
        return (
          <div className="fieldset" key={fs.id}>
            {fs.id !== 'default' && <h2>{fs.title}</h2>}
            {fs.fields?.map((f, key) => {
              let field = {
                ...schema?.properties[f],
                id: f,
                widget: getWidget(f, schema?.properties[f]),
              };
              let Widget = views?.getWidget(field);
              return f !== 'title' ? (
                <Grid celled="internally" key={key}>
                  <Grid.Row>
                    <Label>{field.title}:</Label>
                  </Grid.Row>
                  <Grid.Row>
                    <Segment basic>
                      <ErrorBoundary name={f}>
                        <Widget value={data[f]} />
                      </ErrorBoundary>
                    </Segment>
                  </Grid.Row>
                </Grid>
              ) : (
                <Widget key={key} value={data[f]} />
              );
            })}
          </div>
        );
      })}
    </Container>
  ) : (
    <div key={block}>
      {intl.formatMessage(messages.unknownBlock, {
        block: data['@type'],
      })}
    </div>
  );
};

export default DefaultBlockView;
