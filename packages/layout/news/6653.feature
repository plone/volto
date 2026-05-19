Added `ToolbarMenu` component for shadow-DOM-safe menus in the toolbar.
Wrapped the toolbar in `UNSAFE_PortalProvider` so React Aria overlays render inside the shadow root. @arybakov05