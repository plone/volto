import React from 'react';
import { injectIntl } from 'react-intl';
import QuantaEditBlockWrapper from '@plone/volto/components/manage/Blocks/Block/QuantaEditBlockWrapper';
import cx from 'classnames';

const SlotEditBlockWrapper = (props) => {
  const { blockProps } = props;
  const { data } = blockProps;
  const inherited = data._v_inherit && 'slot-inherited';

  return (
    <QuantaEditBlockWrapper
      {...props}
      className={cx(
        'slot-editor',
        `slot-editor-${data['@type']}`,
        inherited || '',
      )}
    />
  );
};

export default injectIntl(SlotEditBlockWrapper);
