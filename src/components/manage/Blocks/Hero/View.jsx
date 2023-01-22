import React from 'react';
import PropTypes from 'prop-types';
import { withBlockExtensions } from '@plone/volto/helpers';

const View = (props) => {
  const HeroLayout = props.variation.view;

  return (
    <div className="block hero">
      <HeroLayout {...props} selected={false} />
    </div>
  );
};

View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
  variation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withBlockExtensions(View);
