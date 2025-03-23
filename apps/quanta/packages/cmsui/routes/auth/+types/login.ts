// React Router generated types for route:
// ../../../packages/cmsui/routes/auth/login.tsx

import type * as T from "react-router/route-module"

import type { Info as Parent0 } from "../../../../../.react-router/types/app/+types/root.js"

type Module = typeof import("../login.js")

export type Info = {
  parents: [Parent0],
  id: "/Users/sneridagh/Development/plone/7/packages/cmsui/routes/auth/login"
  file: "../../../packages/cmsui/routes/auth/login.tsx"
  path: "/login"
  params: {} & { [key: string]: string | undefined }
  module: Module
  loaderData: T.CreateLoaderData<Module>
  actionData: T.CreateActionData<Module>
}

export namespace Route {
  export type LinkDescriptors = T.LinkDescriptors
  export type LinksFunction = () => LinkDescriptors

  export type MetaArgs = T.CreateMetaArgs<Info>
  export type MetaDescriptors = T.MetaDescriptors
  export type MetaFunction = (args: MetaArgs) => MetaDescriptors

  export type HeadersArgs = T.HeadersArgs
  export type HeadersFunction = (args: HeadersArgs) => Headers | HeadersInit

  export type LoaderArgs = T.CreateServerLoaderArgs<Info>
  export type ClientLoaderArgs = T.CreateClientLoaderArgs<Info>
  export type ActionArgs = T.CreateServerActionArgs<Info>
  export type ClientActionArgs = T.CreateClientActionArgs<Info>

  export type HydrateFallbackProps = T.CreateHydrateFallbackProps<Info>
  export type ComponentProps = T.CreateComponentProps<Info>
  export type ErrorBoundaryProps = T.CreateErrorBoundaryProps<Info>
}