---
myst:
  html_meta:
    "description": "Production deployment of a Volto application using Cookieplone"
    "property=og:description": "Production deployment of a Volto application using Cookieplone"
    "property=og:title": "Production deployment"
    "keywords": "Volto, Plone, frontend, React, deployment, production, cookieplone"
---

# Production deployment

This chapter describes how to deploy a Volto application to a production environment.

```{versionadded} Volto 18.0.0-alpha.43
Cookieplone deployment option.
```

For production deployments, use [Cookieplone](https://github.com/plone/cookieplone) with the `sub/frontend_project` template.
This creates a production-ready project structure that uses Volto as a library rather than as a standalone app.

This approach provides:
- a clean, minimal boilerplate project structure
- better separation of concerns
- easier maintenance and upgrades
- production-ready deployment configuration


```{deprecated} 18.0.0-alpha.43
The Volto app approach for production deployments is deprecated.
```

For production deployments of Volto, the recommended approach is to use [Cookieplone](https://github.com/plone/cookieplone) with the `sub/frontend_project` template. This creates a production-ready project structure that uses Volto as a library rather than as a standalone app.


## Cookieplone `frontend_project` template

To create a production-ready Volto project, use Cookieplone's `sub/frontend_project` template:

```shell
uvx cookieplone sub/frontend_project
```

```{note}
The `sub/frontend_project` template creates a minimal boilerplate project structure for production deployments.
This is different from the `frontend_addon` template, which is used for creating Volto add-ons.
For full-stack Plone projects (with both frontend and backend), use the `project` template instead.
```

This command will:
1.  Prompt you for project details, including project name, description, and other information.
2.  Generate a boilerplate project structure.
3.  Set up a {file}`package.json` that depends on Volto.
4.  Include deployment scripts and configuration.

The generated project will have a minimal structure, with most functionality coming from Volto as a dependency.
The project essentially becomes a thin wrapper around Volto, defining your specific configuration and customizations.

### Project structure

After generation, your project will have a structure similar to the following file tree diagram.

```console
my-volto-project/
├── package.json          # Defines Volto as a dependency
├── src/
│   └── config.js         # Your Volto configuration
├── public/               # Static assets
└── build/                # Production build output (after build)
```

## Building for production

Once you have your project structure, build it for production:

```shell
pnpm install
pnpm build
```

For production builds with specific environment variables:

```shell
PORT=3000 RAZZLE_API_PATH=https://mywebsite.com/api pnpm build
```

The build process will perform the following tasks.

-   Compile your React application.
-   Bundle all dependencies.
-   Create optimized production assets in the `build` directory.

## Deployment options

There are several options when deploying a Volto app to production.
Choose from the following sections for the one appropriate to your situation.

### Node.js base image

To use your own Node.js base image, instead of the official `plone-frontend` images, use following workflow.

1.  Build the project in your CI/CD pipeline or locally.

    ```shell
    pnpm install
    PORT=3000 RAZZLE_API_PATH=https://mywebsite.com/api pnpm build
    ```

2.  Copy the built project from the {file}`./build` directory to your production image.
3.  Start the production server using the built files.

    ```shell
    NODE_ENV=production node build/server.js
    ```
    

### `plone-frontend` Docker images

The official `plone-frontend` Docker images use the `sub/frontend_project` template approach internally.
You can reference the following images as examples.

- [Dockerfile.builder](https://github.com/plone/plone-frontend/blob/18.x/pnpm/Dockerfile.builder) - Build stage
- [Dockerfile.prod](https://github.com/plone/plone-frontend/blob/18.x/pnpm/Dockerfile.prod) - Production stage

These images demonstrate the multi-stage build process.
1.  Install dependencies and build the project.
2.  Copy only the necessary files to a production image.
3.  Run the production server.

### Start the production server

After building, start your production server by using one of the following commands, depending on how you manage processes.

`pnpm start:prod`
:   Runs the `start:prod` script defined in `package.json`, which sets `NODE_ENV=production` and then starts the server. Use this when you want to rely on the package manager scripts, such as for local verification or simple deployments.

`NODE_ENV=production node build/server.js`
:   Calls the Node.js entry point directly. Use this when integrating with a process manager (for example, systemd, {doc}`pm2`, Docker entrypoints, or Kubernetes) and you prefer to set environment variables outside of `pnpm`.

## Environment configuration

Configure your production environment using environment variables.

`PORT`
:   The port on which the Node.js server will listen. Default: `3000`.

`RAZZLE_API_PATH`
:   The API endpoint URL, for example, `https://mywebsite.com/api`.

`NODE_ENV`
:   This should be set to `production` for production deployments.

```{warning}
Make sure to set `RAZZLE_API_PATH` during the build process, as it's baked into the bundle at build time.
```

## Reverse proxy setup

As with any Volto deployment, you should use a reverse proxy, such as nginx, to perform the following tasks.
-   Handle SSL/TLS termination.
-   Route API requests to the Plone backend.
-   Serve static assets efficiently, including caching.

See {doc}`simple` for detailed reverse proxy configuration examples.

```{important}
Always serve both Volto and the Plone API from the same domain to avoid CORS issues, as shown in the following example.
-   Volto: `https://mywebsite.com`
-   API: `https://mywebsite.com/api`
```

## Process management

For production deployments, use a process manager to ensure your application stays running.

PM2
:   See {doc}`pm2` for PM2 configuration.

systemd
:   Create a systemd service file.

Docker
:   Use Docker's built-in process management.

Kubernetes
:   Use Kubernetes deployments and services.

## Migration from Volto app

To migrate your project from the deprecated Volto app approach to the Cookieplone approach, perform the following steps.

1.  Generate a new project using `uvx cookieplone sub/frontend_project`.
2.  Copy your customizations (configuration, add-ons, and other files) to the new project.
3.  Update your deployment scripts to use the new structure.
4.  Test thoroughly before deploying to production.

## Related topics

## Related topics

- {doc}`simple` for basic deployment steps.
- {doc}`plone:install/create-project-cookieplone` for creating full Plone projects with backend.
- [Cookieplone documentation](https://github.com/plone/cookieplone) for more template options.

