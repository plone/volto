/**
 * Edit Hero block.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';

import cx from 'classnames';

import { BlockDataForm, SidebarPortal } from '@plone/volto/components';
import { withBlockExtensions } from '@plone/volto/helpers';

import schemaHero from './schema.js';

const messages = defineMessages({
  placeholder: {
    id: 'Upload a new image',
    defaultMessage: 'Upload a new image',
  },
});

function EditHeroBlock(props) {
  const { block, data, selected, onChangeBlock, variation } = props;
  const intl = useIntl();
  const schema = schemaHero({ ...props, intl });

  if (__SERVER__) {
    return <div />;
  }
  const placeholder =
    data.placeholder || intl.formatMessage(messages.placeholder);

  return (
    <div
      className={cx(
        'block hero align',
        {
          selected,
        },
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      <variation.view {...props} placeholder={placeholder} isEditMode />
      <SidebarPortal selected={selected}>
        <BlockDataForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          onChangeBlock={onChangeBlock}
          formData={data}
          block={block}
        />
      </SidebarPortal>
    </div>
  );
}

EditHeroBlock.propTypes = {
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  pathname: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  onFocusPreviousBlock: PropTypes.func.isRequired,
  onFocusNextBlock: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  editable: PropTypes.bool,
};

export default withBlockExtensions(EditHeroBlock);
