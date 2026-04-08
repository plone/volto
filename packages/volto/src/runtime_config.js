let env_obj = {};
if (typeof window === 'undefined') {
  if (process.env) {
    const envs = Object.keys(process.env);
    const filtered = envs.filter((env) => env.startsWith('RAZZLE_'));
    env_obj = filtered.reduce(
      (o, key) => Object.assign(o, { [key]: process.env[key] }),
      {},
    );
  }
} else {
  if (window.env) {
    const envs = Object.keys(window.env);
    env_obj = envs.reduce(
      (o, key) => Object.assign(o, { [key]: window.env[key] }),
      {},
    );
  }
}
export const runtimeConfig = env_obj;
