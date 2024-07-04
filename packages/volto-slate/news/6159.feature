Use the unused `toggleButton` prop in `PositionedToolbar` to render the toolbar in a different `portal` target falling back to `document.body` if `toggleButton` is not provided. @ichim-david

When `toggleButton` is provided as a `portal` target, allow negative left positioning except when the target is `document.body` to prevent the toolbar going off-screen and avoid breaking changes. @ichim-david