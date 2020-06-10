import React, { useState } from 'react';
import TextAreaSidebar from './TextAreaSidebar';
import { SidebarPortal, TextareaWidget } from '@plone/volto/components';

const Edit = (props) => {
  const [textarea, setTextarea] = useState('Enter the lable for textarea');
  return (
    <>
      <TextareaWidget
        id="external"
        title={props.data.textarea?.length > 0 ? props.data.textarea : textarea}
        required={false}
        value=""
        onChange={() => {}}
      />
      <SidebarPortal selected={props.selected}>
        <TextAreaSidebar {...props} />
      </SidebarPortal>
    </>
  );
};

export default Edit;
