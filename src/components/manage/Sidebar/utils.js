import { join } from 'lodash';

import { flattenToAppURL } from '@plone/volto/internal';

export function getParentURL(url) {
  return flattenToAppURL(`${join(url.split('/').slice(0, -1), '/')}`) || '/';
}
