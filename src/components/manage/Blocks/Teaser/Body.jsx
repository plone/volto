import React from 'react';
import PropTypes from 'prop-types';
import DefaultBody from './DefaultBody';
import config from '@plone/volto/registry';

const TeaserBody = (props) => {
  const { variation, data } = props;

  const hasType = data.href?.[0]?.['@type'];

  // Compatible with the previous version of the component registry
  // and the Volto 16 one.
  const BodyComponent =
    (config?.getComponent &&
      hasType &&
      config.getComponent({ name: 'Teaser', dependencies: [hasType] })
        .component) ||
    variation?.template ||
    DefaultBody;

  return <BodyComponent {...props} />;
};

TeaserBody.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  isEditMode: PropTypes.bool,
  variation: PropTypes.string,
};

export default TeaserBody;
