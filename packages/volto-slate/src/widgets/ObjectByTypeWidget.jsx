import { useMemo, useState } from 'react';
import { Menu, Tab } from 'semantic-ui-react';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { ObjectWidget } from '@plone/volto/components/manage/Widgets';

export const ObjectByTypeWidget = (props) => {
  const { schemas, value = {}, onChange, errors = {}, id } = props;
  const objectId = id;

  const schemaIds = useMemo(() => schemas.map(({ id }) => id), [schemas]);

  const k = useMemo(() => {
    return Object.keys(value);
  }, [value]);

  const defaultActiveTab = useMemo(
    () => k.length > 0 ? schemaIds.indexOf(k[0]) : null,
    [schemaIds, k],
  );

  const [activeTab, setActiveTab] = useState(
    defaultActiveTab > -1 ? defaultActiveTab : 0,
  );

  const panes = useMemo(
    () =>
      schemas.map((schemaItem, index) => {
        const currentSchemaId = schemaItem.id;
        return {
          menuItem: () => (
            <Menu.Item
              onClick={() => setActiveTab(index)}
              active={activeTab === index}
              key={currentSchemaId}
            >
              <Icon
                size="24px"
                name={schemaItem.icon}
                title={schemaItem.title}
              />
            </Menu.Item>
          ),
          render: () => (
            <Tab.Pane key={currentSchemaId}>
              <ObjectWidget
                schema={schemaItem}
                id={currentSchemaId}
                errors={errors}
                value={value[currentSchemaId] || {}}
                onChange={(changedId, val) => {
                  onChange(objectId, { [currentSchemaId]: val });
                }}
              />
            </Tab.Pane>
          ),
        };
      }),
    [schemas, activeTab, setActiveTab, errors, value, onChange, objectId],
  );

  return <Tab panes={panes} activeIndex={activeTab} />;
};

export default ObjectByTypeWidget;
