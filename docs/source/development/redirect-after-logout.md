---
myst:
  html_meta:
    "description": "Redirect to the login page after logout in Volto"
    "property=og:description": "How to redirect to the login page after logout in Volto"
    "property=og:title": "Redirect to the login page after logout in Volto"
    "keywords": "Volto, Plone, frontend, React, logout, redirect"
---

# Redirect to the login page after logout


To redirect users to the login page after they log out in Volto, you need to customize the `PersonalTools` component.
Follow these steps.

1.  **Shadow the component**: Create a new file at `customizations/components/manage/Toolbar/PersonalTools.jsx`, then copy the contents of the original file from {file}`volto/packages/volto/src/components/manage/Toolbar/PersonalTools.jsx` into the new file.

2.  **Modify the logout link**: In the shadowed {file}`PersonalTools.jsx` file, locate the `Link` component that renders the logout button.
    Modify the `to` prop to include the `return_url` parameter with the desired redirect URL.
    In this case, we want to redirect to the `/login` page after logout:

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

3.  **Save the changes**: Save the modified {file}`PersonalTools.jsx` file.

4.  **Restart the Volto development server**: You need to restart the Volto development server to load the changes, so that it can detect the newly shadowed component.

After completing these steps, when a user clicks the logout button, they will be redirected to the `/login` page after successfully logging out.
