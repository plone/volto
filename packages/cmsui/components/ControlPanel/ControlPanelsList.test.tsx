import React from 'react';
import { render, screen } from '@testing-library/react';
import { ControlPanelsList } from './ControlPanelsList';

describe('ControlPanelsList', () => {
  const mockControlPanels = [
    {
      '@id': 'http://localhost:8080/Plone/@controlpanels/mail',
      href: '/controlpanel/mail',
      title: 'Mail',
      group: 'General',
    },
    {
      '@id': 'http://localhost:8080/Plone/@controlpanels/security',
      href: '/controlpanel/security',
      title: 'Security',
      group: 'Security',
    },
    {
      '@id': 'http://localhost:8080/Plone/@controlpanels/content',
      href: '/controlpanel/content',
      title: 'Content Settings',
      group: 'Content',
    },
  ];

  it('renders all control panels', () => {
    render(<ControlPanelsList controlpanels={mockControlPanels} />);

    mockControlPanels.forEach((panel) => {
      const link = screen.getByRole('link', { name: panel.title });
      expect(link).toBeInTheDocument();
    });
  });

  it('groups control panels correctly', () => {
    render(<ControlPanelsList controlpanels={mockControlPanels} />);

    const groups = ['General', 'Security', 'Content'];
    groups.forEach((group) => {
      expect(
        screen.getByRole('heading', { name: group, level: 2 }),
      ).toBeInTheDocument();
    });
  });

  it('renders links with correct hrefs', () => {
    render(<ControlPanelsList controlpanels={mockControlPanels} />);

    mockControlPanels.forEach((panel) => {
      const link = screen.getByRole('link', { name: panel.title });
      expect(link).toHaveAttribute('href', panel.href);
    });
  });
});
