import { promises as fs } from 'fs';
import { optimize as optimizeSvg } from 'svgo';
import _debug from 'debug';

const debug = _debug('volto-vite-svg-loader');

export function svgLoader(options = {}) {
  const { svgoConfig, svgo, defaultImport } = options;

  const svgRegex = /icons\/.*\.svg(\?(raw|skipsvgo))?$/;

  return {
    name: 'svg-loader',
    enforce: 'pre',

    async load(id) {
      if (!id.match(svgRegex)) {
        return;
      }

      debug('\n', `Processing: ${id}.`);

      const [path, query] = id.split('?', 2);
      const importType = query || defaultImport;

      if (importType === 'url') {
        return; // Use default svg loader
      }

      let content;
      try {
        content = await fs.readFile(path, 'utf-8');
      } catch (ex) {
        debug(
          '\n',
          `${id} couldn't be loaded by vite-svg-loader, fallback to default loader`,
        );

        return;
      }

      if (importType === 'raw') {
        return `export default ${JSON.stringify(content)}`;
      }

      if (svgo !== false && query !== 'skipsvgo') {
        content = optimizeSvg(content, {
          ...svgoConfig,
          path,
        }).data;
      }

      const match = content.match(/<svg([^>]+)+>([\s\S]+)<\/svg>/i);
      let attrs = {};
      // console.log(content);
      if (match) {
        attrs = match[1];
        if (attrs) {
          attrs = attrs
            .match(/([\w-:]+)(=)?("[^<>"]*"|'[^<>']*'|[\w-:]+)/g)
            .reduce(function (obj, attr) {
              var split = attr.split('=');
              var name = split[0];
              var value = true;
              if (split && split[1]) {
                value = split[1].replace(/['"]/g, '');
              }
              obj[name] = value;
              return obj;
            }, {});
        }

        content = match[2] || '';
      }

      content = content.replace(/\n/g, ' ').trim();

      return `export default ${JSON.stringify({ attributes: attrs, content: content })}`;
    },
  };
}
