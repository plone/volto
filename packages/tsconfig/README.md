# `tsconfig`

Base configurations for TypeScript projects.

## Usage

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
