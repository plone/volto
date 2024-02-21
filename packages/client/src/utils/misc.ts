import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { PloneClientConfig } from '../validation/config';

/*
  configGetter is required instead of using the config directly to make sure
  that the latest config value is used and no closure is held on it
*/
export const queryWithConfig = <T extends { config: PloneClientConfig }, K>(
  method: (args: T) => K,
  configGetter: () => T['config'],
) => {
  return (args: Omit<T, 'config'>) =>
    method({ ...args, config: configGetter() } as T);
};

export const mutationWithConfig = <K>(
  method: (args: { config: PloneClientConfig }) => K,
  configGetter: () => PloneClientConfig,
) => {
  return () => method({ config: configGetter() });
};

export const flattenToDottedNotation = (
  obj: Record<string, any>,
  prefix = '',
): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      Object.assign(result, flattenToDottedNotation(value, newKey));
    } else {
      result[newKey] = value;
    }
  }

  return result;
};

/*
  `queryHookFromQuery` and `mutationHookFromMutation` functions can be used to
  create hooks from the query functions and mutation functions respectively. It
  takes a query function or a mutation function and returns a hook function.The
  hook function is returned with appropriate type casting. They use useQuery and
  useMutation internally so that the user doesn't have to use `useQuery` or
  `useMutation` directly.
*/
type TArguments<T> = T extends (args: infer U) => any ? U : never;

type TReturnType<T> = T extends (args: any) => infer U ? U : never;

type TQueryFnReturnType<T> = T extends { queryFn: () => Promise<infer U> }
  ? U
  : never;

export const queryHookFromQuery = <T extends (...args: any) => any>(
  queryFnCreator: T,
) => {
  return (args: TArguments<typeof queryFnCreator>) =>
    useQuery(queryFnCreator(args)) as UseQueryResult<
      TQueryFnReturnType<TReturnType<T>>
    >;
};

type TMutationFnReturnType<T> = T extends {
  mutationFn: (...args: any) => Promise<infer U>;
}
  ? U
  : never;

type TMutationFnArgsType<T> = T extends {
  mutationFn: (args: infer U) => any;
}
  ? U
  : never;

export const mutationHookFromMutation = <T extends (...args: any) => any>(
  mutationFnCreator: T,
) => {
  return () =>
    useMutation(mutationFnCreator()) as UseMutationResult<
      TMutationFnReturnType<TReturnType<T>>,
      unknown,
      TMutationFnArgsType<TReturnType<T>>
    >;
};
