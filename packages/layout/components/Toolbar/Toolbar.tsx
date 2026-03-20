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
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Toolbar.module.css';
import toolbarInnerStyles from './Toolbar-inner.css?inline';
import { useLocation, useRouteLoaderData } from 'react-router';
import type { RootLoader } from 'seven/app/root';
import { useTranslation } from 'react-i18next';
import { UNSAFE_PortalProvider } from 'react-aria';
import SlotRenderer from '../../slots/SlotRenderer';
import type { Content } from '@plone/types';

interface ToolbarInnerProps {
  content: Content;
}

function ToolbarInner({ content }: ToolbarInnerProps) {
  const { t } = useTranslation();

  const location = useLocation();

  return (
    <nav aria-label={t('layout.toolbar.label')} className="toolbar">
      <div className="toolbar-buttons">
        <div className="toolbar-region toolbar-top">
          <SlotRenderer
            name="toolbarTop"
            content={content}
            location={location}
          />
        </div>
        <div className="toolbar-region toolbar-bottom">
          <SlotRenderer
            name="toolbarBottom"
            content={content}
            location={location}
          />
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
  const portalContainerRef = useRef<HTMLDivElement>(null);
  const getContainer = useCallback(() => portalContainerRef.current, []);

  useEffect(() => {
    if (!hostRef.current || hostRef.current.shadowRoot) return;
    const root = hostRef.current.attachShadow({ mode: 'open' });
    setShadowRoot(root);
  }, []);

  // The ! appended to rootData tells TypeScript to ignore rootData possibly being undefined.
  // Since the Toolbar is not rendered when rootData is undefined, we can safely ignore.
  const content = rootData!.content;

  // The host element is always rendered so the ref is stable.  No content is
  // placed in the shadow root until we know the user can edit.
  return (
    <div ref={hostRef} id="toolbar" className={styles.toolbar}>
      {shadowRoot &&
        createPortal(
          /* UNSAFE_PortalProvider tells React Aria where to render
            overlay elements (popovers, menus, tooltips). By default,
            React Aria appends them to document.body, which is outside
            the shadow DOM, so they would miss the toolbar's scoped
            styles and be invisible or unstyled. Pointing getContainer
            at #toolbar-portals keeps overlays inside the shadow root
            where they inherit the toolbar's CSS. */
          <UNSAFE_PortalProvider getContainer={getContainer}>
            <style>{toolbarInnerStyles}</style>
            <ToolbarInner content={content} />
            <div ref={portalContainerRef} id="toolbar-portals" />
          </UNSAFE_PortalProvider>,
          shadowRoot,
        )}
    </div>
  );
};

export default Toolbar;
