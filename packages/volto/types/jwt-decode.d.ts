declare module 'jwt-decode' {
  export function jwtDecode<T = any>(token: string): T;
  export default jwtDecode;
}
