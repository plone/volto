import type { Page } from '@playwright/test';
import { cookie } from '@plone/react-router';

export type LoginOptions = {
  apiURL?: string;
  frontendURL?: string;
  username?: string;
  password?: string;
  api?: 'plone' | 'guillotina';
};

function getDefaults(options: LoginOptions) {
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
    options.username || (api === 'guillotina' ? 'admin' : 'admin');
  const password =
    options.password || (api === 'guillotina' ? 'admin' : 'secret');

  const frontendURL =
    options.frontendURL || process.env.FRONTEND_URL || 'http://localhost:3000';

  return { apiURL, username, password, frontendURL };
}

function normalizeSameSite(value: string): 'Lax' | 'Strict' | 'None' {
  switch (value.toLowerCase()) {
    case 'none':
      return 'None';
    case 'strict':
      return 'Strict';
    default:
      return 'Lax';
  }
}

/**
 * Logs in by POSTing to `${apiURL}/@login` and setting the signed `auth_seven`
 * cookie in the current browser context (same behavior as the Cypress helper).
 *
 * Usage:
 *   await login(page);
 *   await page.goto('/');
 *
 * Note: `cookie.serialize()` uses `process.env.COOKIE_SECRET` for signing. It
 * must match the app's secret for the cookie to be accepted server-side.
 */
export async function login(page: Page, options: LoginOptions = {}) {
  const { apiURL, username, password, frontendURL } = getDefaults(options);

  const response = await page.request.post(`${apiURL}/@login`, {
    headers: { Accept: 'application/json' },
    data: { login: username, password },
  });

  if (!response.ok()) {
    throw new Error(
      `Login failed: POST ${apiURL}/@login returned ${response.status()} ${response.statusText()}`,
    );
  }

  const body = (await response.json()) as { token?: string };
  if (!body.token) {
    throw new Error('Login failed: response did not include body.token');
  }

  // Sign the token exactly like the server does so it passes cookie.parse on requests.
  const serialized = await cookie.serialize(body.token);
  const match = serialized.match(/^auth_seven=([^;]+);?/);
  if (!match) {
    throw new Error('Failed to serialize auth cookie');
  }

  const signedToken = match[1];
  const httpOnly = /; ?HttpOnly/i.test(serialized);
  const secure = /; ?Secure/i.test(serialized);
  const sameSiteRaw = /; ?SameSite=([^;]+)/i.exec(serialized)?.[1] || 'lax';
  const sameSite = normalizeSameSite(sameSiteRaw);

  await page.context().addCookies([
    {
      name: 'auth_seven',
      value: signedToken,
      url: frontendURL,
      httpOnly,
      secure,
      sameSite,
    },
  ]);

  return { token: body.token };
}
