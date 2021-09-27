# Environment variables

All the environment variables defined at runtime that have the "RAZZLE_" prefix, are available in the browser under window.env

ex:
If we start the application with an env variable
```
RAZZLE_MY_VARIABLE=some_value build/server.js
```

In the frontend we can access this variable with:
```
window.env.RAZZLE_MY_VARIABLE
```

## VOLTO_ROBOTSTXT

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


### RAZZLE_DEBUG_CUSTOMIZATIONS

It will enable the log of the non-compliant customizations (in server console) if you are experiencing problems with a customization not working.

### RAZZLE_I18NDEBUGMODE

It will enable the log of missing i18n messages (in console).
