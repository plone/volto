Use unused `toggleButton` prop in `PositionedToolbar` to render the 
toolbar in a different portal target falling back to document.body 
if `toggleButton` is not provided. @ichim-david

When `toggleButton` is provided as portal target, we allow negative
left positioning but not when target is body to avoid the toolbar 
going off screen and avoiding breaking changes. @ichim-david