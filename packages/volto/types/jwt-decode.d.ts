declare module 'jwt-decode' {
  // jwt-decode 2.x ships no type declarations.
  export default function jwtDecode<T = unknown>(
    token: string,
    options?: { header?: boolean },
  ): T;
}
