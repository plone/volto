const path = require('path');

class RootResolverPlugin {
  constructor(source, target) {
    this.source = source || 'resolve';
    this.target = target || 'resolve';
  }

  apply(resolver) {
    var target = resolver.ensureHook(this.target);
    resolver
      .getHook(this.source)
      .tapAsync('RootResolverPlugin', (request, resolveContext, callback) => {
        if (request.request.startsWith('~/../')) {
          const resourcePath = request.request.substr(5);

          const nextRequest = Object.assign({}, request, {
            request: path.resolve(`./${resourcePath}`),
          });

          resolver.doResolve(
            target,
            nextRequest,
            null,
            resolveContext,
            callback,
          );
        } else {
          callback();
        }
      });
  }
}

module.exports = RootResolverPlugin;
