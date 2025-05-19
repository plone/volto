# `eslintconfig`

Base configurations for projects.

## Usage

In `package.json`:

```json
  "devDependencies": {
    "eslintconfig": "workspace:*",
  }
```

```js
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
