import {
  createRestApiDriver,
  detectRestApi,
  type ContentTypesBackend,
  type ContentTypesDriver,
  type RestApiRequest,
} from '@plone/controlpanels';
import Api from '@plone/volto/helpers/Api/Api';

// Volto's `Api` adds its methods in the constructor, so they aren't typed.
type ApiMethod = (
  path: string,
  options: { data?: unknown; params?: Record<string, string> },
) => Promise<unknown>;

/** plone.restapi requests through Volto's API client, with its credentials. */
const request: RestApiRequest = <T>(
  ...[method, path, options]: Parameters<RestApiRequest>
) => {
  const api = new Api() as unknown as Record<string, ApiMethod>;
  return api[method === 'delete' ? 'del' : method](path, {
    data: options?.data,
    params: options?.params,
  }) as Promise<T>;
};

// Which services the backend has, once it's clear, for the session.
let known: ContentTypesBackend | undefined;

/**
 * The content types driver for the site's backend: `@plone/controlpanels`'
 * plone.restapi driver, which uses `@content-types`, `@behaviors` and
 * `@workflows` (plone/plone.restapi#2061) when the backend has them.
 */
export async function loadRestApiDriver(): Promise<ContentTypesDriver> {
  if (!known) {
    const { backend, clear } = await detectRestApi(request);
    if (clear) known = backend;
    return createRestApiDriver(request, backend);
  }
  return createRestApiDriver(request, known);
}
