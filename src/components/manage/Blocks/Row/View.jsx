import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import cx from 'classnames';
import BlockRenderer from '@plone/volto/components/manage/BlockRenderer/BlockRenderer';
import { withBlockExtensions } from '@plone/volto/helpers';

const RowBlockView = ({ data, render, path }) => {
  return (
    <div
      className={cx('block __grid', {
        [data['@type']]: data['@type'] !== '__grid',
        centered: data.align === 'center' || data.align === undefined,
        'space-between': data.align === 'space-between',
        'centered-text': data.centeredText,
        one: data?.columns?.length === 1,
        two: data?.columns?.length === 2,
        three: data?.columns?.length === 3,
        four: data?.columns?.length === 4,
      })}
    >
      {data.headline && <h2 className="headline">{data.headline}</h2>}

      <Grid stackable stretched columns={data.columns.length}>
        {data.columns.map((column) => (
          <Grid.Column
            key={column.id}
            className={`grid-block-${column['@type']}`}
          >
            <BlockRenderer
              block={column.id}
              type={column['@type']}
              data={column}
              path={path}
            />
          </Grid.Column>
        ))}
      </Grid>
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
