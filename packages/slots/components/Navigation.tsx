'use client';

import type { SlotComponentProps } from '../SlotRenderer';
import { Link } from '@plone/components';

type NavItem = {
  '@id': string;
  title: string;
};

const Navigation = (props: SlotComponentProps) => {
  const { content } = props;
  const navItems = content['@components'].navigation?.items || [];

  return (
    <nav id="navigation" aria-label="navigation" className="navigation">
      <ul>
        {navItems.map((item: NavItem) => (
          <li key={item['@id']}>
            <Link href={item['@id']}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
