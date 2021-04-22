import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Accordion, Button, Segment } from 'semantic-ui-react';
import { DragDropList, FormFieldWrapper, Icon } from '@plone/volto/components';
import ObjectWidget from '@plone/volto/components/manage/Widgets/ObjectWidget';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';
import dragSVG from '@plone/volto/icons/drag.svg';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  labelRemoveItem: {
    id: 'Remove item',
    defaultMessage: 'Remove item',
  },
  labelCollapseItem: {
    id: 'Collapse item',
    defaultMessage: 'Collapse item',
  },
  labelShowItem: {
    id: 'Show item',
    defaultMessage: 'Show item',
  },
  emptyObjectList: {
    id: 'Empty object list',
    defaultMessage: 'Empty object list',
  },
});

const ObjectListWidget = (props) => {
  const {
    block,
    fieldSet,
    id,
    schema,
    value = [],
    onChange,
    schemaExtender,
  } = props;

  const intl = useIntl();

  const objectSchema = typeof schema === 'function' ? schema(props) : schema;

  return (
    <div className="querystring-widget">
      <FormFieldWrapper {...props} noForInFieldLabel className="objectlist">
        <ObjectWidget
          id={`${id}-${index}`}
          key={`ow-${id}-${index}`}
          block={block}
          schema={schemaExtender ? schemaExtender(schema, child) : objectSchema}
          value={child}
          onChange={(fi, fv) => {
            const newvalue = value.map((v, i) => (i !== index ? v : fv));
            onChange(id, newvalue);
          }}
        />
      </FormFieldWrapper>
    </div>
  );
};
export default ObjectListWidget;
