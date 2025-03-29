# Miscellaneous considerations

## `queryWithConfig` and `mutationWithConfig` functions

The `queryWithConfig` and `mutationWithConfig` functions are utility functions that accept two parameters: `method`, representing the original function, and `configGetter`, a function returning the required configuration object.
Using `configGetter` instead of the direct configuration ensures the latest value is used, preventing closures.
These functions return another function, taking the same parameters as the original but excluding the config property.
They then invoke the original function with the configuration fetched from configGetter.
Utilizing these functions reduces import clutter in client files by obviating the need to import argument types for each query or mutation function.

## `queryHookFromQuery` and `mutationHookFromMutation` functions

The `queryHookFromQuery` and `mutationHookFromMutation` functions are utility functions that take a query or mutation function respectively, and yield a corresponding hook function.
They use helper functions to extract the types of argument and return objects from the given query or mutation function.
The resulting hook function is returned with the appropriate type casting.
They use useQuery and useMutation internally so that the user doesn't have to use `useQuery` or `useMutation` directly.
