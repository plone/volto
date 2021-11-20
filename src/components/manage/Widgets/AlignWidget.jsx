import React from 'react';
import { injectIntl } from 'react-intl';

import { FormFieldWrapper } from '@plone/volto/components';
import AlignBlock from '@plone/volto/components/manage/Sidebar/AlignBlock';

/**
 * AlignWidget component.
 * To benefit from styling integration, use with a field named 'align'
 *
 * Example how this field would look in schema:
 *
 * ```jsx
 * {
 *  title: 'Align',
 *  description: 'Layout align',
 *  widget: 'align',
 * }
 * ```
 */
const AlignWidget = (props) => {
  const { id, onChange, value } = props;
  return (
    <FormFieldWrapper {...props} className="align-widget">
      <AlignBlock
        align={value}
        onChangeBlock={(block, { align }) => onChange(id, align)}
        data={{ align: value }}
        block={id}
      />
    </FormFieldWrapper>
  );
};

export default injectIntl(AlignWidget);
