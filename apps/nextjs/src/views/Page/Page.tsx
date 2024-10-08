import { ViewProps } from '@plone/types';

export default function Page({ content }: ViewProps) {
  return <h1>{content.title}</h1>;
}
