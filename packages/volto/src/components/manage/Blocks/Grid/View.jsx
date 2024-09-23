import { Grid } from 'semantic-ui-react';
import cx from 'classnames';
import { RenderBlocks } from '@plone/volto/components';
import { withBlockExtensions } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const GridBlockView = (props) => {
  const { data, path, className, style } = props;
  const metadata = props.metadata || props.properties;
  if (data.blocks_layout === undefined) {
    return null;
  }
  const columns = data.blocks_layout.items;
  const blocksConfig =
    config.blocks.blocksConfig[data['@type']].blocksConfig ||
    props.blocksConfig;
  const location = {
    pathname: path,
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

      <Grid stackable stretched columns={columns.length}>
        <RenderBlocks
          {...props}
          blockWrapperTag={Grid.Column}
          metadata={metadata}
          content={data}
          location={location}
          blocksConfig={blocksConfig}
          isContainer
        />
      </Grid>
    </div>
  );
};

export default withBlockExtensions(GridBlockView);
