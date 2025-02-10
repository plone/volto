import svgr from 'vite-plugin-svgr';
import type { Plugin, UserConfig } from 'vite';

export function PloneViteSGVRPlugin(): Plugin {
  return {
    name: 'plone-vite-svgr',
    enforce: 'pre',
    config: (): UserConfig => ({
      plugins: [
        svgr({
          svgrOptions: {
            plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
            template: (variables, { tpl }) => {
              return tpl`
            ${variables.imports};
            import { Icon } from '../Icon/Icon';
            ${variables.interfaces};

            const ${variables.componentName} = (${variables.props}) =>
                <Icon {...props}>
                  {${variables.jsx}}
                </Icon>

            ${variables.exports};
            `;
            },
            svgoConfig: {
              floatPrecision: 2,
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      convertPathData: false,
                      removeViewBox: false,
                    },
                  },
                },
                'removeTitle',
                'removeUselessStrokeAndFill',
                {
                  name: 'removeAttrs',
                  params: {
                    attrs: 'fill',
                  },
                },
              ],
            },
          },
        }),
      ],
    }),
  };
}
