---
myst:
  html_meta:
    "description": "TBD"
    "property=og:description": "TBD"
    "property=og:title": "React"
    "keywords": "Volto, Plone, frontend, React"
---

# React

---

myst:
html_meta:
"description": "React development guidelines for Volto contributors"
"property=og:description": "React development guidelines for Volto contributors"
"property=og:title": "React Development"
"keywords": "Volto, Plone, frontend, React"
-------------------------------------------

# React Development

This page explains how to work with React when contributing to Volto.

Volto's frontend is built using **React** and follows a modern,
component-based architecture using hooks and functional components.

## Development Workflow

1. Install dependencies:

```
yarn install
```

2. Start the development server:

```
yarn start
```

This will launch the Volto frontend in development mode with hot reloading enabled.

## Code Structure

* Components are written as **functional components**.
* React hooks are preferred over class-based lifecycle methods.
* Keep components small, reusable, and focused on a single responsibility.
* Use Volto's existing component patterns before introducing new abstractions.

## State Management

Volto uses Redux for state management.

* Keep business logic inside actions and reducers.
* Avoid storing UI-only state in Redux.
* Prefer local component state when possible.

## Styling Guidelines

* Follow the existing style conventions.
* Reuse existing UI components to maintain consistency.
* Avoid introducing new design systems unless required.

## Testing

When modifying React components:

* Ensure existing tests continue to pass.
* Add tests for new functionality when applicable.
* Prefer behavior-based testing over implementation details.

## Additional Reference

For more details, see:

https://6.docs.plone.org/volto/contributing/react.html

