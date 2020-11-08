const path = require('path');

class LocalResolverPlugin {
  constructor(registry) {
    this.registry = registry;
    this.addonPaths = Object.assign(
      {},
      ...Object.keys(registry.packages).map((k) => ({
        [k]: registry.packages[k].modulePath,
      })),
    ); // map of [addon_name]:path
  }

  isAddon = (request) => {
    const addonPaths = Object.values(this.addonPaths);
    const issuer = request.context.issuer;

    // is issuer path an addon module?
    if (addonPaths.findIndex((p) => issuer.startsWith(p)) === -1) return false;

    const resourcePath = path.join(request.path, request.request);
    return addonPaths.findIndex((p) => resourcePath.startsWith(p)) > -1;
  };

  getResolvePath = (request) => {
    const resourcePath = path.join(request.path, request.request);
    const addon = Object.keys(this.addonPaths).find((name) => {
      return resourcePath.startsWith(this.addonPaths[name]);
    });
    const addonPath = this.addonPaths[addon];
    const localPath = request.path.slice(addonPath.length);
    return path.join(addon, localPath, request.request);
  };

  apply(resolver) {
    const isAddon = this.isAddon;
    const getResolvePath = this.getResolvePath;

    resolver.plugin('resolve', function RelativeBackResolver(
      request,
      callback,
    ) {
      if (
        request.request.startsWith('.') &&
        request.context &&
        request.context.issuer &&
        isAddon(request)
      ) {
        const normalizedResourceName = getResolvePath(request);
        const nextRequest = Object.assign({}, request, {
          request: normalizedResourceName,
        });

        resolver.doResolve('resolve', nextRequest, '', callback);
      } else {
        callback();
      }
    });
  }
}

module.exports = LocalResolverPlugin;
