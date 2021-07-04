import { Button, Dropdown } from 'semantic-ui-react';
import React from 'react';
import moreSVG from '@plone/volto/icons/more.svg';
import { Pluggable } from '@plone/volto/components/manage/Pluggable';
import { Icon } from '@plone/volto/components';
import config from '@plone/volto/registry';

const PluggableMenuSection = (props) => {
  const { name, maxSizeBeforeCollapse = 3, params = {}, ...rest } = props;
  return (
    <Pluggable name={name} {...rest}>
      {(pluggables) => {
        const groups = new Map();
        const seen = [];
        const options = { isMenuShape: pluggables.length > 1, ...params };
        config.blocks.toolbarGroups.forEach(({ id, title }) => {
          groups[id] = pluggables
            .filter((p, i) => {
              if (p.extra?.group === id) {
                seen.push(i);
                return true;
              }
              return false;
            })
            .map((p) => p(options))
            .filter((r) => !!r);
        });
        const ungrouped = pluggables
          .filter((p, i) => seen.indexOf(i) === -1)
          .map((p) => p(options))
          .filter((r) => !!r);

        // NOTE: this will reorder even if ungroupd, based on config group
        // defined order
        let allItems = []; // TODO: use reduce
        Object.keys(groups)
          .map((n) => groups[n])
          .forEach((entries) => (allItems = [...allItems, ...entries]));
        allItems = [...allItems, ...ungrouped];

        return allItems.length > maxSizeBeforeCollapse ? (
          <Dropdown
            item
            icon={
              <Button basic icon>
                <Icon name={moreSVG} size="18px" color="#826a6a" />
              </Button>
            }
            className=""
          >
            <Dropdown.Menu className="right" scrolling>
              <>
                {Object.keys(groups).map((groupName) => {
                  const results = groups[groupName];
                  const { title } = config.blocks.toolbarGroups.find(
                    (g) => g.id === groupName,
                  );
                  return (
                    <>
                      <Dropdown.Header content={title} />
                      <Dropdown.Menu scrolling>{results}</Dropdown.Menu>
                    </>
                  );
                })}
                {ungrouped.length > 0 ? (
                  <>
                    <Dropdown.Divider />
                    {ungrouped.map((r, i) => r)}
                  </>
                ) : (
                  ''
                )}
              </>
            </Dropdown.Menu>
          </Dropdown>
        ) : allItems.length > 0 ? (
          allItems
        ) : null;
      }}
    </Pluggable>
  );
};

export default PluggableMenuSection;
