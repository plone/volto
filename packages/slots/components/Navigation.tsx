import type { SlotComponentProps } from '../SlotRenderer';
import config from '@plone/registry';
import {
  Breadcrumbs as RACBreadcrumbs,
  Breadcrumb as RACBreadcrumb,
} from 'react-aria-components';
import { Link } from '@plone/components';

type NavItem = {
  '@id': string;
  title: string;
};

const Navigation = (props: SlotComponentProps) => {
  const { content } = props;
  const intl: (id: string) => string = config.getUtility({
    name: 'translation',
    type: 'factory',
  }).method;
  const navItems = content['@components'].navigation?.items || [];

  return (
    <nav id="navigation" aria-label="navigation" className="navigation">
      <RACBreadcrumbs className="asd" items={navItems} aria-label="navigation">
        {(item: NavItem) => (
          <RACBreadcrumb id={item['@id']}>
            <Link href={item['@id']}>{item.title}</Link>
          </RACBreadcrumb>
        )}
      </RACBreadcrumbs>
    </nav>
  );
};

export default Navigation;
