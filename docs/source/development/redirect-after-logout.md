---
myst:
  html_meta:
    "description": "How to Redirect to the Login Page After Logout in Volto"
    "property=og:description": "How to Redirect to the Login Page After Logout in Volto"
    "property=og:title": "How to Redirect to the Login Page After Logout in Volto"
    "keywords": "Volto, Plone, frontend, React, logout, redirect"
---

# How to Redirect to the Login Page After Logout in Volto

## Overview 

To redirect users to the login page after they log out in Volto, you need to customize the `PersonalTools` component. Follow these steps:

## Steps

1. **Shadow the component**: Create a new file at `customizations/components/manage/Toolbar/PersonalTools.jsx` and copy the contents of the original `PersonalTools.jsx` file from `volto/packages/volto/src/components/manage/Toolbar/PersonalTools.jsx`.

2. **Modify the logout link**: In the shadowed `PersonalTools.jsx` file, locate the `Link` component that renders the logout button. Modify the `to` prop to include the `return_url` parameter with the desired redirect URL. In this case, we want to redirect to the `/login` page after logout:

```jsx
<Link id="toolbar-logout" to={`${getBaseUrl(pathname)}/logout?return_url=/login`}>
  <Icon
    className="logout"
    name={logoutSVG}
    size="30px"
    title={intl.formatMessage(messages.logout)}
  />
</Link>
```

3. **Save the changes**: Save the modified `PersonalTools.jsx` file.

4. **Restart the Volto development server**: You need to restart the Volto development server to see the changes initially, so that it can detect the newly shadowed component.

After completing these steps, when a user clicks the logout button, they will be redirected to the `/login` page after successfully logging out.
