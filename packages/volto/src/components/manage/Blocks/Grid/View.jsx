import { Grid } from 'semantic-ui-react';
import cx from 'classnames';
import { RenderBlocks } from '@plone/volto/components';
import { withBlockExtensions } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const GridBlockView = (props) => {
  const { data, path, className, style } = props;
  const metadata = props.metadata || props.properties;
  const columns = data?.blocks_layout?.items || data?.columns;
  const blocksConfig = config.blocks.blocksConfig[data['@type']].blocksConfig || props.blocksConfig;
  const location = {
    pathname: path,
  };

  const convertTeaserToGridIfNecessary = (data) => {
    if (data?.['@type'] === 'teaserGrid')
      return {
        ...data,
        blocks_layout: { items: data?.columns.map((c) => c.id) },
        blocks: data?.columns?.reduce((acc, current) => {
          return {
            ...acc,
            [current?.id]: current,
          };
        }, {}),
      };
    return data;
  };

  return (
    <div
      className={cx('block', data['@type'], className, {
        one: columns?.length === 1,
        two: columns?.length === 2,
        three: columns?.length === 3,
        four: columns?.length === 4,
      })}
      style={style}
    >
      {data.headline && <h2 className="headline">{data.headline}</h2>}

      <Grid stackable stretched columns={columns?.length}>
        <RenderBlocks {...props} blockWrapperTag={Grid.Column} metadata={metadata} content={convertTeaserToGridIfNecessary(data)} location={location} blocksConfig={blocksConfig} isContainer />
      </Grid>
    </div>
  );
};

export default withBlockExtensions(GridBlockView);
