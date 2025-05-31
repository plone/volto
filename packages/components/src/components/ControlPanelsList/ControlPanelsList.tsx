import React from 'react';
import { Link } from '../Link/Link';

export const ControlPanelsList = ({
  controlpanels,
}: {
  controlpanels: any[];
}) => {
  return (
    <ul className="controlpanels-list">
      {controlpanels.map((panel) => (
        <li key={panel['@id']} className="controlpanel-item">
          <Link href={panel['href']} className="controlpanel-link">
            {panel.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default ControlPanelsList;
