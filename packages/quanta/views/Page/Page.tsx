import { type ViewProps } from '@plone/types';
import { Breadcrumbs } from '../../components/Breadcrumbs/Breadcrumbs';

export default function Page({ content }: ViewProps) {
  return (
    <div>
      <Breadcrumbs
        items={content['@components'].breadcrumbs.items || []}
        root={content['@components'].breadcrumbs.root}
        includeRoot
      />
      <h1>{content.title}</h1>
    </div>
  );
}
