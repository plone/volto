import type { APIRequestContext, Page } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export type SevenApi = 'plone' | 'guillotina';

export type SevenRequestOptions = {
  apiURL?: string;
  api?: SevenApi;
  username?: string;
  password?: string;
};

export type CreateContentParams = {
  contentType: string;
  contentId: string;
  contentTitle: string;
  contentDescription?: string;
  path?: string;
  allow_discussion?: boolean;
  transition?: string;
  bodyModifier?: (body: Record<string, unknown>) => Record<string, unknown>;
  image?:
    | boolean
    | {
        sourceFilename?: string;
        encoding?: 'base64';
        filename?: string;
        'content-type'?: string;
      };
};

export type SetWorkflowParams = {
  path?: string;
  actor?: string;
  review_state?: string;
  time?: string;
  title?: string;
  comment?: string;
  effective?: string;
  expires?: string;
  include_children?: boolean;
};

function getRequestContext(requestOrPage: APIRequestContext | Page) {
  if ('request' in requestOrPage) return requestOrPage.request;
  return requestOrPage;
}

function getDefaultApiConfig(options: SevenRequestOptions) {
  const hostname = process.env.BACKEND_HOST || '127.0.0.1';
  const siteId = process.env.SITE_ID || 'plone';

  const api =
    options.api || (process.env.API === 'guillotina' ? 'guillotina' : 'plone');

  const apiURL =
    options.apiURL ||
    (api === 'guillotina'
      ? `http://${hostname}:8081/db/web`
      : process.env.API_PATH || `http://${hostname}:55001/${siteId}`);

  const username =
    options.username || (api === 'guillotina' ? 'root' : 'admin');
  const password =
    options.password || (api === 'guillotina' ? 'root' : 'secret');

  return { api, apiURL, username, password };
}

function basicAuthHeader(username: string, password: string) {
  const token = Buffer.from(`${username}:${password}`, 'utf8').toString(
    'base64',
  );
  return `Basic ${token}`;
}

function normalizePath(value?: string) {
  if (!value) return '';
  return value.replace(/^\/+/, '').replace(/\/+$/, '');
}

function getFixturesDir() {
  const here = dirname(fileURLToPath(import.meta.url));
  return join(here, '../../cypress/fixtures');
}

async function readFixtureAsBase64(filename: string) {
  const data = await readFile(join(getFixturesDir(), filename));
  return data.toString('base64');
}

export async function setWorkflowSeven(
  requestOrPage: APIRequestContext | Page,
  {
    path = '/',
    actor = 'admin',
    review_state = 'publish',
    time = '1995-07-31T18:30:00',
    title = '',
    comment = '',
    effective = '2018-01-21T08:00:00',
    expires = '2019-01-21T08:00:00',
    include_children = true,
  }: SetWorkflowParams = {},
  requestOptions: SevenRequestOptions = {},
) {
  const request = getRequestContext(requestOrPage);
  const { api, apiURL, username, password } =
    getDefaultApiConfig(requestOptions);

  if (api !== 'plone') {
    throw new Error('setWorkflowSeven is only supported for Plone API');
  }

  const normalized = normalizePath(path);
  const url = `${apiURL}/${normalized}/@workflow/${review_state}`;

  const response = await request.post(url, {
    headers: {
      Accept: 'application/json',
      Authorization: basicAuthHeader(username, password),
    },
    data: {
      actor,
      review_state,
      time,
      title,
      comment,
      effective,
      expires,
      include_children,
    },
  });

  if (!response.ok()) {
    throw new Error(
      `Workflow transition failed: POST ${url} returned ${response.status()} ${response.statusText()}`,
    );
  }

  return response;
}

export async function createContent(
  requestOrPage: APIRequestContext | Page,
  {
    contentType,
    contentId,
    contentTitle,
    contentDescription = '',
    path = '',
    allow_discussion = false,
    transition = '',
    bodyModifier = (body) => body,
    image = false,
  }: CreateContentParams,
  requestOptions: SevenRequestOptions = {},
) {
  const request = getRequestContext(requestOrPage);
  const { api, apiURL, username, password } =
    getDefaultApiConfig(requestOptions);

  const authHeader = basicAuthHeader(username, password);
  const normalizedPath = normalizePath(path);
  const containerUrl = `${apiURL}/${normalizedPath}`;

  const defaultBody: Record<string, unknown> = {
    '@type': contentType,
    id: contentId,
    title: contentTitle,
    description: contentDescription,
    allow_discussion,
  };

  let body: Record<string, unknown> = defaultBody;

  if (contentType === 'File') {
    body = bodyModifier({
      ...defaultBody,
      file: {
        data: 'dGVzdGZpbGUK',
        encoding: 'base64',
        filename: 'lorem.txt',
        'content-type': 'text/plain',
      },
    });
  } else if (contentType === 'Image') {
    const pngBase64 = await readFixtureAsBase64('image.png');
    body = bodyModifier({
      ...defaultBody,
      image: {
        data: pngBase64,
        encoding: 'base64',
        filename: 'image.png',
        'content-type': 'image/png',
      },
    });
  } else if (
    ['Document', 'News Item', 'Folder', 'CMSFolder'].includes(contentType)
  ) {
    let paramsBody: Record<string, unknown> = {
      ...defaultBody,
      blocks: {
        'd3f1c443-583f-4e8e-a682-3bf25752a300': { '@type': 'title' },
        '7624cf59-05d0-4055-8f55-5fd6597d84b0': { '@type': 'slate' },
      },
      blocks_layout: {
        items: [
          'd3f1c443-583f-4e8e-a682-3bf25752a300',
          '7624cf59-05d0-4055-8f55-5fd6597d84b0',
        ],
      },
    };

    if (image) {
      const sourceFilename =
        typeof image === 'object' && image.sourceFilename
          ? image.sourceFilename
          : join(getFixturesDir(), 'halfdome2022.jpg');

      const previewBase64 = (await readFile(sourceFilename)).toString('base64');
      const previewDefaults = {
        encoding: 'base64',
        filename: 'image.jpg',
        'content-type': 'image/jpg',
      };
      const preview =
        typeof image === 'object'
          ? { ...previewDefaults, ...image }
          : previewDefaults;

      paramsBody = bodyModifier({
        ...paramsBody,
        preview_image: { ...preview, data: previewBase64 },
      });
    } else {
      paramsBody = bodyModifier({ ...paramsBody });
    }

    body = paramsBody;
  } else {
    body = bodyModifier({
      '@type': contentType,
      id: contentId,
      title: contentTitle,
      allow_discussion,
    });
  }

  const response = await request.post(containerUrl, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: authHeader,
    },
    data: body,
  });

  if (!response.ok()) {
    const responseText = await response.text().catch(() => '');
    const details = responseText ? `\nResponse body:\n${responseText}` : '';
    throw new Error(
      `Content creation failed: POST ${containerUrl} returned ${response.status()} ${response.statusText()}${details}`,
    );
  }

  if (transition && api === 'plone') {
    // Keep parity with Cypress helper: it calls setWorkflow({ path: path || contentId, ... }).
    await setWorkflowSeven(
      request,
      { path: path || contentId, review_state: transition },
      requestOptions,
    );
  }

  return response;
}

/**
 * Usage:
 *   import { createContent } from '@plone/tooling/playwright/content';
 *   await createContent(page, { contentType: 'Document', contentId: 'doc', contentTitle: 'Doc' });
 */
