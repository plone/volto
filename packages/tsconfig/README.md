# `tsconfig`

Base configurations for TypeScript projects.
Cookieplone frontend add-ons already use baseline configurations in the generated template, so you normally don't need to add it manually unless you want to customize your own.

## Usage (only if you want to customize your add-on)

In `package.json`:

```json
  "devDependencies": {
    "tsconfig": "workspace:*",
  }
```

```json
{
  "extends": "tsconfig/react-library.json",
  "include": ["src", "src/**/*.js"],
  "exclude": [
    "node_modules",
    "build",
    "public",
    "coverage",
    "src/**/*.test.{js,jsx,ts,tsx}",
    "src/**/*.spec.{js,jsx,ts,tsx}",
    "src/**/*.stories.{js,jsx,ts,tsx}"
  ]
}
```

> [!WARNING]
> This package or app is experimental.
> The community offers no support whatsoever for it.
> Breaking changes may occur without notice.
