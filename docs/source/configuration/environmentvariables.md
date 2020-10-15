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
