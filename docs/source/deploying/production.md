---
myst:
  html_meta:
    "description": "Production deployment of a Volto application using Cookieplone"
    "property=og:description": "Production deployment of a Volto application using Cookieplone"
    "property=og:title": "Production deployment"
    "keywords": "Volto, Plone, frontend, React, deployment, production, cookieplone"
---

# Production deployment

```{versionadded} Volto 18.0.0-alpha.43
```

```{deprecated} 18.0.0-alpha.43
The Volto app approach is deprecated. For production deployments, use [Cookieplone](https://github.com/plone/cookieplone) with the `sub/frontend_project` template instead.
```

## Overview

For production deployments of Volto, the recommended approach is to use [Cookieplone](https://github.com/plone/cookieplone) with the `sub/frontend_project` template. This creates a production-ready project structure that uses Volto as a library rather than as a standalone app.

This approach provides:
- A clean, minimal boilerplate project structure
- Better separation of concerns
- Easier maintenance and upgrades
- Production-ready deployment configuration

## Creating a production project

### Using Cookieplone with the frontend_project template

To create a production-ready Volto project, use Cookieplone's `sub/frontend_project` template:

```shell
pipx run cookieplone sub/frontend_project
```

```{note}
The `sub/frontend_project` template creates a minimal boilerplate project structure for production deployments. This is different from the `frontend_addon` template, which is used for creating Volto add-ons. For full-stack Plone projects (with both frontend and backend), use the `project` template instead.
```

This command will:
1. Prompt you for project details (project name, description, etc.)
2. Generate a boilerplate project structure
3. Set up a `package.json` that depends on Volto
4. Include deployment scripts and configuration

The generated project will have a minimal structure, with most functionality coming from Volto as a dependency. The project essentially becomes a thin wrapper around Volto, defining your specific configuration and customizations.

### Project structure

After generation, your project will have a structure similar to:

```
my-volto-project/
├── package.json          # Defines Volto as a dependency
├── src/
│   └── config.js         # Your Volto configuration
├── public/               # Static assets
└── build/                # Production build output (after build)
```

## Building for production

Once you have your project structure, build it for production:

```bash
pnpm install
pnpm build
```

For production builds with specific environment variables:

```bash
PORT=3000 RAZZLE_API_PATH=https://mywebsite.com/api pnpm build
```

The build process will:
- Compile your React application
- Bundle all dependencies
- Create optimized production assets in the `build` directory

## Deployment options

### Using a Node.js base image

If you need to use your own Node.js base image (rather than the official `plone-frontend` images), you can:

1. **Build the project** in your CI/CD pipeline or locally
2. **Copy the built project** to your production image
3. **Start the production server** using the built files

Example workflow:

```bash
# Build the project
pnpm install
PORT=3000 RAZZLE_API_PATH=https://mywebsite.com/api pnpm build

# The build output is in the ./build directory
# Copy this to your production image and run:
NODE_ENV=production node build/server.js
```

### Using plone-frontend Docker images

The official `plone-frontend` Docker images use the `sub/frontend_project` template approach internally. You can reference these images as examples:

- [Dockerfile.builder](https://github.com/plone/plone-frontend/blob/main/pnpm/Dockerfile.builder) - Build stage
- [Dockerfile.prod](https://github.com/plone/plone-frontend/blob/main/pnpm/Dockerfile.prod) - Production stage

These images demonstrate the multi-stage build process:
1. Install dependencies and build the project
2. Copy only the necessary files to a production image
3. Run the production server

### Starting the production server

After building, start your production server:

```bash
pnpm start:prod
```

Or directly with Node.js:

```bash
NODE_ENV=production node build/server.js
```

## Environment configuration

Configure your production environment using environment variables:

- `PORT`: The port on which the Node.js server will listen (default: 3000)
- `RAZZLE_API_PATH`: The API endpoint URL (e.g., `https://mywebsite.com/api`)
- `NODE_ENV`: Should be set to `production` for production deployments

```{warning}
Make sure to set `RAZZLE_API_PATH` during the build process, as it's baked into the bundle at build time.
```

## Reverse proxy setup

As with any Volto deployment, you should use a reverse proxy (like nginx) to:
- Handle SSL/TLS termination
- Route API requests to the Plone backend
- Serve static assets efficiently

See {doc}`simple` for detailed reverse proxy configuration examples.

```{important}
Always serve both Volto and the Plone API from the same domain to avoid CORS issues. For example:
- Volto: `https://mywebsite.com`
- API: `https://mywebsite.com/api`
```

## Process management

For production deployments, use a process manager to ensure your application stays running:

- **PM2**: See {doc}`pm2` for PM2 configuration
- **systemd**: Create a systemd service file
- **Docker**: Use Docker's built-in process management
- **Kubernetes**: Use Kubernetes deployments and services

## Migration from Volto app

If you're currently using the deprecated Volto app approach:

1. Generate a new project using `cookieplone sub/frontend_project`
2. Copy your customizations (configuration, add-ons, etc.) to the new project
3. Update your deployment scripts to use the new structure
4. Test thoroughly before deploying to production

```{seealso}
- {doc}`simple` for basic deployment steps
- {doc}`plone:install/create-project-cookieplone` for creating full Plone projects with backend
- [Cookieplone documentation](https://github.com/plone/cookieplone) for more template options
```

