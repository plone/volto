import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import cx from 'classnames';
import { RenderBlocks } from '@plone/volto/components';
import { withBlockExtensions } from '@plone/volto/helpers';

const RowBlockView = (props) => {
  const { data, path, className } = props;
  const metadata = props.metadata || props.properties;
  const columns = data.data.blocks_layout.items;
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
    >
      {data.headline && <h2 className="headline">{data.headline}</h2>}

      {data['@type'] === 'row' && (
        <Grid stackable stretched columns={columns.length}>
          <RenderBlocks
            {...props}
            blockWrapperTag={Grid.Column}
            metadata={metadata}
            content={data.data}
            location={location}
          />
        </Grid>
      )}

      {data['@type'] === 'column' && (
        <RenderBlocks
          {...props}
          blockWrapperTag={Grid.Column}
          metadata={metadata}
          content={data.data}
        />
      )}
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
RowBlockView.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withBlockExtensions(RowBlockView);
