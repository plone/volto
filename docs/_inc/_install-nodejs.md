1.  Install or update the supported LTS versions of Node.js, then activate the version supported in Seven.

    ```shell
    nvm install --lts
    nvm use --lts
    ```

2.  Verify that the supported version of Node.js is activated.

    ```shell
    node -v
    ```

3.  Enable {term}`corepack` so that Node.js will install {term}`pnpm` as a package manager.

    ```shell
    npm i -g corepack@latest && corepack enable
    ```
