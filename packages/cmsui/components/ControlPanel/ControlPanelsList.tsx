import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from '@plone/components';
import config from '@plone/registry';

interface ControlPanel {
  '@id': string;
  title: string;
  group: string;
  id?: string;
}

export const ControlPanelsList = ({
  controlpanels,
}: {
  controlpanels: ControlPanel[];
}) => {
  const { t } = useTranslation();
  const addonsControlPanels = config.settings.controlpanels || [];

  const sevenControlPanels = [
    {
      '@id': '/addons',
      group: t('cmsui.panelgroups.general'),
      title: t('cmsui.paneltitles.addons'),
    },
    {
      '@id': '/database',
      group: t('cmsui.panelgroups.general'),
      title: t('cmsui.paneltitles.database'),
    },
    {
      '@id': '/rules',
      group: t('cmsui.panelgroups.content'),
      title: t('cmsui.paneltitles.contentRules'),
    },
    {
      '@id': '/undo',
      group: t('cmsui.panelgroups.general'),
      title: t('cmsui.paneltitles.undo'),
    },
    {
      '@id': '/aliases',
      group: t('cmsui.panelgroups.general'),
      title: t('cmsui.paneltitles.urlmanagement'),
    },
    {
      '@id': '/relations',
      group: t('cmsui.panelgroups.content'),
      title: t('cmsui.paneltitles.relations'),
    },
    {
      '@id': '/moderate-comments',
      group: t('cmsui.panelgroups.content'),
      title: t('cmsui.paneltitles.moderatecomments'),
    },
    {
      '@id': '/users',
      group: t('cmsui.panelgroups.users'),
      title: t('cmsui.paneltitles.users'),
    },
    {
      '@id': '/usergroupmembership',
      group: t('cmsui.panelgroups.users'),
      title: t('cmsui.paneltitles.groupMembership'),
    },
    {
      '@id': '/groups',
      group: t('cmsui.panelgroups.users'),
      title: t('cmsui.paneltitles.groups'),
    },
  ];

  let allControlPanels = controlpanels.concat(
    sevenControlPanels,
    addonsControlPanels,
  );
  // Apply filter function
  // allControlPanels = config.settings.filterControlPanels(allControlPanels);

  allControlPanels = allControlPanels.map((controlpanel) => ({
    ...controlpanel,
    id: controlpanel['@id'].split('/').pop() || '',
  }));

  const groupedPanels = allControlPanels.reduce(
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
      <div className="controlpanels">
        {Object.entries(groupedPanels).map(([group, panels]) => (
          <div key={group} className="controlpanels-group">
            <h2 className="group-title">{group}</h2>
            <ul className="controlpanels-list">
              {panels
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((panel) => (
                  <li key={panel['@id']} className="controlpanel-item">
                    <Link
                      href={`/controlpanel/${panel.id}`}
                      className="controlpanel-link"
                    >
                      {panel.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanelsList;
