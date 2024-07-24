import React from 'react';
import PropTypes from 'prop-types';
import { Form } from '@plone/volto/components/manage/Form';

const FormBlockView = ({ data, properties, metadata }) => {
  return <Form schema={data.schema} formData={{}} />;
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
FormBlockView.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
  metadata: PropTypes.objectOf(PropTypes.any),
};

export default FormBlockView;
