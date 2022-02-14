const path = require('path');

class RootResolverPlugin {
  apply(resolver) {
    resolver.plugin('resolve', function RelativeBackResolver(
      request,
      callback,
    ) {
      if (request.request.startsWith('~/../')) {
        const resourcePath = request.request.substr(5);

        const nextRequest = Object.assign({}, request, {
          request: path.resolve(`./${resourcePath}`),
        });

        resolver.doResolve('resolve', nextRequest, '', callback);
      } else {
        callback();
      }
    });
  }
}

module.exports = RootResolverPlugin;
