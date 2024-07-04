Use the unused `toggleButton` prop in `PositionedToolbar` to render the 
toolbar in a different `portal` target falling back to `document.body` 
if `toggleButton` is not provided. @ichim-david

When `toggleButton` is provided as a `portal` target, we allow negative
left positioning but not when the target is `document.body` to avoid the toolbar 
going off-screen, thus avoiding breaking changes. @ichim-david