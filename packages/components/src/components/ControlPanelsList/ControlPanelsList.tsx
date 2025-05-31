import React from 'react';
import { Link } from '../Link/Link';

type ControlPanel = {
  '@id': string;
  href: string;
  title: string;
  group: string;
};

export const ControlPanelsList = ({
  controlpanels,
}: {
  controlpanels: ControlPanel[];
}) => {
  const groupedPanels = controlpanels.reduce(
    (acc, panel) => {
      const group = panel.group || 'General';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(panel);
      return acc;
    },
    {} as Record<string, ControlPanel[]>,
  );

  return (
    <div className="controlpanels-container">
      {Object.entries(groupedPanels).map(([group, panels]) => (
        <div key={group} className="controlpanels-group">
          <h2 className="group-title">{group}</h2>
          <ul className="controlpanels-list">
            {panels.map((panel) => (
              <li key={panel['@id']} className="controlpanel-item">
                <Link href={panel.href} className="controlpanel-link">
                  {panel.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ControlPanelsList;
