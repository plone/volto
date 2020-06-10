import React from 'react';
import { TextArea } from 'semantic-ui-react';
import { SidebarPortal, FormFieldWrapper } from '@plone/volto/components';
import InputSidebar from './InputSidebar';

const Edit = (props) => {
  return (
    <>
      <FormFieldWrapper
        title={
          props.data.input?.length > 0 ? props.data.input : 'enter input label'
        }
        required
      >
        <TextArea placeholder="Tell us more" />
      </FormFieldWrapper>
      <SidebarPortal selected={props.selected}>
        <InputSidebar {...props} />
      </SidebarPortal>
    </>
  );
};

export default Edit;
