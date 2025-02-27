import svgr from 'vite-plugin-svgr';
import { mergeConfig } from 'vite';

export function PloneSGVRVitePlugin(customConfig = {}) {
  return [
    svgr(
      mergeConfig(
        {
          svgrOptions: {
            plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
            template: (variables, { tpl }) => {
              return tpl`
      ${variables.imports};
      import { Icon } from '@plone/components';
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
        },
        customConfig,
      ),
    ),
  ];
}
