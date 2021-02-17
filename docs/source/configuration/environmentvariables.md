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

## VOLTO_FILE_CACHE_BASE_PATH

This environment variable is an absolute path or a path relative to the Volto
directory (the one which contains the ``public`` directory). If it is not
specified, ``public/cache`` is used.

It is used to contain the files created by the file cache module which is used
by the image proxy bundled with Volto.
