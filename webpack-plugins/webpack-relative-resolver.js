const path = require('path');

class RelativeResolverPlugin {
  constructor(registry, source, target) {
    this.source = source || 'resolve';
    this.target = target || 'resolve';
    this.registry = registry;
    this.voltoPaths = Object.assign(
      { '@plone/volto/': `${registry.voltoPath}/src` },
      ...Object.keys(registry.packages).map((k) => ({
        [k]: registry.packages[k].modulePath,
      })),
    ); // map of [addon_name]:path
  }

  isAddon(request) {
    const voltoPaths = Object.values(this.voltoPaths);
    const issuer = request.context.issuer;

    // is issuer path a Volto-compiled module?
    if (voltoPaths.findIndex((p) => issuer.startsWith(p)) === -1) return false;

    const resourcePath = path.join(request.path, request.request);
    return voltoPaths.findIndex((p) => resourcePath.startsWith(p)) > -1;
  }

  getResolvePath(request) {
    const resourcePath = path.join(request.path, request.request);
    const addon = Object.keys(this.voltoPaths).find((name) => {
      return resourcePath.startsWith(this.voltoPaths[name]);
    });
    const addonPath = this.voltoPaths[addon];
    const localPath = request.path.slice(addonPath.length);
    return path.join(addon, localPath, request.request);
  }

  apply(resolver) {
    var target = resolver.ensureHook(this.target);
    resolver
      .getHook(this.source)
      .tapAsync(
        'RelativeResolverPlugin',
        (request, resolveContext, callback) => {
          if (
            request.request.startsWith('.') &&
            request.context &&
            request.context.issuer &&
            this.isAddon(request)
          ) {
            const normalizedResourceName = this.getResolvePath(request);
            const nextRequest = Object.assign({}, request, {
              request: normalizedResourceName,
              path: this.registry.projectRootPath,
            });

            return resolver.doResolve(
              target,
              nextRequest,
              null,
              resolveContext,
              callback,
            );
          } else {
            callback();
          }
        },
      );
  }
}

module.exports = RelativeResolverPlugin;
