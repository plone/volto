import React from 'react';
import PropTypes from 'prop-types';

import { ListingBlockBody as ListingBody } from '@plone/volto/components';

const View = ({ data, properties, block, path }) => {
  return (
    <div className="block listing">
      <ListingBody
        data={data}
        properties={properties}
        block={block}
        path={path}
      />
    </div>
  );
};

View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string,
};

export default View;
