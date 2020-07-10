# Integration with SENTRY

It is possible to send the uncaught exceptions to sentry.
The configuration is done using environment variables:
SENTRY_DSN - required to enable the feature
SENTRY_FRONTEND_CONFIGURATION - optional, here we can specify TAGS and ADDITIONAL DATA for the messages from the browser we send to SENTRY
SENTRY_BACKEND_CONFIGURATION - same as SENTRY_FRONTEND_CONFIGURATION, but we configure the messages from the backend

## SENTRY_FRONTEND_CONFIGURATION/SENTRY_BACKEND_CONFIGURATION

We have the possibility to add TAGS and ADDITIONAL DATA for our messages for categorization in SENTRY. We can configure these 2 variables separately, as we might want to separate the messages from frontend and backend.
Example of configurations:
```bash
{
  "tags":
    {
      "site":"www.test.com",
      "app":"test_app"
    },
  "extras":
    {
      "logger":"javascript-frontend", 
      "release":1
    }
}
```

## Example of usage:
1. Only specifying the SENTRY_DSN, without categorizations:
```bash
SENTRY_DSN=<MY_SENTRY_DSN> yarn start
```
2. Different tags for frontend and backend:
```bash
SENTRY_DSN=<MY_SENTRY_DSN> SENTRY_FRONTEND_CONFIG='{"tags":{"site":"www.test.com","app":"test_app"},"extras":{"logger":"javascript-frontend", "release":1}}' SENTRY_BACKEND_CONFIG='{"tags":{"site":"www.test.com","app":"test_app"},"extras":{"logger":"javascript-backend", "release":2, "server":"server#1"}}'  yarn start
```

## Example of messages in SENTRY
1. List of messages
![](semantic_messages.png)
2. Messages from the frontend, with it's own TAGS and ADDITIONAL DATA
![](semantic_frontend_message.png)
3. Messages from the backend, with it's own TAGS and ADDITIONAL DATA
![](semantic_backend_message.png)
