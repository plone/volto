import type { Locator, Page } from '@playwright/test';

declare global {
  interface Window {
    platePlaywrightAdapter?: {
      EDITABLE_TO_EDITOR?: WeakMap<HTMLElement, unknown>;
    };
  }
}

export type WaitForPlateEditorReadyOptions = {
  timeout?: number;
};

/**
 * Wait until:
 * - the Slate editable is visible
 * - `window.platePlaywrightAdapter` exists
 * - the adapter WeakMap has the editable -> editor mapping
 *
 * This avoids races with lazy-loaded editors and `useEffect` timing.
 */
export async function waitForPlateEditorReady(
  page: Page,
  editable: Locator = page.locator('[data-slate-editor]'),
  { timeout = 10_000 }: WaitForPlateEditorReadyOptions = {},
) {
  await editable.waitFor({ state: 'visible', timeout });

  await page.waitForFunction(
    () => {
      const el = document.querySelector('[data-slate-editor]');
      const adapter = window.platePlaywrightAdapter;
      return !!el && !!adapter?.EDITABLE_TO_EDITOR?.has(el as HTMLElement);
    },
    { timeout },
  );

  return editable;
}
