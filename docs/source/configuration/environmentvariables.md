# Environment variables

All the environment variables defined at runtime that have the "RAZZLE_" prefix, are available in the browser under window.env

ex:
If we start the application with an env variable

```bash
RAZZLE_MY_VARIABLE=some_value build/server.js
```

In the frontend we can access this variable with:

```bash
window.env.RAZZLE_MY_VARIABLE
```

## Runtime environment variables

All the environment variables that are configurable work at runtime, not only at build time. This works since Volto 13 onwards.

!!! info
Before Volto 13, you'd do:

    ```bash
    RAZZLE_API_PATH=https://plone.org yarn build && yarn start:prod
    ```

    From Volto 13 onwards, you can now do:

    ```bash
    yarn build && RAZZLE_API_PATH=https://plone.org yarn start:prod
    ```

This brings you a lot of power since you don't have to rebuild on every config change. You can also generate builds on your CI, then deploy them anywhere.


## Environment variables reference

### RAZZLE_LEGACY_TRAVERSE

From Volto 14 onwards, Seamless mode is the recommended way of setting up your depoloyments. However, it forces you to upgrade several packages in the backend (`plone.restapi` and `plone.rest`) and adjust your web server configuration accordingly.

In case you can't afford or change your deployment, you can still upgrade Volto by using the `RAZZLE_LEGACY_TRAVERSE` flag.

```bash
RAZZLE_LEGACY_TRAVERSE=true yarn start:prod
```

### VOLTO_ROBOTSTXT

You can override the robots.txt file with an environment variable called
`VOLTO_ROBOTSTXT`. This is useful when using the same build on multiple
websites (for example a test website) to forbid robots from crawling it.

```
$ VOLTO_ROBOTSTXT="User-agent: *
Disallow: /" yarn start
```

!!! note
    If you want to use the `VOLTO_ROBOTSTXT` environment variable, make sure to
    delete the file `public/robots.txt` from your project.

### DEBUG

It will enable the log several logging points scattered through the Volto code. It uses the `volto:` namespace.

```bash
DEBUG=volto:i18n yarn start
```

or

```bash
DEBUG=volto:shadowing yarn start
```

also

```bash
DEBUG=volto:* yarn start
```

#### Component Shadowing errors (shadowing)

It displays the errors of the non-compliant customizations (in server console) if you are experiencing problems with a customization not working.

#### Internationalization errors (i18n)

It will enable the log of missing i18n messages (in console).

### Add add-ons via environment variable

Quite often, you need different configurations and enabling components (for example, testing purposes).
You can use the `ADDONS` environment variable to define them.
They sum up to the ones set in `package.json` or programatically in `volto.config.js`.
You can specify released (published) packages (installed previously in your environment, and present already in `node_modules`), or `packages` folder local to your project (not in development, but optional, for example, Volto's testing packages).

```bash
$ ADDONS=test-addon,test-addon2 yarn start

$ yarn add volto-slate
$ ADDONS=volto-slate:asDefault yarn start

# given a package folder 'coresandbox'
$ ADDONS=coresandbox:multilingualFixture yarn start
```

!!! important
    It does *not* work for development packages, which are *always* enabled if defined in your
    `jsconfig.json` (or via `mrs.developer.json`)
