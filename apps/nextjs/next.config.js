const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'src/lib/components/src/styles')],
  // },

  // webpack(config) {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     '../fonts': path.resolve(__dirname, 'src/lib/components/src/fonts'),
  //   };

  //   return config;
  // },

  // Rewrite to the backend to avoid CORS
  async rewrites() {
    let apiServerURL, vhmRewriteRule;
    if (process.env.API_SERVER_URL) {
      apiServerURL = process.env.API_SERVER_URL;
      vhmRewriteRule = `/VirtualHostBase/https/${process.env.NEXT_PUBLIC_VERCEL_URL}%3A443/Plone/%2B%2Bapi%2B%2B/VirtualHostRoot`;
    } else if (
      process.env.API_SERVER_URL &&
      !process.env.NEXT_PUBLIC_VERCEL_URL
    ) {
      throw new Error(
        'API_SERVER_URL set and NEXT_PUBLIC_VERCEL_URL not present.',
      );
    } else {
      apiServerURL = 'http://localhost:8080';
      vhmRewriteRule =
        '/VirtualHostBase/http/localhost%3A3000/Plone/%2B%2Bapi%2B%2B/VirtualHostRoot';
    }

    return [
      {
        source: '/\\+\\+api\\+\\+/:slug*',
        destination:
          // 'https://static.197.123.88.23.clients.your-server.de/api/:slug*',
          // `${apiServerURL}/:slug*`,
          `${apiServerURL}${vhmRewriteRule}/:slug*`,
      },
    ];
  },
};

module.exports = nextConfig;
