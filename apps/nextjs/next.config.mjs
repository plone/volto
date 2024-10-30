import { withPlone } from '@plone/registry/next-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = withPlone({
  typescript: {
    ignoreBuildErrors: true,
  },
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'src/lib/components/src/styles')],
  // },
});

export default nextConfig;
