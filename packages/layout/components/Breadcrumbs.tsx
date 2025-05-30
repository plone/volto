import {
  Breadcrumbs as PCBreadcrumbs,
  Breadcrumb,
} from '@plone/components/tailwind';

import type { BreadcrumbsProps } from '@plone/components/tailwind';

const Breadcrumbs = (props: BreadcrumbsProps) => {
  return (
    <PCBreadcrumbs {...props}>
      {(item) => (
        <Breadcrumb id={item['@id']} href={item['@id']}>
          {item.title}
        </Breadcrumb>
      )}
    </PCBreadcrumbs>
  );
};

export default Breadcrumbs;
