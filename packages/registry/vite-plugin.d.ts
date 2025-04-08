import { ConfigType } from './dist';

export function PloneRegistryVitePlugin(): {
  name: string;
  enforce: 'pre' | 'post' | undefined;
  config: () => {
    ssr: {
      optimizeDeps: {
        exclude: string[];
      };
    };
    esbuild: {
      supported: {
        'top-level-await': boolean;
      };
    };
    optimizeDeps: {
      exclude: string[];
    };
    resolve: {
      alias: any[];
    };
  };
};

declare module '@plone/registry/addons-loader' {
  export default function applyAddonConfiguration(
    config: ConfigType,
  ): ConfigType;
}
