import { Redirect, useParams } from 'react-router-dom';
import { CONTENT_TYPES_BASE_PATH, contentTypeHref } from '@plone/controlpanels';

/**
 * Sends the old content types control panel's URLs,
 * `/controlpanel/dexterity-types[/{type}[/schema]]`, to the new one.
 */
export default function DexterityTypesRedirect() {
  const { id, view } = useParams<{ id?: string; view?: string }>();
  return (
    <Redirect
      to={
        id
          ? contentTypeHref(
              CONTENT_TYPES_BASE_PATH,
              id,
              view === 'schema' ? 'fields' : 'settings',
            )
          : CONTENT_TYPES_BASE_PATH
      }
    />
  );
}
