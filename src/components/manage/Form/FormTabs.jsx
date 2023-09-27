import React from 'react';
import { map } from 'lodash';
import { Tab, Message, Segment } from 'semantic-ui-react';
import { settings } from '@plone/volto/config';

function FormTabs({ schema, activeIndex, onTabChange, title, description, formData, onChangeField, onBlurField, onClickInput, errors }) {
  return (
    <Tab
      menu={{
        secondary: true,
        pointing: true,
        attached: true,
        tabular: true,
        className: 'formtabs',
        vertical: settings.verticalFormTabs,
      }}
      grid={{ paneWidth: 9, tabWidth: 3, stackable: true }}
      onTabChange={onTabChange}
      activeIndex={activeIndex}
      panes={map(schema.fieldsets, (item) => ({
        menuItem: item.title,
        render: () => [
          !settings.verticalFormTabs && title && (
            <Segment secondary attached key={title}>
              {title}
            </Segment>
          ),
          item.description && (
            <Message attached="bottom">{item.description}</Message>
          ),
          ...map(item.fields, (field) => (
            <Field
              {...schema.properties[field]}
              isDisabled={!this.props.editable}
              id={field}
              formData={formData}
              fieldSet={item.title.toLowerCase()}
              focus={this.state.inFocus[field]}
              value={this.state.formData?.[field]}
              required={schema.required.indexOf(field) !== -1}
              onChange={onChangeField}
              onBlur={onBlurField}
              onClick={onClickInput}
              key={field}
              error={errors[field]}
            />
          )),
        ],
      }))}
    />
  );
}

export default FormTabs;
