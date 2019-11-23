import React from 'react';
import PropTypes from 'prop-types';

import ListingBody from './ListingBody';

const View = ({ data, properties, block }) => {
  return (
    <div className="block listing">
      <ListingBody data={data} properties={properties} block={block} />
    </div>
  );
};

View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
  block: PropTypes.string.isRequired,
};

export default View;
