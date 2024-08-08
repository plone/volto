import React from 'react';
import { Menu, Tab } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { ObjectWidget } from '@plone/volto/components/manage/Widgets';

export const ObjectByTypeWidget = (props) => {
  const { schemas, value = {}, onChange, errors = {}, id } = props;
  const objectId = id;

  const schemaIds = schemas.map(({ id }) => id);
  const defaultActiveTab = value
    ? schemaIds.indexOf(Object.keys(value)[0])
    : null;

  const [activeTab, setActiveTab] = React.useState(
    defaultActiveTab > -1 ? defaultActiveTab : 0,
  );
  const createTab = ({ schema, id, icon }, index) => {
    return {
      menuItem: () => (
        <Menu.Item
          onClick={() => setActiveTab(index)}
          active={activeTab === index}
          key={id}
        >
          <Icon size="24px" name={icon} title={schema.title} />
        </Menu.Item>
      ),
      render: () => {
        return (
          <Tab.Pane>
            <ObjectWidget
              schema={schema}
              id={id}
              errors={errors}
              value={value[id] || {}}
              onChange={(schemaId, v) => {
                onChange(objectId, { [schemaId]: v });
              }}
            />
          </Tab.Pane>
        );
      },
    };
  };

  return <Tab panes={schemas.map(createTab)} activeIndex={activeTab} />;
};

export default ObjectByTypeWidget;
