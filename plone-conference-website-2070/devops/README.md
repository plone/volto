# DevOps Operations for Plone Conference Website 2070 🚀

Welcome to the DevOps documentation for Plone Conference Website 2070! In this guide, we'll walk you through the setup and deployment process, ensuring a smooth and efficient development workflow. We leverage the power of [Ansible](https://www.ansible.com/), [Docker](https://www.docker.com/), and [Docker Swarm](https://docs.docker.com/engine/swarm/) to automate, containerize, and orchestrate application deployment. 🛠️🐳🌐

- **Ansible** empowers us to automate tasks like software provisioning, configuration management, and application deployment. It's like having a robot assistant that takes care of the repetitive tasks, freeing you to focus on more strategic activities! 🤖✨

- **Docker** encapsulates our application and its dependencies into a container to ensure consistency across multiple development, testing, and deployment environments. It's like packing your entire application, including the environment it runs in, into a portable box that you can run anywhere! 📦🚀

- **Docker Swarm** takes it a step further by turning a group of Docker engines into a single, virtual Docker engine. It allows us to deploy our containers across multiple machines, enhancing availability and scalability. It's like having a swarm of bees working harmoniously to build, run, and scale your application! 🐝🌟

### Our Docker Stack 📚

We deploy a robust website running [Plone](https://plone.org/) using a Docker stack that consists of:

- **Traefik:** Serves as the router and SSL termination, integrated with [Let's Encrypt](https://letsencrypt.org/) for free SSL certificates, ensuring that our website is secure and trusted. 🔒🌐

- **Plone Frontend using Volto:** A modern, fast, React-based frontend that delivers an exceptional user experience. It's like having a sleek, high-performance car to navigate the web! 🏎️💨

- **Plone Backend:** Responsible for the API, it's the engine under the hood, ensuring that data is processed, stored, and retrieved efficiently. 🏭🚀

- **Postgres 14 Database:** A reliable, robust database to store the site data, ensuring that our content is safe, secure, and quickly accessible. 🗃️⚡


Now, let’s dive into the setup! 🏊‍♂️💫
## Setup

Ensure you navigate to the `devops` folder before executing any commands listed in this document. From the root of your repository, execute:

```shell
cd devops
```

### Environment Configuration

Start by creating an `.env` file in the `devops` folder. You can copy the existing `.env_dist` file as a starting point:

```shell
cp .env_dist .env
```

Edit the `.env` file to suit your environment. For example:

```
DEPLOY_ENV=prod
DEPLOY_HOST=plone-conference-website-2070.example.com
DEPLOY_PORT=22
DEPLOY_USER=plone
DOCKER_CONFIG=.docker
STACK_NAME=plone-conference-website-2070-example-com
```

Note: The `.env` file is included in `.gitignore`, ensuring environment-specific configurations aren't pushed to the repository.

### Ansible Installation

Execute the following to create a Python 3 virtual environment and install Ansible along with its dependencies:

```shell
make setup
```

### Inventory Configuration

Modify `devops/inventory/hosts.yml` with the appropriate connection details:

```yaml
---
prod:
  hosts:
    plone-conference-website-2070.example.com:
      ansible_user: root
      host: plone-conference-website-2070
      hostname: plone-conference-website-2070.example.com
```

## Server Setup

With the correct information in `devops/inventory/hosts.yml`, initiate the remote server setup:

```shell
make server-setup
```

This command executes the Ansible playbook `devops/playbooks/setup.yml` on the remote server, performing various setup tasks including user creation, SSH setup, Docker installation, and more.

## Project Deployment

### Docker Configuration

Ensure you're logged into your Docker account as the deployment uses public images. Then, create a new Docker context for the remote server:

```shell
make docker-setup
```

Verify the configuration with:

```shell
make docker-info
```

### Stack Deployment

Deploy the stack defined in `devops/stacks/plone-conference-website-2070.example.com.yml` to the remote server with:

```shell
make stack-deploy
```

### Stack Status Verification

Check the status of all services in your stack:

```shell
make stack-status
```

### Plone Site Creation

If deploying for the first time, the frontend containers might not be `healthy` due to the absence of a configured Plone site on the backend. Create a new site with:

```shell
make stack-create-site
```

### Log Monitoring

Monitor logs for each service using the commands below:

- Traefik: ```make stack-logs-webserver```
- Frontend: ```make stack-logs-frontend```
- Backend: ```make stack-logs-backend```
