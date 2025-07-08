import type { SlotComponentProps } from '../SlotRenderer';
import {
  Breadcrumbs as PCBreadcrumbs,
  Breadcrumb as PCBreadcrumb,
} from '@plone/components';
import { HomeIcon } from '@plone/components/Icons';
import Container from './Container/Container';

const Breadcrumbs = (props: SlotComponentProps) => {
  const { content } = props;
  const items = content?.['@components']?.breadcrumbs.items;
  const root = content?.['@components']?.breadcrumbs.root;

  const rootItem = {
    '@id': root || '/',
    title: 'Home',
    icon: <HomeIcon size="sm" />,
  };

  const breacrumbs = [rootItem, ...(items || [])];

  return (
    <Container as="nav" className="breadcrumbs">
      <PCBreadcrumbs items={breacrumbs}>
        {(item) => (
          <PCBreadcrumb id={item['@id']} href={item['@id']}>
            {item.title}
          </PCBreadcrumb>
        )}
      </PCBreadcrumbs>
    </Container>
  );
};

export default Breadcrumbs;
