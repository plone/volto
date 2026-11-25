1.  Install or update the supported LTS versions of Node.js, then activate the version supported in Volto.

    ```shell
    nvm install --lts
    nvm use --lts
    ```

2.  Verify that the supported version of Node.js is activated.

    ```shell
    node -v
    ```

3.  Install and enable {term}`corepack` so that Node.js will install {term}`pnpm` as a package manager.

    ```shell
    npm i -g corepack@latest && corepack enable
    ```

    ```{important}
    Node.js 25 and later, including Node.js 26, no longer include corepack.
    If you use one of these versions, then you must install corepack with the above command before you can use pnpm.
    Alternatively, you can install pnpm directly with `npm install -g pnpm`.
    ```
