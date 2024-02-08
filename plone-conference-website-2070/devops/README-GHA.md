# DevOps Operations using GitHub Actions 🚀

## Introduction

Welcome to the DevOps operations guide for deploying your project using GitHub Actions! This README provides step-by-step instructions on setting up your GitHub repository and initiating manual deployment workflows. Ensure to follow each step carefully to configure your environment and secrets correctly.

## Repository Setup 🛠️

### Step 1: Create a New Environment

1. Visit [GitHub](https://github.com/) and log in with your credentials.
2. Go to your repository at [ellizurigo/plone-conference-website-2070](https://github.com/ellizurigo/plone-conference-website-2070).
3. Click on `Settings` at the top-right corner.
4. In the left sidebar, click on `Environments`.
5. Press `New environment`.
6. Name the environment `plone-conference-website-2070.example.com` and hit `Configure environment`.

### Step 2: Add Environment Secrets 🔒

After setting up the environment, it's time to add secrets. These are sensitive pieces of information that should be kept secure. Follow the steps below:

1. In the `Secrets` section of your environment, click `Add secret`.
2. Refer to the table below and add each secret individually:

| Secret Name | Secret Value | Description |
|-------------|--------------|-------------|
| DEPLOY_HOST | plone-conference-website-2070.example.com | The hostname or IP address of your Docker Swarm manager. |
| DEPLOY_PORT | 22 | The SSHD Port. |
| DEPLOY_USER | plone | The user to connect to the deploy host, with permissions to run Docker commands. |
| DEPLOY_SSH  | Contents of `devops/etc/keys/plone_prod_deploy_rsa` | The private SSH key used for connection. The corresponding public key should be in the `~/.ssh/authorized_keys` file of the deployment user. |
| ENV_FILE    | Contents of `devops/.env_file_gha` | The file containing environment variables used by the stack file. |

### Step 3: Add Repository Variables 📚

1. Go back to the `Settings` of your repository.
2. Click on `Secrets and Variables`, then `Actions`.
3. Under `Variables`, you’ll find sections for `Environment variables` and `Repository variables`.

Add the repository variable as follows:

| Name     | Value |
|----------|-------|
| LIVE_ENV | plone-conference-website-2070.example.com |

This variable is referenced in the `.github/workflows/manual_deploy.yml` file.

## Manual Deployment 🚀

Ensure that both Backend and Frontend tests have been successfully executed:

- [Backend Tests Workflow](https://github.com/ellizurigo/plone-conference-website-2070/actions/workflows/backend.yml)
- [Frontend Tests Workflow](https://github.com/ellizurigo/plone-conference-website-2070/actions/workflows/frontend.yml)

Upon successful completion of the tests, Docker images for the Backend (`ghcr.io/ellizurigo/plone-conference-website-2070-backend`) and Frontend (`ghcr.io/ellizurigo/plone-conference-website-2070-frontend`) will be available.

### Initiating Manual Deployment

1. Navigate to [Manual Deployment of plone-conference-website-2070.example.com](https://github.com/ellizurigo/plone-conference-website-2070/actions/workflows/manual-deploy.yml).
2. Click on `Run workflow`.
3. Select `Branch: main` under **Use workflow from**.
4. Press `Run workflow`.

The workflow will execute the following actions:

- Connect to **DEPLOY_HOST** using **DEPLOY_USER** and **DEPLOY_SSH** key.
- Initiate a new deployment using the `devops/stacks/plone-conference-website-2070.example.com.yml` stack.
- Provide a detailed report of the deployment outcome.

Congratulations! 🎉 You've successfully configured and initiated a manual deployment using GitHub Actions. Monitor the workflow for real-time updates on the deployment process.
