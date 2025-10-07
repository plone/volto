---
myst:
  html_meta:
    "description": "Seven vs Volto: Key Differences"
    "property=og:description": "Seven vs Volto: Key Differences"
    "property=og:title": "Seven vs Volto: Key Differences"
    "keywords": "Seven, Volto, differences, comparison"
---

# Seven vs Volto: Key Differences

This guide highlights the main differences between Seven and Volto.
It helps Volto developers move to Seven by explaining the design decisions behind Seven and the alternative tooling it offers.

## No Redux

One of the most visible differences between Seven and Volto is that Seven ships without Redux.
Volto relies on Redux to mediate almost every interaction with the backend; actions and reducers orchestrate data fetching and client state.
Seven instead leans on React Router's framework loaders and actions to retrieve data and coordinate state.
The result is a smaller surface area, fewer custom abstractions, and a codebase that is easier to trace because it stays within well-known React patterns.

When Seven needs shared state outside of loaders and actions, it turns to Jotai, a lightweight state management library for React.


## Modern React SSR

Seven embraces modern React Server-Side Rendering (SSR) techniques, leveraging the latest advances in the React ecosystem.
This leads to smaller bundles, faster initial renders, improved SEO, and a smoother overall user experience.

Volto, by contrast, keeps a traditional isomorphic setup powered by Razzle.
That approach carries extra build complexity, requires the client to know how to reach the Plone API directly, and tends to ship larger bundles that slow down the first paint.
After the initial HTML render, the Volto client keeps reaching the backend via direct API calls.

Seven relies on React Router's built-in SSR pipeline, keeping server and client responsibilities aligned with modern React guidance.
The server sends ready-to-hydrate HTML, while framework loaders and actions own subsequent data access.
Because this work happens on the server, the browser does not need to know where the backend lives.

## No backend API exposed

Seven keeps the backend API hidden behind the application server.
React Router loaders and actions own the data layer, so UI code does not fetch the API directly.
Components interact with server-rendered routes and never have to know how to authenticate or where the backend lives.
Under the hood, Seven uses `@plone/client` to talk to Plone, providing a clean abstraction around the API.

## TypeScript-first

Seven is written in TypeScript from the start, ensuring type safety and a consistent developer experience.
Types improve confidence during refactors, make contracts explicit, and encourage shared patterns across the codebase.
Volto supports TypeScript, but much of its core remains JavaScript.

## Styling

Seven uses standards-based CSS for styling.
Modern CSS has evolved quickly, and features like custom properties cover many use cases that previously required preprocessors.
Although Vite can compile SASS, LESS, and other syntaxes, Seven favors plain CSS to keep the pipeline simple.

## Tailwind CSS

Seven ships with optional Tailwind CSS integration.
Seven {term}`CMSUI` uses Tailwind to deliver a cohesive design system out of the box.
Add-ons and projects can opt in to Tailwind, but it is never mandatory.
The default theme `@plone/agave` is built with Tailwind, and you are free to replace it with plain CSS or any other approach.
