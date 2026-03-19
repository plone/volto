/**
 * CMS Toolbar — rendered inside a Shadow DOM for full CSS isolation.
 *
 * Why Shadow DOM?
 * Third-party Plone themes can ship any CSS they like. A theme's rules must
 * never leak into the toolbar, and the toolbar's rules must never leak into
 * the public page. Shadow DOM provides a hard boundary: styles declared
 * inside the shadow root do not inherit from the host page, and the host
 * page's selectors cannot pierce the boundary.
 *
 * The toolbar is client-side only (useEffect attaches the shadow root).
 * On the server the host <div> is rendered as an inert empty element, which
 * is acceptable because permission-gated UI requires an authenticated request
 * anyway.
 *
 * React context (Jotai, Router, Pluggables…) flows through createPortal
 * unchanged — portals preserve the React tree's context even when the DOM
 * target is a shadow root.
 */

import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { useRouteLoaderData } from 'react-router';
import type { RootLoader } from 'seven/app/root';
import { Pluggable } from '../Pluggable';
import { shouldShowToolbar } from '../../helpers';
import toolbarStyles from './Toolbar.css?inline';
import { useTranslation } from 'react-i18next';

function ToolbarInner() {
  const { t } = useTranslation();

  return (
    <nav aria-label={t('layout.toolbar.label')} className="toolbar">
      <div className="toolbar-buttons">
        <div className="toolbar-region toolbar-top">
          <Pluggable name="toolbar-top" />
        </div>
        <div className="toolbar-region toolbar-bottom">
          <Pluggable name="toolbar-bottom" />
        </div>
      </div>
    </nav>
  );
}

/**
 * Renders a fixed CMS toolbar on the left side of the viewport, isolated from
 * the host-page stylesheet via Shadow DOM.
 *
 * Extensibility is handled by the Pluggable system:
 *   • `toolbar-top`    — slot at the top of the toolbar
 *   • `toolbar-bottom` — slot at the bottom of the toolbar
 *
 * Register items with `<Plug pluggable="toolbar-top" id="my-button">`
 * More info about Pluggables: https://6.docs.plone.org/volto/development/pluggables.html
 */
const Toolbar = () => {
  const rootData = useRouteLoaderData<RootLoader>('root');
  const [shadowRoot, setShadowRoot] = useState<ShadowRoot | null>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  const showToolbar = !!rootData?.content
    ? shouldShowToolbar(rootData.content)
    : false;

  useEffect(() => {
    if (!hostRef.current || hostRef.current.shadowRoot) return;
    const root = hostRef.current.attachShadow({ mode: 'open' });
    setShadowRoot(root);
  }, []);

  // The host element is always rendered so the ref is stable.  No content is
  // placed in the shadow root until we know the user can edit.
  return (
    <div ref={hostRef} id="toolbar">
      {shadowRoot &&
        showToolbar &&
        createPortal(
          <>
            <style>{toolbarStyles}</style>
            <ToolbarInner />
          </>,
          shadowRoot,
        )}
    </div>
  );
};

export default Toolbar;
