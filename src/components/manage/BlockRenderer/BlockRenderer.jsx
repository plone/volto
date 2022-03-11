import React from 'react';
import PropTypes from 'prop-types';
import config from '@plone/volto/registry';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';

/**
 * BlockRenderer container class.
 * @class Form
 * @extends Component
 */
function BlockRenderer(props) {
  const { edit, type } = props;

  if (!type) {
    // We could have an empty block, although should be handled somewhere else
    return null;
  }

  const EditBlock = config.blocks.blocksConfig[type].edit;
  const ViewBlock = config.blocks.blocksConfig[type].view;

  if (!edit) {
    return <ViewBlock {...props} detached onChangeBlock={() => {}} />;
  }
  if (edit) {
    return <EditBlock {...props} detached index={0} />;
  }
  return '';
}

BlockRenderer.propTypes = {
  edit: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  block: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

BlockRenderer.defaultProps = {
  edit: false,
};

export default withObjectBrowser(BlockRenderer);
