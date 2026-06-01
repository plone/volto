---
myst:
  html_meta:
    "description": "How to customize the Seven login screen with slots."
    "property=og:description": "How to customize the Seven login screen with slots."
    "property=og:title": "Customize the login screen"
    "keywords": "Seven, Plone, login, authentication, slots, customization"
---

# Customize the login screen

The Seven login screen is rendered by the `/login` route in `@plone/cmsui`.
The route provides the login form, error handling, authentication action, and redirect behavior.
Its visual extension points are exposed as slots, so add-ons and projects can change the branding and supporting actions without shadowing the whole route.

`@plone/cmsui` registers three default login slot components.

`loginLogo`
:   Renders above the login heading.
    The default component displays the Plone logo inside a colored circle.
    Customize this slot to replace the logo, add product branding, or remove the logo area.

`loginActions`
:   Renders inside the login form after the username and password fields.
    The default component displays the registration link and the submit button.
    Customize this slot when you need a different submit button, extra links, SSO buttons, or no registration link.
    If you replace this slot, remember that the login form still needs a submit control.

`loginHero`
:   Renders in the right-hand side of the login screen on large viewports.
    The default component displays the Volto hero illustration.
    Customize this slot to use project-specific artwork, campaign imagery, institutional branding, or remove the right-hand visual column.

The `/login` route passes the current `content` and React Router `location` to each slot renderer.
This means custom slot predicates can use the same values as other Seven slots.

## Override a login slot

Register your replacement slot component from an add-on or project configuration that runs after `@plone/cmsui`.
Use the same `slot` and `name` as the default component you want to replace.

```tsx
import type { ConfigType } from '@plone/registry';

function MyLoginLogo() {
  return <img src="/my-logo.svg" alt="My site" className="h-24 w-auto" />;
}

export default function applyConfig(config: ConfigType) {
  config.registerSlotComponent({
    slot: 'loginLogo',
    name: 'LoginLogo',
    component: MyLoginLogo,
  });

  return config;
}
```

Slot registrations are evaluated in reverse registration order for the same slot component name.
Because your add-on runs after `@plone/cmsui`, the component above becomes the active `LoginLogo` registration.

## Replace the login actions

The `loginActions` slot is inside the existing `<Form method="post">`.
Your component can render any controls that belong in the form.
The most important requirement is to include a submit button, unless you intentionally provide another login mechanism.

```tsx
import type { ConfigType } from '@plone/registry';
import { Button, Link } from '@plone/components/quanta';

function MyLoginActions() {
  return (
    <div className="flex items-center justify-between gap-4">
      <Link href="/reset-password">Forgot password?</Link>
      <Button type="submit" variant="primary" accent size="L">
        Sign in
      </Button>
    </div>
  );
}

export default function applyConfig(config: ConfigType) {
  config.registerSlotComponent({
    slot: 'loginActions',
    name: 'LoginActions',
    component: MyLoginActions,
  });

  return config;
}
```

## Replace the login hero

The `loginHero` slot is wrapped by the login route in a container that is hidden below the large breakpoint.
Your component only needs to render the visual content for that column.

```tsx
import type { ConfigType } from '@plone/registry';

function MyLoginHero() {
  return (
    <img
      src="/login-hero.jpg"
      alt=""
      aria-hidden="true"
      className="h-full w-auto object-cover"
    />
  );
}

export default function applyConfig(config: ConfigType) {
  config.registerSlotComponent({
    slot: 'loginHero',
    name: 'LoginHero',
    component: MyLoginHero,
  });

  return config;
}
```

## Remove a default login slot

You can remove one of the default login slot components from a later add-on configuration.
Each default login slot is registered once, so its registration position is `0`.

```ts
import type { ConfigType } from '@plone/registry';

export default function applyConfig(config: ConfigType) {
  config.unRegisterSlotComponent('loginHero', 'LoginHero', 0);

  return config;
}
```

Use the same pattern for the other default login slots.

```ts
config.unRegisterSlotComponent('loginLogo', 'LoginLogo', 0);
config.unRegisterSlotComponent('loginActions', 'LoginActions', 0);
```

Removing `loginHero` removes the right-hand visual content.
The login route still owns the wrapper around that slot, but with no rendered hero component there is no project artwork or illustration in that area.
Removing `loginLogo` leaves the heading and form in place.
Removing `loginActions` removes the default sign-up link and submit button, so only do this if another submit control or authentication flow is provided.

## Default slot registrations

The default registrations in `@plone/cmsui` are equivalent to the following.

```ts
config.registerSlotComponent({
  name: 'LoginLogo',
  slot: 'loginLogo',
  component: LoginLogo,
});

config.registerSlotComponent({
  name: 'LoginHero',
  slot: 'loginHero',
  component: LoginHero,
});

config.registerSlotComponent({
  name: 'LoginActions',
  slot: 'loginActions',
  component: LoginActions,
});
```

For more details about slot registration, ordering, predicates, and unregistering, see {doc}`register-slots`.
