/**
 * AlignWidget component.
 * To benefit from styling integration, use with a field named 'align'
 * @module components/manage/Widgets/AlignWidget
 */

import React from 'react';
import { injectIntl } from 'react-intl';

import { FormFieldWrapper } from '@plone/volto/components';
import { AlignBlock } from '@plone/volto/helpers';

const AlignWidget = ({
  description,
  error,
  fieldSet,
  id,
  intl,
  maxLength,
  onChange,
  onDelete,
  onEdit,
  placeholder,
  required,
  title,
  value,
  wrapped,
}) => {
  return (
    <FormFieldWrapper
      id={id}
      title={title}
      description={description}
      required={required}
      error={error}
      fieldSet={fieldSet}
      wrapped={wrapped}
      onEdit={onEdit}
      draggable={true}
      className="align-widget"
    >
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
